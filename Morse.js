var morseline;
var lineSpeed = 30;
var fps = 30;
var dispText="";

var releaseTimer = 0;
var pressingTimer = 0;
var isReading = false;
var signalList = [];

var tuOrTonShikii = 0.25;
var oneCharTime = 0.5;

function setup() {
  frameRate(fps);
  createCanvas(windowWidth, windowHeight);
  fullscreen();
  fill(255);
  stroke(255);
  textSize(20);
  morseline = new MorseLine(height / 5 * 2, width / 3 * 2);
}

function draw() {
  background(80);
  for(var i=0;i<lineSpeed;i++){
    morseline.move();
  }
  morseline.display();
  mouseCheck();
  text(dispText, width / 10,height / 5 * 4);
}

function mouseCheck(){
    if (mouseIsPressed) {
      releaseTimer = 0;
      if (pressingTimer == 0) {
        isReading = true;
      }
      pressingTimer++;
    } else {
      if (pressingTimer != 0) {
        if (pressingTimer < tuOrTonShikii * fps) {
          signalList.push(MorseSignal.ton);
        } else {
          signalList.push(MorseSignal.tu);
        }
        pressingTimer = 0;
      }

      if (isReading) {
        releaseTimer++;
        if (releaseTimer > oneCharTime * fps) {
          isReading = false;
          var word = getMorseWord(signalList);
          if(word!=""){
            dispText += word;
            dispText += " ";
          }
          signalList.length=0;
        }
      }
    }
  }


function keyPressed(){
  if ( key == ' ' ) {
    dispText="";
  }
}

class MorseLine {
  constructor( y, movePoint) {
    this.y = y;
    this.movePoint = movePoint;
    this.lines = new Array(width);
    for (var i=0; i < width; i++) {
      this.lines[i] = 0;
    }
    this.angle = 0;
    this.waveHeight = 0;
  }

  display() {
    for (var i=0; i < this.lines.length - 1; i++) {
      line(i, this.y + this.lines[i], i + 1, this.y + this.lines[i + 1]);
    }
  }

  move() {    
    if (mouseIsPressed || !mouseIsPressed && this.waveHeight != 0) {
      this.updateWaveHeight();
      this.lines[this.movePoint] = this.waveHeight;
    }    
    for (var i = 1; i < this.lines.length; i++) {
      this.lines[i-1] = this.lines[i];
    }
    this.lines[this.lines.length-1] = 0;
  }

  updateWaveHeight() {
    if (this.waveHeight == 0) {
      this.katamuki = random(height / 10, height / 3);
    }
    this.angle += height / 10;
    if (this.angle >= 360) {
      this.angle = 0;
    }
    this.waveHeight = sin(radians(this.angle)) * this.katamuki;
  }
}

var MorseSignal = {tu:0, ton:1};

var MorseWord = {
  "A" : [MorseSignal.ton, MorseSignal.tu] , 
  "B" : [MorseSignal.tu, MorseSignal.ton, MorseSignal.ton, MorseSignal.ton] , 
  "C" : [MorseSignal.tu, MorseSignal.ton, MorseSignal.tu, MorseSignal.ton] , 
  "D" : [MorseSignal.tu, MorseSignal.ton, MorseSignal.ton] , 
  "E" : [MorseSignal.ton] , 
  "F" : [MorseSignal.ton, MorseSignal.ton, MorseSignal.tu, MorseSignal.ton] , 
  "G" : [MorseSignal.tu, MorseSignal.tu, MorseSignal.ton] , 
  "H" : [MorseSignal.ton, MorseSignal.ton, MorseSignal.ton, MorseSignal.ton] , 
  "I" : [MorseSignal.ton, MorseSignal.ton] , 
  "J" : [MorseSignal.ton, MorseSignal.tu, MorseSignal.tu, MorseSignal.tu] , 
  "K" : [MorseSignal.tu, MorseSignal.ton, MorseSignal.tu] , 
  "L" : [MorseSignal.ton, MorseSignal.tu, MorseSignal.ton, MorseSignal.tu] , 
  "M" : [MorseSignal.tu, MorseSignal.tu] , 
  "N" : [MorseSignal.tu, MorseSignal.ton] , 
  "O" : [MorseSignal.tu, MorseSignal.tu, MorseSignal.tu] , 
  "P" : [MorseSignal.ton, MorseSignal.tu, MorseSignal.tu, MorseSignal.ton] , 
  "Q" : [MorseSignal.tu, MorseSignal.tu, MorseSignal.ton, MorseSignal.tu] , 
  "R" : [MorseSignal.ton, MorseSignal.tu, MorseSignal.ton] , 
  "S" : [MorseSignal.ton, MorseSignal.ton, MorseSignal.ton] , 
  "T" : [MorseSignal.tu] , 
  "U" : [MorseSignal.ton, MorseSignal.ton, MorseSignal.tu] , 
  "V" : [MorseSignal.ton, MorseSignal.ton, MorseSignal.ton, MorseSignal.tu] , 
  "W" : [MorseSignal.ton, MorseSignal.tu, MorseSignal.tu] , 
  "X" : [MorseSignal.tu, MorseSignal.ton, MorseSignal.ton, MorseSignal.tu] , 
  "Y" : [MorseSignal.tu, MorseSignal.ton, MorseSignal.tu, MorseSignal.tu] , 
  "Z" : [MorseSignal.ton, MorseSignal.ton, MorseSignal.tu, MorseSignal.tu] , 
  "0" : [MorseSignal.tu, MorseSignal.tu, MorseSignal.tu, MorseSignal.tu, MorseSignal.tu] , 
  "1" : [MorseSignal.ton, MorseSignal.tu, MorseSignal.tu, MorseSignal.tu, MorseSignal.tu] ,
  "2" : [MorseSignal.ton, MorseSignal.ton, MorseSignal.tu, MorseSignal.tu, MorseSignal.tu] ,
  "3" : [MorseSignal.ton, MorseSignal.ton, MorseSignal.ton, MorseSignal.tu, MorseSignal.tu] ,
  "4" : [MorseSignal.ton, MorseSignal.ton, MorseSignal.ton, MorseSignal.ton, MorseSignal.tu] ,
  "5" : [MorseSignal.ton, MorseSignal.ton, MorseSignal.ton, MorseSignal.ton, MorseSignal.ton] ,
  "6" : [MorseSignal.tu, MorseSignal.ton, MorseSignal.ton, MorseSignal.ton, MorseSignal.ton] ,
  "7" : [MorseSignal.tu, MorseSignal.tu, MorseSignal.ton, MorseSignal.ton, MorseSignal.ton] ,
  "8" : [MorseSignal.tu, MorseSignal.tu, MorseSignal.tu, MorseSignal.ton, MorseSignal.ton] ,
  "9" : [MorseSignal.tu, MorseSignal.tu, MorseSignal.tu, MorseSignal.tu, MorseSignal.ton] ,
};

function getMorseWord(signals){
  for(var word in MorseWord){
    if (MorseWord[word].toString() == signals.toString()){
      return word;
    }
  }
  return "";
}
