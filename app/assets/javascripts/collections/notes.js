/*global WhateverNote */
WhateverNote.Collections.Notes = Backbone.Collection.extend({
  url: "/api/notes",
  model: WhateverNote.Models.Note,

  getOrFetch: function(id) {
    var noteCollection = this;
    
    var note = this.get(id);
    if (note) {
      note.fetch();
    } else {
      note = new WhateverNote.Models.Note({ id: id });
      note.fetch({
        success: function() {
          noteCollection.add(note);
        }
      });
    }
    return note;
  }
});
