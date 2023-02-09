const bodyEl = document.querySelector(`body`);

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
const surpriseText = document.getElementById('surprise-text');
const inventoryText = document.querySelector(`#inventory-text`);

const actionText = document.getElementById('action-text');

typingSFX.volume =0.6;
typingSFX2.volume =0.4;

let currentArea = 'Entrance';
// let currentArea = 'Entrance';
let paused = false;
let typingSpeed = 5;
let pauseTime = 5;
// to prevent players from giving input while 
let waiting = false;
let waiting2 = false;
let waiting3 = false;
let waiting4 = false; 
let waiting5 = false;

let yelledMary = false;

let metMary = false;
let tvOff = false;

// OBJECTS STATUS
let mailsTaken = false;
let pictureTaken = false;
let bottleTaken = false;
let notebookTaken = false;
let noteTaken = false;

let mailsGiven = false;
let pictureGiven = false;
let bottleGiven = false;
let notebookGiven = false;
let noteGiven = false;


let bottleTxt = ' bottle';
let pictureTxt = ` picture`;
let mailsTxt = ' mails';
let noteTxt = ` note`;
let notebookTxt = ' notebook';

// pictureTaken = true;
// bottleTaken = true;
// notebookTaken = true;
// noteTaken = true;
// mailsTaken = true;

// On/Off items
let faucetOff = false;
let faucetTxt = ` `;
let inventoryTxt = ``;
let newInventoryTxt=``;


let specialDialogue = false;
let response =0;
let finalChat = false;

let dialogueSpeed =50;
// to prevent Action Txt to play after
let dialogueOn = false;

let txt = `In front of you lies Mary Gray's apartment. You're here to evict the tenant. Apartment 704. Female. Born in 1956.`;
let txt2 =`Strangely enough the front door is wide open. On your right is a doorbell.`;
let dialogueString = ` `;
let surpriseTxt = `l`;
// let actionTxt = ``;
let actionTxt ='Type a command and Press Enter';

typeText();
typeText4();
function checkWaiting(){
    if (!waiting && !waiting2 && !waiting3 && !waiting4 && !waiting5){
        submitInput();
        userInput.value='';
        // console.log('working');
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
    txt2=` `;
    currentArea = 'Entrance';
    actionTxt =` `;
    typeText();
}
function foyerSetting(){
    txt = `You step foot into the foyer. It reeks of mold and mildew. Not numbing, but enough to sends chills down your spine. To your left is a kitchen, and to your right is the living room. Down the hallway is a door to what you suspect a bedroom.`;
    txt2=` `;
        if (!mailsTaken){
                 txt2+=`Unopened mail enveloppes scatter on the ground.`;
                }
        if (!pictureTaken){
                txt2+=`The hallway's walls are decorated with a dozen framed picture.`;
                }
            currentArea = 'Foyer';
            typeText();
            actionTxt =` `;
}
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
    txt =`You step foot in the bedroom. The morning light shines through the window, onto the random antiques and plants. The foyer is right behind.`;
    txt2=` `;
    if (!notebookTaken){
        txt2+=`On the wooden desk lays an open notebook. `;
    }
    if (!bottleTaken){
        txt2 += `By the side of the bed is a clear bottle of pills with the word Alzheimer written on it.`;
    }
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
        }   else if (firstWord ==='take' && finalInput.includes('mail') && metMary && !mailsTaken){
            actionTxt =`You took the stack of mails.`;
            inventoryText.innerHTML += ` mails`;
            mailsTaken = true;
        }   else if (firstWord ==='take' && finalInput.includes('picture') && metMary && !pictureTaken){
            actionTxt =`You took the wedding photo.`;
            inventoryText.innerHTML += ` photo`;
            pictureTaken = true;
        }   else if (firstWord ==='take' && finalInput.includes('picture') && !metMary || firstWord ==='take' && finalInput.includes('mail') && !metMary){
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
giftOrder = 0;


function kitchenState(){
    console.log(`gift order:`+ giftOrder);
    const input = document.getElementById("userInput").value;
    const finalInput = input.toLowerCase();
    const firstWord = finalInput.split(" ")[0];
    const firstTwoWords = finalInput.split(' ').slice(0,2).join(' ');
    console.log(firstTwoWords);
    resetDialogue();
    // if (currentArea === 'area'){
   // dialogueSpeed = 10;
   if (response === 1 ){
    response=2;
    dialogueOn= true;
    dialogueString = `Charles and I, we've been through thick and thin... he loves me and I love him`;
    actionTxt = `You don't quite know what to say. Though you did come here with a mission... Now EVICT MARY or BACK OFF and leave through the entrance.`;
    typeText3();
}

else if (response ===2 && firstTwoWords === `evict mary`){
    response=3;
    dialogueOn= true;
    dialogueString = `Mary: "I'm sorry for the trouble."`;
    actionTxt = `Mary ran in her bedroom and came back to the kitchen. In her hands are 20$ bills, some loose changes and old jewelry.`;
    typeText3();
}
else if (response ===2 && firstTwoWords === `back off`){
    response=3;
    dialogueOn= true;
    dialogueString = `I'm so sorry for the trouble...`;
    actionTxt = `Pretending to be her concerned neighbor, you excused yourself and make your way to the exit...`;
    typeText3();
}
else if (response ===2 && firstTwoWords != `evict mary` || response ===2 && firstTwoWords != `back off`){
    actionTxt = `You don't quite know what to say. Though you did come here with a mission... Now EVICT MARY or BACK OFF and leave through the entrance.`;
}
else if (response ===0 || response ===3){
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
        }else if (firstWord ===`take` && finalInput.includes('note') && !noteTaken){
            actionTxt = `You took the note.`;
            inventoryText.innerHTML += ` note`;
            noteTaken = true;
        } else if (firstWord ===`look` && finalInput.includes('cake')){
            actionTxt = `“Just another slice of cake.”`;
        }   
        
        // GIVING ACTIONS 
        // pictures, bottle. diary, note, mails
        else if (firstWord ===`give` && finalInput.includes('picture') && finalInput.includes('mary') && pictureTaken && giftOrder<=3)  {
      resetActionTxt();
            giftOrder++;
            pictureGiven = true;            
            dialogueOn = true;
            dialogueString = `Mary: "This is... our wedding photo! Sometimes in the 80s... Aren't you a handsome young man? We don't even look like half of what we used to, but I couldn't be happier that I got to live my life with you.`;
            actionTxt = `She remembered the wedding.. remind her of the memories with the real Charles`;
            typeText3();
        } else if (firstWord ===`give` && finalInput.includes('bottle') && finalInput.includes('mary') && bottleTaken && giftOrder<=3)  {
      resetActionTxt();
            giftOrder++;
            bottleGiven = true;            
            dialogueOn = true;
            dialogueString = `Mary: "Oh my pills...  Sometimes my mind goes blank but you're always there to remind me. I may have Alzheimer but I can always see the warmth that radiate from you, love!"`;
            actionTxt = `Hmm keep reminding her of real Charles, things seem to be working.`;
            typeText3();
        } else if (firstWord ===`give` && finalInput.includes('notebook') && finalInput.includes('mary') && notebookTaken && giftOrder<=3)  {
            resetActionTxt();
            giftOrder++;
            console.log('running')
            pillGiven = true;            
            dialogueOn = true;
            dialogueString = `Mary: "Hey noww...This is private! Oh.. that last bit I wrote? I..don't know either. I don't know what's gotten into me. It must have been thmeds or my Alzheimer..."`;
            actionTxt = `She's still resisting the truth...let's bring her more memories`;
            typeText3();
        } else if (firstWord ===`give` && finalInput.includes('note') && finalInput.includes('mary') && noteTaken && giftOrder<=3)  {
            resetActionTxt();
            giftOrder++;
            noteGiven = true;            
            dialogueOn = true;
            dialogueString = `Mary: "You've always loved my cooking so you slipped this under your food tray. Though my late memory fails from times to times, I still remember your grin when I asked about the note. Now shoo shoo off to bed you go." `;
            actionTxt = `Not quite there yet... bring her more proof of Charles`;
            typeText3();
        }  else if (firstWord ===`give` && finalInput.includes('mails') && finalInput.includes('mary') && mailsTaken && giftOrder<=3)  {
            resetActionTxt();
            giftOrder++;
            mailsGiven = true;            
            dialogueOn = true;
            dialogueString = `Mary: "Ohh but who cares about the bills... We'll find one way or another to get past it..".`;
            actionTxt = `Not quite there yet... bring her more proof of Charles`;
            typeText3();
        } 
        
        //picture, bottle, notebook, note, mails
        else if(giftOrder ===4){
            surpriseTxt=`CHARLES`;
        
      
                // Now EVICT MARY or leave through the entrance.
            if (firstWord ===`give` && finalInput.includes('picture') && finalInput.includes('mary') && pictureTaken)  {
            
                specialDialogue = true;
                resetActionTxt();
                pictureGiven = true;
                dialogueOn = true;
                dialogueString = `This is my wedding photo. Charles is a sweetheart... `;
                dialogueString += `But you're not... `;
                actionTxt = `You broke the woman's heart. `;
                typeText3();
            } else if (firstWord ===`give` && finalInput.includes('bottle') && finalInput.includes('mary') && bottleTaken)  {
                specialDialogue = true;
                 resetActionTxt();
                bottleGiven = true;
                dialogueOn = true;
                dialogueString = `This is my Alzheimer pills. Charles always reminded me...But. `;
                dialogueString += `But you're not... `;
                actionTxt = `You broke the woman's heart.`;
                typeText3();
            } else if (firstWord ===`give` && finalInput.includes('notebook') && finalInput.includes('mary') && notebookTaken)  {
                specialDialogue = true;
                resetActionTxt();
               notebookGiven = true;
               dialogueOn = true;
               dialogueString = `This last bit... But Charles already passed away... Who are you... `;
               dialogueString += `But you're not... `;
               actionTxt = `You broke the woman's heart.`;
               typeText3();
           } else if (firstWord ===`give` && finalInput.includes('note') && finalInput.includes('mary') && noteTaken)  {
            specialDialogue = true;
                 resetActionTxt();
                noteGiven = true;
                dialogueOn = true;
                dialogueString = `This is Charles' love note for me...`;
                dialogueString += `But you're not... `;
                actionTxt = `You broke the woman's heart.`;
                typeText3();
            } else if (firstWord ===`give` && finalInput.includes('mails') && finalInput.includes('mary') && mailsTaken)  {
                specialDialogue = true;
                 resetActionTxt();
                mailsGiven = true;
                dialogueOn = true;
                dialogueString = `But Charles didn't. `;
                dialogueString += `But you're not... `;
                actionTxt = `You broke the woman's heart.`;
                typeText3();
            } 
            // else if (firstTwoWords === `evict mary` && ){

            // }
            else if (
                firstWord ===`give`&& finalInput.includes('mary') && !finalInput.includes(`picture`)
                || firstWord ===`give`&& finalInput.includes('mary') && !finalInput.includes(`pills`)
                || firstWord ===`give`&& finalInput.includes('mary') && !finalInput.includes(`note`)
                || firstWord ===`give`&& finalInput.includes('mary') && !finalInput.includes(`diary`)
                || firstWord ===`give`&& finalInput.includes('mary') && !finalInput.includes(`mail`)
            ){
                specialDialogue = true;
                actionTxt = `Can't give that to mary`;
            }   else {
                actionTxt =`Unrecognized command ` + `"${input}"`;

            }
        
        }
        else if (
            firstWord ===`give`&& finalInput.includes('mary') && !finalInput.includes(`picture`)
            || firstWord ===`give`&& finalInput.includes('mary') && !finalInput.includes(`pills`)
            || firstWord ===`give`&& finalInput.includes('mary') && !finalInput.includes(`note`)
            || firstWord ===`give`&& finalInput.includes('mary') && !finalInput.includes(`diary`)
            || firstWord ===`give`&& finalInput.includes('mary') && !finalInput.includes(`mail`)
        ){
            actionTxt = `Can't give that to mary`;
        }
        else {
            actionTxt =`Unrecognized command ` + `"${input}"`;
        }
        // GIVIN PIC, PILL, PHOTO,
   
    }
        // else {
        //     actionTxt =`Unrecognized command ` + `'${input}'`;
        //     console.log('.');
        // }

        console.log(dialogueOn);
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
            dialogueString=`"Charles...Is that you? But I thought I lost you for a second...Silly old me... Now now...Get back in bed love. I'll fix you up with your favorite dish the way you've always loved them... "`;
            actionTxt= `Mary walked to the kittchen before you can explain yourself.. Seems like she has mistaken you for Charles?`;
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
        // if (!dialogueOn){
        //     typeText4();
        // }
    // }
}
//  **************** BEDROOM **********************
function bedRoomState(){
    const input = document.getElementById("userInput").value;
    const finalInput = input.toLowerCase();
    const firstWord = finalInput.split(" ")[0];
    resetDialogue();
    // if (currentArea === 'area'){
       if (firstWord==='south'|| firstWord=== 's'){
           foyerSetting();
        } else if (firstWord ==='look' && finalInput.includes('diary') && metMary && !diaryTaken){
            actionTxt =`March 2: I pray to the lord every day. Charles’ a sweetheart and a good soul.
            June: Oh how I hate this man. He keeps forgetting to take his meds. There are things you may forget, though for this you may not. Please Charles, I need you.
            Nov 16: Today he couldn’t finish half the steak, even though it’s his favorite. I don't know how much longer he has. Or how much longer I can hold on to hope.
            Dec 12: Just how could you. I never agreed to this. I never asked for this. I couldn't care less about the money. This wasn’t your decision to make.`;
            inventoryText.innerHTML += ` diary`;
        }else if (firstWord ==='take' && finalInput.includes('diary') && metMary && !diaryTaken){
            actionTxt =`You took the diary.`;
            inventoryText.innerHTML += ` diary`;
            mailsTaken = true;
        } else if (firstWord ==='take' && finalInput.includes('diary') && !metMary && !diaryTaken){
            actionTxt =`You have no reason to do so`;
        } else if (firstWord ==='look' && finalInput.includes('diary') && metMary && !diaryTaken){
            actionTxt =`A bottle of Alzheimer pills...`;
        }else if (firstWord ==='take' && finalInput.includes('bottle') && metMary && !bottleTaken){
            actionTxt =`You took the bottle.`;
            inventoryText.innerHTML += ` bottle`;
            mailsTaken = true;
        } else if (firstWord ==='take' && finalInput.includes('diary') && !metMary && !diaryTaken){
            actionTxt =`You have no reason to do so`;
        }
            else{
            actionTxt =`Unrecognized command ` + `'`+input+`'`;
        }
  typeText4();
    // }
}       

// function typeText(){
//     areaText.innerHTML += txt;
//  }
        function setData() {
        return [txt, areaText]
        };
 
        function typeText() {
        // let typingSpeed =0;
 
      
        areaText.innerHTML ='';
        // res is an array 
        waiting = true;
        typingSFX.play();
        const res =  setData();
        const txt = res[0];

        // if (txt.length < 100){
        //     typingSpeed =10;;;
        // }
        // else if (txt.length >= 100){
        //     typingSpeed =5;;
        // }
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
            // let typingSpeed =0;
         
            objText.innerHTML ='';
            // res is an array 
            waiting2 = true;
            typingSFX.play();
            const res = setData2();
            const txt = res[0];
    
            // if (txt.length < 100){
            //     typingSpeed =10;;;
            // }
            // else if (txt.length >= 100){
            //     typingSpeed =5;;
            // }
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
// **************************** 
// Dialogue Text
        function setData3() {
        return [dialogueString, dialogueText]
        };

        function typeText3() {  
        typingDialogueSFX.loop = true;

        dialogueText.innerHTML ='';
        // res is an array 
        waiting3 = true;
        typingDialogueSFX.play();
        const res =  setData3();
        const txt = res[0];

        // if (txt.length < 100){
        //     typingSpeed = 5;
        // }
        // else if (txt.length >= 100){
        //     typingSpeed = 5;
        // }
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
                // typeText4();
             
                    if (!specialDialogue){
                    setTimeout(typeText4,1000);
                    dialogueOn = false;}
                    
                    else if (specialDialogue) {
                        // setTimeout(typeText5,1000);
                        typeText5();
                        console.log('loading');
                    }
                }
            }
            },dialogueSpeed); 
        // dialogueSpeed = 50;
    }
    // Surprise Text
    function setData5() {
        return [surpriseTxt, dialogueText]
        };

        function typeText5() {  
            // console.log('txt5');
        typingDialogueSFX.loop = true;
            typingDialogueSFX.play();
        surpriseText.innerHTML ='';
        // res is an array 
    
        const res =  setData5();
        const txt = res[0];
        // if (txt.length < 100){
        //     typingSpeed = 5;
        // }
        // else if (txt.length >= 100){
        //     typingSpeed = 5;
        // }
        console.log(res);
        // const areaText = res[1];
        let i = 0;
        bodyEl.classList.toggle('dark-mode');
        const timerId = setInterval(() => {
            if (!paused){
                surpriseText.innerHTML += txt.charAt(i);
                i++;
                surpriseText.innerHTML += `<br>`;
                if (txt.charAt(i)===' ' && txt.charAt(i-1)==='.'){
                    pauseInterval();           
                }
                if (i === txt.length) {
                clearInterval(timerId);
                specialDialogue = false; 
        
                typingDialogueSFX.pause();
                typingDialogueSFX.currentTime=0;
                typingDialogueSFX.playbackRate=1;
                setTimeout(typeText4,2000);
                dialogueOn = false;
                response++;
                }
            }
            console.log(response);
        },200); 
        // dialogueSpeed = 5;
    }
    // give mary picture


    function resetDialogue() {
    
        dialogueText.innerHTML =``;
        surpriseText.innerHTML = ``;
    }
    function resetActionTxt(){
        actionTxt = ` `;
        typeText4();
    }
// **************************** 3

// text 4 for Action Text
    function setData4() {
        return [actionTxt, actionText]
        };

    function typeText4() {
        console.log('txt4');
        waiting3 = false;
        // let typingSpeed =10;
     
        actionText.innerHTML ='';
        // res is an array 
        waiting4 = true;
        typingSFX2.play();

        const res = setData4();
        const txt = res[0];
        // if (txt.length < 100){
        //     typingSpeed =10;;;
        // }
        // else if (txt.length >= 100){
        //     typingSpeed =5;;
        // }
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

        function pauseInterval(){
            paused =true;
            setTimeout(resumeInterval, pauseTime);
        }
         function resumeInterval(){
             paused =false;
        }

        updateInventory();

    
    
        
        function updateInventory(){
            let firstItem = true;
       
            console.log(bottleTaken, pictureTaken, mailsTaken, noteTaken, notebookTaken)
            if (firstItem){

            }

            if (bottleTaken && !bottleGiven){
            inventoryText.innerHTML += bottleTxt;
            } 
            else {
                bottleTxt = ` `;
            }
            if (pictureTaken && !pictureGiven){
            inventoryText.innerHTML += pictureTxt;
            } 
            else {
                pictureTxt = ` `;
            }
            if (mailsTaken && !mailsGiven){
            inventoryText.innerHTML += mailsTxt;
            } 
            else {
                mailsTxt = ` `;
            }
            if (noteTaken && !noteGiven){
            inventoryText.innerHTML += noteTxt;
            } 
            else {
                noteTxt = ` `;
            }
            if (notebookTaken && !notebookGiven){
            inventoryText.innerHTML += notebookTxt;
            }
            else {
                notebookTxt = ` `;
            }
            console.log(inventoryTxt);
            // newInventoryTxt = inventoryTxt.replace(`bottle`,'');



            // if (!bottleGiven){
            // newInventoryTxt = inventoryTxt.replace(`bottle`,'dad');}
            // if (notebookGiven){
            // inventoryTxt = inventoryTxt.replace(`notebook`,'sad');}
            // if (noteGiven){
            // newInventoryTxt = inventoryTxt.replace(`note`,'');}
            // if (mailsGiven){
            // newInventoryTxt = inventoryTxt.replace(`mails`,'');}
            // if (pictureGiven){
            // newInventoryTxt = inventoryTxt.replace(`picture`,'');}

            console.log(newInventoryTxt);
            // inventoryText.innerHTML = inventoryTxt;
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