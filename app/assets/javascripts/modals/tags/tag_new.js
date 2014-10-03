/*global WhateverNote JST */
WhateverNote.Modals.TagNew = Backbone.Modal.extend({
  template: JST["tags/new"],
  cancelEl: ".close-modal",
  submitEl: ".submit-new-tag",
  
  events: {
    "submit form": "stopSubmit"
  },
  
  stopSubmit: function(event) {
    event.preventDefault();
    this.$(".submit-new-tag").click();
  },
  
  beforeSubmit: function() {
    var params = this.$(".new-tag-params").serializeJSON();
    if (params["tag"]["name"] === "") {
      this.$(".tag-name").addClass("has-error");
      this.$(".error-space").html("Name cannot be blank");
      return false;
    }
    return true;
  },
  
  submit: function() {
    var params = this.$(".new-tag-params").serializeJSON();
    var newTag = new WhateverNote.Models.Tag(params["tag"]);
    
    newTag.save({}, {
      success: function() {
        WhateverNote.tags.add(newTag);
      },
      error: function(model, response) {
        alert(response);
      }
    });
  }
});