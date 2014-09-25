/*global WhateverNote JST */
WhateverNote.Views.TagsIndex = Backbone.View.extend({
  tagName: "div",
  className: "tags-index-view",
  
  template: JST["tags/index"],
  
  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
  },
  
  render: function() {
    var renderedContent = this.template({
      tags: this.collection
    });
    this.$el.html(renderedContent);
    
    return this;
  }
});