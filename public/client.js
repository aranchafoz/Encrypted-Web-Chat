var username = prompt("Please enter your name");
var key = prompt("Enter the encryption key");

var lastSender = "";

<<<<<<< Updated upstream
var sjcl = require("sjcl");
=======
let colors = ['blue', 'red', 'purple', 'grey'];
var users = [];

>>>>>>> Stashed changes

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
