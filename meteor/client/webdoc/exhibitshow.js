

Template.exhibitshow.rendered = function() {

  console.log("setting idle timer in exhibit mode");

  idleTimer = null;
  idleState = false;
  idleWait = 2 * 60 * 1000;
  startURL = "/starthere"

  $('*').bind('mousemove keydown scroll', function () {
  
    clearTimeout(idleTimer);
        
    if (idleState == true) { 
      // Reactivated event
      console.log("Reset timer: not idle");
    }
    idleState = false;
    
    idleTimer = setTimeout(function () { 
      
      // Idle Event
      window.location = startURL;

      idleState = true; }, idleWait);
  });
  
  $("body").trigger("mousemove");


}
