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

var bettingTime = 2;
var refreshTime = 1000;
var betAmount = 10;
var betted = false;

function mainLoop () {
    setTimeout(function () {
        mainFunc();
        mainLoop();
    }, refreshTime);

}

mainLoop();

function mainFunc(){

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
