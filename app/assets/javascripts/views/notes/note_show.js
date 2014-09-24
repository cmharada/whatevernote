/*global WhateverNote JST */
WhateverNote.Views.NoteShow = Backbone.View.extend({
  template: JST["notes/show"],
  
  events: {
    "submit form": "updateNote"
  },
  
  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },
  
  render: function() {
    var renderedContent = this.template({ note: this.model });
    this.$el.html(renderedContent);
    
    return this;
  },
  
  updateNote: function(event) {
    event.preventDefault();
    
    var params = $(event.currentTarget).serializeJSON();
    this.model.set(params);
    this.model.save({
      success: function() {
        //////////////////////////
      },
      error: function() {
        /////////////////////////
      }
    });
  }
});