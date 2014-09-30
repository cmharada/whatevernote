/*global WhateverNote JST */
WhateverNote.Modals.TagEdit = Backbone.Modal.extend({
  template: JST["tags/new"],
  cancelEl: ".close-modal",
  submitEl: ".submit-edit-tag",
  
  events: {
    "submit form": "stopSubmit"
  },
  
  stopSubmit: function(event) {
    event.preventDefault();
    this.$(".submit-edit-tag").click();
  },
  
  beforeSubmit: function() {
    var params = this.$(".new-tag-params").serializeJSON();
    if (params["tag"]["name"] === "") {
      debugger;
      this.$(".tag-name").addClass("has-error");
      this.$(".error-space").html("Name cannot be blank");
      return false;
    }
    return true;
  },
  
  submit: function() {
    var params = this.$(".new-tag-params").serializeJSON();
    this.model.set(params);
    
    this.model.save({}, {
      success: function() {
        //TODO HANDLE SUCCESS
      },
      error: function(model, response) {
        //TODO SHOW ERRORS
        alert("ERROR UPDATING TAG");
      }
    });
  }
});