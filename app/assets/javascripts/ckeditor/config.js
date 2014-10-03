CKEDITOR.config.removePlugins = 'elementspath,resize';
CKEDITOR.config.toolbarCanCollapse = 'true';
CKEDITOR.config.language = 'en';
CKEDITOR.config.width = "100%";
CKEDITOR.config.height = "0";
CKEDITOR.config.toolbar = [
    { name: 'textstyle', items: ['Font', 'FontSize' ]},
    { name: 'basicstyles', items: [ 'TextColor', 'Bold', 'Italic', 'Underline', 'Strike', 'Superscript', 'Subscript', 'RemoveFormat' ] },
    { name: 'align', items: [ 'Indent', 'Outdent', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
    { name: 'lists', items: [ 'NumberedList', 'BulletedList' ]},
    { name: 'media', items: [ 'Checkbox', 'Image', 'Table', 'HorizontalRule'] },
    { name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', '-', 'Undo', 'Redo' ] }
];
