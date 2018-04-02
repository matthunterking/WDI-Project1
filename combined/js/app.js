$(function(){

//VARIABLES
  let player1; //Player 1 name
  let player2; //Player 1 name
  let computerPlayer = false; //Toggle if player 2 is the computer
  let compIndex; //Used to store the random number of the move the computer chooses
  let hit = true; //Stores if the attack hits or not
  const delayTimer = 2000; //Base time delay of animation and messages
  let result; //stores the result of the battle
  let playerturn = 1; //stores the current players turn. Initialized to 1

  //SELECTORS
  const $attButtP1A1 = $('.player1Options button[name="attack1"]');
  const $attButtP1A2 = $('.player1Options button[name="attack2"]');
  const $attButtP1A3 = $('.player1Options button[name="attack3"]');
  const $attButtP1A4 = $('.player1Options button[name="attack4"]');
  const $attButtP2A1 = $('.player2Options button[name="attack1"]');
  const $attButtP2A2 = $('.player2Options button[name="attack2"]');
  const $attButtP2A3 = $('.player2Options button[name="attack3"]');
  const $attButtP2A4 = $('.player2Options button[name="attack4"]');

  const $player1display = $('#player1Screen');
  const $player2display = $('#player2Screen');

  const $p1bar = $('.p1bar');
  const $p2bar = $('.p2bar');

  const $messageDisplay = $('.messageBox');

  //SET UP CODEMON AND MOVES
  class Move {
    constructor(name, attackEffect, defenceEffect, basePower, range, description, animation) {
      this.name = name;
      this.attackEffect = attackEffect;
      this.defenceEffect = defenceEffect;
      this.range = range;
      this.basePower = basePower;
      this.description = description;
      this.animation = animation;
    }
  }

  const move1 = new Move('Code Smash',0,0,20,5, 'A powerful code attack', 'pow.png');
  const move2 = new Move('Delete the semicolon',0,2,0,0,'Decrases the defence of your opponant', 'download.png');
  const move3 = new Move('Install jQuery',2,0,0,0,'Increases your attack','upload.png');
  const move4 = new Move('All the brackets',0,0,10,15,'Throws <{]{][>]}} at your opponant', 'brackets.png');
  const move5 = new Move('Rainbow Puke',0,0,15,10,'A barrage of additional colors for no reason', 'rainbow.png');
  const move6 = new Move('Return undefined',0,0,25,0,'Returns undefined to your opponant', 'undefined.png');
  const move7 = new Move('404 Not Found',0,0,20,5,'Throws a none completed site at your opponant', '404.png');

  class Codemon {
    constructor(name, attack, defence, hp, m1, m2, m3, m4, frontImage, backImage) {
      this.name = name;
      this.attack = attack;
      this.defence = defence;
      this.hp = hp;
      this.m1 = m1;
      this.m2 = m2;
      this.m3 = m3;
      this.m4 = m4;
      this.frontImage = frontImage;
      this.backImage = backImage;

    }
  }

  const yavaScript = new Codemon('YavaScript', 6, 4, 100, move4, move6, move3, move2, 'YavaScript-front.png', 'YavaScript-back.png');
  const htmMel = new Codemon('HTM-Mel', 2, 8, 100, move7, move3, move2, move1, 'HTMel-front.png', 'HTMel-back.png');
  const cssMess = new Codemon('CS-Mess', 8, 2, 100, move5, move2, move3, move4, 'CSS-front.png', 'CSS-back.png');

  let p1HP = 100;
  let p2HP = 100;

  //START PAGE
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
    if (computerPlayer){
      $('.player2Name').val('');
      computerPlayer = false;
    } else {
      $('.player2Name').val('Computer');
      computerPlayer = true;
    }

  });

  //CHARACTER SELECTION SCREEN
  const codemon = [yavaScript, htmMel, cssMess];
  let index = 1;
  let player1chosen = codemon[1];
  let player2chosen = codemon[1];

  const choose = function(index, player) {
    const current = codemon[index];
    $(`.codemonName${player}`).text(current.name);
    $(`.codemonAttack${player}`).text(current.attack);
    $(`.codemonDefence${player}`).text(current.defence);
    $(`.codemonMove1${player}`).text(`${current.m1.name}|`);
    $(`.codemonMove2${player}`).text(`${current.m2.name}|`);
    $(`.codemonMove3${player}`).text(`${current.m3.name}|`);
    $(`.codemonMove4${player}`).text(`${current.m4.name}|`);
    $(`.codemonImage${player}`).css('background', `url(./css/images/${current.frontImage})`);
    $(`.codemonImage${player}`).css('background-size', 'contain');
    $(`.codemonImage${player}`).css('background-position', 'center');
    $(`.codemonImage${player}`).css('background-repeat', 'no-repeat');
  };

  choose(index, 'P1');
  choose(index, 'P2');

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
    const movesP1 = [player1chosen.m1, player1chosen.m2, player1chosen.m3, player1chosen.m4];
    const buttonsP1 = [$attButtP1A1, $attButtP1A2, $attButtP1A3, $attButtP1A4];
    const movesP2 = [player2chosen.m1, player2chosen.m2, player2chosen.m3, player2chosen.m4];
    const buttonsP2 = [$attButtP2A1, $attButtP2A2, $attButtP2A3, $attButtP2A4];
    buttonsetup(movesP1, buttonsP1, movesP2, buttonsP2);
  });
  //BATTLE SCREEN
  const buttonsetup = function (movesP1, buttonsP1, movesP2, buttonsP2) {
    for (let i = 0; i < 4; i++) {
      buttonsP1[i].text((movesP1[i]).name);
      buttonsP1[i].mouseover(function(){
        $messageDisplay.text(movesP1[i].description);
      });
      buttonsP1[i].on('click', function(){
        if(playerturn === 1){
          attack(movesP1[i], player1chosen, player2chosen, 1);
        }
      });
      buttonsP2[i].text((movesP2[i]).name);
      buttonsP2[i].mouseover(function(){
        $messageDisplay.text(movesP2[i].description);
      });
      buttonsP2[i].on('click', function(){
        if(playerturn === 2){
          attack((movesP2[i]), player2chosen, player1chosen, 2);
        }
      });
    }
  };

  //random computer move
  // const randomMove = function() {
  //   compIndex = Math.floor(Math.random()*4);
  //   let moveNumbers = [move1, move2, move3, move4];
  //   setTimeout($player2display.toggleClass('inactive'), 40000);
  //   setTimeout(attack(moveNumbers[compIndex], player2chosen, player1chosen), 40000);
  // };

  const changeTurns = function() {
    if (playerturn === 1) {
      playerturn = 2;
      $player1display.toggleClass('inactive');
      $player2display.toggleClass('inactive');
    } else {
      playerturn = 1;
      $player2display.toggleClass('inactive');
      $player1display.toggleClass('inactive');
    }
    hit = true;
  };

  const attack = function(move, attcodemon, defCodemon, playerID) {
    miss();
    if (hit) {
      const result = attackHPEffect(move.basePower, attcodemon.attack, defCodemon.defence, move.range);
      if(playerID === 1){
        p2HP -= result;
      } else {
        p1HP -= result;
      }
    }
    animation(move, attcodemon, defCodemon, playerID);
    setTimeout(changeTurns, (delayTimer*3));
    checkwinner();
  };

  const miss = function() {
    if (Math.floor(Math.random()*100) < 22) {
      hit = false;
    }
  };

  const attackHPEffect = function(basePower, attack, defence, range) {
    result = basePower + (Math.abs(attack-defence)) + (Math.floor(Math.random()*range)+1);
    return result;
  };

  const statsUpdate = function(move, attcodemon, defCodemon, playerID) {
    if (move.attackEffect > 0) {
      attcodemon.attack += (Math.floor(Math.random()*move.attackEffect));
      if(playerID === 1){
        playerID = 2;
      } else {
        playerID = 1;
      }
      setTimeout(function(){
        $messageDisplay.text(`${attcodemon.name}'s attack incresed!`);
        $(`.impactAnimationP${playerID.toString()}`).removeClass('hidden');
        $(`.impactAnimationP${playerID.toString()}`).css('background-image', `url(./css/images/${move.animation}`);
      }, delayTimer);
      setTimeout(function(){
        $(`.impactAnimationP${playerID.toString()}`).addClass('hidden');
      }, (delayTimer * 1.5));
    } else if (move.defenceEffect > 0) {
      defCodemon.defence -= (Math.floor(Math.random()*move.defenceEffect));
      setTimeout(function(){
        $messageDisplay.text(`${defCodemon.name}'s defence was lowered!`);
        $(`.impactAnimationP${playerID.toString()}`).removeClass('hidden');
        $(`.impactAnimationP${playerID.toString()}`).css('background-image', `url(./css/images/${move.animation}`);
      }, delayTimer);
      setTimeout(function(){
        $(`.impactAnimationP${playerID.toString()}`).addClass('hidden');
      }, (delayTimer * 1.5));
    }
  };

  const animation = function(move, attcodemon, defCodemon, playerID) {
    $messageDisplay.text(`${attcodemon.name} used ${move.name}!`);
    if(hit === false) {
      setTimeout(function(){
        $messageDisplay.text(`${attcodemon.name}'s attack missed!!`);
      }, delayTimer);
    } else if (move.attackEffect > 0 || move.defenceEffect > 0) {
      statsUpdate(move, attcodemon, defCodemon, playerID);
    } else if (move.basePower > 0) {
      setTimeout(function(){
        $(`.impactAnimationP${playerID.toString()}`).removeClass('hidden');
        $(`.impactAnimationP${playerID.toString()}`).css('background-image', `url(./css/images/${move.animation}`);
      }, (delayTimer * 1.1));
      setTimeout(function(){
        $(`.impactAnimationP${playerID.toString()}`).addClass('hidden');
      }, (delayTimer * 1.9));
      setTimeout(function() {
        displayDamage(playerID);
      }, (delayTimer * 2));
    }
  };

  const displayDamage = function(playerID) {
    if(playerID === 1) {
      updatebars(p2HP, 2);
    } else {
      updatebars(p1HP, 1);
    }
  };

  const updatebars = function(hp, player) {
    if (player === 1) {
      $p1bar.css('width', `${hp}%`);
      if (hp < 50 && hp > 10) {
        $p1bar.css('background', 'yellow');
      } else if (hp < 10) {
        $p1bar.css('background', 'red');
      }
    } else {
      $p2bar.css('width', `${hp}%`);
      if (hp < 50 && hp > 10) {
        $p2bar.css('background', 'yellow');
      } else if (hp < 10) {
        $p2bar.css('background', 'red');
      }
    }
  };

  const checkwinner = function() {
    if (p2HP < 0) {
      p2HP = 0;
      playerturn = 0;
      setTimeout(function(){
        $('.codemonImageP2').fadeOut();
        $messageDisplay.text(`${player2}'s '${player1chosen.name} has fainted!`);
      }, (delayTimer * 4));
      setTimeout(function(){
        $messageDisplay.text(`${player1} wins!`);
        playerturn = 0;
        $player2display.addClass('inactive');
      }, (delayTimer * 5));
    } else if(p1HP < 0) {
      p1HP.hp = 0;
      setTimeout(function(){
        $('.codemonImageP1').fadeOut();
        $messageDisplay.text(`${player2chosen.name} has fainted!`);
      }, (delayTimer * 4));
      setTimeout(function(){
        $messageDisplay.text(`${player2} wins!`);
        playerturn = 0;
        $player1display.addClass('inactive');
      }, (delayTimer * 5));
    } else {
      return;
    }
  };

});
