/*global WhateverNote JST */
WhateverNote.Views.Main = Backbone.CompositeView.extend({
  template: JST['main/main'],
  
  initialize: function() {
    WhateverNote.notebooks.fetch();
    var subview = new WhateverNote.Views.NotebooksIndex({
      collection: WhateverNote.notebooks
    });
    this.addSubview("#workspace", subview);
  },

  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    
    this.attachSubviews();
    
    return this;
  }
});
