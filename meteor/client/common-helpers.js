
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

Template.registerHelper("obj2query",function(obj){
  var query = "";
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (query) {
        query += "&";
      }
      query += key + "=" + obj[key];
    }
  }
  if (query) {
    query = "?" + query;
  }
  return query;
});

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

