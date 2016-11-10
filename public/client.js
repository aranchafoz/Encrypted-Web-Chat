var username = prompt("Please enter your name");
var key = prompt("Enter the encryption key");

var encypt = true;

var lastSender = "";
var sjcl = require("sjcl");

let colors = ['blue', 'red', 'purple', 'grey'];
var users = [];

function parsePackage(pkg) {
    var spl = pkg.split('%%%%');
    return { user: spl[0], message: spl[1] };
}

var socket = io();

$('form').submit(function(){
  encrypt = $('#checked').is(":checked")
  var message;
  if (encrypt) {
    message = sjcl.encrypt(key, '-' + username + '%%%%' + $('#m').val());
  } else {
    message = '-' + username + '%%%%' + $('#m').val();
  }
  socket.emit('chat message', message);
  $('#m').val('');
  return false;
});

socket.on('chat message', function(pkg) {
  if (pkg[0] != '-') {
    pkg = sjcl.decrypt(key, pkg);
  }
  pkg = pkg.slice(1, pkg.length);
  pkg = parsePackage(pkg);


  var messageTitle = "";

  if (lastSender != pkg["user"]) {
    messageTitle = '<p class="username">' + pkg["user"] + '</p>';
    lastSender = pkg["user"];
  }
  var arguments = "";

  if (pkg["user"] == username) {
     let id = "green"
     arguments += 'id="' + id + '" class="right"';
  } else {
    var userNo = users.indexOf(pkg["user"]);
    if (userNo == -1) {
      users.push(pkg["user"]);
      userNo = users.indexOf(pkg["user"]);
    }
    let id = colors[userNo % colors.length]
    arguments += 'id="' + id + '"';
  }

  let messageContent = '<p class="message-content">' + pkg["message"] + '</p>';
  window.scrollTo(-40, document.body.scrollHeight);


  $('#messages').append(
    $('<li ' + arguments + '>').append(messageTitle).append(messageContent));
});
