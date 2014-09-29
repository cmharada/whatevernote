/*global WhateverNote */
WhateverNote.Collections.FilteredNotes = Backbone.Collection.extend({
  model: WhateverNote.Models.Note,
  
  comparator: "id",
  
  initialize: function(models, options) {
    this.allNotes = options.allNotes;
    this.listenTo(this.allNotes, "sync reset add change destroy", this.refilter);
    this.tagFilters = [];
    this.notebookFilter = null;
    this.textFilter = "";
  },
  
  setNotebookFilter: function(notebookId) {
    if (this.notebookFilter !== notebookId) {
      this.notebookFilter = notebookId;
      this.refilter();
    }
  },
  
  toggleFilteredTag: function(tagId) {
    var idx = this.tagFilters.indexOf(tagId);
    if (idx === -1) {
      this.tagFilters.push(tagId);
    } else {
      this.tagFilters.splice(idx, 1);
    }
    this.refilter();
  },
  
  isFilteredTag: function(tagId) {
    if (this.tagFilters.indexOf(tagId) !== -1) {
      return true;
    } else {
      return false;
    }
  },
  
  setTextFilter: function(filterString) {
    this.textFilter = filterString;
    this.refilter();
  },
  
  getFilteredTags: function() {
    return this.tagFilters;
  },
  
  refilter: function() {
    var that = this;
    var results = this.allNotes.filter(function(note) {
      if (that.notebookFilter && 
        note.get("notebook_id") !== that.notebookFilter) {
        return false;
      }
      if (that.tagFilters.length !== 0) {
        var noteTagIds = note.tags().pluck("id");
        var hasAllTags = _.every(that.tagFilters, function(tagId) {
          return _.contains(noteTagIds, tagId);
        });
        if (!hasAllTags) {
          return false;
        }
      }
      if (that.textFilter !== "") {
        if (note.get("contents").indexOf(that.textFilter) < 0) {
          return false;
        }
      }
      return true;
    });
    this.reset(results);
  },
  
  getOrFetch: function(id) {
    return this.allNotes.getOrFetch(id);
  }
});