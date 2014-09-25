/*global WhateverNote JST */
WhateverNote.Views.NoteShow = Backbone.CompositeView.extend({
  tagName: "div",
  className: "note-show-view",
  
  template: JST["notes/show"],
  
  events: {
    "submit form": "updateNote"
  },
  
  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    
    var tagsView = new WhateverNote.Views.TagsNote({
      collection: this.model.tags()
    });
    this.addSubview(".tags", tagsView);
  },
  
  render: function() {
    var renderedContent = this.template({
      note: this.model,
      notebooks: WhateverNote.notebooks
    });
    this.$el.html(renderedContent);
    
    var selector = "option[value=" + this.model.get("notebook_id") + "]";
    $(selector).attr("selected", "selected");
    
    this.attachSubviews();
    
    return this;
  },
  
  updateNote: function(event) {
    event.preventDefault();
    
    var params = $(event.currentTarget).serializeJSON();
    this.model.set(params);
    this.model.save({}, {
      success: function() {
        WhateverNote.notebooks.fetch();
      },
      error: function(model, response) {
        /////////////////////////
        alert("ERROR SAVING NOTE");
      }
    });
  }
});