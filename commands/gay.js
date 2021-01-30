//because we all love each other, don't be mad, just accept everyone


exports.run = (_callback) => {


    let gay = Math.floor(Math.random() * 101);
    if (gay <= 25) {
        _callback(gay+"% 😢")
    }
    if (gay > 25 && gay < 50) {
        _callback(gay+"% chachi loves you 😏")
    } 
    if (gay >= 50 && gay != 100) {
        _callback(gay+"% chachi is in love 🥵")
    }
    if (gay === 100) {
        _callback(gay + "% You will be the kind of Chachi's land !")
    }

}
