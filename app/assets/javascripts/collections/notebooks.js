/*global WhateverNote */
WhateverNote.Collections.Notebooks = Backbone.Collection.extend({
  url: "/api/notebooks",
  model: WhateverNote.Models.Notebook,

  getOrFetch: function(id) {
    var notebookCollection = this;
    
    var notebook = this.get(id);
    if (notebook) {
      notebook.fetch();
    } else {
      notebook = new WhateverNote.Models.Notebook({ id: id });
      notebook.fetch({
        success: function() {
          notebookCollection.add(notebook);
        }
      });
    }
    return notebook;
  }
});
