/*global WhateverNote JST */
WhateverNote.Views.NotebooksIndex = Backbone.CompositeView.extend({
  template: JST['notebooks/index'],
  
  events: {
    "click .new-notebook": "showNewForm",
    "click .notebook": "showNotebookIndex"
  },
  
  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
    
    var newView = new WhateverNote.Views.NotebookNew();
    this.addSubview(".new-notebook-form", newView);

    WhateverNote.notes.fetch();
    var indexView = new WhateverNote.Views.NotesIndex({
      collection: WhateverNote.notes
    });
    this.addSubview(".notes-index", indexView);
  },

  render: function() {
    var renderedContent = this.template({ notebooks: this.collection });
    this.$el.html(renderedContent);
    
    this.attachSubviews();
    
    return this;
  },
  
  showNewForm: function() {
    this.$(".new-notebook-form").removeClass("hidden");
  }
});
