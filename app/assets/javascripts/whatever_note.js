/*global WhateverNote */
window.WhateverNote = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    WhateverNote.notebooks = new WhateverNote.Collections.Notebooks();
    WhateverNote.notes = new WhateverNote.Collections.Notes();
    WhateverNote.tags = new WhateverNote.Collections.Tags();
    WhateverNote.filteredNotes = new WhateverNote.Collections.FilteredNotes([], {
      allNotes: WhateverNote.notes
    });
    var router = new WhateverNote.Routers.AppRouter({
      $rootEl: $("#main")
    });
    Backbone.history.start();
  }
};
