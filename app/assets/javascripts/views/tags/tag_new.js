/*global WhateverNote JST */
WhateverNote.Views.TagNew = Backbone.View.extend({
  tagName: "div",
  className: "tag-new-view",
  
  template: JST["tags/new"],
  
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
    var newTag = new WhateverNote.Models.Tag(params["tag"]);
    
    newTag.save({}, {
      success: function() {
        WhateverNote.tags.add(newTag);
      },
      
      error: function(model, response) {
        // SHOW ERRORS
        alert("ERROR MAKING NEW TAG");
      }
    });
  }
});