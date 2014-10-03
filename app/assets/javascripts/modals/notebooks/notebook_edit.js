/*global WhateverNote JST */
WhateverNote.Modals.NotebookEdit = Backbone.Modal.extend({
  template: JST["notebooks/edit"],
  cancelEl: ".close-modal",
  submitEl: ".submit-edit-notebook",
  
  events: {
    "submit form": "stopSubmit"
  },
  
  stopSubmit: function(event) {
    event.preventDefault();
    this.$(".submit-edit-notebook").click();
  },
  
  beforeSubmit: function() {
    var params = this.$(".edit-notebook-params").serializeJSON();
    if (params["notebook"]["title"] === "") {
      this.$(".notebook-title").addClass("has-error");
      this.$(".error-space").html("Title cannot be blank");
      return false;
    }
    return true;
  },
  
  submit: function() {
    var params = this.$(".edit-notebook-params").serializeJSON();
    this.model.set(params);
    this.model.save({
      error: function(model, response) {
        alert(response);
      }
    });
  }
});