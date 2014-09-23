/*global WhateverNote */
WhateverNote.Collections.Notebooks = Backbone.Collection.extend({
  url: "/api/notebooks",
  model: WhateverNote.Models.Notebook,

  getOrFetch: function(id) {
    
  }
});
