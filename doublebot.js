var bannerDIV = document.getElementById('banner');
var balanceDIV = document.getElementById('balance');

var redBtnDIV = document.getElementsByClassName('btn btn-danger btn-lg  btn-block betButton');
var redTotalDIV = document.getElementsByClassName('pull-right total')[0];
var redTotal = parseInt(document.getElementsByClassName('pull-right total')[0].innerHTML);

var greenBtnDIV = document.getElementsByClassName('btn btn-success btn-lg  btn-block betButton');
var greenTotalDIV = document.getElementsByClassName('pull-right total')[1];
var greenTotal = parseInt(document.getElementsByClassName('pull-right total')[1].innerHTML);

var blackBtnDIV = document.getElementsByClassName('btn btn-inverse btn-lg  btn-block betButton');
var blackTotalDIV = document.getElementsByClassName('pull-right total')[2];
var blackTotal = parseInt(document.getElementsByClassName('pull-right total')[2].innerHTML);

var amountDIV = document.getElementById('betAmount');

var bettingTime = 2; //the time it waits until it sets the bet
var refreshTime = 1000; // the time the loop waits until it refreshes
var betAmount = 10; //amount of coins the bot bets

var betted = false; //misc variable to avoid double bets
var startingCoins = parseInt(balanceDIV.innerHTML);

function mainLoop () { //recursive loop to call main func
    setTimeout(function () {
        mainFunc();
        mainLoop();
    }, refreshTime);

}

mainLoop();

function mainFunc(){
    updateValues();
    getTotalEarnings();
    if (bannerDIV.innerHTML.indexOf('Rolling in ') == 0) {
        var timeString =  bannerDIV.innerHTML.substring(11,99);
        timeString = timeString.substring(0,timeString.length-3);
        if (parseFloat(timeString) <= 22 && parseFloat(timeString) >= bettingTime){
            betted = false;
        }
        if (parseFloat(timeString) <= bettingTime){
            if (betted == false) {
                bet();
            }
        }
    }
}

function bet(){
console.log("Red:" + redTotal + " Green:" + greenTotal + " Black:" + blackTotal);
    if (redTotal > greenTotal && redTotal > blackTotal){
        amountDIV.value = betAmount;
        redBtnDIV[0].click();
        console.log("betted: " + betAmount + " on red")
    } else if(greenTotal > redTotal && greenTotal > blackTotal){
        amountDIV.value = betAmount;
        greenBtnDIV[0].click();
        console.log("betted: " + betAmount + " on green")
    } else if(blackTotal > redTotal && blackTotal > greenTotal) {
        amountDIV.value = betAmount;
        blackBtnDIV[0].click();
        console.log("betted: " + betAmount + " on black")
    } else {
        console.log('Something is equal. WTF.')
    }
    betted = true;
}

function updateValues(){
    redTotal = parseInt(document.getElementsByClassName('pull-right total')[0].innerHTML);
    greenTotal = parseInt(document.getElementsByClassName('pull-right total')[1].innerHTML);
    blackTotal = parseInt(document.getElementsByClassName('pull-right total')[2].innerHTML);
}

function getTotalEarnings(){
    console.log("Coins earned/lost: "+(parseInt(document.getElementById('balance') - startingCoins)));
}
