/*global WhateverNote */
WhateverNote.Models.Note = Backbone.Model.extend({
  urlRoot: "/api/notes",
  
  tags: function() {
    if (!this._tags) {
      this._tags = new WhateverNote.Collections.Tags();
    }
    return this._tags;
  },
  
  preview: function() {
    //TODO: Trim down to three lines
    return jQuery(this.get("contents")).text();
  },
  
  parse: function(response) {
    if (response.tags) {
      this.tags().set(response.tags, { parse: true });
      delete response.tags;
    }
    return response;
  },
  
  assign: function(tagId, opts) {
    var options = {
      url: this.urlRoot + "/" + this.id + "/assign",
      type: "POST",
      attrs: {
        tag_id: tagId
      }
    };
    _.extend(options, opts);
    
    return Backbone.sync("create", this, options);
  },
  
  unassign: function(tagId, opts) {
    var options = {
      url: this.urlRoot + "/" + this.id + "/unassign",
      type: "POST",
      attrs: {
        tag_id: tagId
      }
    };
    _.extend(options, opts);
    
    return Backbone.sync("create", this, options);
  }
});
