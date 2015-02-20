$(document).ready(function(){

      var randomNumber, hot_cold_delta, guess, guess_count, guessRepeat, hot_cold, hotArr, coldArr, current_guess, prev_guess,
      higher_lower, youwon, gameover;

      var initialize = function(){   
        $('.container').fadeOut("fast");   
        $('.container').fadeIn("slow");
        $('input').focus();
        randomNumber = parseInt(Math.random()*100);
        hot_cold_delta = 20;
        console.log('number is '+randomNumber);
        guess = null;
        guess_count = 0;
        guessRepeat = [];
        hot_cold = "";
        hotArr = [];
        coldArr = [];
        current_guess =undefined;
        prev_guess = undefined;
        higher_lower = "";
        youwon = false;
        gameover = false;
        $('input').val("");
        $('input').attr('placeholder',"Guess a Number between 1-100");
        onScreenAlerts(' ','#81A6A9');
      }

      var onScreenAlerts = function(message, background){
        if(message)
        {
          $('h4').text(message);
          $('h5').text('Hot Answers:'+hotArr+' | Cold Answers:'+coldArr);
        }
        if(background){
          $('body').css('background-color',background);
        }
      }

      var guessFn = function(){
        guess = $('input').val();
        console.log(guess);

        if((+guess>100)||(+guess<1)||(isNaN(+guess)))
        {
          onScreenAlerts("Guess is not in the valid range of 1-100! Try again!");
        }
        else{
          guess_count++;
          
          if(+guess === randomNumber){
             youwon = true;
             onScreenAlerts('You got the value after '+ guess_count +' guess_count!!','#88A7E0');

          }
          else{
            if((guessRepeat.indexOf(+guess)>=0)&&(guess_count < 5)){
              onScreenAlerts('C\'mon you already guessed '+ guess +', try something different!  Guess '+higher_lower+', You have '+(5-guess_count)+' guesses count left'+ ' You are '+hot_cold);
            }
            else if(guess_count < 5){
              current_guess = Math.abs(randomNumber-(+guess))
              if(+guess<randomNumber){higher_lower='higher'}
              else{higher_lower='lower'}
              if(prev_guess === undefined){
                if(current_guess < hot_cold_delta){
                  hot_cold = "hot";
                  hotArr.push(+guess);
                }
                else{
                  hot_cold = "cold"
                  coldArr.push(+guess);
                }
              }
              else{
                if(prev_guess < current_guess){
                  hot_cold = "colder"
                  coldArr.push(+guess);
                }
                else{
                  hot_cold = "hotter"
                  hotArr.push(+guess);
                }
              }
            //else{
              onScreenAlerts('Guess '+higher_lower+', you have '+(5-guess_count)+' guesses count left'+ '. You are '+hot_cold)
              guessRepeat.push(+guess);
            //}
            prev_guess = current_guess;
            }
          else {
            onScreenAlerts("You are only allowed 5 guesses! The number was "+randomNumber+". You can start a new game!");
            gameover = true;
          }
          console.log(hotArr,coldArr);
          }
        }
      }

      $('.submit').click(function(){
        guessFn();
      });

      $('.new').click(function(){   
        initialize();
        onScreenAlerts("New Game!");
      });

      $('.hint').click(function(){  
        if(!youwon&&!gameover){onScreenAlerts('Number is: ' + randomNumber + '. GameOver. You can start a new game!');}
      });

      $(document).keypress(function(key){
        if(key.which == 13){guessFn();}
      });

      initialize();
});