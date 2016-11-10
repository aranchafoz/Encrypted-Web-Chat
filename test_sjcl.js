// Basic usage example of SJCL.
// Tested on firefox 20.0 and nodejs 0.8.
// Refer to: http://crypto.stanford.edu/sjcl/

var sjcl = require("sjcl");
var plaintext = "大丈夫だ、問題ない";
var encrypted = sjcl.encrypt("password", plaintext);
console.log(encrypted);
var decrypted = sjcl.decrypt("password", encrypted);
console.log(plaintext == decrypted);
