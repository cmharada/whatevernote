/*global WhateverNote JST */
WhateverNote.Views.NotesIndex = Backbone.CompositeView.extend({
  template: JST["notes/index"],
  
  events: {
    "click .new-note": "newNote",
    "click .notes-index": "showNote",
    "click .edit-note": "editNote"
  },
  
  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
  },
  
  render: function() {
    var renderedContent = this.template({ notes: this.collection });
    this.$el.html(renderedContent);
    
    this.attachSubviews();
    
    this.onRender();
    
    return this;
  },
  
  onRender: function() {
    this.$(".note-preview").draggable({
      helper: "clone"
    });
  },
  
  showNewForm: function() {
    this.$(".new-note-form").removeClass("hidden");
  },
  
  newNote: function() {
    var notes = this.collection;
    
    var newNote = new WhateverNote.Models.Note({
      title: ""
    });
    
    newNote.save({}, {
      success: function() {
        notes.add(newNote);
      },
      
      error: function(model, response) {
        // SHOW ERRORS
      }
    });
  },
  
  showNote: function(event) {
    var id = $(event.target).parent("li").data("id");
    if (this.showView) {
      this.removeSubview(".note-show", this.showView);
    }
    var note = this.collection.getOrFetch(id);
    this.showView = new WhateverNote.Views.NoteShow({
      model: note
    });
    this.addSubview(".note-show", this.showView);
  }
});