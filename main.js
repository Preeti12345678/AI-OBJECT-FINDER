status="";
objects=[];
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
    status=true;
}
function draw(){
    image(video,0,0,400,400);
    if(status!=""){
        object_detector.detect(video,gotResult);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Objects Detected";
            document.getElementById("object_found").innerHTML="Objects Detected: "+objects.length;
            percent=floor(objects[i].confidence*100);
            fill("red");
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("red");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label==object){
                document.getElementById("status").innerHTML=object+" found";
                synth= window.speechSynthesis;
                speak_data=object+" found";
                utterThis = new SpeechSynthesisUtterance(speak_data);
                synth.speak(utterThis);
            }
            else{
                document.getElementById("status").innerHTML=object+" NOT found";
                synth= window.speechSynthesis;
                speak_data2=object+" NOT found";
                utterThis2 = new SpeechSynthesisUtterance(speak_data2);
                synth.speak(utterThis2);
            }
        }

    }
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects=results;
}

