Backbone.CompositeView = Backbone.View.extend({
  addSubview: function(selector, subview) {
    this.subviews(selector).push(subview);
    this.attachSubview(selector, subview.render());
  },
  
  attachSubview: function(selector, subview) {
    this.$(selector).append(subview.$el);
    subview.delegateEvents();
    
    if (subview.attachSubviews) {
      subview.attachSubviews();
    }
  },
  
  attachSubviews: function() {
    var view = this;
    _(this.subviews()).each(function(subviews, selector) {
      view.$(selector).empty();
      _(subviews).each(function(subview) {
        view.attachSubview(selector, subview);
      });
    });
  },
  
  rendered: function() {
    var view = this;
    // Ensure that onRender methods are called after
    // subviews have been rendered on page
    if (this.onRender) {
      this.onRender();
    }
    _(view.subviews()).each(function(subviews) {
      _(subviews).each(function (subview) {
        if (subview.rendered) {
          subview.rendered();
        }
      });
    });
  },
  
  remove: function() {
    Backbone.View.prototype.remove.call(this);
    _(this.subviews()).each(function(subviews) {
      _(subviews).each(function(subview) {
        subview.remove();
      });
    });
  },
  
  removeSubview: function(selector, subview) {
    subview.remove();
    
    var subviews = this.subviews(selector);
    subviews.splice(subviews.indexOf(subview), 1);
  },
  
  subviews: function(selector) {
    this._subviews = this._subviews || {};
    
    if (selector) {
      this._subviews[selector] = this._subviews[selector] || [];
      return this._subviews[selector];
    } else {
      // If no argument given to subviews(), return subviews hash
      return this._subviews;
    }
  }
});