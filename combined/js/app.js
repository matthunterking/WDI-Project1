$(function(){

//VARIABLES
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
    constructor(name, attackEffect, defenceEffect, basePower, range, description, animation, sound) {
      this.name = name;
      this.attackEffect = attackEffect;
      this.defenceEffect = defenceEffect;
      this.range = range;
      this.basePower = basePower;
      this.description = description;
      this.animation = animation;
      this.sound = sound;
    }
  }

  const move1 = new Move('Code Smash',0,0,20,5, 'A powerful code attack with a small attack range', 'pow.png', './sounds/smash.wav');
  const move2 = new Move('Delete the semicolon',0,2,0,0,'Decrases the defence of your opponant', 'download.png', './sounds/semi.wav');
  const move3 = new Move('Install jQuery',2,0,0,0,'Increases your attack','upload.png', './sounds/install.wav');
  const move4 = new Move('All the brackets',0,0,10,15,'Throws <{]{][>]}} at your opponant. Has a high attack range', 'brackets.png', './sounds/brackets.wav');
  const move5 = new Move('Rainbow Puke',0,0,15,10,'A barrage of additional colors for no reason. Has a meduim attack range', 'rainbow.png', './sounds/rainbow.wav');
  const move6 = new Move('Return undefined',0,0,25,0,'Returns undefined to your opponant', 'undefined.png', './sounds/undefined.wav');
  const move7 = new Move('404 Not Found',0,0,20,7,'Throws a none completed site at your opponant. Has a meduim attack range', '404.png', './sounds/404.wav');

  class Codemon {
    constructor(name, attack, defence, m1, m2, m3, m4, frontImage, backImage, sound) {
      this.name = name;
      this.attack = attack;
      this.defence = defence;
      this.m1 = m1;
      this.m2 = m2;
      this.m3 = m3;
      this.m4 = m4;
      this.frontImage = frontImage;
      this.backImage = backImage;
      this.sound = sound;
    }
  }

  const yavaScript = new Codemon('YavaScript', 6, 4, move4, move6, move3, move2, 'YavaScript-front.png', 'YavaScript-back.png', './sounds/yava.wav');
  const htmMel = new Codemon('HTM-Mel', 2, 8, move7, move3, move2, move1, 'HTMel-front.png', 'HTMel-back.png', './sounds/htmel.wav');
  const cssMess = new Codemon('CS-Mess', 8, 2, move5, move2, move3, move4, 'CSS-front.png', 'CSS-back.png', './sounds/csmess.wav');

  class player {
    constructor(name, attack, defence, hp, chosen) {
      this.name = name;
      this.attack = attack;
      this.defence = defence;
      this.hp = hp;
      this.chosen = chosen;
    }
  }

  const p1 = new player('',0,0,100);
  const p2 = new player('',0,0,100);

  //START PAGE
  $('#startGame').on('click', function(){
    p1.name = $('.player1Name').val();
    p2.name = $('.player2Name').val();
    if (p1.name && p2.name) {
      $('.startPage').addClass('hidden');
      $('.characterselection').removeClass('hidden');
      // $('audio').attr('src', './sounds/selectionScreen.mp3');
    } else {
      alert('Please enter a name for both player 1 and player 2');
    }
    $('.player1Name').text(p1.name);
    $('.player2Name').text(p2.name);
    if(computerPlayer) {
      $('.computer').addClass('hidden');
      $('.codemonSelection').css('width', '100%');
      $('button.p2').addClass('hidden');
      $('button[name="start"]').css('top', '763px');
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
  p1.chosen = codemon[1];
  p2.chosen = codemon[1];

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
      choose(index, event.target.className);
      currentCodemon(index);
      index+=1;
    } else {
      index = 0;
      currentCodemon(index);
      choose(index, event.target.className);
      index +=1;
    }
  });

  $('button[name="previous"]').on('click', function(){
    if(index < codemon.length) {
      index-=1;
      choose(index, event.target.className);
      currentCodemon(index);
      index = codemon.length;
    } else {
      index -=1;
      choose(index, event.target.className);
      currentCodemon(index);
    }
  });

  const currentCodemon = function(index) {
    if(event.target.id === 'P1') {
      p1.chosen = codemon[index];
    } else {
      p2.chosen = codemon[index];
    }
  };

  $('button[name="start"]').on('click', function(){
    $('.characterselection').addClass('hidden');
    $('.battleIntro').removeClass('hidden');
    $('audio').attr('src', './sounds/battleScreen.mp3');
    if(computerPlayer){
      const randomindex = Math.floor(Math.random()*codemon.length);
      p2.chosen = codemon[randomindex];
      $('#player2Screen').addClass('hidden');
      $('#player1Screen').css('width', '100%');
      $('#player1Screen').css('background-size', '122%');
      $('.codemonImageP1').css('height', '290px');
      $('.player1Options').css('position', 'absolute');
      $('.player1Options').css('bottom', '20%');
      $('.impactAnimationP1').css('margin', '40px 155px');
      $('.impactAnimationP2').css('margin', '40px 155px');
      $('.impactAnimationP2').css('width', '160px');
      $('.bottomHalf').css('padding', '50px');

    }
    $('.codemonNameP2').text(p2.chosen.name);
    $('.codemonImageP1.front').css('background', `url(./css/images/${p1.chosen.frontImage})`);
    $('.codemonImageP1.back').css('background', `url(./css/images/${p1.chosen.backImage})`);
    $('.codemonImageP2.front').css('background', `url(./css/images/${p2.chosen.frontImage})`);
    $('.codemonImageP2.back').css('background', `url(./css/images/${p2.chosen.backImage})`);
    $('.codemonImageP1').css('background-size', 'contain');
    $('.codemonImageP1').css('background-position', 'center');
    $('.codemonImageP1').css('background-repeat', 'no-repeat');
    $('.codemonImageP2').css('background-size', 'contain');
    $('.codemonImageP2').css('background-position', 'center');
    $('.codemonImageP2').css('background-repeat', 'no-repeat');
    const movesP1 = [p1.chosen.m1, p1.chosen.m2, p1.chosen.m3, p1.chosen.m4];
    const buttonsP1 = [$attButtP1A1, $attButtP1A2, $attButtP1A3, $attButtP1A4];
    const movesP2 = [p2.chosen.m1, p2.chosen.m2, p2.chosen.m3, p2.chosen.m4];
    const buttonsP2 = [$attButtP2A1, $attButtP2A2, $attButtP2A3, $attButtP2A4];
    buttonsetup(movesP1, buttonsP1, movesP2, buttonsP2);
    p1.attack = p1.chosen.attack;
    p1.defence = p1.chosen.defence;
    p2.attack = p2.chosen.attack;
    p2.defence = p2.chosen.defence;
    battlestartAnimation();
  });

  const battlestartAnimation = function() {
    setTimeout(function(){
      $('.battleIntro').addClass('hidden');
      $('.battle').removeClass('hidden');
    }, 4500);
    setTimeout(function(){
      $('.codemonImageP1.front').fadeIn();
      $('.codemonImageP1.back').fadeIn();
      $('.mainAudio').prop('volume', 0.5);
      $messageDisplay.text(`${p1.name} sent out ${p1.chosen.name}`);
      $('.additionalSound').attr('src', `${p1.chosen.sound}`);
      $('.additionalSound').prop('autoplay', true);

    }, 6560);
    setTimeout(function(){
      $('.mainAudio').prop('volume', 1);
    }, 9560);
    setTimeout(function(){
      $('.codemonImageP2.front').fadeIn();
      $('.codemonImageP2.back').fadeIn();
      $('.mainAudio').prop('volume', 0.5);
      $messageDisplay.text(`${p2.name} sent out ${p2.chosen.name}`);
      $('.additionalSound').attr('src', `${p2.chosen.sound}`);
      $('.additionalSound').prop('autoplay', true);
    }, 10560);
    setTimeout(function(){
      $('.mainAudio').prop('volume', 1);
    }, 13560);
  };

  //BATTLE SCREEN
  const buttonsetup = function (movesP1, buttonsP1, movesP2, buttonsP2) {
    for (let i = 0; i < 4; i++) {
      buttonsP1[i].text((movesP1[i]).name);
      buttonsP1[i].mouseover(function(){
        $messageDisplay.text(movesP1[i].description);
      });
      buttonsP1[i].on('click', function(){
        if(playerturn === 1){
          attack(movesP1[i], p1, p2, 1);
        }
      });
      buttonsP2[i].text((movesP2[i]).name);
      buttonsP2[i].mouseover(function(){
        $messageDisplay.text(movesP2[i].description);
      });
      buttonsP2[i].on('click', function(){
        if(playerturn === 2){
          attack((movesP2[i]), p2, p1, 2);
        }
      });
    }
  };

  const changeTurns = function() {
    if (playerturn === 1) {
      playerturn = 2;
      $player1display.toggleClass('inactive');
      $player2display.toggleClass('inactive');
      if(computerPlayer) {
        computerAttack();
        $player1display.toggleClass('inactive');
        $('button').toggleClass('inactiveButtons');
      }
    } else {
      playerturn = 1;
      $player2display.toggleClass('inactive');
      $player1display.toggleClass('inactive');
      if(computerPlayer) {
        $player1display.toggleClass('inactive');
        $('button').toggleClass('inactiveButtons');
      }
    }
    hit = true;
  };

  const attack = function(move, attackingPlayer, defendingPlayer, playerID) {
    miss();
    statsUpdate(move, attackingPlayer, defendingPlayer, playerID);
    if (hit) {
      const result = attackHPEffect(move.basePower, attackingPlayer.attack, defendingPlayer.defence, move.range);
      if(playerID === 1){
        p2.hp -= result;
      } else {
        p1.hp -= result;
      }
    }
    animation(move, attackingPlayer.chosen, defendingPlayer.chosen, playerID);
    setTimeout(changeTurns, (delayTimer*3));
    checkwinner();
  };

  const miss = function() {
    if (Math.floor(Math.random()*100) < 15) {
      hit = false;
    }
  };

  const attackHPEffect = function(basePower, attack, defence, range) {
    if (basePower === 0) {
      result = 0;
      return result;
    } else {
      let defencefactor = (attack-defence);
      let calRange = (Math.floor(Math.random()*range)+1);
      result = basePower + defencefactor + calRange;
      return result;
    }
  };

  const statsUpdate = function(move, attackingPlayer, defendingPlayer, playerID) {
    if (move.attackEffect > 0) {
      attackingPlayer.attack += (Math.floor(Math.random()*3)+1)*move.attackEffect;
      hit = true;
      if(playerID === 1){
        playerID = 2;
      } else {
        playerID = 1;
      }
      setTimeout(function(){
        $('.mainAudio').prop('volume', 0.5);
        $('.additionalSound').attr('src', `${move.sound}`);
        $messageDisplay.text(`${attackingPlayer.chosen.name}'s attack incresed!`);
        $(`.impactAnimationP${playerID.toString()}`).removeClass('hidden');
        $(`.impactAnimationP${playerID.toString()}`).css('background-image', `url(./css/images/${move.animation}`);
      }, delayTimer);
      setTimeout(function(){
        $(`.impactAnimationP${playerID.toString()}`).addClass('hidden');
      }, (delayTimer * 1.5));
    } else if (move.defenceEffect > 0) {
      defendingPlayer.defence -= (Math.floor(Math.random()*3)+1)*move.defenceEffect;
      hit = true;
      setTimeout(function(){
        $('.mainAudio').prop('volume', 0.5);
        $('.additionalSound').attr('src', `${move.sound}`);
        $messageDisplay.text(`${defendingPlayer.chosen.name}'s defence was lowered!`);
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
    } else if (move.basePower > 0) {
      setTimeout(function(){
        $(`.impactAnimationP${playerID.toString()}`).removeClass('hidden');
        $('.mainAudio').prop('volume', 0.5);
        $('.additionalSound').attr('src', `${move.sound}`);
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
      updatebars(p2.hp, $p2bar);
    } else {
      updatebars(p1.hp, $p1bar);
    }
  };

  const updatebars = function(hp, player) {
    player.css('width', `${hp}%`);
    if (hp < 50 && hp > 10) {
      player.css('background', 'yellow');
    } else if (hp < 10) {
      player.css('background', 'red');
    }
  };

  const checkwinner = function() {
    if (p2.hp <= 0) {
      p2.hp = 0;
      playerturn = 0;
      setTimeout(function(){
        $('.codemonImageP2').fadeOut();
        $messageDisplay.text(`${p2.name}'s ${p2.chosen.name} has fainted!`);
      }, (delayTimer * 4));
      setTimeout(function(){
        $('.battle').addClass('hidden');
        $('.winner').removeClass('hidden');
        $('.winnerName').text(`${p1.name}`);
        $('.mainAudio').attr('src', './sounds/endgame.mp3');
        playerturn = 0;
      }, (delayTimer * 5));
    } else if(p1.hp <= 0) {
      p1.hp = 0;
      setTimeout(function(){
        $('.codemonImageP1').fadeOut();
        $messageDisplay.text(`${p1.name}'s ${p1.chosen.name} has fainted!`);
      }, (delayTimer * 4));
      setTimeout(function(){
        $('.battle').addClass('hidden');
        $('.winner').removeClass('hidden');
        $('.winnerName').text(`${p1.name}`);
        $('.mainAudio').attr('src', './sounds/endgame.mp3');
        playerturn = 0;
      }, (delayTimer * 5));
    } else {
      return;
    }
  };

  $('.winner button[name="playAgain"]').on('click', function(){
    $('.winner').addClass('hidden');
    $('.startPage').removeClass('hidden');
    $('.mainAudio').attr('src', './sounds/startPage.mp3');
    p1.name = '';
    p1.attack = 0;
    p1.defence = 0;
    p1.hp = 100;
    p2.name = '';
    p2.attack = 0;
    p2.defence = 0;
    p2.hp = 100;
    $('.codemonImageP1').css('display', 'inherit');
    $('.codemonImageP2').css('display', 'inherit');
    $('.player1Name').val('');
    $('.player2Name').val('');
    computerPlayer = false;
  });

  const computerAttack = function() {
    setTimeout(function() {
      const movesP2 = [p2.chosen.m1, p2.chosen.m2, p2.chosen.m3, p2.chosen.m4];
      const move = movesP2[Math.floor(Math.random()*3)];
      attack(move, p2, p1, 2);
    }, delayTimer);
  };

});
