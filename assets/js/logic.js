// declare variables

  var numberOptions = [120, 400, 75, 100];
  var imageOptions =["http://i66.tinypic.com/2qlwzmd.jpg", "http://i68.tinypic.com/2zfizpe.jpg", "http://i67.tinypic.com/2gulh5k.jpg", "http://i68.tinypic.com/20gfnkp.jpg"];
  var charNames = ["Gob","Lucille", "Buster", "Tobias"];
  var playerSelected=true;
  var enemySelected=true;
  var healthscore=0;
  var defenderHealthScore=0;
  
  var selectedDefender;
  var wins=0;
  var userAttackPower=2;
  var opponentAttackPower=6;
 
   $(document).ready(function() {
    
      function newGame(){
      
      // create a for loop to create characters for every numberOption.
        for (var i = 0; i < numberOptions.length; i++) {

        // For each iteration, create an img div
        var charPic = $("<img>");

        // First each crystal will be given the class "character".
        
        charPic.addClass("character");

        // Each image needs a source  coinciding with it's index
        charPic.attr("src", imageOptions[i]);


        // each image gets an id equal to it's name
        charPic.attr("id", charNames[i]);
        // each character gets a "name" data value
        charPic.attr({'data-name': charNames[i]});
       


        // Each charPic will be given a value.
        
        charPic.attr("value", numberOptions[i]);

        // assign images to characters
        $(".availableCharacters").append(charPic);

        };
      };
// begin new game by calling the function to set up variables
    newGame();
    


  $(".character").on("click", function() {
    if(playerSelected){
        var SelectedPlayer = $(this);
        // add class of userCharacter to Selected Player
        $(this).attr("class", "userCharacter");
        $(this).css("opacity", "1");
        
        // place selectedChar into different div
        $(".characterBox").append(SelectedPlayer);
        // get rid of characterchoice div
        $("#characterChoices").hide();

        // assign value from selected character to healthscore
        healthScore=$(this).attr("value");
        // place healthscore in correct div
        $(".healthscore").append(healthScore);
        // set playerSelected to false
        playerSelected=false;
        // alert user of their choice and guide them to next step
        alert("You've select " + $(this).data("name") + " as the new CEO of Bluth Company! Defend yourself against the money-grubbing scum that is your family. Please select an opponent to continue!");


        // iterate through remaining characters and change them to Opponents
        for(var i=0; i<charNames.length; i++){
          if(charNames[i] != $(this).data("name")){
            $("#"+charNames[i]).attr("class", "opponent");
            $('.enemyBox').append($('#'+charNames[i]));
            
          }
        }
    }
         $(".opponent").on("click", function() {
          // player has been selected
          if(playerSelected===false){
          // so we know we are selecting defender
          selectedDefender = $(this);
          // Set opacity to normal
          $(this).css("opacity", "1");
              // Add a class of defender
          $(this).attr("class", "defender");
          // place defender in the right div
          $('.defenderBox').append(selectedDefender);
          // make sure the defenderHealth div is set to 0 each time
          $(".defender-healthscore").empty();
          // set defender's healthscore equal to its value
          defenderHealthScore=$(this).attr("value");
          // place new healthscore in correct div
          $(".defender-healthscore").append(defenderHealthScore);
          enemySelected=false;


          
          alert("You've selected "+ $(this).data("name")+ " as the chief of the money-grubbing scumbags. Hit the 'go to hell' button to defend your place!" );
          }

        });

  });
});
            
        
    

    $("#fire").on("click", function() {
      // if opponent has been selected, if not, prompt user to do so.
    if(enemySelected){
      alert("please choose an opponent");
    }else{
    // if defender health is still about zero, update with hit
       if(defenderHealthScore>0){
        // user attack power increases over the match
        userAttackPower+=2;
        // calcute new health scores
        defenderHealthScore-= parseInt(userAttackPower);
        healthScore-= parseInt(opponentAttackPower);
        // if healthscore is above zero, keep playing
          if(healthScore>0){
              $(".healthscore").empty();
              $(".healthscore").append(healthScore);

              $(".defender-healthscore").empty();
              $(".defender-healthscore").append(defenderHealthScore);
            }else{
            // if not, game over. Ask if they'd like to play again
              $(".healthscore").empty();
              $(".healthscore").append(healthScore);
              alert("Taste my sad, Michael. You lost!");
              var playAgain=confirm("Play again?");
              // if they'd like to play, reload page
              if(playAgain){
                location.reload();
              };

          }
          // if defenderhealt is less than or equal to zero
      }else if(defenderHealthScore<=0){
        // reset healthscore and the divs
        defenderHealthScore=0;
        $(".defender-healthscore").empty();
        $(".defender-healthscore").append(defenderHealthScore);

        // alert user, ask them to choose another opponent
        alert("Nicely done, you blowhard. Select another defender to continue!");
        // increment wins by 1
        wins++;
        // if they beat all three, they win
        if(wins>2){
          alert("You win! Please refresh page to play again!");
        }else{
          // if they've only beat 1 or 2, update wins,

        $(".wins").empty();
        $(".wins").append(wins);
        // reset defender health
      
       $(".defender-healthscore").empty();
        defenderHealthScore=0;
        // update html
        $(".defenderBox").empty();
         $(".defender-healthscore").append(defenderHealthScore);

      

        };
      };
  }

    });


    

