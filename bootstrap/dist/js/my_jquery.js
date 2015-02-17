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
      var current_guess =undefined;
      var prev_guess = undefined;

      var onScreenAlerts = function(message, background){
        if(message)
        {
          $('h4').text(message);
          $('h5').text('Hot Answers:'+hot+' | Cold Answers:'+cold);
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
        if((+guess>100)||(+guess<1)||(isNaN(+guess)))
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
             hot.push(+guess);
             onScreenAlerts('You got the value after '+ guesses +' guesses!!','#88A7E0');

          }
          else{
            if(guesses < 5){
              current_guess = Math.abs(randomNumber-(+guess))
              if(prev_guess === undefined){
                if(current_guess < hot_delta){
                  hot_cold = "hot";
                  hot.push(+guess);
                }
                else{
                  hot_cold = "cold"
                  cold.push(+guess);
                }
              }
              else{
                if(prev_guess < current_guess){
                  hot_cold = "colder"
                  cold.push(+guess);
                }
                else{
                  hot_cold = "hotter"
                  hot.push(+guess);
                }
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
            prev_guess = current_guess;
          }
          else {
            onScreenAlerts("You are only allowed 5 Guesses! You can start a new game!");
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
        randomNumber = parseInt(Math.random()*100)+1;
        console.log('number is '+randomNumber);
        guess = null;
        guesses = 0;
        guessRepeat = [];
        hot = [];
        cold = [];
        current_guess = undefined;
        prev_guess = undefined;
        onScreenAlerts(' ','#81A6A9');
        onScreenAlerts("New Game!");
        $('input').val("");
        $('input').attr('placeholder',"Guess a Number between 1-100");
        //$('body').css('background-color','#81A6A9');
      });

      $('.hint').click(function(){  
        //console.log(randomNumber);
        onScreenAlerts('Number is: ' + randomNumber);
      });
      //alert(randomNumber);
    });