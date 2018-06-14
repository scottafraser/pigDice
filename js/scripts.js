function Player (name, dieroll, total, score, robot) {
  this.name = name;
  this.dieroll = dieroll;
  this.total = total;
  this.score = score;
  this.robot = robot;
}

Player.prototype.playerInfo = function () {
  return this.name + this.score + this.total;
};

Player.prototype.rollDice = function () {
    this.dieroll = Math.floor((Math.random() * 6) + 1);
    return this.dieroll
}

Player.prototype.pointsTotal = function () {
  var points = this.dieroll;
  if (points !== 1) {
    if (this.total + this.score + points >= 100) {
      this.total = this.total + this.score + points
      $('#victory').toggle();
      $('#victory').text(this.name + " wins!");
    } else {
    this.score = this.score + points
    }
  } else {
    this.score = 0
    this.changePlayer();
    this.robotFunction();
  }
 return this.score
}

Player.prototype.scoreupdate = function () {
$('#diceResult').text(this.rollDice());
$('#score').text(this.pointsTotal());
$('#tally').text(this.runningtotal);
$('#total').text(this.total);
$('#p1n').text(this.name);
};


Player.prototype.changePlayer = function() {
  $('#gotOne').toggle(500);
  $('#gotOne').delay(1400).toggle(200);
  $('#p1, #p1c').toggle(2000);
  $('#p2, #p2c').toggle(2000);
  clear();
}

function clear() {
  $('#diceResult').text('0')
  $('#score').text('0')
}

Player.prototype.holdBits = function (data) {
  this.score = data
  this.runningtotal = 0
  this.score = 0
}

Player.prototype.hold = function () {
  this.total = this.total + this.score;
  return this.total
}


function robotRoll() {
  var rolls = 0
  this.dieroll = Math.floor((Math.random() * 6) + 1)
  rolls = (this.dieroll)
}

Player.prototype.robotFunction = function() {
  var rolls = 0
  this.dieroll = Math.floor((Math.random() * 6) + 1)
  rolls = (this.dieroll)
  if (this.dieroll !== 1) {
    this.dieroll = Math.floor((Math.random() * 6) + 1)
    rolls = (rolls + this.dieroll)
    if (this.dieroll !== 1) {
      this.dieroll = Math.floor((Math.random() * 6) + 1)
      rolls = (rolls + this.dieroll)
    $('#player2Score').text(rolls);
  } else this.changePlayer();
} else this.changePlayer();
// } this.changePlayer();
}



$(document).ready(function() {
  if (confirm("Click OK to Play against Computer...")) {
    var player2 = new Player ('ROBOT!', 0, 0, 0, 1);
  } else {
    var player2 = new Player ('Jesus', 0, 0, 0, 0);
  }
  var player1 = new Player ('Dude', 0, 0, 0, 0);

  $('#diceButton1, #diceButton2').click(function(event) {
    event.preventDefault();
    if (this.id == 'diceButton1') {
      player1.scoreupdate();
    } else if (this.id == 'diceButton2') {
      player2.scoreupdate();
    }
  });

$('#holdButton1, #holdButton2').click(function (event) {
    event.preventDefault();
    $('#p1, #p1c').toggle(300);
    $('#p2, #p2c').toggle(300);
       if (this.id == 'holdButton1') {
          var data = player1.hold()
          player1.holdBits(data)
          $('#player1Score').text(data);
          if (player2.robot === 1) {
            player2.robotFunction()
          }
       } else if (this.id == 'holdButton2') {
          var data = player2.hold()
          player2.holdBits(data)
          $('#player2Score').text(data);
       }
      clear();;
  });
});
