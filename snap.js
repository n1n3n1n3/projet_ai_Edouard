let video;
let pg;
let lastSnapShot;

let timer = 0;
let showLatestPhoto = false;

let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/YLzmj0fnn/';
let label = "";

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(640, 480);

  pixelDensity(1);

  video =  createCapture({
  audio: false,
  video: {
    facingMode: {
      exact: "environment"
    }
  }
});
  video.size(640, 480);
  video.hide();

  pg = createGraphics(width, height);
  pg.textSize(32);
  pg.textAlign(CENTER);

  boutonAnalyze = createButton("analyzer l'image");
  boutonAnalyze.position(10, 560);
  boutonAnalyze.mousePressed(analyzeImage);
}


function draw() {
  background(122);
  image(video, 0, 0);

  //Show the last image taken for a short period
  if (showLatestPhoto) {
    image(pg, 0, 0);
    tint(254, 250, 202); //Optional tint
  } else {
    tint(255);
  }

  //Flash effect
  if (timer < 5) {
    background(timer * 25 + 130);
  } else if (timer < 8) {
    background(255);
  }

  timer++;

  fill(255, 255, 0);
  noStroke();
  rect(0, height- 20, width, height);
  fill(0);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}


function mousePressed() {
 if(mouseX > 0 && mouseX < 640 && mouseY > 0 && mouseY < 480){
    if (showLatestPhoto){
      showLatestPhoto = false;
    }
    else {
      takePicture();
    }
  }
}


function takePicture() {
  pg.image(video, 0, 0);

  timer = 0;
  showLatestPhoto = true;
}

function analyzeImage(){
  console.log('x');
  classifier.classify(pg, gotResult);
}

function gotResult(error, results){
  console.log(results);
  if (error){
    console.error(error);
    label = "non classifié";
  }

  label = results[0].label;
}

function voirStats(){
  print('x');
  result = loadStrings('stats.txt');
  print(result.length);
  print(result);
  if (result.length > 0) {
    for (let i = 0; i < result.length; i++) {
        text(result[i], 20, 60 + i * 20);
    }
}
  // nbDentree = 0;
  // nbSucces = 0;
  // print(result);
  // for(let i = 0; i < result.length; i++){
  //   nbSucces += result[i];
  //   nbDentree += 1;
  // }
  // print(nbDentree);
  // print(nbSucces);
  // print(result.length);
}
