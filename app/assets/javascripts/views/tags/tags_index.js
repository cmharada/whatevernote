/*global WhateverNote JST */
WhateverNote.Views.TagsIndex = Backbone.View.extend({
  template: JST['tags/index'],
  
  render: function() {
    var renderedContent = this.template({
      tags: this.collection
    });
    this.$el.html(renderedContent);
    
    return this;
  }
});