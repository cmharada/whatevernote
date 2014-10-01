/*global WhateverNote */
WhateverNote.Collections.Tags = Backbone.Collection.extend({
  url: "api/tags",
  model: WhateverNote.Models.Tag,
  comparator: "id"
});