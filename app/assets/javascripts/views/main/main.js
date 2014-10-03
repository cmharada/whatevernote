/*global WhateverNote JST */
WhateverNote.Views.Main = Backbone.CompositeView.extend({
  tagName: "div",
  className: "main-view",
  template: JST['main/main'],
  
  events: {
    "click .new-note": "newNote",
    "submit #search-bar": "handleSearch"
  },
  
  initialize: function() {
    this.initializeNotebookIndex();
    this.initializeTagIndex();
    this.initializeNoteIndex();
  },
  
  initializeNotebookIndex: function() {
    WhateverNote.notebooks.fetch();
    var notesIndex = new WhateverNote.Views.NotebooksIndex({
      collection: WhateverNote.notebooks
    });
    this.addSubview(".left-sidebar", notesIndex);
  },
  
  initializeTagIndex: function() {
    WhateverNote.tags.fetch();
    var tagsIndex = new WhateverNote.Views.TagsIndex({
      collection: WhateverNote.tags
    });
    this.addSubview(".left-sidebar", tagsIndex);
  },
  
  initializeNoteIndex: function() {
    WhateverNote.notes.fetch();

    this.noteIndex = new WhateverNote.Views.NotesIndex({
      collection: WhateverNote.filteredNotes
    });
    this.addSubview(".main-space", this.noteIndex);
  },

  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    
    this.attachSubviews();
    
    return this;
  },
  
  handleSearch: function(event) {
    event.preventDefault();
    var searchString = this.$("#search-bar-input").val();
    WhateverNote.filteredNotes.setTextFilter(searchString);
  },
  
  newNote: function(events) {
    this.noteIndex.newNote();
  },
});
