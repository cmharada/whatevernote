window.setCredentials = function() {
  $("#user_name").val("Demo");
  $("#user_password").val("password");
};

window.setupGuestLogin = function($el) {
  $el.on("click", window.setCredentials);
};
