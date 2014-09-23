/*global WhateverNote */
window.WhateverNote = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    WhateverNote.notebooks = new WhateverNote.Collections.Notebooks();
    WhateverNote.notes = new WhateverNote.Collections.Notes();
    var router = new WhateverNote.Routers.AppRouter({
      $rootEl: $("#main")
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  WhateverNote.initialize();
});
