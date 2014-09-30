/*global WhateverNote JST */
WhateverNote.Views.TagsNote = Backbone.View.extend({
  tagName: "div",
  className: "tags-note-view",
  
  template: JST['tags/tags_note'],
  
  events: {
    "focus .new-tag": "handleFocus",
    "blur .new-tag": "handleUnfocus"
  },
  
  initialize: function(opts) {
    this.listenTo(this.collection, "sync add remove", this.render);
    this.note = opts.parentNote;
  },
  
  render: function() {
    var renderedContent = this.template({
      tags: this.collection
    });
    this.$el.html(renderedContent);
    
    return this;
  },
  
  handleFocus: function() {
    this.$(".new-tag").val("");
  },
  
  handleUnfocus: function() {
    var that = this;
    var newTagName = this.$(".new-tag").val();
    if (newTagName) {
      console.log(newTagName);
      var match = WhateverNote.tags.find(function(tag) {
        return tag.get("name") === newTagName;
      });
      if (match) {
        that.note.assign(match.id);
      } else {
        var tag = new WhateverNote.Models.Tag({ name: newTagName });
        tag.save({}, {
          success: function() {
            that.note.assign(tag.id);
            WhateverNote.tags.fetch();
            that.note.fetch();
            that.collection.add(tag);
          },
          error: function() {
            //TODO Error handling
            console.log("ERROR CREATING TAG")
          }
        });
      }
    }
    this.$(".new-tag").val("+");
  }
});