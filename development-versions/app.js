console.log('Codemon GO!!!!');
$(function(){

  const YavaScript = {
    name: 'YavaScript',
    hp: 40,
    image: '',
    move1: 'moveA',
    move2: 'moveB'
  };

  const csMess = {
    name: 'CSMess',
    hp: 40,
    image: '',
    move1: 'moveB',
    move2: 'moveC'
  };

  const moves = {
    moveA: 10,
    moveB: 5,
    moveC: 1
  };

  const $p1Attack1 = $('#p1Attack1');
  const $p2Attack1 = $('#p2Attack2');

  let p1HP = 40;
  let p2HP = 40;

  $('.p1HP').text(`Player 1 HP ${p1HP}`);
  $('.p2HP').text(`Player 2 HP ${p2HP}`);


  $p1Attack.on('click', function() {
    console.log('player1 attacked!');
    p2HP -= 10;
    $('.p2HP').text(`Player 2 HP ${p2HP}`);
    checkwinner();
  });

  $p2Attack.on('click', function() {
    console.log('player2 attacked!');
    p1HP -= 10;
    $('.p1HP').text(`Player 1 HP ${p1HP}`);
    checkwinner();
  });

  const checkwinner = function() {
    if (p1HP === 0) {
      console.log('player 2 wins!');
    } else if (p2HP === 0) {
      console.log('player 1 wins!');
    } else {
      return;
    }
  };

});
//Variables

//player 1 - Name
//chosen codemon

//player 2 - Name
//chosen codemon

//codemon - Name, Move 1, Move 2, Move 3, Move 4, HP

//Moves - Name, HPeffect
