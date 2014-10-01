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

    var indexView = new WhateverNote.Views.NotesIndex({
      collection: WhateverNote.filteredNotes
    });
    this.addSubview(".main-space", indexView);
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
    var newNote = new WhateverNote.Models.Note({
      title: "Untitled"
    });
    
    newNote.save({}, {
      success: function() {
        WhateverNote.notes.add(newNote);
      }, 
      error: function(model, response) {
        // SHOW ERRORS
        alert("ERROR CREATING NOTE");
      }
    });
  },
});
