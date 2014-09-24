/*global WhateverNote JST */
WhateverNote.Views.NotebookEdit = Backbone.View.extend({
  template: JST["notebooks/edit"],
  
  events: {
    "submit form": "handleEdit",
    "click .cancel-edit-notebook": "handleClose"
  },
  
  render: function() {
    var renderedContent = this.template({ notebook: this.model });
    this.$el.html(renderedContent);
    
    return this;
  },
  
  handleEdit: function(event) {
    event.preventDefault();
    
    var params = $(event.currentTarget).serializeJSON();
    this.model.set(params);
    this.model.save({
      success: function() {
        //////////////////////
      },
      error: function(model, response) {
        //////////////////////
      }
    });
  },
  
  handleClose: function() {
    this.$el.html("");
  }
});