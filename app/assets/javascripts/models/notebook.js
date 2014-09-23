/*global WhateverNote */
WhateverNote.Models.Notebook = Backbone.Model.extend({
  urlRoot: "/api/notebooks",
  
  notes: function() {
    this._notes = this._notes ||
      new WhateverNote.Collections.Notes([], { notebook: this });
    return this._notes;
  },
  
  parse: function(payload) {
    if (payload.notes) {
      this.notes().set(payload.notes, { parse: true });
      delete payload.notes;
    }
    return payload;
  }
});
