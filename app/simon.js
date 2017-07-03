var angular = require('angular');
var app = angular.module('simonApp', []);

app.controller('padController', function($scope) {

  var fourColors = ['green','red','yellow','blue'];
  var simonSequence = [];
  var intervalLength = 3000;
  var nextSound;
  var round;
  var gameInterval;


//Simon interval and gamer interval? or just change interval length
  $scope.isLit = {
  	green: { colorName: 'green', illuminated: false, selectedColor: 'darkgreen' },
  	red: { colorName: 'red', illuminated: false, selectedColor: 'darkred' },
  	yellow: { colorName: 'yellow', illuminated: false, selectedColor: 'gold' },
  	blue: { colorName: 'blue', illuminated: false, selectedColor: 'darkblue' }
  };

  $scope.startGame = function() {
    console.log("start");
    simonSequence.length = 0;
    round = 0;
    //gameInterval = setInterval(function() {$scope.$apply(simonTurn)}, intervalLength);
    simonTurn();
  }

  function simonTurn() {
    buildSequence();
    //intervalLength = 3000 * round;
    //clearInterval(gameInterval);
    //gameInterval = setInterval(function() {$scope.$apply(yourTurn)}, intervalLength);
  }

  function buildSequence() {
  	round ++;
    nextSound = fourColors[(Math.floor(Math.random() * 4))];
    simonSequence.push(nextSound);   
    flashSequence();
  }

  function flashSequence() {
  	for (var i = 0; i < simonSequence.length; i ++) {
  	  console.log($scope.isLit[simonSequence[i]]);
  	  $scope.isLit[simonSequence[i]]['illuminated'] = true;
  	  $scope[$scope.isLit[simonSequence[i]].colorName] = {'background-color' : $scope.isLit[simonSequence[i]]['selectedColor']};
  	}
  }

  $scope.$watch('isLit', function(newVal, oldVal) {
  	console.log('watched')
    }, true);

///////
  function endTurn() {
    clearInterval(gameInterval);
  }

  function yourTurn() {
 
    intervalLength = 3000;
    clearInterval(gameInterval);
    gameInterval = setInterval(function() {$scope.$apply(simonTurn)}, intervalLength);
  }

  function incorrectSelection() {
    youLost();
  }
  function youWon() {
    endGame();
  } //20
  function youLose() {
  	endGame();
  }
  function display() {}
  function buttonSound() {}
  /////
  function strict() {}
  function tempo() {}

});