/*global WhateverNote JST */
WhateverNote.Views.NotebooksIndex = Backbone.CompositeView.extend({
  tagName: "div",
  className: "notebooks-index-view",
  template: JST['notebooks/index'],
  
  events: {
    "click .new-notebook": "showNewForm",
    "click .notebook-title": "filterByNotebook",
    "click .show-notebook-options": "showNotebookOptions",
    "click .edit-notebook": "showEditForm",
    "click .delete-notebook": "deleteNotebook"
  },
  
  initialize: function() {
    this.listenTo(this.collection, "sync add remove", this.render);
    this.listenTo(WhateverNote.notes, "sync add remove", this.render);
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
    var notebookIndex = this;
    this.$(".notebook").droppable({
      accept: ".note-preview",
      activeClass: "drag-active",
      hoverClass: "drag-hover",
      tolerance: "pointer",
      drop: function( event, ui ) {
        var targetNotebookId = $(event.target).data("id");
        var draggedNoteId = ui.draggable.data("id");
        var note = WhateverNote.notes.get(draggedNoteId);
        note.set("notebook_id", targetNotebookId);
        note.save({}, {
          success: function() {
            notebookIndex.collection.fetch();
          },
          error: function(model, response) {
            //TODO ERROR HANDLING
            alert("ERROR REASSIGNING NOTE TO NOTEBOOK");
          }
        });
        $(ui.helper).remove();
      }
    });
  },
  
  showNotebookOptions: function(event) {
    event.stopPropagation();
    var $dropdown = $(event.currentTarget).parent().children(".notebook-menu");
    $dropdown.dropdown('toggle');
  },
  
  showNewForm: function() {
    event.stopPropagation();

    var modalView = new WhateverNote.Modals.NotebookNew();
    $("#modal-space").html(modalView.render().el);
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
    debugger;
    var id = $(event.currentTarget).parent(".notebook").data("id");
    var notebook = this.collection.getOrFetch(id);
    notebook.destroy();
  },
  
  filterByNotebook: function(event) {
    this.$(".notebook").removeClass("active");
    var $notebook = $(event.currentTarget).parent(".notebook");
    var id = $notebook.data("id");
    $notebook.addClass("active");
    WhateverNote.filteredNotes.setNotebookFilter(id);
  }
});
