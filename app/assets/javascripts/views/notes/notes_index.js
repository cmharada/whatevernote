/*global WhateverNote JST */
WhateverNote.Views.NotesIndex = Backbone.CompositeView.extend({
  tagName: "div",
  className: "notes-index-view",
  
  template: JST["notes/index"],
  
  events: {
    "click .note-preview": "handleShowNote",
    "click .edit-note": "editNote",
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
  
  newNote: function() {
    var that = this;
    var newNote = new WhateverNote.Models.Note({
      title: "Untitled"
    });
    
    newNote.save({}, {
      success: function() {
        WhateverNote.notes.add(newNote);
        that.showNote(newNote);
      }, 
      error: function(model, response) {
        // SHOW ERRORS
        alert("ERROR CREATING NOTE");
      }
    });
  },
  
  showNewForm: function() {
    this.$(".new-note-form").removeClass("hidden");
  },
  
  handleShowNote: function(event) {
    var id = $(event.currentTarget).data("id");
    var note = WhateverNote.notes.getOrFetch(id);
    this.showNote(note);
  },
  
  showNote: function(note) {
    if (this.showView) {
      this.removeSubview(".show-area", this.showView);
    }
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