
let currentArea = 'Entrance';
const typingSFX = new Audio('assets/sounds/typingSFX.mp3');

const titleText = document.getElementById('texts');
let waiting = false;
let txt = `Player role plays a bailiff and is tasked with evicting Mary Gray. Player role plays a bailiff and is tasked with evicting Mary Gray. Player role plays a bailiff and is tasked with evicting Mary Gray.`;


function checkWaiting(){
    if (!waiting){
        submitInput();
    }
}

function submitInput() {
    const input = document.getElementById("userInput").value;
    const finalInput = input.toLowerCase();
    
    if (currentArea = 'Entrance'){
        if (finalInput =="go north"){
            
            txt =`You're in the Foyer.`;
            
            typeText();
            // alert(finalInput);
        
        }
        else if (finalInput == "go south"){
            txt =`The landlord paid 1500$ to get their apartment back. The more you fuck around, the more you'll find out.`;
            typeText();
        }
        else{
            txt =`You're in the Foyer.`;
            typeText();
        }
    }
   
}

 typeText();
// function typeText(){
//     titleText.innerHTML += txt;
//  }
        function setData() {
       
        return [txt, titleText]
        };

        function typeText() {
        let typingSpeed =0;
     
        titleText.innerHTML ='';
        // res is an array 
        waiting = true;
        typingSFX.play();
        const res =  setData();
        const txt = res[0];

        if (txt.length < 100){
            typingSpeed = 50;
        }
        else if (txt.length >= 100){
            typingSpeed = 25;
        }
        console.log(res);
        // const titleText = res[1];
        let i = 0;
        const timerId = setInterval(() => {
        titleText.innerHTML += txt.charAt(i);
        i++;
        if (i === txt.length) {
        clearInterval(timerId);
        typingSFX.pause();
        typingSFX.currentTime=0;
        waiting = false;
        }
        },typingSpeed);


    }
        // function setData() {
        // const txt = `Watch me as I get typed out before your very eyes using JavaScript's setInterval() function.`;
        // const outputDiv = document.getElementById('typed-content');
        // return [txt, outputDiv]
        // };
        
        // function typeText() {
        // const res =  setData();
        // const txt = res[0];
        // const outputDiv = res[1];
        // let i = 0;
        // const timerId = setInterval(() => {
        // outputDiv.innerHTML += txt.charAt(i);
        // i++;
        // if (i === txt.length) {clearInterval(timerId);}
        // },50);
        // }