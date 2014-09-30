/*global WhateverNote JST */
WhateverNote.Views.TagsIndex = Backbone.CompositeView.extend({
  tagName: "div",
  className: "tags-index-view",
  
  template: JST["tags/index"],
  
  events: {
    "click .new-tag": "showNewForm",
    "click .tag": "toggleFilterTag",
    "click .show-options": "showTagOptions",
    "click .edit-tag": "showEditForm",
    "click .delete-tag": "deleteTag"
  },
  
  initialize: function() {
    this.listenTo(this.collection, "sync add remove", this.render);
  },
  
  render: function() {
    var renderedContent = this.template({
      tags: this.collection,
      filtered: WhateverNote.filteredNotes.getFilteredTags()
    });
    this.$el.html(renderedContent);
    
    this.attachSubviews();
    this.rendered();
    
    return this;
  },
  
  onRender: function() {
    var tagIndex = this;
    this.$(".tag").droppable({
      accept: ".note-preview",
      activeClass: "drag-active",
      hoverClass: "drag-hover",
      tolerance: "pointer",
      drop: function(event, ui) {
        var targetTagId = $(event.target).data("id");
        var draggedNoteId = ui.draggable.data("id");
        var assignment = new WhateverNote.Models.TagAssignment();
        assignment.set({
          tag_id: targetTagId,
          note_id: draggedNoteId
        });
        assignment.save({}, {
          success: function() {
            tagIndex.collection.fetch();
            tagIndex.render();
            WhateverNote.notes.fetch();
          },
          error: function(model, response) {
            //TODO: Actual error handling
            alert("ERROR ASSIGNING TAG TO NOTE");
          }
        });
      }
    });
  },
  
  showNewForm: function(event) {
    event.stopPropagation();
        
    var modalView = new WhateverNote.Modals.TagNew();
    $("#modal-space").html(modalView.render().el);
  },
  
  showEditForm: function(event) {
    var id = $(event.currentTarget).parents(".tag").data("id");
    var tag = this.collection.get(id);
    var modalView = new WhateverNote.Modals.TagEdit( {
      model: tag
    });
    $("#modal-space").html(modalView.render().el);
  },
  
  deleteTag: function(event) {
    //TODO Ask For Confirmation
    var id = $(event.currentTarget).parents(".tag").data("id");
    var tag = this.collection.get(id);
    tag.destroy();
  },
  
  toggleFilterTag: function(event) {
    var tagId = $(event.currentTarget).data("id");
    WhateverNote.filteredNotes.toggleFilteredTag(tagId);
    if (WhateverNote.filteredNotes.isFilteredTag(tagId)) {
      $(event.currentTarget).addClass("active");
    } else {
      $(event.currentTarget).removeClass("active");
    }
  },
  
  showTagOptions: function(event) {
    event.stopPropagation();
    var $dropdown = $(event.currentTarget).children(".options-menu");
    $dropdown.toggleClass('hidden');
  }
});