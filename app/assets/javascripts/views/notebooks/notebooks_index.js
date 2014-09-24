/*global WhateverNote JST */
WhateverNote.Views.NotebooksIndex = Backbone.CompositeView.extend({
  tagName: "div",
  className: "notebooks-index-view",
  template: JST['notebooks/index'],
  
  events: {
    "click .new-notebook": "showNewForm",
    "click .notebook": "showNotebookIndex",
    "click .edit-notebook": "showEditForm"
  },
  
  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
    
    var newView = new WhateverNote.Views.NotebookNew();
    this.addSubview(".new-notebook-form", newView);
  },

  render: function() {
    var renderedContent = this.template({ notebooks: this.collection });
    this.$el.html(renderedContent);
    
    this.attachSubviews();
    
    this.rendered();
    
    return this;
  },
  
  onRender: function() {
    var noteIndex = this;
    this.$(".notebook").droppable({
      accept: ".note-preview",
      activeClass: "drag-notebook-active",
      hoverClass: "drag-notebook-hover",
      drop: function( event, ui ) {
        var targetNotebookId = $(event.target).data("id");
        var draggedNoteId = ui.draggable.data("id");
        var note = WhateverNote.notes.get(draggedNoteId);
        note.set("notebook_id", targetNotebookId);
        note.save({}, {
          success: function() {
            noteIndex.collection.fetch();
            noteIndex.render();
          },
          error: function(model, response) {
            //////////////////
          }
        });
      }
    });
  },
  
  showNewForm: function() {
    this.$(".new-notebook-form").removeClass("hidden");
  },
  
  showEditForm: function(event) {
    var id = $(event.currentTarget).parent(".notebook").data("id");
    if (this.editView) {
      this.removeSubview(".edit-notebook-form", this.editView);
    }
    var notebook = this.collection.getOrFetch(id);
    this.editView = new WhateverNote.Views.NotebookEdit({
      model: notebook
    });
    this.addSubview(".edit-notebook-form", this.editView);
  }
});
