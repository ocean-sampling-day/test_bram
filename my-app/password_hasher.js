//only exists to hash a str from utf-8 to b64

//get the given string variable
var str = process.argv[2];

//convert string to b64
var b64 = b64_to_utf8(str);

//return the b64 string
console.log(b64);