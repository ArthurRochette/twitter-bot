
exports.run = (_callback) => {

    let face = Math.floor(Math.random() * 2)+1;
    if(face == 1){
        _callback("It's tail")
    }else {
        _callback("It's head")
    }
    

}
