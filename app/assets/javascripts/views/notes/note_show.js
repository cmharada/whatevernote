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
    var renderedContent = this.template({
      note: this.model,
      notebooks: WhateverNote.notebooks
    });
    this.$el.html(renderedContent);
    
    var selector = "option[value=" + this.model.get("notebook_id") + "]"
    $(selector).attr("selected", "selected");
    
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
      error: function(model, response) {
        /////////////////////////
      }
    });
  }
});