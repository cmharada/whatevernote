/*global WhateverNote JST */
WhateverNote.Views.NotesIndex = Backbone.View.extend({
  template: JST["notes/index"],
  
  events: {
    "click .new-note": "newNote"
  },
  
  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
  },
  
  render: function() {
    var renderedContent = this.template({ notes: this.collection });
    this.$el.html(renderedContent);
    
    return this;
  },
  
  showNewForm: function() {
    this.$(".new-note-form").removeClass("hidden");
  },
  
  newNote: function() {
    var newNote = new WhateverNote.Models.Note();
    
    newNote.save({}, {
      success: function() {
        this.collection.add(newNote);
      },
      
      error: function(model, response) {
        // SHOW ERRORS
      }
    });
  }
});