///<reference path="jquery.js" />
var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var turn = 0;
var playerBet = 0;
var winNumber = 0;
var lossNumber = 0;
var spinResult;
var fruits = "";
var winRatio = 0;
var grapes = 0;
var bananas = 0;
var oranges = 0;
var cherries = 0;
var bars = 0;
var bells = 0;
var sevens = 0;
var blanks = 0;
var spinSound = new Audio('mp/spin.wav');
var winSound = new Audio('mp/win.wav');
var loseSound = new Audio('mp/lose.wav');

//displays a basic output at the start.
spinResult = Reels();
document.getElementById("box1").style.backgroundImage = "url(img/"+spinResult[0]+".png)";
document.getElementById("box2").style.backgroundImage = "url(img/"+spinResult[1]+".png)";
document.getElementById("box3").style.backgroundImage = "url(img/"+spinResult[2]+".png)";
$("div#result>p").text(spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2]);

/* Utility function to show Player Stats */
function showPlayerStats()
{		
	//added class to make multiple modifications
    winRatio = winNumber / turn;
    $(".jackpot").text("Jackpot: " + jackpot);
    $("#playerMoney").text("Player Money: " + playerMoney);
	$(".playerMoney").text(playerMoney);
    $("#playerTurn").text("Turn: " + turn);
    $("#playerWins").text("Wins: " + winNumber);
    $("#playerLosses").text("Losses: " + lossNumber);
    $("#playerWinRatio").text("Win Ratio: " + (winRatio * 100).toFixed(2) + "%");
}

/* Utility function to reset all fruit tallies */
function resetFruitTally() {
    grapes = 0;
    bananas = 0;
    oranges = 0;
    cherries = 0;
    bars = 0;
    bells = 0;
    sevens = 0;
    blanks = 0;
}

/* Utility function to reset the player stats */
function resetAll() {
    playerMoney = 1000;
    winnings = 0;
    jackpot = 5000;
    turn = 0;
    playerBet = 0;
    winNumber = 0;
    lossNumber = 0;
    winRatio = 0;
	$("div#paid").text("00");
	$("div#bet").text("00");
}


/* Check to see if the player won the jackpot */
function checkJackPot() {
    /* compare two random values */
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);
    if (jackPotTry == jackPotWin) {
        alert("You Won the $" + jackpot + " Jackpot!!");
        playerMoney += jackpot;
		document.getElementById("paid").text = jackpot;
        jackpot = 1000;
    }
}

/* Utility function to show a win message and increase player money */
function showWinMessage() {
	//included message, color change, and others
    playerMoney += winnings;
    $("div#winOrLose>p").text("You Won: $" + winnings);
	document.getElementById("winOrLose").style.color = "green";
	$("div#paid").text(winnings);
    resetFruitTally();
    checkJackPot();
	winSound.play();
}

/* Utility function to show a loss message and reduce player money */
function showLossMessage() {
	//included message, color change, and others
    playerMoney -= playerBet;
	jackpot  += parseInt(playerBet);
    $("div#winOrLose>p").text("You Lost!");
	//makes sure it doesn't display number out of range
	if(playerBet>=0 && playerBet<=9999999999){
		$("div#paid").text("-"+playerBet);
	}
	//changes text color to red
	document.getElementById("winOrLose").style.color = "red";
    resetFruitTally();
	loseSound.play();
}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds)
    {
        return value;
    }
    else {
        return !value;
    }
}

/* When this function is called it determines the betLine results.
e.g. Bar - Orange - Banana */
function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                betLine[spin] = "blank";
                blanks++;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                betLine[spin] = "Grapes";
                grapes++;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                betLine[spin] = "Banana";
                bananas++;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                betLine[spin] = "Orange";
                oranges++;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                betLine[spin] = "Cherry";
                cherries++;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                betLine[spin] = "Bar";
                bars++;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                betLine[spin] = "Bell";
                bells++;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                betLine[spin] = "Seven";
                sevens++;
                break;
        }
    }
    return betLine;
}

/* This function calculates the player's winnings, if any */
function determineWinnings()
{
    if (blanks == 0)
    {
        if (grapes == 3) {
            winnings = playerBet * 10;
        }
        else if(bananas == 3) {
            winnings = playerBet * 20;
        }
        else if (oranges == 3) {
            winnings = playerBet * 30;
        }
        else if (cherries == 3) {
            winnings = playerBet * 40;
        }
        else if (bars == 3) {
            winnings = playerBet * 50;
        }
        else if (bells == 3) {
            winnings = playerBet * 75;
        }
        else if (sevens == 3) {
            winnings = playerBet * 100;
        }
        else if (grapes == 2) {
            winnings = playerBet * 2;
        }
        else if (bananas == 2) {
            winnings = playerBet * 2;
        }
        else if (oranges == 2) {
            winnings = playerBet * 3;
        }
        else if (cherries == 2) {
            winnings = playerBet * 4;
        }
        else if (bars == 2) {
            winnings = playerBet * 5;
        }
        else if (bells == 2) {
            winnings = playerBet * 10;
        }
        else if (sevens == 2) {
            winnings = playerBet * 20;
        }
        else if (sevens == 1) {
            winnings = playerBet * 5;
        }
        else {
            winnings = playerBet * 1;
        }
        winNumber++;
        showWinMessage();
    }
    else
    {
        lossNumber++;
        showLossMessage();
    }
    
}
//quits game
$("#quit").click(function () {
    window.location.href = "page2.html";
});
//reset game
$("#reset").click(function () {
    if (confirm("\nDo you want to reset?")) {
            resetAll();
            showPlayerStats();
        }
});
//bet buttons
$("#Bet10").click(function () {
	playerBet = 10;
	game();
});
$("#Bet250").click(function () {
	playerBet = 250;
	game();
});
$("#Bet500").click(function () {
	playerBet = 500;
	game();
});
$("#Bet1000").click(function () {
	playerBet = 1000;
	game();
});
$("#BetAll").click(function () {
	playerBet = playerMoney;
	game();
});
$("#Bet100").click(function () {
	playerBet = 100;
	game();
});
/* When the player clicks the spin button the game kicks off */
$("#spinButton").click(function () {
	playerBet = $("div#betEntry>input").val();
	game();
});
function game(){
	//included message, color change, and others(validations,etc)
	if(playerBet>=0 && playerBet<=9999999999){
		$("div#bet").text(playerBet);
	}
	//changes color during confirm
    if (playerMoney == 0)
    {
		document.getElementById("spinButton").style.backgroundColor = "grey";
        if (confirm("You ran out of Money! \nDo you want to play again?")) {
            resetAll();
            showPlayerStats();
        }
    }
    else if (playerBet > playerMoney) {
		document.getElementById("spinButton").style.backgroundColor = "grey";
        alert("You don't have enough Money to place that bet.");
    }
    else if (playerBet < 0) {
		document.getElementById("spinButton").style.backgroundColor = "grey";
        alert("All bets must be a positive $ amount.");
    }
    else if (playerBet <= playerMoney) {
		//spinResult = shows value. When spin, ... display image at spin result.
        spinResult = Reels();
        fruits = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];
		//changes graphic accordingly
		document.getElementById("box1").style.backgroundImage = "url(img/"+spinResult[0]+".png)";
		document.getElementById("box2").style.backgroundImage = "url(img/"+spinResult[1]+".png)";
		document.getElementById("box3").style.backgroundImage = "url(img/"+spinResult[2]+".png)";
        $("div#result>p").text(fruits);
        determineWinnings();
        turn++;
        showPlayerStats();
    }
    else {
		document.getElementById("spinButton").style.backgroundColor = "grey";
        alert("Please enter a valid bet amount");
    }
	//changes color back once confirm is clicked.
    document.getElementById("spinButton").style.backgroundColor = "#008cba";
}
