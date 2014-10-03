/*global WhateverNote */
WhateverNote.Models.Notebook = Backbone.Model.extend({
  urlRoot: "/api/notebooks",
  
  notes: function() {
    this._notes = this._notes ||
      new WhateverNote.Collections.Notes([], { notebook: this });
    return this._notes;
  },
  
  shortTitle: function() {
    var title = this.escape("title");
    if (title.length > 17) {
      return title.slice(0, 15) + "...";
    }
    return title;
  },
  
  parse: function(payload) {
    if (payload.notes) {
      this.notes().set(payload.notes, { parse: true });
      delete payload.notes;
    }
    return payload;
  }
});
