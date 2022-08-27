CreateDOMElement('h1', "Shop");
CreateDOMElement('h3', "Coins: ", "CoinsCount");
CreateDOMElement('button', "Buy Coins", "BuyCoins");

let H3CoinsCount = document.getElementById("CoinsCount");
let BuyCoinsButton = document.getElementById("BuyCoins");

H3CoinsCount.textContent = "Coins: " + GetSavedCoinsCount();
BuyCoinsButton.addEventListener("click", GoToBuyCoinsPage);


//BG section
CreateDOMElement('h2', "Backgrounds:");
for (let i = 2; i <= 5; i++){
    CreateDOMElement('h3', "BackGround " + i + ":", "");
    CreateDOMElement('img', "", "", 'Images/BackGroundes/BackGround '+ i +'.png', 150);
    CreateDOMElement('br');
    CreateDOMElement('button', "Buy it for X coins", "BuyBG" + i);
    CreateDOMElement('br');
}

//Box section
CreateDOMElement("h2", "Boxes:");
for (let i = 0; i < 3; i++) {
    CreateDOMElement('h3', Boxes[i].name + ": " + Boxes[i].amount, "BoxCounter"+i);
    CreateDOMElement('img', "", "", "Images/Boxes/"+ Boxes[i].name +" 1920x1520.png", 150);
    CreateDOMElement('br');
    CreateDOMElement('button', "Buy it for X coins", "BuyBox" + i);
    CreateDOMElement('br');
}

//Click Sound section
CreateDOMElement("h2", "Sounds:");
for (let i = 1; i <= 2; i++) {
    CreateDOMElement('br');
    CreateDOMElement('audio', "", "ClickSound"+i, "Soundes/"+ i +".wav", "",  "audio/wav", true, 0.45);
    CreateDOMElement('br');
    CreateDOMElement('button', "Buy it for X coins", "BuySound"+i,);
    localStorage.setItem("Sound " + 1 + " is purchased", true);
}

//BackButton
CreateDOMElement('br');
CreateDOMElement('br');
CreateDOMElement('button', "Back", "Back");
let BackButton = document.getElementById("Back");
BackButton.addEventListener("click", GoBackHome);

//for every BuyBackGround button:
for (let index = 2; index <= 5; index++) {
    const BGprice = 50;
    let BuyButton = document.getElementById("BuyBG"+index);
    let ID = "EquipBG" + index;
    BuyButton.innerText = "buy it for " + BGprice + " coins";
    BuyButton.addEventListener("click", BuyBG);
    //if background is purchased remove buy button, create equip button and disable or enable the Equip button
    if (localStorage.getItem("BG" + index + " is purchased") == "true") {
        CreateEquipButton(ID, BuyButton, EquipBackground);
        DisableOreEnableBGEquipButton();
        BuyButton.remove();
    }

    function BuyBG() {
        //if i have the price buy the background, remove buy button and create equip button
        if (GetSavedCoinsCount() >= BGprice) {
            SaveCoinsCount(GetSavedCoinsCount() - BGprice);
            CoinsHeaderUpdate();
            CreateEquipButton(ID, BuyButton, EquipBackground);
            BuyButton.remove();
            localStorage.setItem("BG" + index + " is purchased", true);

        }
        else console.log("You dont Have " + BGprice + " Coins to buy this item");
    }
}
//for every BuyBox button
for (let i = 0; i < 3; i++) {
    let Prices = [100, 50, 25];
    let BOXPRICE;
    let BuyButton = document.getElementById("BuyBox"+i);
    BuyButton.addEventListener("click", BuyBox);
    for (let n = 0; n < 3; n++){
        if (i == n){
            BOXPRICE = Prices[i];
            BuyButton.innerText = "buy it for " + BOXPRICE + " coins"
        }
    }
    function BuyBox(){
        let BoxID = event.target.id;
        if (GetSavedCoinsCount() >= BOXPRICE) {
            SaveCoinsCount(GetSavedCoinsCount() - BOXPRICE);
            CoinsHeaderUpdate();
            for (let i = 0; i < 3; i++) {
                if (BoxID == "BuyBox"+i) {
                    BoxPlusAmount(Boxes[i].name, Boxes[i].amount, 1);
                    BoxCounterUpdate(i);
                }
            }
        }
        else console.log("You don't have " + BOXPRICE + " coins to buy this item.");
    }
}

//for every Buy sound button
for (let i = 1; i <= 2; i++) {
    const SOUNDPRICE = 20;
    let BuyButton = document.getElementById("BuySound"+i);
    let SoundID = 'EquipSound'+i;
    BuyButton.addEventListener("click", BuySound);
    BuyButton.innerText = "Buy it for " + SOUNDPRICE + " coins";
    if (localStorage.getItem("Sound " + i + " is purchased") == "true") {
        CreateEquipButton(SoundID, BuyButton, EquipSound);
        DisableOreEnableSoundEquipButton();
        BuyButton.remove();
    }

    function BuySound(){
        if (GetSavedCoinsCount() >= SOUNDPRICE) {
            SaveCoinsCount(GetSavedCoinsCount() - SOUNDPRICE);
            CoinsHeaderUpdate();
            CreateEquipButton(SoundID, BuyButton, EquipSound);
            BuyButton.remove();
            localStorage.setItem("Sound " + i + " is purchased", true);
        }
        else console.log("You dont Have " + SOUNDPRICE + " Coins to buy this item");
    }
}

function CreateEquipButton(ID, BuyButton, Func){
    CreateDOMElement('button', "Equip", ID);
    let EquipButton = document.getElementById(ID);
    BuyButton.parentNode.insertBefore(EquipButton, BuyButton.nextSibling);
    EquipButton.addEventListener("click", Func);
}
function EquipBackground(event){
    //the function that runs when i press the equip button
    let ID = event.target.id;
    let index = ID.substring(ID.length-1);
    SaveBackGround('Images/BackGroundes/BackGround '+ index +'.png');
    DisableOreEnableBGEquipButton();
}
function EquipSound(event) {
    let ID = event.target.id;
    let index = ID.substring(ID.length-1);
    SaveSound(index);
    DisableOreEnableSoundEquipButton();
}
function DisableOreEnableBGEquipButton(){
    for (let index = 2; index <= 5; index++) {
        let ID = "EquipBG" + index;
        let EquipButton = document.getElementById(ID);
        if (EquipButton) {
            if (GetSavedBackGround() == 'Images/BackGroundes/BackGround '+ index +'.png') {
               EquipButton.disabled = true;
            }
            else EquipButton.disabled = false;
        }    
    }
}
function DisableOreEnableSoundEquipButton(){
    for (let index = 1; index <= 2; index++) {
        let ID = "EquipSound" + index;
        let EquipButton = document.getElementById(ID);
        if (EquipButton) {
            if (GetSavedSound() == index) {
               EquipButton.disabled = true;
            }
            else EquipButton.disabled = false;
        }    
    }
}
function BoxCounterUpdate(i){
    let BoxH2Counter = document.getElementById("BoxCounter"+i);
    BoxH2Counter.innerText = Boxes[i].name + ": " + GetSavedXBoxAmount(Boxes[i].name);
}
function CoinsHeaderUpdate(){
    H3CoinsCount.textContent = "Coins: " + GetSavedCoinsCount();
}
function GoToBuyCoinsPage() {
    window.open('CoinsShop.html', '_self');
}