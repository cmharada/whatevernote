/*global WhateverNote */
WhateverNote.Routers.AppRouter = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },
  
  routes: {
    "": "main"
  },
  
  main: function() {
    var view = new WhateverNote.Views.Main();
    this._swapView(view);
  },
  
  _swapView: function(view) {
    if (this.currentView) {
      this.currentView.remove();
    }
    this.currentView = view;
    
    this.$rootEl.html(view.render().$el);
  }
});
