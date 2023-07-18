let xAxis=document.getElementById("xAxis");
let yAxis=document.getElementById("yAxis");
let watch=document.getElementById('watch');
let watchCon =document.getElementById('watchContainer')
let playBtn=document.getElementById("play")
let stop_resume=document.getElementById("R_S");
let root=document.querySelector(":root");
let rootStyle=getComputedStyle(root);
let colorPicked=document.getElementById("color");
let setColor=document.getElementById("set");
let setAsDef=document.getElementById("setAsDef");
let msec=document.getElementById("msec");
let sec=document.getElementById("sec");
let min=document.getElementById("min");
 let userSetColor;
//theme set by user
userSetColor=localStorage.getItem("color");
root.style.setProperty("--watchColor",userSetColor); 
//rotating of box
xAxis.oninput=()=>{
 watchCon.style.transform=`rotateY(${yAxis.value}deg) rotateX(${xAxis.value}deg)`;
}
yAxis.oninput=()=>{
   watchCon.style.transform=` rotateX(${xAxis.value}deg) rotateY(${yAxis.value}deg)`;
   
 }
 //function to start stopWatch
let tempMsec=0, tempSec=0,tempMin=0;
let incrementer;
function counter(){
    incrementer=  setInterval(()=>{
        tempMsec++;
        if(tempMsec<10){
            msec.innerText="0"+tempMsec;
        }else{
             msec.innerText=tempMsec;
        }
        
        if(tempMsec==99){
           tempSec++;
           if(tempSec<10){
            sec.innerText="0"+tempSec;
        }else{
             sec.innerText=tempSec;
        }
        if(tempSec>59){
            tempSec=0;
            tempMin++;
        if(tempMin<10){
            min.innerText="0"+tempMin;
        }else{
            min.innerText=tempMin;
        }
        }
         
           tempMsec=0;
             
       }
},10)}
 //start the stop watch
 playBtn.addEventListener("click",()=>{
   
    if(playBtn.name=="reset"){
        playBtn.name="play";
        playBtn.children[0].className="fa-solid fa-play";
        stop_resume.name="stop";
        stop_resume.children[0].className="fa-solid fa-stop";
        clearInterval(incrementer);
        sec.innerText="00";
        min.innerText="00";
        msec.innerText="00"; 
        stop_resume.removeEventListener("click",stop_res);
        
    }else if(playBtn.name=="play"){
        playBtn.name="reset";
        playBtn.children[0].className="fa-solid fa-rotate-right";
        tempMsec=0;
        tempSec=0;
        tempMin=0;
         counter(); 
         stop_resume.addEventListener("click",stop_res);
    }
   
  
    },10);
//stop and resume function
function stop_res(){
    if(stop_resume.name=="stop"){
        clearInterval(incrementer);
        stop_resume.name="resume";
        stop_resume.children[0].className="fa-solid fa-pause";
   }else if(stop_resume.name=="resume"){
       tempMsec=parseInt(msec.innerText);
       tempSec=parseInt(sec.innerText);
       tempMin=parseInt(min.innerText);
       stop_resume.name="stop";
       stop_resume.children[0].className="fa-solid fa-stop";
       counter();
   }
}
   
   
 //color picking 
 setColor.onclick=()=>{
    root.style.setProperty("--watchColor",colorPicked.value);
 }
 //permanently set the color
 setAsDef.onclick=()=>{
    root.style.setProperty("--watchColor",colorPicked.value);
    userSetColor=colorPicked.value;
    localStorage.setItem("color",userSetColor);
 }


  
