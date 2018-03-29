$(function(){
//battle function javascript


//Variables which need to be stored/called
//players
  // player name

  let player1 = 'Matt';
  let player2 = 'Bridget';
  let winner;

//Codemon
  //codemon name
  //codemon attack stat
  //codemon defence stat



  class Codemon {
    constructor(name, attack, defence, hp) {
      this.name = name;
      this.attack = attack;
      this.defence = defence;
      this.hp = hp;
    }
  }

  const yavaScript = new Codemon('YavaScript', 3, 2, 100);
  const htmMel = new Codemon('HTM-Mel', 1, 4, 100);


//moves
  //move name
  //effect on codemon stats
  //base power
  class Move {
    constructor(name, attackEffect, defenceEffect, basePower) {
      this.name = name;
      this.attackEffect = attackEffect;
      this.defenceEffect = defenceEffect;
      this.basePower = basePower;
    }
  }

  const move1 = new Move('move1',0,0,20);
  const move2 = new Move('move2',0,10,25);
  const move3 = new Move('move3',10,0,5);
  const move4 = new Move('move4',5,5,10);

//This game
  //codemon start HP (100)
  let p1HP = 100;
  let p2HP = 100;

  $('#p1HP').text(p1HP);
  $('#p2HP').text(p2HP);


//selectors
  //all the move buttons (with event listeners)
  const $attButtP1A1 = $('.player1Options button[name="attack1"]');
  const $attButtP1A2 = $('.player1Options button[name="attack2"]');
  const $attButtP1A3 = $('.player1Options button[name="attack3"]' );
  const $attButtP1A4 = $('.player1Options button[name="attack4"]');
  const $attButtP2A1 = $('.player2Options button[name="attack1"]');
  const $attButtP2A2 = $('.player2Options button[name="attack2"]');
  const $attButtP2A3 = $('.player2Options button[name="attack3"]  ');
  const $attButtP2A4 = $('.player2Options button[name="attack4"]' ) ;


  //Event listeners
  //attack buttons
  $attButtP1A1.on('click', function(){
    attack(move1, yavaScript, htmMel);
  });
  $attButtP1A2.on('click', function(){
    attack(move2, yavaScript, htmMel);
  });
  $attButtP1A3.on('click', function(){
    attack(move3, yavaScript, htmMel);
  });
  $attButtP1A4.on('click', function(){
    attack(move4, yavaScript, htmMel);
  });
  $attButtP2A1.on('click', function(){
    attack(move4, htmMel, yavaScript);
  });
  $attButtP2A2.on('click', function(){
    attack(move4, htmMel, yavaScript);
  });
  $attButtP2A3.on('click', function(){
    attack(move4, htmMel, yavaScript);
  });
  $attButtP2A4.on('click', function(){
    attack(move4, htmMel, yavaScript);
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
  const attack = function(move, attcodemon, defCodemon) {
    $messageDisplay.text(`${attcodemon.name} used ${move.name}!`);
    const basePower = move.basePower;
    const attack = attcodemon.attack;
    const defence = defCodemon.defence;
    const result = attackHPEffect(basePower, attack, defence);
    defCodemon.hp -= result;
    checkwinner();
    $p2HP.text(defCodemon.hp);
  };

    //Calculate effect

  const attackHPEffect = function(basePower, attack, defence) {
    let result = basePower + (attack-defence) +(Math.floor(Math.random()*10)+1);
    console.log(result);
    return result;
  };

    //Remove HP from other player


    //display message
    //Check for winner
  const checkwinner = function() {
    if (p1HP < 0) {
      p1HP = 0;
      $messageDisplay.text(`${player1} wins!`);
    } else if(p2HP < 0) {
      p2HP = 0;
      $messageDisplay.text(`${player2} wins!`);
    } else {
      return;
    }
  };


});
