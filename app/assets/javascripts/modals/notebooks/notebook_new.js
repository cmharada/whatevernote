/*global WhateverNote JST */
WhateverNote.Modals.NotebookNew = Backbone.Modal.extend({
  template: JST["notebooks/new"],
  cancelEl: ".close-modal",
  submitEl: ".submit-new-notebook",
  
  events: {
    "submit form": "stopSubmit"
  },
  
  stopSubmit: function(event) {
    event.preventDefault();
    this.$(".submit-new-notebook").click();
  },
  
  beforeSubmit: function() {
    var params = this.$(".new-notebook-params").serializeJSON();
    if (params["notebook"]["title"] === "") {
      this.$(".notebook-title").addClass("has-error");
      this.$(".error-space").html("Title cannot be blank");
      return false;
    }
    return true;
  },
  
  submit: function() {
    var params = this.$(".new-notebook-params").serializeJSON();
    var newNotebook = new WhateverNote.Models.Notebook(params["notebook"]);
    
    newNotebook.save({}, {
      success: function() {
        WhateverNote.notebooks.add(newNotebook);
      },
      error: function(model, response) {
        //TODO SHOW ERRORS
        alert("ERROR MAKING NEW NOTEBOOK");
      }
    });
  }
});