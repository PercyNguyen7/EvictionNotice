

const typingSFX = new Audio('assets/sounds/typingSFX.mp3');
const typingSFX2 = new Audio('assets/sounds/typingSFX.mp3');
const doorbellBtnSFX = new Audio('assets/sounds/doorbellBtn.mp3');
typingSFX.volume =0.6;
typingSFX2.volume =0.4;
const doorKnockSFX = new Audio('assets/sounds/knockDoor.mp3');
let currentArea = 'Entrance';

const westKW = ['west','go left'];
const northKW = ['north','go in', 'enter'];
const southKW = ['south','go back'];
const eastKW = ['east','go right','back'];
const userInput = document.getElementById('userInput');
const areaText = document.getElementById('text1');
const objText = document.getElementById('text2');
const actionText = document.getElementById('action-text');
let waiting = false;

let metMary = false;
let mailTaken = false;
let pictureTaken = false;

let txt = `In front of you lies Mary Gray's apartment. You're here to evict the tenant. Apartment 704. Female. Born in 1956.`;
let txt2 =`Strangely enough the front door is wide open. On your right is a doorbell.`;
// let actionTxt = ``;
let actionTxt ='Type a command and Press Enter';

typeText3();
function checkWaiting(){
    if (!waiting){
        submitInput();
        userInput.value='';
    }
}

function submitInput() {
    switch(currentArea){
        case "Entrance":
            entranceState();
            console.log('entrace-state');
        break;
        case "Foyer":
            foyerState();
            console.log('foyer-state');
          break;
        case "Kitchen":
            kitchenState();
          break;
        case "LivingRoom":
            livingRoomState();
          break;
        case "Bedroom":
            bedRoomState();
          break;
        default:
          text = "You're cheating son...";
    }
}
let yelledMary = false;
function entranceState(){
    const input = document.getElementById("userInput").value;
    const finalInput = input.toLowerCase();
    const firstWord = finalInput.split(" ")[0];
    const knockDoorKW = ['knock','door'];
   
    // if contains north keywords, or n,
    actionTxt =` `; 
    // if (currentArea === 'entrance'){
        if (
            // northKW.some(el => finalInput.includes(el)) 
            
            firstWord === 'north'  && yelledMary && yelledMary || firstWord === 'n'  && yelledMary){
                txt = `You step foot into the foyer. It reeks of mold and mildew. To your left is a kitchen, and to your right is the living room. Down the hallway is a door to what you suspect a bedroom.`;

                txt2=`Unopened mail enveloppes scatter on the ground. The hallway's walls are decorated with a dozen framed picture.`;
        
                if (!mailTaken && pictureTaken){
                    txt2=`Unopened mail enveloppes scatter on the ground.`;
                }
                else if (mailTaken && !pictureTaken){
                    txt2=`The hallway's walls are decorated with a dozen framed picture.`;
                }
                else if (mailTaken && pictureTaken){
                    txt2=` `;
                }
                currentArea = 'Foyer';
                typeText();
                actionTxt =` `;
        }
        else if (firstWord ==='north '&&  !yelledMary || firstWord === 'n'  && !yelledMary){
            actionTxt =`You're well versed in the law. Even though entering an open door will be peaceful entry, it's good courtesy to let the tenant know before coming in.`;
        }
        else if (firstWord === 'look'){
            actionTxt =`Look at what?`;
        }
        else if (firstWord==='look' && finalInput.includes('door')){
            actionTxt =`The door is right in front of you. Some of us have a job. Yours happens to be evicting tenant Mary Gray. Not all of tenants leave in peace so make it quick and no one will be hurt.`;
        }
        else if ((firstWord==='knock' && !finalInput.includes('door'))){
            actionTxt =`Can't knock that`;
        }
        else if ((firstWord==='take')){
            actionTxt =`You have no reason to do so.`;
        }
        else if (        
            firstWord==='knock' && finalInput.includes('door')
            // || knockDoorKW.every(el => finalInput.includes(el))  
        ){
            actionTxt =`You leaned in to knock on the already open door. And the silence echoes back.`;
            doorKnockSFX.play();
        }
        else if (firstWord==='look' && finalInput.includes('doorbelll') ){
            actionTxt =`Just an ordinary doorbell.`;
        }
        else if (firstWord === 'ring' && !finalInput.includes('doorbell')){
            actionTxt =`You can't ring it.`;
        }
        else if (firstWord === 'ring' && finalInput.includes('doorbell')){
            actionTxt =`You ringed the doorbell. Not a single sound. Damn thing is broken. Perhaps you should try yelling.`;
            doorbellBtnSFX.play();
        }
        else if (firstWord ==='yell' && !yelledMary){
            actionTxt =`"HELLO. ANYBODY HOME?"...................... . . . . . . . doesn't seems like it. It's technically peaceful entry if you walk in right now. Afterall, Mary Gray must be out of the house at the end of today so you can keep your job.`;
            yelledMary =true;
        }
        else if (firstWord === 'yell' && yelledMary){
            actionTxt =`"No need for yelling. We may apply peaceful entry.`;
        }
        else{
            actionTxt =`Unrecognized command ` + `'`+input+`'`;
        }
        typeText3();
    // }
}
//  **********************FOYER****************************
function foyerState(){
    const input = document.getElementById("userInput").value;
    const finalInput = input.toLowerCase();
    const firstWord = finalInput.split(" ")[0];
    // if (currentArea === 'area'){
        if (firstWord ==='north' || firstWord === 'n'){
            txt =`You step foot in the bedroom!`;
            txt2='Nothing special to see here in her bedroom...'
            currentArea = 'Bedroom';
            typeText();
            actionTxt =` `;
        }  else if (firstWord==='south'|| firstWord=== 's'){
            txt = `In front of you lies Mary Gray's apartment. You're here to evict the tenant. Apartment 704. Female. Born in 1956.`;
            txt2=' ';
            currentArea = 'Entrance';
            typeText();
            actionTxt =` `;
        } else if (firstWord==='east'|| firstWord=== 'e'){
            txt = `The kitchen is here`;
            txt2=' ';
            currentArea = 'Kitchen';
            typeText();
            actionTxt =` `;
        }  else if (firstWord==='west'|| firstWord=== 'w'){
            txt = `You step in the living room. To your right is the foyer.`;
            txt2=' The fridge is humming rather loudly. The faucet is dripping a small stream of water. You see a slide of what seems like homemade cake laying on the table.';
            currentArea = 'LivingRoom';
            typeText();
            actionTxt =` `;
        }   else if (firstWord ==='look' && finalInput.includes('mail')){
            actionTxt =`Electricity bills...Water bills.. and the Eviction Notice!... all unopened. Under these letters lies a 1 inch pile of medical bills. Again, unopened. `;
        }else if (firstWord ==='look' && finalInput.includes('picture')|| firstWord ==='look' && finalInput.includes('print')){
            actionTxt =`Beautiful pictures of an old couple travelling the world. You spot wedding photos dated back in 2013. That was 10 years ago. Mary is seen grinning next to her supposedly husband. You couldn't help but smiling yourself... And here you thought marriage was off the table for 50 year olds.`;
        }else if (firstWord ==='take' && finalInput.includes('mails') && metMary){
            actionTxt =`You take the stack of mails.`;
        } else if (firstWord ==='take' && finalInput.includes('picture') && metMary){
            actionTxt =`You take the wedding photo.`;
        }
        else if (firstWord ==='take' && finalInput.includes('picture') && !metMary || firstWord ==='take' && finalInput.includes('mails') && !metMary){
            actionTxt =`You have no reason to do so.`;
        }
        else{
            actionTxt =`Unrecognized command ` + `'`+input+`'`;
        }
        // else if (finalInput.includes('south')){
        //     txt =`You go back to foyer`;
        //     currentArea = 'Foyer';
            
        //     // alert(finalInput);
        // }
        typeText3();
    // }
}

//  *****************  KITCHEN ************************
function kitchenState(){
    const input = document.getElementById("userInput").value;
    const finalInput = input.toLowerCase();
    const firstWord = finalInput.split(" ")[0];
    // if (currentArea === 'area'){
       if (firstWord==='west'|| firstWord=== 'w'){
            txt = `You step foot into the foyer. It reeks of mold and mildew. To your left is a kitchen, and to your right is the living room. Down the hallway is a door to what you suspect a bedroom.`;

            txt2=`Unopened mail enveloppes scatter on the ground. The hallway's walls are decorated with a dozen framed picture.`;
    
            if (!mailTaken && pictureTaken){
                txt2=`Unopened mail enveloppes scatter on the ground.`;
            }
            else if (mailTaken && !pictureTaken){
                txt2=`The hallway's walls are decorated with a dozen framed picture.`;
            }
            else if (mailTaken && pictureTaken){
                txt2=` `;
            }
            currentArea = 'Foyer';
            typeText();
            actionTxt =` `;
        }  else{
            actionTxt =`Unrecognized command ` + `'`+input+`'`;
        }
  typeText3();
    // }
}
//  **************** LIVING ROOM **********************
function livingRoomState(){
    const input = document.getElementById("userInput").value;
    const finalInput = input.toLowerCase();
    const firstWord = finalInput.split(" ")[0];
    // if (currentArea === 'area'){
       if (firstWord==='east'|| firstWord=== 'e'){
            txt = `You step foot into the foyer. It reeks of mold and mildew. To your left is a kitchen, and to your right is the living room. Down the hallway is a door to what you suspect a bedroom.`;

            txt2=`Unopened mail enveloppes scatter on the ground. The hallway's walls are decorated with a dozen framed picture.`;
    
            if (!mailTaken && pictureTaken){
                txt2=`Unopened mail enveloppes scatter on the ground.`;
            }
            else if (mailTaken && !pictureTaken){
                txt2=`The hallway's walls are decorated with a dozen framed picture.`;
            }
            else if (mailTaken && pictureTaken){
                txt2=` `;
            }
            currentArea = 'Foyer';
            typeText();
            actionTxt =` `;
        }  else{
            actionTxt =`Unrecognized command ` + `'`+input+`'`;
        }
  typeText3();
    // }
}

function bedRoomState(){
    const input = document.getElementById("userInput").value;
    const finalInput = input.toLowerCase();
    const firstWord = finalInput.split(" ")[0];
    // if (currentArea === 'area'){
       if (firstWord==='south'|| firstWord=== 's'){
            txt = `You step foot into the foyer. It reeks of mold and mildew. To your left is a kitchen, and to your right is the living room. Down the hallway is a door to what you suspect a bedroom.`;

            txt2=`Unopened mail enveloppes scatter on the ground. The hallway's walls are decorated with a dozen framed picture.`;
    
            if (!mailTaken && pictureTaken){
                txt2=`Unopened mail enveloppes scatter on the ground.`;
            }
            else if (mailTaken && !pictureTaken){
                txt2=`The hallway's walls are decorated with a dozen framed picture.`;
            }
            else if (mailTaken && pictureTaken){
                txt2=` `;
            }
            currentArea = 'Foyer';
            typeText();
            actionTxt =` `;
        }  else{
            actionTxt =`Unrecognized command ` + `'`+input+`'`;
        }
  typeText3();
    // }
}
// myFunction();

// function myFunction() {
//   let name = prompt("Please enter your first name",'');
//   if (name ==='') {
//     name = 'Cliff';
//   }
//   else if (name) {
//   }
//   // if cancelled
//   else{
//     name = 'Cliff';
//   }
//   alert('Time to work, Bailiff ' + name);
// }

         typeText();
 
// function typeText(){
//     areaText.innerHTML += txt;
//  }
        function setData() {
        return [txt, areaText]
        };

        function typeText() {
        let typingSpeed =0;
     
        areaText.innerHTML ='';
        // res is an array 
        waiting = true;
        typingSFX.play();
        const res =  setData();
        const txt = res[0];

        if (txt.length < 100){
            typingSpeed = 10;
        }
        else if (txt.length >= 100){
            typingSpeed = 5;
        }
        console.log(res);
        // const areaText = res[1];
        let i = 0;
        const timerId = setInterval(() => {
        areaText.innerHTML += txt.charAt(i);
        i++;
        if (i === txt.length) {
        clearInterval(timerId);
        typingSFX.pause();
        typingSFX.currentTime=0;
        waiting = false;
        typeText2();
        }
        },typingSpeed);

        }

        // function setData2() {
        //     return [actionTxt, actionText]
        //     };
    
        //     function typeText2() {
        //     let typingSpeed =0;
         
        //     actionText.innerHTML ='';
        //     // res is an array 
        //     waiting = true;
        //     // typingSFX2.play();
        //     const res =  setData3();
        //     const txt = res[0];
    
        //     if (txt.length < 100){
        //         typingSpeed = 10;
        //     }
        //     else if (txt.length >= 100){
        //         typingSpeed = 5;
        //     }
        //     console.log(res);
        //     // const areaText = res[1];
        //     let i = 0;
        //     const timerId = setInterval(() => {
        //     actionText.innerHTML += txt.charAt(i);
        //     i++;
        //     if (i === txt.length) {
        //     clearInterval(timerId);
        //     // typingSFX2.pause();
        //     // typingSFX2.currentTime=0;
        //     waiting = false;
        //     }
        //     },typingSpeed);
        // }
        function setData2() {
            return [txt2, objText]
            };
    
            function typeText2() {
            let typingSpeed =0;
         
            objText.innerHTML ='';
            // res is an array 
            waiting = true;
            typingSFX.play();
            const res =  setData2();
            const txt = res[0];
    
            if (txt.length < 100){
                typingSpeed = 10;
            }
            else if (txt.length >= 100){
                typingSpeed = 5;
            }
            console.log(res);
            // const areaText = res[1];
            let i = 0;
            const timerId = setInterval(() => {
            objText.innerHTML += txt.charAt(i);
            i++;
            if (i === txt.length) {
            clearInterval(timerId);
            typingSFX.pause();
            typingSFX.currentTime=0;
            waiting = false;
            }
            },typingSpeed);
        }

        function setData3() {
        return [actionTxt, actionText]
        };

        function typeText3() {
        let typingSpeed =0;
     
        actionText.innerHTML ='';
        // res is an array 
        waiting = true;
        typingSFX2.play();
        const res =  setData3();
        const txt = res[0];

        if (txt.length < 100){
            typingSpeed = 10;
        }
        else if (txt.length >= 100){
            typingSpeed = 5;
        }
        console.log(res);
        // const areaText = res[1];
        let i = 0;
        const timerId = setInterval(() => {
        actionText.innerHTML += txt.charAt(i);
        i++;
        if (i === txt.length) {
        clearInterval(timerId);
        typingSFX2.pause();
        typingSFX2.currentTime=0;
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