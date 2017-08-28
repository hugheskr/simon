var angular = require('angular');
var app = angular.module('simonApp', []);

app.controller('padController', function($scope, $rootScope, $timeout, $interval) {

//Declare some variables
  var fourColors = ['green','red','yellow','blue'];
  var intervalLength = 3000;
  var nextSound;

  $rootScope.isStrict = false;
  $rootScope.simonSequence = [];
  $rootScope.attemptSequence = [];
  $rootScope.pushCount;
  $rootScope.simonPromise;
  $rootScope.playerPromise;
  $rootScope.disable = true;
  $rootScope.round;
  $rootScope.speed;
  $rootScope.message = ' ';
  $rootScope.isLit = {
  	green: { colorName: 'green', selectedColor: '#097626', nonSelectedColor: '#34A853', sound: 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3' },
  	red: { colorName: 'red', selectedColor: '#9F0E03', nonSelectedColor: '#EA4335', sound: 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3' },
  	yellow: { colorName: 'yellow', selectedColor: '#9A7200', nonSelectedColor: '#FBBC05', sound: 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3' },
  	blue: { colorName: 'blue', selectedColor: '#0759E4', nonSelectedColor: '#4285F4', sound: 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3' }
  };

//Watch these for changes
  $scope.$watch('isLit', function(newVal, oldVal) {
    }, true);

  $scope.$watch('message', function(newVal, oldVal) {
    }, true);

//Define Functions
  $rootScope.gameSwitch = function(game) {
  	if(!game) {
  	  $rootScope.disable = true;
  	  $interval.cancel($rootScope.playerPromise);
  	  $interval.cancel($rootScope.simonPromise);
  	  $timeout.cancel($rootScope.yourTurnPromise);
  	  //$timeout.cancel($rootScope.flipPromise);
  	  $timeout.cancel($rootScope.startGamePromise);
  	  $timeout.cancel($rootScope.flashSequencePromise);
  	  $rootScope.simonSequence.length = 0;
      $rootScope.attemptSequence.length = 0;
      $rootScope.round = 0;
      $rootScope.pushCount = 0;
  	  $rootScope.message = '';
  	  $rootScope.round = '';
  	}
  }

  $scope.startGame = function() {
    console.log('start');
    $rootScope.simonSequence.length = 0;
    $rootScope.attemptSequence.length = 0;
    $rootScope.round = 0;
    $rootScope.pushCount = 0;
    simonTurn();
  }

  $scope.switchStrict = function() {
  	$rootScope.isStrict = !$rootScope.isStrict;
  	console.log($rootScope.isStrict);
  }

  function simonTurn() {
  	$rootScope.disable = true;
  	$rootScope.message = 'WAIT...';
    buildSequence();
  }

  function buildSequence() {
  	$rootScope.round ++;
    nextSound = fourColors[(Math.floor(Math.random() * 4))];
    $rootScope.simonSequence.push(nextSound);  
    console.log($rootScope.simonSequence);
    flashSequence();
  }

  function flashSequence() {
  	$rootScope.message = 'WAIT...'
  	$rootScope.disable = true;
  	var i = 0;
  	console.log($rootScope.simonSequence); 
  	if($rootScope.round < 5) {
      $rootScope.speed = 1000;
  	} else if($rootScope.round >= 5 && $rootScope.round < 9) {
      $rootScope.speed = 900;
  	} else if($rootScope.round >= 9 && $rootScope.round < 13) {
      $rootScope.speed = 800;
  	} else if($rootScope.round >= 13) {
      $rootScope.speed = 700;
  	}

  	$rootScope.simonPromise = $interval(simonInterval, $rootScope.speed, $rootScope.round);

  	function simonInterval() {
  	  console.log($rootScope.isLit[$rootScope.simonSequence[i]]);
      $rootScope[$rootScope.isLit[$rootScope.simonSequence[i]].colorName] = {'background-color' : $rootScope.isLit[$rootScope.simonSequence[i]]['selectedColor']};  
      var audio = new Audio($rootScope.isLit[$rootScope.simonSequence[i]]['sound']);
      audio.play();
  	  
  	  //Flip back to normal color     
  	  $rootScope.flipPromise = $timeout(flipColor, 500, true, i);
  	  
  	  function flipColor(i) {
  	  $rootScope[$rootScope.isLit[$rootScope.simonSequence[i]].colorName] = {'background-color' : $rootScope.isLit[$rootScope.simonSequence[i]]['nonSelectedColor']}; 
  	  }	      
  	  i++;      
  	}
    $rootScope.yourTurnPromise = $timeout(yourTurn , 1000 + ($rootScope.round * $rootScope.speed));
  }

  function yourTurn() {
  	$rootScope.disable = false;
  	$rootScope.pushCount = 0;
  	$rootScope.attemptSequence.length = 0;
  	var countDown = $rootScope.round + 3;
  	$rootScope.message = 'GO!'
  	console.log('GO!');
  	$rootScope.playerPromise = $interval(countDownInterval, 1000, $rootScope.round + 3);
  	function countDownInterval() {
  	    countDown --;
  	    if (countDown !== 0) {
  	      $rootScope.message = countDown;
  	    } else if( $rootScope.isStrict === true) {
  	      youLoseStrict();
  	    } else {
  	      flashSequence();
  	    }
  	}
  }

  $scope.pushed = function(event) {
    $rootScope.attemptSequence.push(event.target.id);
    var audio = new Audio($rootScope.isLit[event.target.id].sound);
    audio.play();

    $rootScope[$rootScope.isLit[event.target.id].colorName] = {'background-color' : $rootScope.isLit[event.target.id]['selectedColor']};
    $rootScope.unpressPromise = $timeout(flipColor, 300, true);
    function flipColor() {
      $rootScope[$rootScope.isLit[event.target.id].colorName] = {'background-color' : $rootScope.isLit[event.target.id]['nonSelectedColor']};
    }       

    $rootScope.pushCount ++;
    if($rootScope.simonSequence[$rootScope.pushCount - 1] !== $rootScope.attemptSequence[$rootScope.pushCount - 1] && $rootScope.isStrict === true) {
      $rootScope.disable = true;
      $interval.cancel($rootScope.playerPromise);
      $rootScope.message = 'INCORRECT!';
      youLoseStrict();
    } else if($rootScope.simonSequence[$rootScope.pushCount - 1] !== $rootScope.attemptSequence[$rootScope.pushCount - 1] && $rootScope.isStrict === false) {
      $rootScope.disable = true;
      $interval.cancel($rootScope.playerPromise);
      $rootScope.message = 'INCORRECT!';
      $rootScope.flashSequencePromise = $timeout(flashSequence, 2000);
    } else if($rootScope.pushCount === $rootScope.round) {
  	  youWonRound();
  	}
  }

  function youWonRound() {
  	$interval.cancel($rootScope.playerPromise);
    console.log($rootScope.simonSequence); 
    if($rootScope.round != 20) {
      simonTurn();
    } else {
      $rootScope.message = 'YOU WON!';
      return;
    }
  }

  function youLoseStrict() {
  	$rootScope.startGamePromise = $timeout($scope.startGame, 2000);
  }
});