$(document).ready(function () {


  $("#start").on("click", function () {

     startGame();

  });

});


function startGame() {

  moves = 0;

  window.moves = 0;

  var classNameArray = ["sq1", "sq2", "sq3", "sq4", "sq5", "sq6", "sq7", "sq8", "sq9", "sq10", "sq11", "sq12", "sq13", "sq14", "sq15", "sq16"];
  
  var arrayToCompare = [];
  
  // Images in a array

  var arr = new Array(14, 2, 10, 6, 12, 13, 9, 7, 15, 8, 5, 11, 4, 1, 3, 16);

  arr = Shuffle(arr);

  for (i = 0; i < arr.length; i++) {

      $("#image").append('<div id="pos' + (i + 1) + '" class="sq' + arr[i] + '"></div>');

  }

  var bg = $(".puzzleSection #image").css('background-image').replace(/^url|[\(\)]/g, '');

  $(".puzzleSection #image div").css('background-image', 'url(' + bg + ')');

  $(".puzzleSection #image").css('background-image', 'none');

  $("#counter span").html("0");

  countdown();

  //movePiece();

  $("#image").sortable({
      delay: 200,
      stop: function (event, ui) {
          window.moves++;
          $("#counter span").html(window.moves);
          arrayToCompare = [];
          jQuery("#image div").each(function () {
              arrayToCompare.push(jQuery(this).attr("class"));
          });
          var is_same = (classNameArray.length == arrayToCompare.length) && classNameArray.every(function(element, index) {
                      return element === arrayToCompare[index]; 
          });
          console.log(is_same);
          if(is_same == true){
               gameOver();       
          }
      }
  });

}

//Shuffle Image

function Shuffle(o) {

  for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);

  return o;

};

// Work out if game is over

function gameOver() {

              var counterVal, timeVal, winTime;

              counterVal = $("#counter span").text();

              timeVal = document.getElementById('countdown').innerHTML;

              winTime = balanceTime(timeVal);

              $(".successMsg").text("You completed the game with " + counterVal + " moves and in " + winTime)

              $(".tryAgain a").click(function () {

                  location.reload();

              });

}


//Timer

var seconds;

var temp;



function countdown() {

  time = document.getElementById('countdown').innerHTML;

  timeArray = time.split(':')

  seconds = timeToSeconds(timeArray);

  if (seconds == '') {

      temp = document.getElementById('countdown');

      temp.innerHTML = "00:00";

      $(".lbWrapper,.lbWrapper .failWrapper").show();

      $(".tryAgain a").click(function () {

          location.reload();

      });

      return;
  }

  seconds--;

  temp = document.getElementById('countdown');

  temp.innerHTML = secondsToTime(seconds);

  if ($(".lbWrapper .successWrapper").is(":visible")) {
      return;
  } else {
      timeoutMyOswego = setTimeout(countdown, 1000);
  }


}



function timeToSeconds(timeArray) {

  var minutes = timeArray[0] * 1;

  var seconds = (minutes * 60) + (timeArray[1] * 1);

  return seconds;

}



function secondsToTime(secs) {

  var divisor_for_minutes = secs % (60 * 60);

  var minutes = Math.floor(divisor_for_minutes / 60);

  minutes = minutes < 10 ? '0' + minutes : minutes;

  var divisor_for_seconds = divisor_for_minutes % 60;

  var seconds = Math.ceil(divisor_for_seconds);

  seconds = seconds < 10 ? '0' + seconds : seconds;

  return minutes + ':' + seconds;

}



//Imgae Select

function imageSelect() {

  $(".imgSelectionWrapper div").live('click', function () {

      var bg = $(this).css('background-image').replace(/^url|[\(\)]/g, '');

      $(".puzzleSection #image").css('background-image', 'url(' + bg + ')');

      $(".previewSection #image").css('background-image', 'url(' + bg + ')');

  });



}

//Balance Time

function balanceTime(time) {
  var seconds1, seconds2, winSeconds, winTime;
  var time1 = time;
  timeArray1 = time1.split(':');
  timeArray2 = [05, 00];
  seconds1 = timeToSeconds(timeArray1);
  seconds2 = timeToSeconds(timeArray2);
  winSeconds = seconds2 - seconds1;
  winTime = secondsToTime(winSeconds);
  return winTime;

  function timeToSeconds(timeArray) {

      var minutes = timeArray[0] * 1;

      var seconds = (minutes * 60) + (timeArray[1] * 1);

      return seconds;

  }

  function secondsToTime(secs) {

      var divisor_for_minutes = secs % (60 * 60);

      var minutes = Math.floor(divisor_for_minutes / 60);

      minutes = minutes < 10 ? '0' + minutes : minutes;

      var divisor_for_seconds = divisor_for_minutes % 60;

      var seconds = Math.ceil(divisor_for_seconds);

      seconds = seconds < 10 ? '0' + seconds : seconds;

      return minutes + ':' + seconds;

  }

}
