CKEDITOR.editorConfig = function (config) {
  config.removePlugins = 'elementspath,resize';
  config.toolbarCanCollapse = 'true';
  config.toolbar = [
      { name: 'textstyle', items: ['Font', 'FontSize' ]},
      { name: 'basicstyles', items: [ 'TextColor', 'Bold', 'Italic', 'Underline', 'Strike', 'Superscript', 'Subscript', 'RemoveFormat' ] },
      { name: 'align', items: [ 'Indent', 'Outdent', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
      { name: 'lists', items: [ 'NumberedList', 'BulletedList' ]},
      { name: 'media', items: [ 'Checkbox', 'Image', 'Table', 'HorizontalRule'] },
      { name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', '-', 'Undo', 'Redo' ] },
      { name: 'youtube', items: [ 'youtube' ] }
  ];
};