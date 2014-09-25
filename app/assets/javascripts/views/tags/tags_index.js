/*global WhateverNote JST */
WhateverNote.Views.TagsIndex = Backbone.CompositeView.extend({
  tagName: "div",
  className: "tags-index-view",
  
  template: JST["tags/index"],
  
  events: {
    "click .new-tag": "showNewForm"
  },
  
  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
    
    var newView = new WhateverNote.Views.TagNew();
    this.addSubview(".new-tag-form", newView);
  },
  
  render: function() {
    var renderedContent = this.template({
      tags: this.collection
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
      activeClass: "drag-notebook-active",
      hoverClass: "drag-notebook-hover",
      drop: function(event, ui) {
        debugger;
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
  }
});