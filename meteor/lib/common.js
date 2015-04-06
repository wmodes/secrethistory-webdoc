
imageDir = "images/";
videoDir = "video/";
audioDir = "audio/";
tmpDir = "tmp/";
uploadDir = ".upload/";


function zeroPad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

/*
Object.prototype.isin = function() {
    for(var i = arguments.length; i--;) {
        var a = arguments[i];
        if(a.constructor === Array) {
            for(var j = a.length; j--;)
                if(a[j] == this) return true;
        }
        else if(a == this) return true;
    }
    return false;
}
*/

