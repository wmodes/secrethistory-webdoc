

// Secret History of American River People

Template.exhibitstart.rendered = function() {

  // set window title
  document.title = "Secret History of American River People";

  // Try to set scrollbar
  $("html").addClass("fancyscroll");

  // Hide nav elements until revelaed
  $('#menuburger').css({opacity: 0});
  $('#mapburger').css({opacity: 0});
  $('#ambientaudio').css({opacity: 0});

  // Fade in and scroll page
  var fadeDuration = 1000;
  var scrollDuration = 3000;
  var scrollDest = 1075;
  var textDest = scrollDest + ($(window).height() * 0.45)
                  - ($('#house-canvas .landing-text').height() * 0.5);

  $(document).ready(function (){
      $('#house-canvas .landing-wrapper').css({opacity: 0});
      $('#house-canvas .landing-text').css({marginTop: "3000px"});
      $('#house-canvas .landing-wrapper')
          .animate({opacity: 1}, fadeDuration, "easeInCubic", function() {
              $('html, body')
                  .animate({scrollTop: scrollDest}, scrollDuration, "easeOutCubic");
              $('#house-canvas .landing-text')
                  .animate({marginTop: textDest}, scrollDuration, "easeOutCubic");
      });
  });

  // TODO: Move this to a sharedelements helper
  // Reveal nav elements and give hints
  $('#hint').on("click", function() {
    $('#menuburger').animate({opacity: 1}, 1000, function() {
      $('#menuburger-hint').animate({opacity: 1}, 1000, function() {
        $('#mapburger').animate({opacity: 1}, 1000, function() {
          $('#mapburger-hint').animate({opacity: 1}, 1000, function() {
            $('#ambientaudio').animate({opacity: 1}, 1000, function() {
              $('#ambientaudio-hint').animate({opacity: 1}, 1000, function() {
                // fade 
                $("#ambient-toggle").removeClass("highlighted");
                $(".burger").removeClass("highlighted");
              })
            })
          })
        })
      })
    })
  });


}
