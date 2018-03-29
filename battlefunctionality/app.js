$(function(){
//battle function javascript


//Variables which need to be stored/called
//players
  // player name
  const player1 = 'Matt';

  const player2 = 'Dave';

  let result;



//Codemon
  //codemon name
  //codemon attack stat
  //codemon defence stat
  class Codemon {
    constructor(name, attack, defence, hp, move1, move2, move3, move4) {
      this.name = name;
      this.attack = attack;
      this.defence = defence;
      this.hp = hp;
      this.move1 = move1;
      this.move2 = move2;
      this.move3 = move3;
      this.move4 = move4;
    }
  }

  const yavaScript = new Codemon('YavaScript', 3, 2, 100, 'move1', 'move2', 'move3', 'move4');
  const htmMel = new Codemon('HTM-Mel', 1, 4, 100);


//moves
  //move name
  //effect on codemon stats
  //base power
  class Move {
    constructor(name, attackEffect, defenceEffect, basePower, description) {
      this.name = name;
      this.attackEffect = attackEffect;
      this.defenceEffect = defenceEffect;
      this.basePower = basePower;
      this.description = description;
    }
  }

  const move1 = new Move('Code Smash',0,0,20);
  const move2 = new Move('Delete the semicolon',0,10,0,'Decrases the defence of your opponant');
  const move3 = new Move('Install jQuery',10,0,0,'Increases your attack');
  const move4 = new Move('All the breakets {}()<>',5,5,10);

//This game

  $('#p1HP').text(yavaScript.hp); //replace with chosen pokemon later
  $('#p2HP').text(htmMel.hp);


//selectors
  //all the move buttons (with event listeners)
  const $attButtP1A1 = $('.player1Options button[name="attack1"]');
  const $attButtP1A2 = $('.player1Options button[name="attack2"]');
  const $attButtP1A3 = $('.player1Options button[name="attack3"]');
  const $attButtP1A4 = $('.player1Options button[name="attack4"]');
  const $attButtP2A1 = $('.player2Options button[name="attack1"]');
  const $attButtP2A2 = $('.player2Options button[name="attack2"]');
  const $attButtP2A3 = $('.player2Options button[name="attack3"]');
  const $attButtP2A4 = $('.player2Options button[name="attack4"]');

  //the playerDivs
  const $player1display = $('#player1Screen');
  const $player2display = $('#player2Screen');


  $attButtP1A1.text(move1.name);
  $attButtP1A2.text(move2.name);
  $attButtP1A3.text(move3.name);
  $attButtP1A4.text(move4.name);

  $attButtP2A1.text(move1.name);
  $attButtP2A2.text(move2.name);
  $attButtP2A3.text(move3.name);
  $attButtP2A4.text(move4.name);

//change turns

  const currentPlayer = 1;

  const changeTurns = function() {
    // playerturn = playerturn === 1 ? 2 : 1;
    if (playerturn === 0) {
      console.log('GAME OVER');
    } else if (playerturn === 1) {
      playerturn = 2;
    } else {
      playerturn = 1;
    }
    $player1display.toggleClass('inactive');
    $player2display.toggleClass('inactive');
  };


  let playerturn = 1;



  //Event listeners
  //attack buttons

  $attButtP1A1.on('click', function(){
    if(playerturn === 1){
      attack(move1, yavaScript, htmMel, 1);
    }
  });
  $attButtP1A2.on('click', function(){
    if(playerturn === 1){
      attack(move2, yavaScript, htmMel, 1);
    }
  });
  $attButtP1A3.on('click', function(){
    if(playerturn === 1){
      attack(move3, yavaScript, htmMel, 1);
    }
  });
  $attButtP1A4.on('click', function(){
    if(playerturn === 1){
      attack(move4, yavaScript, htmMel, 1);
    }
  });
  $attButtP2A1.on('click', function(){
    if(playerturn === 2){
      attack(move1, htmMel, yavaScript, 2);
    }
  });
  $attButtP2A2.on('click', function(){
    if(playerturn === 2){
      attack(move2, htmMel, yavaScript, 2);
    }
  });
  $attButtP2A3.on('click', function(){
    if(playerturn === 2){
      attack(move3, htmMel, yavaScript, 2);
    }
  });
  $attButtP2A4.on('click', function(){
    if(playerturn === 2){
      attack(move4, htmMel, yavaScript, 2);
    }
  });
  //codemon HP span
  const $p1HP = $('#p1HP');
  const $p2HP = $('#p2HP');

  //message box
  const $messageDisplay = $('.messageBox');


//functions
  //ACTIVE PLAYER
    //Needs to disable the controls of the none active player

  //ATTACK
  //attack function
  //get the values needed:
  const attack = function(move, attcodemon, defCodemon, playerID) {
    if (Math.floor(Math.random()*10) < 2) {
      $messageDisplay.text(`${attcodemon.name}'s attack missed!'`);
      changeTurns();
      checkwinner();
    } else {
      $messageDisplay.text(`${attcodemon.name} used ${move.name}!`);
      const basePower = move.basePower;
      const attack = attcodemon.attack;
      attcodemon.attack += move.attackEffect;
      const defence = defCodemon.defence;
      defCodemon.defence -= move.defenceEffect;
      const result = attackHPEffect(basePower, attack, defence);
      defCodemon.hp -= result;
      checkwinner();
      if(playerID === 1) {
        $p2HP.text(defCodemon.hp);
      } else {
        $p1HP.text(defCodemon.hp);
      }
    }
    changeTurns();
  };


    //Calculate effect

  const attackHPEffect = function(basePower, attack, defence) {
    if(basePower === 0) {
      result = 0;
    } else {
      result = basePower + (attack-defence) +(Math.floor(Math.random()*10)+1);
    }
    return result;
  };

    //Remove HP from other player


    //display message
    //Check for winner
  const checkwinner = function() {
    if (htmMel.hp < 0) {
      htmMel.hp = 0;
      $messageDisplay.text(`${player1} wins!`);
      playerturn = 0;
    } else if(yavaScript.hp < 0) {
      yavaScript.hp = 0;
      $messageDisplay.text(`${player2} wins!`);
      playerturn = 0;
    } else {
      return;
    }
  };

});
