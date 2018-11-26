# WDI Project 1 - Codémon <img style='float: right' src='https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png'>
---

<a href='http://matthunterking.com/WDI-Project1/'>
<img style='width: 100%;' src='/screenshots/Logo_codemon.png' alt='logo screenshot'></a>

### Project Overview and Motivation
Codémon is a simplified version of the 1996 Gameboy game Pokémon Red/Blue. Players select and control one of three Codémon and battle them against each other.

This was my first project as part of the General Assembly Web Development Immersive course. The objective was to build a single page two player game.

### Timeframe
1 week (March 2018)

---

### Technologies used

* HTML5 + HTML5 Audio
* SCSS
* CSS Animation
* Javascript (ECMAScript6)
* jQuery
* GitHub

---

### User Journey
Players start in the bedroom of the original character from the Pokémon games.
They can move around using the keyboard arrow keys. When they walk over to the
other character who is sitting on the computer after a short animation the main
game begins.

![screenshot1](/screenshots/screenshot1.png)

Once at the main screen players enter their names and click the 'Fight' button.
To play the one player game click on the 'Play against the computer button'.

![screenshot2](/screenshots/screenshot2.png)

The player is then taken to the Codémon selection screen where they can choose
the character they would like to control.

![screenshot3](/screenshots/screenshot3.png)

After a short animation the battle begins. Players take it in turns to click
on their Codémon's moves.

![screenshot6](/screenshots/screenshot6.png)

Once one of the Codémon's health reaches zero it faints and the other player is
the winner.

![screenshot5](/screenshots/screenshot5.png)

---

### Approach

After drawing out my wireframes I identified the four main views the user would
go through to play the game. The most complex of these was the battle itself so
I started there.

I created 2 Codémon characters, some buttons and simple moves to start working on
how the battle mechanics would work. An early development version can be seen below.

![screenshot9](/screenshots/screenshot9.png)

Later on in the project I added in attack
and defence stats as well as attack range to add a degree of randomness to the
game.

Once I had the basic battle functionality working I move onto the user journey
creating the character selection screen and start screen. I added more structure
to my html file and also started to create the css. After I had completed this I
combined the two files into one and began working on refining the game and adding
in animations.

Finally I added the game intro scene with the controllable trainer character.

### Creating Codémon Characters

One part of the code I was really happy with was setting up a Codémon class, meaning that I would able able to quickly add new characters into the game.

```
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
```
---

### Challenges

Even though in the final game there are only three Codémon to choose from there
are a lot of variables and functions to keep track of. This meant that I had to
try and be as consistent as possible with naming conventions and scope. It
was also challenging to find a formula to calculate the result of attacks which
kept the game fair and well paced.

### Wins

Adding the audio, animation, images and timing events really brought the game to
life. The addition of a computer player and alternative views when playing against it
was also very rewarding (screen shot of the 1 player game below).

![screenshot7](/screenshots/screenshot7.png)

I was really
pleased to be able to add additional start screen with the controllable character
as it's a nice callback to the original games.


---

### Future Features

If I had more time I would work on make the game mobile responsive also  add more characters and a bigger variety of moves.
