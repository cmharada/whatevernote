/*global WhateverNote JST */
WhateverNote.Views.NotebookNew = Backbone.View.extend({
  tagName: "div",
  className: "notebook-new-view",
  
  template: JST["notebooks/new"],
  
  events: {
    "submit form": "handleSubmit"
  },
  
  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    
    return this;
  },
  
  handleSubmit: function(event) {
    event.preventDefault();
    var params = $(event.currentTarget).serializeJSON();
    var newNotebook = new WhateverNote.Models.Notebook(params["notebook"]);
    
    newNotebook.save({}, {
      success: function() {
        WhateverNote.notebooks.add(newNotebook);
      },
      
      error: function(model, response) {
        // SHOW ERRORS
        alert("ERROR MAKING NEW NOTEBOOK")
      }
    });
  }
});