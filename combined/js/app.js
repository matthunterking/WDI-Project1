$(function(){

//----------------------------- VARIABLES --------------------------------------
  let computerPlayer = false; //Toggle if player 2 is the computer
  let hit = true; //Stores if the attack hits or not
  const delayTimer = 2000; //Base time delay of animation and messages
  let result; //stores the result of the battle
  let playerturn = 1; //stores the current players turn. Initialized to 1
  let t1; //t(number) varaibles store all the setTimeout functions for the site
  let t2; // they are used to clearTimeout after the game has finished
  let t3;
  let t4;
  let t5;
  let t6;
  let t7;
  let t8;
  let t9;
  let t10;
  let t11;
  let t12;
  let t13;
  let t14;
  let t15;
  let t16;
  let t17;
  let t18;
  let t19;
  let t20;


  //-------------------------- SELECTORS ---------------------------------------
  const $attButtP1A1 = $('.player1Options button[name="attack1"]'); //used for event listeners when game is loaded
  const $attButtP1A2 = $('.player1Options button[name="attack2"]');
  const $attButtP1A3 = $('.player1Options button[name="attack3"]');
  const $attButtP1A4 = $('.player1Options button[name="attack4"]');
  const $attButtP2A1 = $('.player2Options button[name="attack1"]');
  const $attButtP2A2 = $('.player2Options button[name="attack2"]');
  const $attButtP2A3 = $('.player2Options button[name="attack3"]');
  const $attButtP2A4 = $('.player2Options button[name="attack4"]');

  const $player1display = $('#player1Screen'); //Used to switch screens when changing turns
  const $player2display = $('#player2Screen');

  const $p1bar = $('.p1bar'); //used to select the health bars
  const $p2bar = $('.p2bar');

  const $messageDisplay = $('.messageBox'); //used to display messages during the battle

  //--------------------- SET UP CODEMON AND MOVES -----------------------------
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
  const move2 = new Move('Delete the Semicolon',0,2,0,0,'Decrases the defence of your opponant', 'download.png', './sounds/semi.wav');
  const move3 = new Move('Install jQuery',2,0,0,0,'Increases your attack','upload.png', './sounds/install.wav');
  const move4 = new Move('All the Brackets',0,0,10,15,'Throws <{]{][>]}} at your opponant. Has a high attack range', 'brackets.png', './sounds/brackets.wav');
  const move5 = new Move('Rainbow Puke',0,0,15,10,'A barrage of additional colors for no reason. Has a meduim attack range', 'rainbow.png', './sounds/rainbow.wav');
  const move6 = new Move('Return Undefined',0,0,25,0,'Returns undefined to your opponant', 'undefined.png', './sounds/undefined.wav');
  const move7 = new Move('404 Not Found',0,0,20,7,'Throws an incompleted site at your opponant. Has a meduim attack range', '404.png', './sounds/404.wav');

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

  const p1 = new player('',0,0,100); //sets up a new player.
  const p2 = new player('',0,0,100);

  //--------------------------- ADDITIONAL START PAGE --------------------------

  const $player = $('.altStartPlayer');

  let keyPressed;

  const moveDistance = 4;

  let leftposition = 176;

  let topposition = 159;

  let step = 0;

  const altmessages = function() {
    if (leftposition > 144 && leftposition < 212 && topposition > 330 && topposition < 335) {
      $('.altmessagebox').text(`There's no time to play the N64 I should talk to my friend`);
    }
    if(leftposition > 348 && topposition < 111) {
      $('.altmessagebox').text(`Hey! Don't leave! Come and see what I'm playing on the computer!`);
    }
    if ((leftposition < 60 && topposition > 63 && topposition < 115) || (leftposition < 40 && topposition < 115)) {
      $('.mainAudio').attr('src', './sounds/startpage.mp3');
      $('.screencolor').removeClass('hidden');
      $('.altmessagebox').text(`Check it out I'm playing this cool new game by the Web Developer Matt Hunter-King`);
      t18 = setTimeout(function(){
        $('.altmessagebox').text(`It's very cool, it's like pokemon but with code. Lets play!`);
      }, 6000);
      t19 = setTimeout(function(){
        $('.alternateStart').addClass('hidden');
        $('.startPage').removeClass('hidden');
        $('.screencolor').addClass('hidden');
      }, 13000);
      $(window).off('keyup keydown keypress');
    }
  };

  $(window).keydown(function(e) {
    keyPressed=e.which;
    arrowKeys(keyPressed);
  });
  $(window).keyup(function() {
    keyPressed = 0;
  });

  const walk = function(direction) {
    switch (step) {
      case 0:
        $player.css('backgroundImage', `url(./css/images/trainer${direction}.png)`);
        t20 = setTimeout(function(){
          step = 1;
        }, 100);
        break;
      case 1:
        $player.css('backgroundImage', `url(./css/images/trainer${direction}1.png)`);
        t20 = setTimeout(function(){
          step = 2;
        }, 100);
        break;
      case 2:
        $player.css('backgroundImage', `url(./css/images/trainer${direction}2.png)`);
        t20 = setTimeout(function(){
          step = 0;
        }, 100);
        break;
    }
  };

  const arrowKeys = function(keyPressed) {
    switch (keyPressed) {
      case 37: //left
        if ((leftposition > 0)
        && !(leftposition > 0 && leftposition < 52 && topposition > 283 && topposition < 380)
      && !(leftposition > -1 && leftposition < 165 && topposition > 18 && topposition < 60)
      && !(leftposition > 120 && leftposition < 220 && topposition > 168 && topposition < 330)
      && !(leftposition > 293 && leftposition < 393 && topposition > 293 && topposition < 380)
        ) {
          leftposition -= moveDistance;
          $player.css('left', `${leftposition.toString()}px`);
        }
        walk('left');
        break;
      case 38: //up
        if (topposition > 19
        && !(leftposition > -1 && leftposition < 165 && topposition > 18 && topposition < 64)
      && !(leftposition > 120 && leftposition < 210 && topposition > 168 && topposition < 335)) {
          topposition -= moveDistance;
          $player.css('top', `${topposition.toString()}px`);
        }
        walk('up');
        break;
      case 39: //right
        if (leftposition < 404
        && !(leftposition > 118 && leftposition < 210 && topposition > 168 && topposition < 330)
        && !(leftposition > 290 && leftposition < 392 && topposition > 293 && topposition < 380)
        ) {
          leftposition += moveDistance;
          $player.css('left', `${leftposition.toString()}px`);
        }
        walk('right');
        break;
      case 40: //down
        if (topposition < 377 &&
          !(leftposition > -1 && leftposition < 52 && topposition > 283 && topposition < 380)
      && !(leftposition > 120 && leftposition < 210 && topposition > 164 && topposition < 330)
      && !(leftposition > 293 && leftposition < 392 && topposition > 287 && topposition < 380)
        ) {
          topposition += moveDistance;
          $player.css('top', `${topposition.toString()}px`);
        }
        walk('down');
        break;
    }
    altmessages();
  };

  //------------------------------ START PAGE ----------------------------------
  $('#startGame').on('click', function(){
    p1.name = $('.player1Name').val(); //takes the value input into the form and adds it to the player objects
    p2.name = $('.player2Name').val();
    checkFor2Players(p1.name, p2.name); //function to check if 2 player names have been input
    $('.player1Name').text(p1.name); //populates all future instances of player name with values
    $('.player2Name').text(p2.name);
    computerPlayer ? computerPlayerFormatting() : ''; //function to change the formating of the pages to 1 player mode if playing the computer
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

  const checkFor2Players = function(p1, p2) {
    if (p1 && p2) {
      $('.startPage').addClass('hidden');
      $('.characterselection').removeClass('hidden');
    } else {
      alert('Please enter a name for both player 1 and player 2');
    }
  };

  const computerPlayerFormatting = function() {
    $('.computer').addClass('hidden');
    $('.codemonSelection').css('width', '100%');
    $('button.p2').addClass('hidden');
    $('button[name="start"]').css('top', '763px');
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
  };

  //---------------------- CHARACTER SELECTION SECTION -------------------------

  const currentCodemon = function(index) {
    if(event.target.className === 'P1') {
      p1.chosen = codemon[index];
    } else {
      p2.chosen = codemon[index];
    }
  }; //assigns the current selection to the player object

  const updateSelectionDisplay = function(index, player) { //Updates the display of the selection screen
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

  $('button[name="next"]').on('click', function(){
    index+=1;
    if(index < (codemon.length)) {
      updateSelectionDisplay(index, event.target.className);
      currentCodemon(index);
    } else {
      index = 0;
      updateSelectionDisplay(index, event.target.className);
      currentCodemon(index);
    }
  }); //next button

  $('button[name="previous"]').on('click', function(){
    index === 0 ? index = (codemon.length-1) : index-=1;
    if(index < codemon.length) {
      updateSelectionDisplay(index, event.target.className);
      currentCodemon(index);
    } else {
      index = 0;
      updateSelectionDisplay(index, event.target.className);
      currentCodemon(index);
    }
  }); //previous button

  const codemon = [htmMel, yavaScript, cssMess]; //an array to store the codemon objects
  let index = 0; //default index of the array
  p1.chosen = htmMel; //default codemon for both players
  p2.chosen = htmMel;
  updateSelectionDisplay(index, 'P1');
  updateSelectionDisplay(index, 'P2');

  $('button[name="start"]').on('click', function(){
    computerPlayer ? computerSetUp() : '';
    $('.characterselection').addClass('hidden');
    $('.battleIntro').removeClass('hidden');
    $('audio').attr('src', './sounds/battleScreen.mp3');
    $('.startPage').addClass('hidden');
    battleScreenFormatting();
    const movesP1 = [p1.chosen.m1, p1.chosen.m2, p1.chosen.m3, p1.chosen.m4];
    const buttonsP1 = [$attButtP1A1, $attButtP1A2, $attButtP1A3, $attButtP1A4];
    const movesP2 = [p2.chosen.m1, p2.chosen.m2, p2.chosen.m3, p2.chosen.m4];
    const buttonsP2 = [$attButtP2A1, $attButtP2A2, $attButtP2A3, $attButtP2A4];
    buttonsetup(movesP1, buttonsP1, p1, p2, 1);
    buttonsetup(movesP2, buttonsP2, p2, p1, 2);
    statsAssignment(p1);
    statsAssignment(p2);
    battlestartAnimation();
  });

  const computerSetUp = function() { //chooses a random character for the computer
    const randomindex = Math.floor(Math.random()*codemon.length);
    p2.chosen = codemon[randomindex];
  };

  const battleScreenFormatting = function() { //formats the battle screen
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
  };

  const statsAssignment = function(player) {
    player.attack = player.chosen.attack;
    player.defence = player.chosen.defence;
  }; //assigns the codemons stats to each player

  const buttonsetup = function (moves, buttons, player, opponant, id) { //sets up the buttons for the battle screen
    for (let i = 0; i < 4; i++) {
      buttons[i].text((moves[i]).name);
      buttons[i].mouseover(function(){
        $messageDisplay.text(moves[i].description);
      });
      buttons[i].on('click', function() {
        attack(moves[i], player, opponant, id);
      });
    }
  };

  const disableButtons = function() {
    $('.player1Options button, .player2Options button').off('click');
  };

  //------------------------ BATTLE INTRO SECTION -------------------------------
  const battlestartAnimation = function() {//plays the intro animation for the battle screen
    t1 = setTimeout(battleIntroStage1, 4500);
    t2 = setTimeout(battleIntroStage2, 6560);
    t3 = setTimeout(battleIntroStage3, 9560);
    t4 = setTimeout(battleIntroStage4, 10560);
    t5 = setTimeout(battleIntroStage5, 13560);
  };

  const battleIntroStage1 = function() {
    $('.battleIntro').addClass('hidden');
    $('.battle').removeClass('hidden');
  };

  const battleIntroStage2 = function() {
    $('.codemonImageP1.front').fadeIn();
    $('.codemonImageP1.back').fadeIn();
    $('.mainAudio').prop('volume', 0.5);
    $messageDisplay.text(`${p1.name} sent out ${p1.chosen.name}`);
    $('.additionalSound').attr('src', `${p1.chosen.sound}`);
    $('.additionalSound').prop('autoplay', true);
  };

  const battleIntroStage3 = function() {
    $('.mainAudio').prop('volume', 1);
  };

  const battleIntroStage4 = function() {
    $('.codemonImageP2.front').fadeIn();
    $('.codemonImageP2.back').fadeIn();
    $('.mainAudio').prop('volume', 0.5);
    $messageDisplay.text(`${p2.name} sent out ${p2.chosen.name}`);
    $('.additionalSound').attr('src', `${p2.chosen.sound}`);
    $('.additionalSound').prop('autoplay', true);
  };

  const battleIntroStage5 = () => $('.mainAudio').prop('volume', 1);

  //-------------------------- BATTLE SECTION -----------------------------------
  const changeTurns = function() {
    const movesP1 = [p1.chosen.m1, p1.chosen.m2, p1.chosen.m3, p1.chosen.m4];
    const buttonsP1 = [$attButtP1A1, $attButtP1A2, $attButtP1A3, $attButtP1A4];
    const movesP2 = [p2.chosen.m1, p2.chosen.m2, p2.chosen.m3, p2.chosen.m4];
    const buttonsP2 = [$attButtP2A1, $attButtP2A2, $attButtP2A3, $attButtP2A4];
    if (playerturn === 1) {
      playerturn = 2;
      $player1display.toggleClass('inactive');
      $player2display.toggleClass('inactive');
      buttonsetup(movesP2, buttonsP2, p2, p1, 2);
      $('.player1Options button').addClass('inactiveButtons');
      $('.player2Options button').removeClass('inactiveButtons');
      if(computerPlayer) {
        computerAttack();
        $player1display.toggleClass('inactive');
        $('.player1Options button').addClass('inactiveButtons');
      }
    } else {
      playerturn = 1;
      $player2display.toggleClass('inactive');
      $player1display.toggleClass('inactive');
      buttonsetup(movesP1, buttonsP1, p1, p2, 1);
      $('.player2Options button').addClass('inactiveButtons');
      $('.player1Options button').removeClass('inactiveButtons');
      if(computerPlayer) {
        $player1display.toggleClass('inactive');
        $('.player1Options button').removeClass('inactiveButtons');
      }
    }
    hit = true;
  };

  const attack = function(move, attackingPlayer, defendingPlayer, playerID) {
    disableButtons();
    hitOrMiss();
    statsUpdate(move, attackingPlayer, defendingPlayer, playerID);
    hit ? damage(move, attackingPlayer, defendingPlayer, playerID) : '';
    move.basePower > 0 ? animation(move, attackingPlayer.chosen, defendingPlayer.chosen, playerID) : '';
    t6 = setTimeout(changeTurns, (delayTimer*3));
    checkwinner(attackingPlayer, defendingPlayer, playerID);
  };

  const hitOrMiss = function() {
    if (Math.floor(Math.random()*100) < 15) {
      hit = false;
    }
  };

  const attackIncrease = function(move, attackingPlayer) {
    attackingPlayer.attack += (Math.floor(Math.random()*3)+1)*move.attackEffect;
  };

  const defenceDecrease = function (move, defendingPlayer) {
    defendingPlayer.defence -= (Math.floor(Math.random()*3)+1)*move.defenceEffect;
  };

  const playMoveSound = function(move) {
    $('.mainAudio').prop('volume', 0.5);
    $('.additionalSound').attr('src', `${move.sound}`);
  };

  const attackIncreaseMessage = function(attackingPlayer) {
    $messageDisplay.text(`${attackingPlayer.chosen.name}'s attack incresed!`);
  };

  const defenceDecreaseMessage = function(defendingPlayer) {
    $messageDisplay.text(`${defendingPlayer.chosen.name}'s defence was lowered!`);
  };

  const startMoveAnimation = function(move, playerID) {
    $(`.impactAnimationP${playerID.toString()}`).removeClass('hidden');
    $(`.impactAnimationP${playerID.toString()}`).css('background-image', `url(./css/images/${move.animation}`);
  };

  const endMoveAnimation = function(playerID) {
    $(`.impactAnimationP${playerID.toString()}`).addClass('hidden');
  };

  const statsUpdate = function(move, attackingPlayer, defendingPlayer, playerID) {
    if (move.attackEffect > 0) {
      attackIncrease(move, attackingPlayer);
      playerID === 1 ? playerID = 2 : playerID = 1; //switches the player ID so that the animation appears on the attacking codemon
      $messageDisplay.text(`${attackingPlayer.chosen.name} used ${move.name}!`);
      t7 = setTimeout(function(){
        playMoveSound(move);
        attackIncreaseMessage(attackingPlayer);
        startMoveAnimation(move, playerID);
      }, delayTimer);
      t8 = setTimeout(function(){
        endMoveAnimation(playerID);
      }, (delayTimer * 1.5));
    } else if (move.defenceEffect > 0) {
      defenceDecrease(move, defendingPlayer);
      $messageDisplay.text(`${attackingPlayer.chosen.name} used ${move.name}!`);
      t9 = setTimeout(function(){
        playMoveSound(move);
        defenceDecreaseMessage(defendingPlayer);
        startMoveAnimation(move, playerID);
      }, delayTimer);
      t10 = setTimeout(function(){
        endMoveAnimation(playerID);
      }, (delayTimer * 1.5));
    }
    move.attackEffect > 0 || move.defenceEffect > 0 ? hit=true : '';
  };

  const damage = function(move, attackingPlayer, defendingPlayer, playerID) {
    const result = attackHPEffect(move.basePower, attackingPlayer.attack, defendingPlayer.defence, move.range);
    if(playerID === 1){
      p2.hp -= result;
    } else {
      p1.hp -= result;
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

  const attackMessageBox = function(move, attcodemon) {
    $messageDisplay.text(`${attcodemon.name} used ${move.name}!`);
    if(hit === false) {
      t11 = setTimeout(function() {
        $messageDisplay.text(`${attcodemon.name}'s attack missed!!`);
      }, delayTimer);
    }
  };

  const animation = function(move, attcodemon, defCodemon, playerID) {
    attackMessageBox(move, attcodemon);
    if(hit) {
      t12 = setTimeout(function(){
        startMoveAnimation(move, playerID);
        playMoveSound(move);
      }, (delayTimer * 1.1));
      t13 = setTimeout(function(){
        endMoveAnimation(playerID);
      }, (delayTimer * 1.9));
      t14 = setTimeout(function() {
        displayDamage(playerID);
      }, (delayTimer * 2));
    }
  };

  const displayDamage = function(playerID) {
    playerID === 1 ? updatebars(p2.hp, $p2bar) : updatebars(p1.hp, $p1bar);
  };

  const updatebars = function(hp, player) {
    player.css('width', `${hp}%`);
    if (hp < 50 && hp > 10) {
      player.css('background', 'yellow');
    } else if (hp < 10) {
      player.css('background', 'red');
    }
  };

  const faint = function(player, playerID) {
    player.hp = 0;
    playerturn = 0;
    playerID === 1 ? playerID = 2 : playerID = 1;
    t15 = setTimeout(function(){
      $(`.codemonImageP${playerID.toString()}`).fadeOut();
      $messageDisplay.text(`${player.name}'s ${player.chosen.name} has fainted!`);
    }, (delayTimer * 4));
  };

  const checkwinner = function(attackingPlayer, defendingPlayer, playerID) {
    if (defendingPlayer.hp <= 0) {
      faint(defendingPlayer, playerID);
      t16 = setTimeout(function(){
        $('.battle').addClass('hidden');
        $('.winner').removeClass('hidden');
        $('.winnerName').text(`${attackingPlayer.name}`);
        $('.mainAudio').attr('src', './sounds/endgame.mp3');
      }, (delayTimer * 5));
    } else {
      return;
    }
  };

  const computerAttack = function() {
    t17 = setTimeout(function() {
      const movesP2 = [p2.chosen.m1, p2.chosen.m2, p2.chosen.m3, p2.chosen.m4];
      const move = movesP2[Math.floor(Math.random()*3)];
      attack(move, p2, p1, 2);
    }, delayTimer);
  };

  $('.winner button[name="playAgain"]').on('click', function(){
    clearTimeout(t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12, t13, t14, t15, t16, t17);
    $('.winner').addClass('hidden');
    $('.startPage').removeClass('hidden');
    $('.mainAudio').attr('src', './sounds/selectionScreen.mp3');
    computerPlayer ? computerPlayerCssReset() : '';
    playerAndStatsReset();
    cssReset();
  });

  const playerAndStatsReset = function() {
    p1.name = p2.name = '';
    p1.attack = p1.defence = p2.attack = p2.defence = 0;
    p1.hp = p2.hp = 100;
    playerturn = 1;
  };

  const cssReset = function() {
    $p1bar.css('width', '100%');
    $p2bar.css('width', '100%');
    $p1bar.css('background', 'green');
    $p2bar.css('background', 'green');
    computerPlayer = false;
    $('.codemonImageP1, .codemonImageP2, .codemonImageP1.front, .codemonImageP1.back, .codemonImageP2.front, .codemonImageP2.back').css('background', '');
    $('.player1Name, .player2Name').val('');
    $('.codemonNameP2').text('');
    $player1display.removeClass('inactive');
    $player2display.addClass('inactive');
    $('.codemonImageP1, .codemonImageP2').attr('style', '');
    updateSelectionDisplay(0, 'P1');
    updateSelectionDisplay(0, 'P2');
    $messageDisplay.text('');
  };

  const computerPlayerCssReset = function() {
    $('.computer').removeClass('hidden');
    $('.codemonSelection').css('width', '50%');
    $('button.p2').removeClass('hidden');
    $('button[name="start"]').css('top', '700px');
    $('#player2Screen').removeClass('hidden');
    $('#player1Screen').css('width', '50%');
    $('#player1Screen').css('background-size', 'cover');
    $('.codemonImageP1').css('height', '100px');
    $('.player1Options').css('position', 'static');
    $('.player1Options').css('bottom', 'auto');
    $('.impactAnimationP1, .impactAnimationP2').css('margin', '30px 50px');
    $('.impactAnimationP2').css('width', '100px');
    $('.bottomHalf').css('padding', '0');
  };

});
