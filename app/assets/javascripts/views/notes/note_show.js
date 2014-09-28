/*global WhateverNote JST CKEDITOR*/
WhateverNote.Views.NoteShow = Backbone.CompositeView.extend({
  tagName: "div",
  className: "note-show-view",
  
  template: JST["notes/show"],
  
  events: {
    "submit form": "updateNote"
  },
  
  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    
    var tagsView = new WhateverNote.Views.TagsNote({
      collection: this.model.tags()
    });
    this.addSubview(".tags", tagsView);
  },
  
  render: function() {
    var renderedContent = this.template({
      note: this.model,
      notebooks: WhateverNote.notebooks
    });
    this.$el.html(renderedContent);
    
    var selector = "option[value=" + this.model.get("notebook_id") + "]";
    $(selector).attr("selected", "selected");
    
    this.attachSubviews();
    
    return this;
  },
  
  onRender: function() {
    var instance = CKEDITOR.instances["editable"];
    if (instance && instance !== this.editor) {
      CKEDITOR.remove(instance);
    }
    if (this.editor) {
      this.$("#cke_editable").remove();
      CKEDITOR.remove(this.editor);
    }
    $("#editable").ckeditor({
      customConfig: '',
      removePlugins: 'elementspath,resize',
      toolbarCanCollapse: 'true',
      toolbar: [
          { name: 'textstyle', items: ['Font', 'FontSize' ]},
          { name: 'basicstyles', items: [ 'TextColor', 'Bold', 'Italic', 'Underline', 'Strike', 'Superscript', 'Subscript', 'RemoveFormat' ] },
          { name: 'align', items: [ 'Indent', 'Outdent', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
          { name: 'lists', items: [ 'NumberedList', 'BulletedList' ]},
          { name: 'media', items: [ 'Checkbox', 'Image', 'Table', 'HorizontalRule'] },
          { name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', '-', 'Undo', 'Redo' ] }
      ]
    });
    this.editor = CKEDITOR.instances["editable"];
  },
  
  updateNote: function(event) {
    event.preventDefault();

    var instance;
    for ( instance in CKEDITOR.instances ) {
      CKEDITOR.instances[instance].updateElement();
    }
    
    var params = $(event.currentTarget).serializeJSON();
    this.model.set(params);
    this.model.save({}, {
      success: function() {
        WhateverNote.notebooks.fetch();
      },
      error: function(model, response) {
        /////////////////////////
        alert("ERROR SAVING NOTE");
      }
    });
  }
});