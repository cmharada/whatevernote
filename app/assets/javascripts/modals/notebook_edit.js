/*global WhateverNote JST */
WhateverNote.Modals.NotebookEdit = Backbone.Modal.extend({
  template: JST["notebooks/edit"],
  cancelEl: ".close-modal",
  submitEl: ".submit-edit-notebook",
  
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
      success: function() {
        //TODO: Handle success
      },
      error: function(model, response) {
        //TODO: Handle failure
      }
    });
  }
});