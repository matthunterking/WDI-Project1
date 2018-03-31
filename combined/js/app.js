$(function(){

  let player1;
  let player2;
  let computerPlayer = false;
  let compIndex;

  //Start start page
  //get value from input name and store in in player1 and player2
  //move onto next page
  $('#startGame').on('click', function(){
    player1 = $('.player1Name').val();
    player2 = $('.player2Name').val();
    if (player1 && player2) {
      $('.startPage').addClass('hidden');
      $('.characterselection').removeClass('hidden');
    } else {
      alert('Please enter a name for both player 1 and player 2');
    }
    $('.player1Name').text(player1);
    $('.player2Name').text(player2);
    if(computerPlayer) {
      $('.computer').addClass('inactive');
      $('button#P2').addClass('hidden');
    }
  });

  $('#computerPlayer').on('click', function(){
    console.log('click');
    $('.player2Name').val('Computer');
    computerPlayer = true;
  });

//characterselection

  class Codemon {
    constructor(name, attack, defence, hp, move1, move2, move3, move4, frontImage, backImage) {
      this.name = name;
      this.attack = attack;
      this.defence = defence;
      this.hp = hp;
      this.move1 = move1;
      this.move2 = move2;
      this.move3 = move3;
      this.move4 = move4;
      this.frontImage = frontImage;
      this.backImage = backImage;

    }
  }

  const yavaScript = new Codemon('YavaScript', 3, 2, 100, 'move1', 'move2', 'move3', 'move4', 'YavaScript-front.png', 'YavaScript-back.png');
  const htmMel = new Codemon('HTM-Mel', 1, 4, 100, 'move1', 'move2', 'move3', 'move4', 'HTMel-front.png', 'HTMel-back.png');
  const cssMess = new Codemon('CS-Mess', 2, 3, 100, 'move1', 'move2', 'move3', 'move4', 'CSS-front.png', 'CSS-back.png');

  const codemon = [yavaScript, htmMel, cssMess];
  let index = 1;
  let player1chosen = codemon[1];
  let player2chosen = codemon[1];





  const choose = function(index, player) {
    const current = codemon[index];
    $(`.codemonName${player}`).text(current.name);
    $(`.codemonAttack${player}`).text(current.attack);
    $(`.codemonDefence${player}`).text(current.defence);
    $(`.codemonMove1${player}`).text(current.move1);
    $(`.codemonMove2${player}`).text(current.move2);
    $(`.codemonMove3${player}`).text(current.move3);
    $(`.codemonMove4${player}`).text(current.move4);
    $(`.codemonImage${player}`).css('background', `url(./css/images/${current.frontImage})`);
    $(`.codemonImage${player}`).css('background-size', 'contain');
    $(`.codemonImage${player}`).css('background-position', 'center');
    $(`.codemonImage${player}`).css('background-repeat', 'no-repeat');
  };

  choose(1, 'P1');
  choose(1, 'P2');

  $('button[name="next"]').on('click', function(){
    if(index < codemon.length) {
      choose(index, event.target.id);
      currentCodemon(index);
      index+=1;
    } else {
      index = 0;
      currentCodemon(index);
      choose(index, event.target.id);
      index +=1;
    }
  });

  $('button[name="previous"]').on('click', function(){
    if(index < codemon.length) {
      index-=1;
      choose(index, event.target.id);
      currentCodemon(index);
      index = codemon.length;
    } else {
      index -=1;
      choose(index, event.target.id);
      currentCodemon(index);
    }
  });

  const currentCodemon = function(index) {
    if(event.target.id === 'P1') {
      player1chosen = codemon[index];
    } else {
      player2chosen = codemon[index];
    }
  };


  $('button[name="start"]').on('click', function(){
    $('.characterselection').addClass('hidden');
    $('.battle').removeClass('hidden');
    if(computerPlayer){
      const randomindex = Math.floor(Math.random()*codemon.length);
      player2chosen = codemon[randomindex];
    }
    $('.codemonImageP1.front').css('background', `url(./css/images/${player1chosen.frontImage})`);
    $('.codemonImageP1.back').css('background', `url(./css/images/${player1chosen.backImage})`);
    $('.codemonImageP2.front').css('background', `url(./css/images/${player2chosen.frontImage})`);
    $('.codemonImageP2.back').css('background', `url(./css/images/${player2chosen.backImage})`);
    $('.codemonImageP1').css('background-size', 'contain');
    $('.codemonImageP1').css('background-position', 'center');
    $('.codemonImageP1').css('background-repeat', 'no-repeat');
    $('.codemonImageP2').css('background-size', 'contain');
    $('.codemonImageP2').css('background-position', 'center');
    $('.codemonImageP2').css('background-repeat', 'no-repeat');
  });

  let result;

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

  $('#p1HP').text(player1chosen.hp);
  $('#p2HP').text(player2chosen.hp);


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

  //BAR hpChart
  let $p1bar = $('.p1bar');
  let $p2bar = $('.p2bar');


  $attButtP1A1.text(move1.name);
  $attButtP1A2.text(move2.name);
  $attButtP1A3.text(move3.name);
  $attButtP1A4.text(move4.name);

  $attButtP2A1.text(move1.name);
  $attButtP2A2.text(move2.name);
  $attButtP2A3.text(move3.name);
  $attButtP2A4.text(move4.name);

  //random computer move
  const randomMove = function() {
    compIndex = Math.floor(Math.random()*4);
    let moveNumbers = [move1, move2, move3, move4];
    setTimeout($player2display.toggleClass('inactive'), 40000);
    setTimeout(attack(moveNumbers[compIndex], player2chosen, player1chosen), 40000);
  };

  //change turns

  const changeTurns = function() {
    // playerturn = playerturn === 1 ? 2 : 1;
    if (playerturn === 0) {
      console.log('GAME OVER');
      $player1display.addClass('inactive');
      $player2display.addClass('inactive');
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
      attack(move1, player1chosen, player2chosen, 1);
      if(computerPlayer){
        $player1display.toggleClass('inactive');
        randomMove();
        $player2display.toggleClass('inactive');
      }
    }
  });
  $attButtP1A2.on('click', function(){
    if(playerturn === 1){
      attack(move2, player1chosen, player2chosen, 1);
    }
    if(computerPlayer){
      $player1display.toggleClass('inactive');
      randomMove();
    }
  });
  $attButtP1A3.on('click', function(){
    if(playerturn === 1){
      attack(move3, player1chosen, player2chosen, 1);
    }
    if(computerPlayer){
      $player1display.toggleClass('inactive');
      randomMove();
      $player2display.toggleClass('inactive');
    }
  });
  $attButtP1A4.on('click', function(){
    if(playerturn === 1){
      attack(move4, player1chosen, player2chosen, 1);
    }
    if(computerPlayer){
      $player1display.toggleClass('inactive');
      randomMove();
      $player2display.toggleClass('inactive');
    }
  });
  $attButtP2A1.on('click', function(){
    if(playerturn === 2){
      attack(move1, player2chosen, player1chosen, 2);
    }
    if(computerPlayer){
      randomMove();
    }
  });
  $attButtP2A2.on('click', function(){
    if(playerturn === 2){
      attack(move2, player2chosen, player1chosen, 2);
    }
  });
  $attButtP2A3.on('click', function(){
    if(playerturn === 2){
      attack(move3, player2chosen, player1chosen, 2);
    }
  });
  $attButtP2A4.on('click', function(){
    if(playerturn === 2){
      attack(move4, player2chosen, player1chosen, 2);
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
      $messageDisplay.text(`${attcodemon.name} used ${move.name}!`);
      setTimeout(function() {
        $messageDisplay.text(`${attcodemon.name}'s attack missed!'`);
      }, 1000);
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
        updatebars(defCodemon.hp, 2);
      } else {
        $p1HP.text(defCodemon.hp);
        updatebars(defCodemon.hp, 1);
      }
    }
    changeTurns();
  };

  const updatebars = function(hp, player) {
    console.log('update');
    if (player === 1) {
      $p1bar.css('width', `${hp}%`);
      if (hp < 50) {
        $p1bar.css('background', 'yellow');
      } else if (hp < 10) {
        $p1bar.css('background', 'red');
      }
    } else {
      $p2bar.css('width', `${hp}%`);
      if (hp < 50) {
        $p2bar.css('background', 'yellow');
      } else if (hp < 10) {
        $p2bar.css('background', 'red');
      }
    }
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
    if (player2chosen.hp < 0) {
      player2chosen.hp = 0;
      $messageDisplay.text(`${player1} wins!`);
      playerturn = 0;
    } else if(player1chosen.hp < 0) {
      player1chosen.hp = 0;
      $messageDisplay.text(`${player2} wins!`);
      playerturn = 0;
    } else {
      return;
    }
  };

});
