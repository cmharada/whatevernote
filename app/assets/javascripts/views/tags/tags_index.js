/*global WhateverNote JST */
WhateverNote.Views.TagsIndex = Backbone.CompositeView.extend({
  tagName: "div",
  className: "tags-index-view",
  
  template: JST["tags/index"],
  
  events: {
    "click .new-tag": "showNewForm",
    "click .tag": "toggleFilterTag"
  },
  
  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
    
    var newView = new WhateverNote.Views.TagNew();
    this.addSubview(".new-tag-form", newView);
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
            //////////////////////
            alert("ERROR ASSIGNING TAG TO NOTE");
          }
        });
      }
    });
  },
  
  showNewForm: function() {
    this.$(".new-tag-form").removeClass("hidden");
  },
  
  toggleFilterTag: function(event) {
    var tagId = $(event.currentTarget).data("id");
    WhateverNote.filteredNotes.toggleFilteredTag(tagId);
    if (WhateverNote.filteredNotes.isFilteredTag(tagId)) {
      $(event.currentTarget).addClass("filter-active");
    } else {
      $(event.currentTarget).removeClass("filter-active");
    }
  }
});