var username = prompt("Please enter your name");
var key = prompt("Enter the encryption key");

var lastSender = "";

var sjcl = require("sjcl");

function parsePackage(pkg) {
    var spl = pkg.split('%%%%');
    return { user: spl[0], message: spl[1] };
}

function encrypt(message) {
  return sjcl.encrypt(key, message);
}

function decrypt(message) {
  return sjcl.decrypt(key, message);
}

var socket = io();

$('form').submit(function(){
  socket.emit('chat message', encrypt(username + '%%%%' + $('#m').val()));
  $('#m').val('');
  return false;
});

socket.on('chat message', function(pkg){
  pkg = parsePackage(decrypt(pkg));

  var messageTitle = "";

  if (lastSender != pkg["user"]) {
    messageTitle = '<p class="username">' + pkg["user"] + '</p>';
    lastSender = pkg["user"];
  }
  let messageContent = '<p class="message_content">' + pkg["message"] + '</p>';

  $('#messages').append(
    $('<li id="' + pkg["user"] + '">').append(messageTitle).append(messageContent));
});
