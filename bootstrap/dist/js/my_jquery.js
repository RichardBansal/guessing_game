$(document).ready(function(){
      //$(alert("hello world!"));
      $('.container').fadeIn("slow");

      var randomNumber = parseInt(Math.random()*100);
      //colder, freezing, icy
      //hotter, burning, scorching
      var hot_delta = 20;
      var cold_delta = 20;
      console.log('number is '+randomNumber);
      var guess = null;
      var guesses = 0;
      var guessRepeat = [];
      var hot_cold = "";
      var hot = [];
      var cold = [];

      var onScreenAlerts = function(message, background){
        if(message)
        {
          $('h4').text(message);
        }
        if(background){
          $('body').css('background-color',background);
        }
      }

      var guessFn = function(){
        guess = $('input').val();
        console.log(guess);
        // if((guess === null)||(guess === '')){
        //   alert('You did not input a value');
        // }
        if((+guess>100)||(+guess<1))
        {
          //alert('Guess is not in the valid range of 1-100');
          //$('h4').text("Guess is not in the valid range of 1-100! Try again!");
          onScreenAlerts("Guess is not in the valid range of 1-100! Try again!");
        }
        else{
          guesses++;
          
          if(+guess === randomNumber){
            //$('body').css('background-color','#88A7E0');
            //alert('You got the value after '+guesses+' guesses');
             onScreenAlerts('You got the value after '+ guesses +' guesses!!','#88A7E0');
          }
          else{
            if(Math.abs(randomNumber-(+guess))>cold_delta){
              hot_cold = "cold";
              cold.push(+guess);
            }
            if(Math.abs(randomNumber-(+guess))<hot_delta){
              hot_cold = "hot";
              hot.push(+guess);
            }
            if(guessRepeat.indexOf(+guess)>=0){
              //alert('C\'mon you already guessed '+guess+', try something different! You have '+(5-guesses)+' guesses left'+ ' You are '+hot_cold);
              onScreenAlerts('C\'mon you already guessed '+ guess +', try something different! You have '+(5-guesses)+' guesses left'+ ' You are '+hot_cold)
            }
            else{
              //alert('Guess again, you have '+(5-guesses)+' guesses left'+ ' You are '+hot_cold);
              onScreenAlerts('Guess again, you have '+(5-guesses)+' guesses left'+ '. You are '+hot_cold)
              guessRepeat.push(+guess);
            }
            console.log(hot,cold)
          }
        }
      }

      //button presses
      $('.submit').click(function(){
        //console.log(($('input').val()));
        guessFn();
      });

      //check if enter was pressed
      $(document).keypress(function(key){
        if(key.which == 13){guessFn();}
      });

      $('.new').click(function(){  
        randomNumber = parseInt(Math.random()*100);
        console.log('number is '+randomNumber);
        guess = null;
        guesses = 0;
        guessRepeat = [];
        hot = [];
        cold = [];
        onScreenAlerts(' ','#81A6A9');
        //$('body').css('background-color','#81A6A9');
      });

      $('.hint').click(function(){  
        //console.log(randomNumber);
        onScreenAlerts('Number is: ' + randomNumber);
      });
      //alert(randomNumber);
    });