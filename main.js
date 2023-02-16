const bodyEl = document.querySelector(`body`);
const typingSFX = new Audio('assets/sounds/typingSFX.mp3');
const takeItemSFX = new Audio(`assets/sounds/takeItem.mp3`);
const typingSFX2 = new Audio('assets/sounds/typingSFX.mp3');
const typingDialogueSFX = new Audio('assets/sounds/typingDialogueSFX.mp3')
const doorbellBtnSFX = new Audio('assets/sounds/doorbellBtn.mp3');
const rainSFX = new Audio(`assets/sounds/rain.mp3`);
const drippingSFX = new Audio(`assets/sounds/dripping.mp3`);
const fridgeSFX = new Audio(`assets/sounds/fridge.mp3`);
const doorKnockSFX = new Audio('assets/sounds/knockDoor.mp3');
const footstepSFX = new Audio('assets/sounds/footstepSound.mp3');
const choppingSFX = new Audio('assets/sounds/chopping.mp3');
const boilingSFX = new Audio(`assets/sounds/boiling.mp3`);
const clockSFX = new Audio(`assets/sounds/clock.mp3`);

const westKW = ['west','left'];
const northKW = ['north','forwards'];
const southKW = ['south','back'];
const eastKW = ['east','right'];

const ringDoorbellKW = [`ring`, `press`];
const pictureKW = [`photo`,`picture`,`frame`];

const userInput = document.getElementById('userInput');
const areaText = document.getElementById('text1');
const objText = document.getElementById('text2');

const dialogueText = document.getElementById('dialogue-text');
const surpriseText = document.getElementById('surprise-text');
const inventoryText = document.querySelector(`#inventory-text`);

const actionText = document.getElementById('action-text');

const tvAudioLeft = new Audio(`assets/sounds/tvAudioLChannel.mp3`);
const tvAudio = new Audio(`assets/sounds/tvAudio.mp3`);

typingSFX.volume =0.8;
typingSFX2.volume =0.6;


rainSFX.loop = true;
//  ALL ROOM EXCEPT FOR ENTRANCE AND LIVINGROOM
tvAudioLeft.loop = true;
tvAudioLeft.volume = 0.1;

// LIVING ROOM SOUND
clockSFX.loop=true;

tvAudio.volume = 0.6;
tvAudio.loop = true;

// KITCHEN SOUNDS
choppingSFX.loop=true;
choppingSFX.voume = 0.7;
boilingSFX.loop=true;
boilingSFX.volume =0.5;


drippingSFX.loop = true;
drippingSFX.volume = 0.5;

fridgeSFX.loop = true;
fridgeSFX.volume = 0.25;





let maryRealized = false;

let tvHeard = true;
let prevLivingRoom = false;

let currentArea = 'Entrance';
// let currentArea = 'Entrance';
let paused = false;

// SPEED
let typingSpeed = 10;
let pauseTime = 10;
let dialogueSpeed =10;
let specialDialogueSpeed = 10;
let specialPause = 3000;
let pauseDuration = 500;

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
let pillsTaken = false;
let diaryTaken = false;
let noteTaken = false;


let mailsGiven = false;
let pictureGiven = false;
let pillsGiven = false;
let diaryGiven = false;
// let noteGiven = false;


let pillsTxt = ' ';
let pictureTxt = ` `;
let mailsTxt = ' ';
// let noteTxt = ` note`;
let diaryTxt = ' ';
let giftOrder = 0;
//                                  cheatcodes
yelledMary = true;
metMary = true;
tvOff = true;

pictureTaken = true;
pillsTaken = true;
diaryTaken = true;
noteTaken = true;
mailsTaken = true;
giftOrder = 3;


// On/Off items
let faucetOff = false;
let faucetTxt = ` `;
let inventoryTxt = ``;
let newInventoryTxt=``;


let specialDialogue = false;
// to see count after special dialogue
let response =0;
let finalChat = false;


// to prevent Action Txt to play after
let dialogueOn = false;

let txt = `In front of you lies Mary Gray's apartment. You're here to evict the tenant. To your north is the residence of the convicted. Female. Seventy years old.`;
let txt2 =`Strangely enough the front door is wide open. On your right is a doorbell.`;
let dialogueString = ` `;
let surpriseTxt = `l`;
// let actionTxt = ``;
let actionTxt ='Commands: NORTH (N), SOUTH (S), WEST (W), EAST (E), INSTRUCTION (I). The remaining commands are for you to explore! Type a command and Press Enter';

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
            updateInventory();
            // console.log('entrace-state');
        break;
        case "Foyer":
            foyerState();
            updateInventory();
            // console.log('foyer-state');
          break;
        case "Kitchen":
            kitchenState();
            updateInventory();
          break;
        case "LivingRoom":
            livingRoomState();
            updateInventory();
          break;
        case "Bedroom":
            bedRoomState();
            updateInventory();
          break;
        default:
          text = "You're cheating son...";
    }
}

function entranceSetting(){
     if (response != 4){

    rainSFX.volume = 1;

    footstepSFX.currentTime=0;
    footstepSFX.play();
    txt = `In front of you lies Mary Gray's apartment. You're here to evict the tenant. To your north is the residence of the convicted. Female. Seventy years old.`;
    txt2=` `;
   
    actionTxt =` `;
    
    }

    else if (response ===4){
        txt = ` `;
        txt2=` `;
        currentArea = 'Entrance';
    }
    currentArea = 'Entrance';
    typeText();
}

console.log(tvAudioLeft.currentTime);
function foyerSetting(){
    clockSFX.pause();
    rainSFX.volume = 0.5;

    footstepSFX.currentTime=0;
    footstepSFX.play();
    // if tv on
    
    tvAudioLeft.volume =0.1;
    if(!tvOff){
        if (!tvAudio.paused){
            tvAudio.pause();
            }
            // if 
        if (tvAudio.currentTime >= 0 && prevLivingRoom === true){

            tvAudioLeft.currentTime = tvAudio.currentTime;
           
            easeOutTvVol();
        }
        // else if (tvAudio.currentTime === 0 && prevLivingRoom === true) {
        //     tvAudioLeft.currentTime =0;
        // }
        
        if (tvAudioLeft.paused ){
            tvAudioLeft.play();
        }
        prevLivingRoom = false;
    }
    choppingSFX.pause();
    boilingSFX.pause();
  
        fridgeSFX.pause();
        drippingSFX.pause();
    txt = `You step foot into the foyer. It reeks of mold and mildew. Not numbing, but enough to sends chills down your spine. To the east is a kitchen, and to the west is the living room. Down the hallway to your north is a door to what you suspect a bedroom.`;
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

    if (metMary && !maryRealized){
        if (boilingSFX.paused){
            boilingSFX.play();
        }
        if (choppingSFX.paused){
            choppingSFX.play();
        }
    }
    footstepSFX.currentTime=0;
    footstepSFX.play();

    
    tvAudioLeft.volume =0.02;
    if (!faucetOff && !maryRealized){
        drippingSFX.play();
    }
    if (!maryRealized){
    fridgeSFX.play();
}
  
    // if(!tvOff){
    //     if (tvAudioLeft.paused ){
    //         tvAudioLeft.play();
    //         }
    // }
    txt = `You step foot in the kitchen. To the east is the foyer`;
   if (!faucetOff && !maryRealized){
    faucetTxt = `The faucet is dripping a small stream of water. `;
    } else {
     faucetTxt = ``;
    }
    if (metMary){
        maryTxt = `Mary is occupying herself in the kitchen. She's chopping celery and making some sort of soup.`;
    }

    else if (!metMary){
        maryTxt = ``;
    }
    if (!maryRealized){
        txt2=`${maryTxt}The fridge is humming rather loudly. ${faucetTxt}You see a slide of what seems like homemade cake laying on the table.`;   
    }
    else {
        txt2= `Mary is sobbing uncontrollably. She tries to calm down when she sees you stepping foot back inside.`
    }

    currentArea = 'Kitchen';
    actionTxt =` `;
    typeText();   
}

function livingRoomSetting(){
    if (clockSFX.paused && !maryRealized){
        clockSFX.play();
    }
    
    footstepSFX.currentTime=0;
    footstepSFX.play(); 


    prevLivingRoom = true;
    if (!tvOff){
        if (!tvAudioLeft.paused){
        tvAudioLeft.pause();
        }
        if ( tvAudio.paused){
            tvAudio.play();
        }
        // else {
        //     tvAudio.play();
        // }
        // if audio left is more than 0, then equal
        if (tvAudioLeft.currentTime > 0 ){
            tvAudio.currentTime = tvAudioLeft.currentTime;
        }
        else {
            tvAudio.currentTime =0;
        }
       
            easeInTvVol();
    }

    txt =`You step foot into the living room. Oddly enough it feels somewhat...homely. To the east is the foyer.`;
            txt2=``;
            if (!metMary){
                txt2+=`Mary is fast asleep on her rocking chair.`;                
            } 
            else if (metMary){
                txt2+=`The rocking chair stays still. `
            }
            if (!tvOff){
                txt2+=` The TV hung on the wall is deafening loud...Mary is old after all. You chuckle as this is exactly what your old pop did.`;                
            }
            txt2 += ` The vintage clock on the wall is just ticking away.`
            currentArea = 'LivingRoom';
            typeText();
            actionTxt =` `;
}
function bedRoomSetting(){
    footstepSFX.currentTime=0;
    footstepSFX.play();

    rainSFX.volume = 1;
    tvAudioLeft.volume =0.02;
    // if(!tvOff){
    //     if (tvAudioLeft.paused ){
    //         tvAudioLeft.play();
    //     }
    // }
    
    txt =`You step foot in the bedroom. A window lays ahead, absorbing any dim sunlight that traverse through heavy rain. The foyer is to your south.`;
    txt2=` `;
    if (!diaryTaken){
        txt2+=`On the wooden desk lays an open diary. `;
    }
    if (!pillsTaken){
        txt2 += `By the side of the bed is a green and white bottle of pills with "Donepezil hydrochloride tablets, 5mg" written on it. You wonder what's it for...`;
    }
    currentArea = 'Bedroom';
    typeText();
    actionTxt =` `;
}
function entranceState(){
    if( rainSFX.paused && !maryRealized){
        rainSFX.play();
    }
    const input = document.getElementById("userInput").value;
    const finalInput = input.toLowerCase();
    const firstWord = finalInput.split(" ")[0];
    const enterKW = [`north`, `n`, `enter`] 

    const firstTwoWords = finalInput.split(' ').slice(0,2).join(' ');
    console.log(firstTwoWords);
    const knockDoorKW = ['knock','door'];
   
    resetDialogue();
    // if contains north keywords, or n,
    actionTxt =` `; 

    if (response !=4){
    // if (currentArea === 'entrance'){
        if (
            // northKW.some(el => finalInput.includes(el)) 
            // firstWord === 'north'  && yelledMary && yelledMary || firstWord === 'n'  && yelledMary
             enterKW.some(el=> firstWord==el) && yelledMary
            
             ){
            foyerSetting();
        }
        else if (firstWord === `instruction`){
            actionTxt ='Commands: NORTH (N), SOUTH (S), WEST (W), EAST (E), INSTRUCTION (I). The remaining commands are for you to explore! Type a command and Press Enter';
        }
        else if (
            enterKW.some(el=> firstWord==el) && !yelledMary ){
            console.log('damn')
            actionTxt =`You're well versed in the law. Even though entering an open door will be peaceful entry, it's good courtesy to let the tenant know before coming in.`;
        }
        else if (
            firstWord ==='west' || firstWord === 'w'|| firstWord ==='east' || firstWord === 'e' || firstWord ==='south' || firstWord === 's'
            ){
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
        else if (firstWord === 'ring' && !finalInput.includes('doorbell') || firstWord ===  'press' && !finalInput.includes('doorbell')){
            actionTxt =`You can't press it.`;
        }
        else if (firstWord === 'ring' && finalInput.includes('doorbell') || firstWord === 'press' && finalInput.includes('doorbell')){
            actionTxt =`You ringed the doorbell. Not a single sound. Damn thing is broken. Perhaps you should try to yell.`;
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
    }  
  
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
        }  
        else if (firstWord === `instruction`){
            actionTxt ='Commands: NORTH (N), SOUTH (S), WEST (W), EAST (E), INSTRUCTION (I). The remaining commands are for you to explore! Type a command and Press Enter';
        } else if (firstWord==='south'|| firstWord=== 's' && response != 4){
          entranceSetting();
          
        }  else if(firstWord==='south'|| firstWord=== 's' && response === 4){
            actionTxt =`You left Mary and found the help that she needed. She sent a thank you letter regarding your generosity.`;
            entranceSetting();
            
        }   else if (firstWord==='east'|| firstWord=== 'e'){
            kitchenSetting();
        }  else if (firstWord==='west'|| firstWord=== 'w'){
            livingRoomSetting();
        }  
            // else if (firstWord ==='')
            else if (firstWord ==='look' && finalInput.includes('mail')){
            actionTxt =`Electricity bills...Water bills.. and the Eviction Notice!... They are all already opened, so they definitely were read, just ignored.  Under these letters lies a 1 inch pile of medical bills. Mary certainly demonstrates a clear pattern of iresponsibility.`;
        }   else if (firstWord ==='look' && finalInput.includes('picture')|| firstWord ==='look' && finalInput.includes('print')){
            actionTxt =`Beautiful pictures of an old couple travelling the world. You spot wedding pictures dated back in 2013. That was 10 years ago. Mary is seen grinning next to her supposedly husband. You couldn't help but smiling yourself... And here you thought marriage was off the table for 50 year olds.`;
        }   else if (firstWord ==='take' && finalInput.includes('mail') && metMary && !mailsTaken){
            actionTxt =`You took the stack of mails.`;
            // inventoryText.innerHTML += ` mails`;
            updateInventory();
            mailsTaken = true;
            takeItemSFX.play();
        }   else if (firstWord ==='take' && finalInput.includes('picture') && metMary && !pictureTaken){
            actionTxt =`You took the wedding picture of a young Mary and her husband.`;
            updateInventory();
            // inventoryText.innerHTML += ` picture`;
            pictureTaken = true;
            takeItemSFX.play();
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



function kitchenState(){

    if (metMary && !maryRealized){
        if (boilingSFX.paused){
            boilingSFX.play();
        }
        if (choppingSFX.paused){
            choppingSFX.play();
        }
  
    }

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
    dialogueString = `Mary: "Charles and I, we've been through thick and thin...we met in our forties and felt in love. Things were fine until he was diagnosed with cancer. We were poor but I insisted on getting him chemo. I truly did not mind the debt as long as he's still breathing with me. Little did I know, the damn fool stopped taking his meds. The debt was getting out of hand, so he just stopped taking them to speed up the process. I've always thought he was an honest man, even through tough times. Charles died 3 months ago.  I've never really been myself ever since."  `;
    actionTxt = `You don't quite know what to say... Though you did come here with a mission... Now EVICT MARY or SPARE MARY and leave through the entrance.`;
    typeText3();
}
// if evict mary EVICT ROUTE
else if (response ===2 && firstTwoWords === `evict mary`){
    response=3;
    dialogueOn= true;
    dialogueString = `Mary: "I'm sorry for the trouble." Mary ran in her room and came back with some loose change. "This is all I have left. Please spare me today... I want to go my way. I want to see Charles again." `;
    actionTxt = `You may EVICT ANYWAY or SPARE TODAY`;
    typeText3();
}
// 
else if (response ===3 && firstTwoWords === `evict anyway`){
    dialogueOn= true;

    txt = ` `;
    txt2 = ` `;
    typeText();
    dialogueString = `Oh... okay. " `;
    actionTxt = `You escorted Mary out of the house. She was found dead 2 days later freezing to the cold rain.`;
    typeText3();
    response = `freeze ending`;
}

else if (response ===3 && firstTwoWords === `spare today`){
    dialogueOn= true;
    txt = ` `;
    txt2 = ` `;
    typeText();
    dialogueString = `Thank you.`;
    actionTxt = `You came back the next day to see the apartment empty, as promised. You wonder where she's at, but that is not your problem to deal with.`;
    typeText3();
    response = `mary left ending`;
}
// if back off BACK OFF ROUTE
else if (response ===2 && firstTwoWords === `spare mary`){
    response=4;
    dialogueOn= true;
    dialogueString = `I'm so sorry for the trouble...`;
    actionTxt = `Pretending to be her concerned neighbor, you avoided the eviction altogether while excusing yourself and making your way to the exit... `;
    typeText3();
}




// if neither evict or back off, text replays...
else if (response ===2 && firstTwoWords != `evict mary` && response ===2 && firstTwoWords != `back off`){
    actionTxt = `You don't quite know what to say. Though you did come here with a mission... Now EVICT MARY or SPARE MARY and leave through the entrance.`;
    typeText3();
    
}
// if not, you players can roam around int he house
else if (response ===0 || response ===4){
       if (firstWord==='west'|| firstWord=== 'w'){
            foyerSetting();
        }  else if (firstWord ==='north' || firstWord === 'n'|| firstWord ==='east' || firstWord === 'e' || firstWord ==='south' || firstWord === 's'){
            actionTxt =`You can't go that way.`;
        } else if (firstWord === `instruction`){
            actionTxt ='Commands: NORTH (N), SOUTH (S), WEST (W), EAST (E), INSTRUCTION (I). The remaining commands are for you to explore! Type a command and Press Enter';
        } else if (firstTwoWords ==='turn off' && finalInput.includes('faucet') && !faucetOff){
            actionTxt =`You closed the faucet. The drip stops dripping.`;
            faucetOff = true;

            // turn off faucet
            drippingSFX.pause();
        }  else if (firstTwoWords ==='turn on' && finalInput.includes('faucet') && faucetOff){
            actionTxt =`You have no reason to do so.`;
            faucetOff = true;
        } else if (firstTwoWords === 'turn off' && finalInput.includes('faucet') && faucetOff){
            actionTxt =`The faucet is already off.`;
        }  else if (firstWord ==='look' && finalInput.includes('fridge')){
            actionTxt =`Old model fridge… The brand name seems rather unfamiliar. You notice some dusty sticky notes taped on it.`;
        } else if (firstWord ==='open' && finalInput.includes('fridge')){
            actionTxt =`Now now... You're here to evict the tenant, not their food.`;
        } else if (firstWord ===`look` && finalInput.includes('note')){
            actionTxt = `“The salmon was spectacular. If only I knew sooner that I would be spoiled on my death bed. Love, C.”`;
        }
        // else if (firstWord ===`take` && finalInput.includes('note') && !noteTaken){
        //     actionTxt = `You don't think the note is relevant enough to take...`;
        //     inventoryText.innerHTML += ` note`;
        //     noteTaken = true;
        // }
         else if (firstWord ===`look` && finalInput.includes('cake')){
            actionTxt = `Just another slice of cake.`;
        } else if (firstWord ===`eat` && finalInput.includes('cake') && !metMary){
            actionTxt = `You had to remind yourself that your mission here is to evict the tenant.`;
        }  
        else if (firstWord ===`eat` && finalInput.includes('cake') && metMary){
            dialogueOn = true;
            dialogueString = `Mary: Oh please have at it!...`;
            actionTxt = `Now with Mary permission, you chowed down on the delicious cake. It's tasty, but you feel guilty that you ate it when Mary doesn't know the full truth.`;
            typeText3();
        }  
        else if (firstWord ===`talk` && finalInput.includes('mary')){
            choppingSFX.pause();
            dialogueOn = true;
            dialogueString = `Mary: Charles please get back to bed. If you behave I might add a sprinkle of beacon... The doctor doesn't have to know about this...`;
            actionTxt = `Mary... still sees you as Charles? ... Perhaps you should remind her of her past by giving her some significant objects. Only then may you evict her.`;
            typeText3();
        }   
        
        // IF GIVE WITHOUT SPECIFYING MARY
        else if (firstWord ===`give` && finalInput.includes('picture') && !finalInput.includes('mary') && pictureTaken && giftOrder<=2 && !pictureGiven){
            actionTxt = `Give picture to who?`;
        }  

        else if (firstWord ===`give` && finalInput.includes('mail') && !finalInput.includes('mary') && mailsTaken && giftOrder<=2 && !mailsGiven){
            actionTxt = `Give mails to who?`;
        } 
        else if (firstWord ===`give` && finalInput.includes('pills') && !finalInput.includes('mary') && pillsTaken && giftOrder<=2 && !pillsGiven){
            actionTxt = `Give pills to who?`;
        } 
        else if (firstWord ===`give` && finalInput.includes('diary') && !finalInput.includes('mary') && diaryTaken && giftOrder<=2 && !diaryGiven){
            actionTxt = `Give diary to who?`;
        }
        
        // GIVING ACTIONS 
        // pictures, pill. diary, note, mails
        else if (firstWord ===`give` && finalInput.includes('picture') && finalInput.includes('mary') && pictureTaken && giftOrder<=2 && !pictureGiven)  {
              choppingSFX.pause();
           
      resetActionTxt();
            giftOrder++;
            pictureGiven = true;            
            dialogueOn = true;
            dialogueString = `Mary: "This is... our wedding picture! Sometimes in the 80s... Aren't you a handsome young man? We don't even look like half of what we used to, but I couldn't be happier that I got to live my life with you.`;
            actionTxt = `She remembered the wedding.. remind her of the memories with the real Charles`;
            typeText3();
              updateInventory();
        } else if (firstWord ===`give` && finalInput.includes('pill') && finalInput.includes('mary') && pillsTaken && giftOrder<=2 && !pillsGiven)  {
              choppingSFX.pause();
           
      resetActionTxt();
            giftOrder++;
            pillsGiven = true;            
            dialogueOn = true;
            dialogueString = `Mary: "Oh my pills...  Sometimes my mind goes blank but you're always there to remind me. I may have Alzheimer but I can always see the warmth that radiate from you, love!"`;
            actionTxt = `Hmm keep reminding her of real Charles, things seem to be working.`;
            typeText3();
              updateInventory();
        } else if (firstWord ===`give` && finalInput.includes('diary') && finalInput.includes('mary') && diaryTaken && giftOrder<=2 && !diaryGiven)  {
              choppingSFX.pause();
           
            resetActionTxt();
            giftOrder++;
            console.log('running')
            diaryGiven = true;            
            dialogueOn = true;
            dialogueString = `Mary: "Hey noww...This is private! Oh.. that last bit I wrote? I..don't know either. I don't know what's gotten into me. It must have been the meds ... I mean I always had nightmare of you being taken away from my life. But those are silly dreams. I'm glad you're still here with me."`;
   
            actionTxt = `She doesnt believe her own writings...but you're sure she'll remind at some point. Bring her notable objects of her past`;
            if (!pillsGiven){
                actionTxt +=` and her dementia.`
            }
            typeText3();
              updateInventory();
        }
        //  else if (firstWord ===`give` && finalInput.includes('note') && finalInput.includes('mary') && noteTaken && giftOrder<=2)  {
        //     resetActionTxt();
        //     giftOrder++;
        //     noteGiven = true;            
        //     dialogueOn = true;
        //     dialogueString = `Mary: "You've always loved my cooking so you slipped this under your food tray. Though my late memory fails from times to times, I still remember your grin when I asked about the note. Now shoo shoo off to bed you go." `;
        //     actionTxt = `Not quite there yet... bring her more proof of Charles`;
        //     typeText3();
        // }  
        
        else if (firstWord ===`give` && finalInput.includes('mail') && finalInput.includes('mary') && mailsTaken && giftOrder<=2 && !mailsGiven)   {
              choppingSFX.pause();
           
            resetActionTxt();
            giftOrder++;
            mailsGiven = true;            
            dialogueOn = true;
            dialogueString = `Mary: "Stop. You're sick, and we're finding you the best treatment we could. We've discussed this so many times - Your HEALTH is the focus, not the money. Ohh but who cares about the bills...  We'll find one way or another to get past it... "`;
            actionTxt = `Charles had cancer? She doesn't seem to remember just yet, bring her more proofs of Charles`;
            if (!pillsGiven){
                actionTxt +=` and her dementia.`
            }
            typeText3();
              updateInventory();
        } 
        
        //picture, pill, diary, note, mails
        else if(giftOrder ===3){
            surpriseTxt=`NOT CHARLES`;
            choppingSFX.pause();
            boilingSFX.pause();
      
                // Now EVICT MARY or leave through the entrance.
            if (firstWord ===`give` && finalInput.includes('picture') && finalInput.includes('mary') && pictureTaken && !pictureGiven)  {
            
                specialDialogue = true;
                resetActionTxt();
                pictureGiven = true;
                dialogueOn = true;
                dialogueString = `Mary: This is my wedding picture. Charles is a sweetheart... `;
                dialogueString += `But you're ... `;
                actionTxt = `You broke the woman's heart. `;
                typeText3();
            } else if (firstWord ===`give` && finalInput.includes('pill') && finalInput.includes('mary') && pillsTaken && !pillsGiven)  {
                specialDialogue = true;
                 resetActionTxt();
                pillsGiven = true;
                dialogueOn = true;
                dialogueString = `This is my Alzheimer pills. Charles always reminded me...But. `;
                dialogueString += `But you're ... `;
                actionTxt = `You broke the woman's heart.`;
                typeText3();
            } else if (firstWord ===`give` && finalInput.includes('diary') && finalInput.includes('mary') && diaryTaken && !diaryGiven)  {
                specialDialogue = true;
                resetActionTxt();
               diaryGiven = true;
               dialogueOn = true;
               dialogueString = `This last bit... But Charles already passed away... Who are you... `;
               dialogueString += `But you're ... `;
               actionTxt = `You broke the woman's heart.`;
               typeText3();
           } 
        //    else if (firstWord ===`give` && finalInput.includes('note') && finalInput.includes('mary') && noteTaken && !noteGiven)  {
        //     specialDialogue = true;
        //          resetActionTxt();
        //         noteGiven = true;
        //         dialogueOn = true;
        //         dialogueString = `This is Charles' love note for me...`;
        //         dialogueString += `But you're not... `;
        //         actionTxt = `You broke the woman's heart.`;
        //         typeText3();
        //     } 
            else if (firstWord ===`give` && finalInput.includes('mail') && finalInput.includes('mary') && mailsTaken && !mailsGiven)  {
                specialDialogue = true;
                 resetActionTxt();
                mailsGiven = true;
                dialogueOn = true;
                dialogueString = `Unpaid bills... Aren't we drowning in debts... `;
                dialogueString += `But you're ... `;
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
        // GIVIN PIC, PILL, picture,
   
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
        else if (firstWord === `instruction`){
            actionTxt ='Commands: NORTH (N), SOUTH (S), WEST (W), EAST (E), INSTRUCTION (I). The remaining commands are for you to explore! Type a command and Press Enter';
        }   
        else if (firstWord === `look` && finalInput.includes(`clock`)){
            actionTxt =`The wood wall clock points at 10 AM. You hope the job will be done by lunch. You've never missed a lunch. Not now, not ever. Not for a tenant. She's old, but she's one of the many.`;
        }
        else if (firstWord === `look` && finalInput.includes(`tv`) && !tvOff){
            actionTxt =`Some old commercials are playing on the TV.`;
        } 
        else if (firstWord === `look` && finalInput.includes(`tv`) && tvOff){
            actionTxt =`The tv is now turned off.`;
        } 
        else if (firstTwoWords ==`turn off` && finalInput.includes(`tv`) && !tvOff){
            actionTxt =`You turned off the TV. You're not paid enough to deal with this headache... `;
            tvOff = true;
            tvAudio.pause();
            doorbellBtnSFX.play();
        }
        else if (firstTwoWords ==`turn off` && finalInput.includes(`tv`) && tvOff){
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
            actionTxt= `Mary walked to the kitchen before you can explain yourself.. Seems like she has mistaken you for Charles?`;
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
//  **************** BEDROOM **********************
function bedRoomState(){
    const input = document.getElementById("userInput").value;
    const finalInput = input.toLowerCase();
    const firstWord = finalInput.split(" ")[0];
    resetDialogue();
    // if (currentArea === 'area'){
       if (firstWord==='south'|| firstWord=== 's'){
           foyerSetting();
        }     else if (firstWord === `instruction`){
            actionTxt ='Commands: NORTH (N), SOUTH (S), WEST (W), EAST (E), INSTRUCTION (I). The remaining commands are for you to explore! Type a command and Press Enter';
        } 
        else if (firstWord ==='look' && finalInput.includes('diary') && metMary && !diaryTaken){
            actionTxt =`Mary's personal diary! March 2: I pray to the lord every day. Charles’ a sweetheart and a good soul.
            June: Oh how I hate this man. He keeps forgetting to take his meds. There are things you may forget, though for this you may not. Please Charles, I need you.
            Nov 16: Today he couldn’t finish half the steak, even though it’s his favorite. I don't know how much longer he has. Or how much longer I can hold on to hope.
            Dec 12: Just how could you. I never agreed to this. I never asked for this. I couldn't care less about the money. This wasn’t your decision to make.`;
      
        }else if (firstWord ==='take' && finalInput.includes('diary') && metMary && !diaryTaken){
            actionTxt =`You took the diary.`;
            updateInventory();
            takeItemSFX.play();
            // inventoryText.innerHTML += diaryTxt;
            diaryTaken = true;
        }  else if (firstWord ==='look' && finalInput.includes('diary') && metMary && !diaryTaken){
            actionTxt =`A bottle full of Donepezil pills. It reads  Donepezil Hydrochloride Tablets, 23mg.`;
        } else if (firstWord ==='take' && finalInput.includes('pills') && metMary && !pillsTaken){
            actionTxt =`You took the pills.`;
            updateInventory();
            takeItemSFX.play();
            // inventoryText.innerHTML += pillsTxt;
            pillsTaken = true;
        } else if (firstWord ==='look' && finalInput.includes('window') ){
            actionTxt =`It's raining cats and dogs. The sun is no where to be seen, just sea of dark clouds. You ponder whether this is the best time to evict the tenant.`;
        } else if (firstWord ==='take' && finalInput.includes('diary') && !metMary && !diaryTaken || firstWord ==='take' && finalInput.includes('pill') && !metMary && !diaryTaken){
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

function easeInTvVol(){
    tvAudio.volume = tvAudioLeft.volume;
    if (tvAudio.volume <=0.6){
        increaseVol = setInterval(()=> {
            tvAudio.volume+=0.05;
            console.log('running');
            if (tvAudio.volume > 0.6){
                clearInterval(increaseVol);
                console.log('clear');
            }
        }, 300);
    }
}
function easeOutTvVol(){
    tvAudioLeft.volume = tvAudio.volume;
    if (tvAudioLeft.volume >= 0.1){
        decreaseVol = setInterval(()=> {
            tvAudioLeft.volume-= 0.05;
            console.log('running');
            if (tvAudioLeft.volume < 0.1){
                clearInterval(decreaseVol);
                console.log('clear');
                
            }
        }, 300);
    }
}
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
                    setTimeout(typeText4,pauseDuration);
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
        maryRealized = true;
        typingDialogueSFX.loop = true;

        boilingSFX.pause();
        choppingSFX.pause();
        fridgeSFX.pause();
        drippingSFX.pause();
        rainSFX.pause();

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
                setTimeout(typeText4,specialPause);
                dialogueOn = false;
                response++;
                }
            }
            console.log(response);
        },specialDialogueSpeed); 
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


        updateInventory()
        
        
        function updateInventory(){

            if( mailsTaken && !mailsGiven){
                mailsTxt = ` mails`;
            }
            else{
                mailsTxt = ``;
            }
            if (pictureTaken && !pictureGiven){
                pictureTxt = `picture`
            }
            else{
                pictureTxt = ``;
            }
            if (diaryTaken && !diaryGiven){
                diaryTxt = `diary`;
            }
            else{
                diaryTxt = ``;
            }
            if (pillsTaken && !pillsGiven ){
                pillsTxt = `pills`;
            }
            else{
                pillsTxt = ``;
            }
            
            console.log('sad')

            inventoryText.innerHTML = `Inventory: ${mailsTxt} ${pictureTxt} ${diaryTxt} ${pillsTxt} `;
            // let firstItem = true;
       
            // console.log(pillsTaken, pictureTaken, mailsTaken, noteTaken, diaryTaken)
            // if (firstItem){

            // }

            // if (pillsTaken && !pillsGiven){
            // inventoryText.innerHTML += pillsTxt;
            // } 
            // else {
            //     pillsTxt = ` `;
            // }
            // if (pictureTaken && !pictureGiven){
            // inventoryText.innerHTML += pictureTxt;
            // } 
            // else {
            //     pictureTxt = ` `;
            // }
            // if (mailsTaken && !mailsGiven){
            // inventoryText.innerHTML += mailsTxt;
            // } 
            // else {
            //     mailsTxt = ` `;
            // }
            // if (noteTaken && !noteGiven){
            // inventoryText.innerHTML += noteTxt;
            // } 
            // else {
            //     noteTxt = ` `;
            // }
            // if (diaryTaken && !diaryGiven){
            // inventoryText.innerHTML += diaryTxt;
            // }
            // else {
            //     diaryTxt = ` `;
            // }
            // console.log(inventoryTxt);
            // newInventoryTxt = inventoryTxt.replace(`pill`,'');



            // if (!pillsGiven){
            // newInventoryTxt = inventoryTxt.replace(`pill`,'dad');}
            // if (diaryGiven){
            // inventoryTxt = inventoryTxt.replace(`diary`,'sad');}
            // if (noteGiven){
            // newInventoryTxt = inventoryTxt.replace(`note`,'');}
            // if (mailsGiven){
            // newInventoryTxt = inventoryTxt.replace(`mails`,'');}
            // if (pictureGiven){
            // newInventoryTxt = inventoryTxt.replace(`picture`,'');}

          
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