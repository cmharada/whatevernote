/*global WhateverNote JST */
WhateverNote.Views.TagsNote = Backbone.View.extend({
  tagName: "div",
  className: "tags-note-view",
  
  template: JST['tags/tags_note'],
  
  events: {
    "focus .new-tag": "handleFocus",
    "blur .new-tag": "handleUnfocus"
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
    var newTagName = this.$(".new-tag").val();
    if (newTagName) {
      console.log(newTagName);
    }
    this.$(".new-tag").val("+");
  }
});