/*global WhateverNote JST */
WhateverNote.Views.NotebooksIndex = Backbone.CompositeView.extend({
  tagName: "div",
  className: "notebooks-index-view",
  template: JST['notebooks/index'],
  
  events: {
    "click .new-notebook": "showNewForm",
    "click .notebook": "filterByNotebook",
    "click .edit-notebook": "showEditForm",
    "click .delete-notebook": "deleteNotebook"
  },
  
  initialize: function() {
    this.listenTo(this.collection, "sync add remove", this.render);
    this.listenTo(WhateverNote.notes, "sync add remove", this.render);
    
    var newView = new WhateverNote.Views.NotebookNew();
    this.addSubview(".new-notebook-form", newView);
  },

  render: function() {
    var renderedContent = this.template({
      notebooks: this.collection,
      allNotes: WhateverNote.notes
    });
    this.$el.html(renderedContent);
    
    this.attachSubviews();
    
    this.rendered();
    
    return this;
  },
  
  onRender: function() {
    var noteIndex = this;
    this.$(".notebook").droppable({
      accept: ".note-preview",
      activeClass: "drag-active",
      hoverClass: "drag-hover",
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
            alert("ERROR REASSIGNING NOTE TO NOTEBOOK");
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
  },
  
  deleteNotebook: function(event) {
    //TODO Ask For Confirmation
    var id = $(event.currentTarget).parent(".notebook").data("id");
    var notebook = this.collection.getOrFetch(id);
    notebook.destroy();
  },
  
  filterByNotebook: function(event) {
    this.$(".notebook").removeClass("filter-active");
    var id = $(event.currentTarget).data("id");
    $(event.currentTarget).addClass("filter-active");
    WhateverNote.filteredNotes.setNotebookFilter(id);
  }
});
