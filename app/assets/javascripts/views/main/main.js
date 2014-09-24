/*global WhateverNote JST */
WhateverNote.Views.Main = Backbone.CompositeView.extend({
  tagName: "div",
  className: "main-view",
  template: JST['main/main'],
  
  initialize: function() {
    WhateverNote.notebooks.fetch();
    var notesIndex = new WhateverNote.Views.NotebooksIndex({
      collection: WhateverNote.notebooks
    });
    this.addSubview(".left-sidebar", notesIndex);
    
    WhateverNote.notes.fetch();
    var indexView = new WhateverNote.Views.NotesIndex({
      collection: WhateverNote.notes
    });
    this.addSubview(".main-space", indexView);
  },

  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    
    this.attachSubviews();
    
    return this;
  }
});
