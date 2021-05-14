// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/YLzmj0fnn/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";
let button;
let cameraOn = true;
// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(640, 520);
  // Create the video
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
  button = createButton("switch Caméra");
  button.mouseClicked(toggleCamera);
  button.size(100, 20);
  button.position(10, 480);
}

function draw() {
  background(255,255,0);
  // Draw the video
  if (cameraOn){
  image(flippedVideo, 0, 0);

  // Draw the label
  fill(0);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
  }
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}

function toggleCamera(){
  cameraOn = !cameraOn;

  if (cameraOn){
    button.style('background-color', color(0,255,0));
  }
  else {
    button.style('background-color', color(255,0,0));
  }
}
