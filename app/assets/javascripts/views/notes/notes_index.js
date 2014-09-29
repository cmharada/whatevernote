/*global WhateverNote JST */
WhateverNote.Views.NotesIndex = Backbone.CompositeView.extend({
  tagName: "div",
  className: "notes-index-view",
  
  template: JST["notes/index"],
  
  events: {
    "click .new-note": "newNote",
    "click .note-title-preview": "showNote",
    "click .edit-note": "editNote",
    "click .delete-note": "deleteNote"
  },
  
  initialize: function() {
    this.listenTo(this.collection, "reset", this.render);
  },
  
  render: function() {
    var renderedContent = this.template({ notes: this.collection });
    this.$el.html(renderedContent);
    
    this.$(".notes-index-title").text(this.collection.getFilteredNotebook());
    
    this.attachSubviews();
    
    this.rendered();
    
    return this;
  },
  
  onRender: function() {
    this.$(".note-preview").draggable({
      helper: "clone",
      appendTo: "body"
    });
  },
  
  showNewForm: function() {
    this.$(".new-note-form").removeClass("hidden");
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
  
  showNote: function(event) {
    var id = $(event.target).parent("li").data("id");
    if (this.showView) {
      this.removeSubview(".show-area", this.showView);
    }
    var note = this.collection.getOrFetch(id);
    this.showView = new WhateverNote.Views.NoteShow({
      model: note
    });
    this.addSubview(".show-area", this.showView);
  },
  
  deleteNote: function() {
    //TODO: Ask for confirmation
    var id = $(event.target).parent("li").data("id");
    var note = WhateverNote.notes.get(id);
    note.destroy();
  }
});