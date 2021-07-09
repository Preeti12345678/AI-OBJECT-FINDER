status="";
function setup(){
    canvas=createCanvas(400,400);
    canvas.position(500,350);
    video=createCapture(VIDEO);
    video.hide();
}
function start(){
    object_detector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    object=document.getElementById("object_name").value;
}
function modelLoaded(){
    console.log("Model Loaded");
}
function draw(){
    image(video,0,0,400,400);
}