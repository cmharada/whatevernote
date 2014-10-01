/*global WhateverNote JST */
WhateverNote.Views.TagsNote = Backbone.View.extend({
  tagName: "div",
  className: "tags-note-view",
  
  template: JST['tags/tags_note'],
  
  events: {
    "click .new-tag-note-start": "handleNewInput",
    "blur .new-tag-note": "handleUnfocus",
    "keyup .new-tag-note": "handleInput",
    "click .remove-tag": "unassignTag"
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
  
  handleInput: function(event) {
    debugger;
    if (event.keyCode === 13) {
      this.$(".new-tag-note").blur();
    } else {
      this.growInput();
    }
  },
  
  growInput: function() {
    var $input = this.$('.new-tag-note');
    var size = parseInt($input.attr('size'), 10); 
    var chars = $input.val().length; 
    if(chars >= size) {
      $input.attr('size', chars);
    }
  },
  
  handleNewInput: function() {
    this.$(".new-tag-note-start").addClass("hidden");
    this.$(".new-tag-note").removeClass("hidden");
    this.$(".new-tag-note").focus();
  },
  
  handleUnfocus: function() {
    var that = this;
    var newTagName = this.$(".new-tag-note").val();
    if (newTagName) {
      var match = WhateverNote.tags.find(function(tag) {
        return tag.get("name") === newTagName;
      });
      if (match) {
        that.note.assign(match.id, {
          success: function() {
            WhateverNote.tags.fetch();
            that.collection.add(match);
          }
        });
      } else {
        var tag = new WhateverNote.Models.Tag({ name: newTagName });
        tag.save({}, {
          success: function() {
            that.note.assign(tag.id, {
              success: function() {
                WhateverNote.tags.fetch();
                that.collection.add(tag);
              }
            });
          },
          error: function() {
            //TODO Error handling
            console.log("ERROR CREATING TAG")
          }
        });
      }
    }
    this.$(".new-tag-note").val("");
    this.$(".new-tag-note").attr("size", 1);
    this.$(".new-tag-note").addClass("hidden");
    this.$(".new-tag-note-start").removeClass("hidden");
  },
  
  unassignTag: function(event) {
    var that = this;
    var tagId = $(event.currentTarget).parent(".note-tags").data("id");
    this.note.unassign(tagId, {
      success: function() {
        WhateverNote.tags.fetch();
        that.collection.remove(tagId);
      }
    });
  }
});