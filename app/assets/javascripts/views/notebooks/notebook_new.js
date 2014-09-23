/*global WhateverNote JST */
WhateverNote.Views.NotebookNew = Backbone.View.extend({
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
        console.log("Added");
        WhateverNote.notebooks.add(newNotebook);
      },
      
      error: function(model, response) {
        // SHOW ERRORS
      }
    });
  }
});