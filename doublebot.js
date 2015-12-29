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
var betWithMasses = false; //bot checks which color has the highest total bet. If true it bets on this one. if not it bets on the opposite.

var betted = false; //misc variable to avoid double bets
var startingCoins = parseInt(balanceDIV.innerHTML); //get the coins on init to calc earnings

function mainLoop () { //recursive loop to call main func
    setTimeout(function () {
        mainFunc(); //call main func
        mainLoop(); //call itself
    }, refreshTime); //wait

}

mainLoop(); //call loop once to get it started

function mainFunc(){
    updateValues(); //read total values
    if (bannerDIV.innerHTML.indexOf('Rolling in ') == 0) { //checks the status
        var timeString =  bannerDIV.innerHTML.substring(11,99); //parse the time
        timeString = timeString.substring(0,timeString.length-3);//remove the ... from time
        if (parseFloat(timeString) <= 22 && parseFloat(timeString) >= bettingTime){ //avoid multiple betting
            betted = false;
        }
        if (parseFloat(timeString) <= bettingTime){ //if the time is under the betting time
            if (betted == false) {
                bet(); // do the betting
                getTotalEarnings(); //calc your earnings
            }
        }
    }
}

function bet(){
    console.log("Red:" + redTotal + " Green:" + greenTotal + " Black:" + blackTotal + " betWithMasses:"+betWithMasses); //print out the current values
    if (redTotal > greenTotal && redTotal > blackTotal){ //if red is the biggest value
        amountDIV.value = betAmount; //set the amount
        if (betWithMasses){redBtnDIV[0].click(); console.log("betted: " + betAmount + " on red");} else {blackBtnDIV[0].click();console.log("betted: " + betAmount + " on black");} //checks if betWithMasses is toggled and clicks on the button
    } else if(greenTotal > redTotal && greenTotal > blackTotal){//if green is the biggest value
        amountDIV.value = betAmount;//set the amount
        greenBtnDIV[0].click();//clicks on green
        console.log("betted: " + betAmount + " on green")
    } else if(blackTotal > redTotal && blackTotal > greenTotal) {//if black is the biggest value
        amountDIV.value = betAmount;//set the amount
        if (betWithMasses){blackBtnDIV[0].click();console.log("betted: " + betAmount + " on black");} else {redBtnDIV[0].click(); console.log("betted: " + betAmount + " on red");}//checks if betWithMasses is toggled and clicks on the button
    } else {
        console.log('Something is equal. WTF.') //if something is equal
    }
    betted = true;//avoid betting multiple times
}

function updateValues(){ //read total values
    redTotal = parseInt(document.getElementsByClassName('pull-right total')[0].innerHTML);
    greenTotal = parseInt(document.getElementsByClassName('pull-right total')[1].innerHTML);
    blackTotal = parseInt(document.getElementsByClassName('pull-right total')[2].innerHTML);
}

function getTotalEarnings(){//calc your earnings
    console.log("Coins earned/lost: "+(parseInt(document.getElementById('balance').innerHTML - startingCoins)));
}
