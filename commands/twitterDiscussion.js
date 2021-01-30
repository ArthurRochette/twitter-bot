const cleverbot = require("cleverbot-free");


exports.run = (text, _callback) => {
    cleverbot(text).then((result) => {
        _callback(result)
    }).catch((err) => {
        console.log(err)
    });
}