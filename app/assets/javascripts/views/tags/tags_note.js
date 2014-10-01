/*global WhateverNote JST */
WhateverNote.Views.TagsNote = Backbone.View.extend({
  tagName: "div",
  className: "tags-note-view",
  
  template: JST['tags/tags_note'],
  
  events: {
    "focus .new-tag-note": "handleFocus",
    "blur .new-tag-note": "handleUnfocus",
    "keyup .new-tag-note": "growInput"
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
  
  growInput: function() {
    var $input = this.$('.new-tag-note');
    var size = parseInt($input.attr('size'), 10); 
    var chars = $input.val().length; 
    if(chars >= size) {
      $input.attr('size', chars);
    }
  },
  
  handleFocus: function() {
    this.$(".new-tag-note").val("");
  },
  
  handleUnfocus: function() {
    var that = this;
    var newTagName = this.$(".new-tag-note").val();
    if (newTagName) {
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
    this.$(".new-tag-note").val("+");
    this.$(".new-tag-note").attr("size", 1);
  }
});