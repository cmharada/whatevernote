/*global WhateverNote JST CKEDITOR*/
WhateverNote.Views.NoteShow = Backbone.CompositeView.extend({
  tagName: "div",
  className: "note-show-view",
  
  template: JST["notes/show"],
  
  events: {
    "submit form": "updateNote",
    "change select": "updateNotebook"
  },
  
  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    
    var tagsView = new WhateverNote.Views.TagsNote({
      collection: this.model.tags(),
      parentNote: this.model
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
    this.$(selector).attr("selected", "selected");
    
    this.attachSubviews();
    
    return this;
  },
  
  onRender: function() {
    if (CKEDITOR.instances["note[contents]"]) {
      // delete CKEDITOR.instances["note[contents]"];
      CKEDITOR.instances["note[contents]"].removeAllListeners();
      CKEDITOR.remove(CKEDITOR.instances["note[contents]"]);
    }
    // this.$(".cke").remove();
    CKEDITOR.replace("note[contents]");
  },
  
  updateNotebook: function(event) {
    var newNotebookId = $(event.currentTarget).val();
    this.model.set({ notebook_id: newNotebookId });
    this.model.save({}, {
      success: function() {
        WhateverNote.notebooks.fetch();
      },
      error: function(model, response) {
        //TODO: Error handling
      }
    });
  },
  
  updateNote: function(event) {
    event.preventDefault();

    for ( var instance in CKEDITOR.instances ) {
      CKEDITOR.instances[instance].updateElement();
    }
    
    var params = $(event.currentTarget).serializeJSON();
    this.model.set(params);
    this.model.save({}, {
      error: function(model, response) {
        //TODO Error Handling
        alert("ERROR SAVING NOTE");
      }
    });
  }
});