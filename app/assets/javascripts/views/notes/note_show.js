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
    this.$(".cke").remove();
    this.$(".loading-editor").addClass("hidden");
    this.editor = CKEDITOR.replace("note[contents]");
    this.editor.on("instanceReady", function() {
      this.resize('100%', 600);
    });
  },
  
  remove: function() {
    this.editor.destroy(true);
    Backbone.CompositeView.prototype.remove.call(this);
  },
  
  updateNotebook: function(event) {
    var that = this;
    var newNotebookId = $(event.currentTarget).val();
    this.statusLoading();
    this.model.set({ notebook_id: newNotebookId });
    this.model.save({}, {
      success: function() {
        that.statusSuccess();
        WhateverNote.notebooks.fetch();
      },
      error: function(model, response) {
        that.statusError(response);
      }
    });
  },
  
  updateNote: function(event) {
    event.preventDefault();
    var that = this;

    for ( var instance in CKEDITOR.instances ) {
      CKEDITOR.instances[instance].updateElement();
    }
    
    var params = $(event.currentTarget).serializeJSON();
    this.statusLoading();
    this.model.set(params);
    this.model.save({}, {
      success: function() {
        that.statusSuccess();
      },
      error: function(model, response) {
        that.statusError(response.errors);
      }
    });
    if (params["note"]["title"] === "") {
      this.$("#note-title").val("Untitled");
    }
  },
  
  statusLoading: function() {
    this.$(".status").html("<span class='fa fa-spin fa-spinner'>");
    this.$(".status").removeClass("fadeOut");
  },
  
  statusSuccess: function() {
    this.$(".status").html("<img src='/images/logo-happy.png'>");
    this.$(".status").append("<span class='text-success'>Saved!</span>");
    this.$(".status").addClass("fadeOut");
  },
  
  statusError: function(errors) {
    this.$(".status").html("<span class='text-danger'>" + errors + 
      "</span>");
  }
});