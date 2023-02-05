
const typingSFX = new Audio('assets/sounds/typingSFX.mp3');
const typingSFX2 = new Audio('assets/sounds/typingSFX.mp3');
const typingDialogueSFX = new Audio('assets/sounds/typingDialogueSFX.mp3')
const doorbellBtnSFX = new Audio('assets/sounds/doorbellBtn.mp3');

const doorKnockSFX = new Audio('assets/sounds/knockDoor.mp3');

const westKW = ['west','go left'];
const northKW = ['north','go in', 'enter'];
const southKW = ['south','go back'];
const eastKW = ['east','go right','back'];
const userInput = document.getElementById('userInput');
const areaText = document.getElementById('text1');
const objText = document.getElementById('text2');
const dialogueText = document.getElementById('dialogue-text');
const actionText = document.getElementById('action-text');

typingSFX.volume =0.6;
typingSFX2.volume =0.4;

let currentArea = 'Entrance';
let paused = false;

let waiting = false;
let waiting2 = false;
let waiting3 = false;
let waiting4 = false; 

let metMary = false;
let mailTaken = false;
let pictureTaken = false;
let yelledMary = true;
let tvOff = true;
let dialogueOn = false;

let txt = `In front of you lies Mary Gray's apartment. You're here to evict the tenant. Apartment 704. Female. Born in 1956.`;
let txt2 =`Strangely enough the front door is wide open. On your right is a doorbell.`;
let dialogueTxt = ` `;
// let actionTxt = ``;
let actionTxt ='Type a command and Press Enter';

typeText();
typeText4();
function checkWaiting(){
    if (!waiting && !waiting2 && !waiting3 && !waiting4){
        submitInput();
        userInput.value='';
        console.log('working');
    }
}

function submitInput() {
    switch(currentArea){
        case "Entrance":
            entranceState();
            // console.log('entrace-state');
        break;
        case "Foyer":
            foyerState();
            // console.log('foyer-state');
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
function entranceSetting(){
    txt = `In front of you lies Mary Gray's apartment. You're here to evict the tenant. Apartment 704. Female. Born in 1956.`;
    txt2=' ';
    currentArea = 'Entrance';
    typeText();
    actionTxt =``;
}
function foyerSetting(){
    txt = `You step foot into the foyer. It reeks of mold and mildew. Not numbing, but enough to sends chills down your spine. To your left is a kitchen, and to your right is the living room. Down the hallway is a door to what you suspect a bedroom.`;
    txt2=` `;
        if (!mailTaken){
                 txt2+=`Unopened mail enveloppes scatter on the ground.`;
                }
        if (!pictureTaken){
                    txt2+=`The hallway's walls are decorated with a dozen framed picture.`;
                }
            currentArea = 'Foyer';
            typeText();
            actionTxt =` `;
}
let faucetOff = false;
let faucetTxt = ` `;
function kitchenSetting(){
    txt = `You step foot in the kitchen. To your left is the foyer`;
   if (!faucetOff){
    faucetTxt = `The faucet is dripping a small stream of water. `;
    } else {
     faucetTxt = ``;
    }
    if (metMary){
        maryTxt = `Mary is occupying herself in the kitchen.`;
    }
    else{
        maryTxt = ``;
    }
            txt2=`${maryTxt}The fridge is humming rather loudly. ${faucetTxt}You see a slide of what seems like homemade cake laying on the table. `;
            currentArea = 'Kitchen';
            typeText();
            actionTxt =` `;
}
function livingRoomSetting(){
    txt =`You step foot into the living room. Oddly enough it feels somewhat...homely. To your right is the foyer.`;
            txt2=` `;
            if (!metMary){
                txt2+=`Mary is fast asleep on her rocking chair.`;                
            } 
            else if (metMary){
                txt2+=`The rocking chair stays still. `
            }
            if (!tvOff){
                txt2+=` The TV hung on the wall is deafening loud...Mary is old after all. Do be careful...`;                
            }
            currentArea = 'LivingRoom';
            typeText();
            actionTxt =` `;
}

function bedRoomSetting(){
    txt =`You step foot in the bedroom!`;
    txt2='Nothing special to see here in her bedroom...'
    currentArea = 'Bedroom';
    typeText();
    actionTxt =` `;
}

function entranceState(){
  
    const input = document.getElementById("userInput").value;
    const finalInput = input.toLowerCase();
    const firstWord = finalInput.split(" ")[0];

    const firstTwoWords = finalInput.split(' ').slice(0,2).join(' ');
    console.log(firstTwoWords);
    const knockDoorKW = ['knock','door'];

    resetDialogue();
    // if contains north keywords, or n,
    actionTxt =` `; 
    // if (currentArea === 'entrance'){
        if (
            // northKW.some(el => finalInput.includes(el)) 
            firstWord === 'north'  && yelledMary && yelledMary || firstWord === 'n'  && yelledMary){
            foyerSetting();
        }
        else if (firstWord ==='north' && !yelledMary || firstWord === 'n'  && !yelledMary){
            actionTxt =`You're well versed in the law. Even though entering an open door will be peaceful entry, it's good courtesy to let the tenant know before coming in.`;
        }
        else if (firstWord ==='west' || firstWord === 'w'|| firstWord ==='east' || firstWord === 'e' || firstWord ==='south' || firstWord === 's'){
            actionTxt =`You can't go that way.`;
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
        else if (firstWord === 'use' && !finalInput.includes('doorbell')){
            actionTxt =`You can't use it.`;
        }
        else if (firstWord === 'use' && finalInput.includes('doorbell')){
            actionTxt =`You ringed the doorbell. Not a single sound. Damn thing is broken. Perhaps you should try yelling.`;
            doorbellBtnSFX.play();
        }
        else if (firstWord ==='yell' && !yelledMary){
            actionTxt =`"HELLO. ANYBODY HOME?". . . . . . doesn't seems like it. It's technically peaceful entry if you walk in right now. Afterall, Mary Gray must be out of the house at the end of today so you can keep your job.`;
            yelledMary =true;
        }
        else if (firstWord === 'yell' && yelledMary){
            actionTxt =`"No need for yelling. We may apply peaceful entry.`;
        }
        else{
            actionTxt =`Unrecognized command ` + `'`+input+`'`;
        }
        typeText4();
    // }
}
//  **********************FOYER****************************
function foyerState(){

    const input = document.getElementById("userInput").value;
    const finalInput = input.toLowerCase();
    const firstWord = finalInput.split(" ")[0];
    resetDialogue();
    // typeText3();
        if (firstWord ==='north' || firstWord === 'n'){
          bedRoomSetting();
        }  else if (firstWord==='south'|| firstWord=== 's'){
          entranceSetting();
        } else if (firstWord==='east'|| firstWord=== 'e'){
            kitchenSetting();
        }  else if (firstWord==='west'|| firstWord=== 'w'){
            livingRoomSetting();
        }  
            // else if (firstWord ==='')
            else if (firstWord ==='look' && finalInput.includes('mail')){
            actionTxt =`Electricity bills...Water bills.. and the Eviction Notice!... all unopened. Under these letters lies a 1 inch pile of medical bills. Again, unopened. `;
        }   else if (firstWord ==='look' && finalInput.includes('picture')|| firstWord ==='look' && finalInput.includes('print')){
            actionTxt =`Beautiful pictures of an old couple travelling the world. You spot wedding photos dated back in 2013. That was 10 years ago. Mary is seen grinning next to her supposedly husband. You couldn't help but smiling yourself... And here you thought marriage was off the table for 50 year olds.`;
        }   else if (firstWord ==='take' && finalInput.includes('mail') && metMary){
            actionTxt =`You take the stack of mails.`;
        }   else if (firstWord ==='take' && finalInput.includes('picture') && metMary){
            actionTxt =`You take the wedding photo.`;
        }   else if (firstWord ==='take' && finalInput.includes('picture') && !metMary || firstWord ==='take' && finalInput.includes('mails') && !metMary){
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
        typeText4();
    // }
}

//  *****************  KITCHEN ************************
giftOrder = 3;
pictureTaken = true;
function kitchenState(){
    const input = document.getElementById("userInput").value;
    const finalInput = input.toLowerCase();
    const firstWord = finalInput.split(" ")[0];
    resetDialogue();
    // if (currentArea === 'area'){
       if (firstWord==='west'|| firstWord=== 'w'){
            foyerSetting();
        }  else if (firstWord ==='north' || firstWord === 'n'|| firstWord ==='east' || firstWord === 'e' || firstWord ==='south' || firstWord === 's'){
            actionTxt =`You can't go that way.`;
        }  else if (firstWord ==='close' && finalInput.includes('faucet') && !faucetOff){
            actionTxt =`You closed the faucet. The drip stops dripping.`;
            faucetOff = true;
        }  else if (firstWord ==='close' && finalInput.includes('faucet') && faucetOff){
            actionTxt =`The faucet is already off.`;
        }  else if (firstWord ==='look' && finalInput.includes('fridge')){
            actionTxt =`Old model fridge… The brand name seems rather unfamiliar. You notice some dusty sticky notes taped on it.`;
        } else if (firstWord ==='open' && finalInput.includes('fridge')){
            actionTxt =`Now now... You're here to evict the tenant, not their food.`;
        } else if (firstWord ===`look` && finalInput.includes('note')){
            actionTxt = `“The salmon was spectacular. If only I knew sooner that I would be spoiled on my death bed. Love, C.”`;
        } else if (firstWord ===`look` && finalInput.includes('cake')){
            actionTxt = `“Just another slice of cake.”`;
        } else if (firstWord ===`give` && finalInput.includes('picture') && finalInput.includes('mary') && giftOrder <=3)  {
            giftOrder++;
            dialogueOn = true;
            dialogueTxt = `This is our wedding photo...`;
            actionTxt = `She's remembering... bring her more proof of Charles`;
            typeText3();
        } else if (firstWord ===`give` && finalInput.includes('picture') && finalInput.includes('mary') && giftOrder ===4)  {
            dialogueOn = true;
            dialogueTxt = `This is our wedding photo. `;
            dialogueTxt += `You're not Charles. `;
            actionTxt = `You broke the woman's heart`;
            typeText3();
        }
         else {
            actionTxt =`Unrecognized command ` + `'${input}'`;
        }
        if (!dialogueOn){
            typeText4();
        }
}
//  **************** LIVING ROOM **********************
function livingRoomState(){
    const input = document.getElementById("userInput").value;
    const finalInput = input.toLowerCase();
    const firstWord = finalInput.split(" ")[0];
    const firstTwoWords = finalInput.split(' ').slice(0,2).join(' ');
    console.log(firstTwoWords);
    resetDialogue();
    // if (currentArea === 'area'){
       if (firstWord==='east'|| firstWord=== 'e'){
           foyerSetting();
        } 
        else if (firstTwoWords ==`close` && finalInput.includes(`tv`) && !tvOff){
            actionTxt =`You turn off the TV. You're not paid enough to deal with this headache... `;
            tvOff = true;
        }
        else if (firstTwoWords ==`close` && finalInput.includes(`tv`) && tvOff){
            actionTxt =`The TV is already turned off`;
            tvOff = true;
        }
        else if (firstWord === 'talk' && finalInput.includes('mary') && !tvOff){
            actionTxt= `You tried to talk to Mary but the soap drama TV overwhelms your voice.`;
        } else if (firstWord === 'talk' && finalInput.includes('mary') && tvOff){
            actionTxt= `You tried to talk to Mary but she seems unresponsive. Try raising your voice.`;
        }
        else if (firstWord === 'yell' && finalInput.includes('mary') && !tvOff){
            actionTxt= `You yelled at Mary but the soap drama TV overwhelms your voice.`;
        }
        else if (firstWord === 'yell' && finalInput.includes('mary') && tvOff || firstWord === 'talk' && finalInput.includes('mary') && tvOff){      
            dialogueTxt=`"Charles...Is that you? But I thought I lost you for a second...Silly old me... Now now...Get back in bed love. I'll fix you up with your favorite dish the way you've always loved them... "`;
            actionTxt= `Mary walked to the kittchen before you can explain yourself`;
            dialogueOn = true;
          
            typeText3();
            metMary=true;
        }
        else if (firstWord ==='north' || firstWord === 'n'|| firstWord ==='east' || firstWord === 'e' || firstWord ==='south' || firstWord === 's'){
            actionTxt =`You can't go that way.`;
        }    
        else{
            actionTxt =`Unrecognized command ` + `'`+input+`'`;
        }
        // if dialogue is not on, play Action/Feedback Text
        if (!dialogueOn){
            typeText4();
        }
    // }
}

function bedRoomState(){
    const input = document.getElementById("userInput").value;
    const finalInput = input.toLowerCase();
    const firstWord = finalInput.split(" ")[0];
    resetDialogue();
    // if (currentArea === 'area'){
       if (firstWord==='south'|| firstWord=== 's'){
           foyerSetting();
        }  else{
            actionTxt =`Unrecognized command ` + `'`+input+`'`;
        }
  typeText4();
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
            typingSpeed =10;;;
        }
        else if (txt.length >= 100){
            typingSpeed =5;;
        }
       console.log(typingSpeed);
        // console.log(res);
        // const areaText = res[1];
        let i = 0;

        const timerId = setInterval(() => {
        if (!paused){
            areaText.innerHTML += txt.charAt(i);
            i++;
        
            if (txt.charAt(i)===' ' && txt.charAt(i-1)==='.'){
                pauseInterval();           
            }
            // console.log(txt.charAt(i));
            if (i === txt.length) {
            
            typingSFX.pause();
            typingSFX.currentTime=0;
            waiting = false;
            typeText2();
            clearInterval(timerId);
            }
         }
        },typingSpeed);}

        function setData2() {
            return [txt2, objText]
            };
    
            function typeText2() {
            let typingSpeed =0;
         
            objText.innerHTML ='';
            // res is an array 
            waiting2 = true;
            typingSFX.play();
            const res = setData2();
            const txt = res[0];
    
            if (txt.length < 100){
                typingSpeed =10;;;
            }
            else if (txt.length >= 100){
                typingSpeed =5;;
            }
            // console.log(res);
            // const areaText = res[1];
            let i = 0;
            const timerId = setInterval(() => {
            if (!paused){
                
                objText.innerHTML += txt.charAt(i);
                i++;
                if (txt.charAt(i)===' ' && txt.charAt(i-1)==='.'){
                    pauseInterval();           
                }
                if (i === txt.length) {
                clearInterval(timerId);
                typingSFX.pause();
                typingSFX.currentTime=0;
                waiting2 = false;
                }
            }
            },typingSpeed)
        }
// **************************** 3
// Dialogue Text
        function setData3() {
        return [dialogueTxt, dialogueText]
        };

        function typeText3() {
        let typingSpeed =0;
   
        typingDialogueSFX.loop = true;

        dialogueText.innerHTML ='';
        // res is an array 
        waiting3 = true;
        typingDialogueSFX.play();
        const res =  setData3();
        const txt = res[0];

        if (txt.length < 100){
            typingSpeed = 5;
        }
        else if (txt.length >= 100){
            typingSpeed = 5;
        }
        console.log(res);
        // const areaText = res[1];
        let i = 0;
       
        const timerId = setInterval(() => {
        if (!paused){
            dialogueText.innerHTML += txt.charAt(i);
            i++;
            if (txt.charAt(i)===' ' && txt.charAt(i-1)==='.'){
                pauseInterval();           
            }
            if (i === txt.length) {
            clearInterval(timerId);
            typingDialogueSFX.pause();
            typingDialogueSFX.currentTime=0;
            typingDialogueSFX.playbackRate=1;
            setTimeout(typeText4,2000);
            waiting3 = false;
            dialogueOn = false;
            }
         }
        
        },typingSpeed); 
    }
    
    function resetDialogue() {
        dialogueText.innerHTML ='';
    }

// **************************** 3

// text 4 for Action Text
    function setData4() {
        return [actionTxt, actionText]
        };

        function typeText4() {
        let typingSpeed =0;
     
        actionText.innerHTML ='';
        // res is an array 
        waiting4 = true;
        typingSFX2.play();

        const res =  setData4();
        const txt = res[0];

        if (txt.length < 100){
            typingSpeed =10;;;
        }
        else if (txt.length >= 100){
            typingSpeed =5;;
        }
        // console.log(res);
        // const areaText = res[1];
        let i = 0;
        const timerId = setInterval(() => {
        if (!paused){
            actionText.innerHTML += txt.charAt(i);
            i++;
            if (txt.charAt(i)===' ' && txt.charAt(i-1)==='.'){
                pauseInterval();           
            }
            if (i === txt.length) {
            clearInterval(timerId);
            typingSFX2.pause();
            typingSFX2.currentTime=0;
            waiting4 = false;
        }
    }
        },typingSpeed);
    }

    // typingSFX2.addEventListener('ended', function() {
    //     this.currentTime = 0;
    //     this.play();
    // }, false);
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

        function pauseInterval(){
            paused =true;
            setTimeout(resumeInterval,0);
        }
         function resumeInterval(){
             paused =false;
        }