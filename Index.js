let H1 = document.getElementById("H1Main");
let H2 = document.getElementById("H2Rank");
let H3 = document.getElementById("H3Coins");
let ClickMeButton = document.getElementById("CandyButton");
let InventoryButton = document.getElementById("inventory");
let ShopButton = document.getElementById("Shop");
let ResetButton = document.getElementById("ResetButton");
let Title = document.getElementById("Title");
let ClickSound = document.getElementById("ClickOnCandySound");

let DoubleClick;

var DefaultBG = 'Images/BackGroundes/BackGround 1.png';
var BG2 = 'Images/BackGroundes/BackGround 2.png';
var BG3 = 'Images/BackGroundes/BackGround 3.png';
var BG4 = 'Images/BackGroundes/BackGround 4.png';
var BG5 = 'Images/BackGroundes/BackGround 5.png';
let ArrOfBGs = [BG2, BG3, BG4, BG5]

var Coins = GetSavedCoinsCount();
var CandysCount = GetCollectedCandysCount();

//Boxes
var GrayBox = new Box({name:"Gray Box", amount:GetSavedXBoxAmountNewObjectOnly("Gray Box"), decrease:1, Content: ["X2CandysForXSeconds(60);", "X2CandysForXSeconds(30);", "CandysPlus(500);", "ChoseBackGround()", "CoinsPlus(50)"]});
var BlueBox = new Box({name:"Blue Box", amount:GetSavedXBoxAmountNewObjectOnly("Blue Box"), decrease:1, Content: ["X2CandysForXSeconds(30);", "RandomBG", "CandysPlus(200);", "CoinsPlus(20)"]});
var RedBox = new Box({name:"Red Box", amount:GetSavedXBoxAmountNewObjectOnly("Red Box"), decrease:1, Content: ["CandysPlus(100);", "CandysPlus(50);", "CoinsPlus(5)", "CoinsPlus(10)"]});

//arrays of boxes
var Boxes = [GrayBox, BlueBox, RedBox];
var BoxesCount = GrayBox.amount + BlueBox.amount + RedBox.amount;

for (let i = 0; i < 2; i++) {
    if (GetSavedSecondsCountForXSeconds("x2Candys")){
        RemoveSavedSecondsCount("x2Candys");
    }
}

CheckIfOpeningBox();
CheckForRandomBoxChanceDelay();
PageUpdate();

if (GetSavedSound() == 1) {
    ClickSound.src = "Soundes/1.wav";
}
else ClickSound.src = "Soundes/2.wav";

ClickMeButton.addEventListener("click", click);
ResetButton.addEventListener("click", Reset);
InventoryButton.addEventListener("click", OpenInventoryPage);
ShopButton.addEventListener("click", OpenShopPage);

function click(){
    CandysCount = GetCollectedCandysCount() + ClicksPlus();
    SaveCollectedCandys(CandysCount);
    RandomBoxChance();
    PageUpdate();
}
function CandysToLevel(Candys)
{
    //convert Candys to level
    let level;
    if (Candys >= 0  && Candys < 50){level = 1;}
    if (Candys >= 50 && Candys < 100){level = 2;}
    if (Candys >= 100 && Candys < 200){level = 3;}
    if (Candys >= 200 && Candys < 300){level = 4;}
    if (Candys >= 300 && Candys < 500){level = 5;}
    if (Candys >= 500 && Candys < 700){level = 6;}
    if (Candys >= 700 && Candys < 1000){level = 7;}
    if (Candys >= 1000 && Candys < 1300){level = 8;}
    if (Candys >= 1300 && Candys < 1700){level = 9;}
    if (Candys >= 1700){level = 10;}
    else undefined
    return level;
}
function LVLtoRankString(level)
{
    //convert level to rank
    for (let i = 0; i <= 10; i++) {
        if (level === i){rank = String("Rank "+i)}
        else undefined;
    }
    return rank;
}
function ChangeSkinLVL(level){
    //change the candy skin based on the level
    for (let i = 1; i <= 10; i++) {
        if (level === i && ClickMeButton){
            ClickMeButton.style.width = '150px';
            ClickMeButton.style.height = "auto";
            ClickMeButton.src = "Images/Candies/"+ i +".png";
        }        
    }
}
function ClicksPlus(){
    //the amount of candys per click
    let ClicksPerClick;
    if (DoubleClick === true){
        ClicksPerClick = 2;
    }
    else ClicksPerClick = 1;
    return ClicksPerClick;
}
function OpenInventoryPage(){
    window.open('Inventory.html','_self');
}
function OpenShopPage(){
    window.open('Shop.html', '_self');
}
function GoBackHome(){
    window.open('Index.html','_self');
}

function Box(options){
    options = options || {};
    this.name = options.name || "";
    this.amount = options.amount || 0;
    this.decrease = options.decrease || 1;
    this.Content = options.Content || {};

    this.open = function(){
        this.amount -= this.decrease;
        SaveXBoxAmount(this.name, this.amount);
        this.Element = RandomElement(this.Content);
        eval(this.Element);
        console.log(this.Element);
        if (this.name !== "Red Box") {
            RandomChance(5, BoxPercentChancePlusAmount);
        }
        PageUpdate();
    }
}
function CheckIfOpeningBox(){
    for (let Box of Boxes) {
        if (GetSavedOpeningAXBox(Box.name) == "true"){
            Box.open();
            localStorage.removeItem(Box.name + " Is Opening");
            break;
        }
    }
}
function CheckForRandomBoxChanceDelay(){
    if (GetSavedSecondsCountForXSeconds("RandomBox")){
        RandomBoxChance();
    }
}
//BOX CONTENT FUNCTIONS:
function X2CandysForXSeconds(SAXS){
    SecondsCountForXSeconds("x2Candys", SAXS);
    DoubleClick = true;
    function Done(){
        DoubleClick = false;
    }
    setTimeout(Done, SAXS * 1000);
}
function SecondsCountForXSeconds(reason, SAXS){//StopAfterXSecondes
    let Interval = setInterval(incrementSeconds, 1000);
    let Seconds;
    if (isNaN(GetSavedSecondsCountForXSeconds(reason))) {
        Seconds = 0;
    }
    else if (GetSavedSecondsCountForXSeconds(reason)){
        Seconds = GetSavedSecondsCountForXSeconds(reason);
    }
    else Seconds = GetSavedSecondsCountForXSeconds(reason);
    function incrementSeconds(){
        if (Seconds < SAXS){
            Seconds += 1;
            SaveSecondsCountForXSeconds(reason, Seconds);
        }
        else {
            RemoveSavedSecondsCount(reason);
            clearInterval(Interval);
        }
    }
    
}
function RandomBG() {
    let NewBackGround = RandomElement(ArrOfBGs);
    while(NewBackGround == GetSavedBackGround()){
        NewBackGround = RandomElement(ArrOfBGs);
    }
    document.body.style.background = ("url('" + NewBackGround + "')");
    SaveBackGround(NewBackGround);
}
function RandomBoxChance(){
    if (isNaN(GetSavedSecondsCountForXSeconds("RandomBox"))) {
        SecondsCountForXSeconds("RandomBox", 120);
        RandomChance(2, BoxPercentChancePlusAmount);
    }
    else SecondsCountForXSeconds("RandomBox", 120);
}
function SetBackGround(BackGroundLocation){
    document.body.style.background = "url('" + BackGroundLocation + "')";
    SaveBackGround(BackGroundLocation);
}
function CandysPlus(Num){
    //add x number to Candys
    SaveCollectedCandys(GetCollectedCandysCount() + Num);
    PageUpdate();
}
function CoinsPlus(Num){
    //add x number to coins
    SaveCoinsCount(GetSavedCoinsCount() + Num);
    PageUpdate();
}
function BoxPlusAmount(BoxName, BoxAmount, PlusAmount){
    SaveXBoxAmount(BoxName, BoxAmount += PlusAmount);
}
function BoxPercentChancePlusAmount(){
    //the chance for each box to increase
    let Percent = Math.floor(Math.random()*101);
    if (Percent <= 5) {
        BoxPlusAmount(GrayBox.name, GrayBox.amount, 1);
    }
    if (Percent <= 30 && Percent > 5) {
        BoxPlusAmount(BlueBox.name, BlueBox.amount, 1);
    }
    if (Percent <= 100 && Percent > 30){
        BoxPlusAmount(RedBox.name, RedBox.amount, 1);
    }
}
function ConvertCandysToCoins(CandysToConvert){
    //devide X amount of Candys To coins
    let ElementCheck = document.getElementById("CanNotConvertCandysErorr");
    if (GetCollectedCandysCount() >= CandysToConvert && CandysToConvert) {
         if (ElementCheck) {
            document.getElementById("CanNotConvertCandysErorr").remove();
        }
        CoinsPlus(CandysToConvert / 10);
        SaveCollectedCandys(GetCollectedCandysCount() - CandysToConvert);
        if (GetSavedCoinsCount() === 1) {
            alert("Now You have " + GetSavedCoinsCount() + " Coins");
        }
        else alert("Now You have " + GetSavedCoinsCount() + " Coin");
    }
    else CreateDOMElement('h3',"You don't Have " + CandysToConvert + " Candys", "CanNotConvertCandysErorr");
    if (!CandysToConvert) {
        CreateDOMElement('h3',"Enter a number", "CanNotConvertCandysErorr");
    }
}
function ChoseBackGround(){
    window.open('ChoseBG.html','_self');
}

//the local storage Save Functions
function SaveCollectedCandys(CandysCount){
    localStorage.setItem("CollectedCandys", CandysCount);
}
function SaveSecondsCountForXSeconds(reason, Seconds){
    localStorage.setItem(reason + ": SecondsCountForXSeconds", Seconds);
}
function SaveBackGround(BackGround){
    localStorage.setItem("BackGround", BackGround);
}
function SaveXBoxAmount(fBoxName, Amount){
    //Save the Amount of X Box
    for (let Box of Boxes){
        if (fBoxName == Box.name){
            Box.amount = Amount;
        }
    }
localStorage.setItem(String(fBoxName), Amount);

}
function SaveOpeningAXBox(BoxName, bool){
    //bool = true if i pressed the open box button and after it redirect to home page it get removed from the local storage
    localStorage.setItem(String(BoxName + " Is Opening"), bool);
}
function SaveCoinsCount(CoinsCount){
    localStorage.setItem("Coins", CoinsCount);
}
function SaveSound(num){
    localStorage.setItem("Current click sound", num);
}

//The Local storage get functions
function GetCollectedCandysCount(){
    return parseInt (localStorage.getItem("CollectedCandys"), 10);
    
}
function GetSavedSecondsCountForXSeconds(reason){
    let Secondes = parseInt(localStorage.getItem(reason + ": SecondsCountForXSeconds"), 10);
    return Secondes;
}
function GetSavedBackGround(){
    return localStorage.getItem("BackGround");
}
function GetSavedXBoxAmount(BoxName){
    return parseInt(localStorage.getItem(String(BoxName)), 10);
}
function GetSavedXBoxAmountNewObjectOnly(BoxName){
    return parseInt(localStorage.getItem(BoxName), 10);
}
function GetSavedOpeningAXBox(BoxName) {
    return localStorage.getItem(String(BoxName + " Is Opening"));
}
function GetSavedCoinsCount(){
    return parseInt (localStorage.getItem("Coins"), 10);
}
function GetSavedSound(params) {
    return localStorage.getItem("Current click sound");
}

//The Local storage remove functions
function RemoveSavedSecondsCount(reason){
    localStorage.removeItem(reason + ": SecondsCountForXSeconds");
}

//functions that i use to automate repeated actions
function RandomElement(arr){
    let RandomNum = Math.floor(Math.random() * arr.length);
    return arr[RandomNum];
}
function RandomChance(Percentege, Afunction){
    let Percent = Math.floor(Math.random()*101);
    if (Percent <= Percentege) {
        Afunction();
    }
}
function CreateDOMElement(ElementType, TextContent, ID, src, widht, type, controles, volume){
    let ElementCheck = document.getElementById(ID);
    if (ElementCheck) {
        ElementCheck.remove();
    }
    let Element = document.createElement(ElementType);
    Element.id = ID || "";
    Element.textContent = TextContent || "";
    Element.src = src || "";
    Element.width = widht || "";
    Element.type = type || "";
    Element.controls = controles || "";
    Element.volume = volume || 1
    document.body.appendChild(Element);
}

function PageUpdate(){
    for (let Box of Boxes) {
        if (isNaN(GetSavedXBoxAmount(Box.name))){
            SaveXBoxAmount(Box.name, 0);
        }
    }
    if(GetSavedSound() == null){
        SaveSound(1);
    }
    if(isNaN(GetCollectedCandysCount())){
        SaveCollectedCandys(0);
    }
    if(isNaN(GetSavedCoinsCount())){
        SaveCoinsCount(0);
    }

    let level = CandysToLevel(GetCollectedCandysCount());
    let Rank = LVLtoRankString(level);

    ChangeSkinLVL(level);
    if (GetCollectedCandysCount() === 0 && BoxesCount == 0 && GetSavedCoinsCount() == 0) {
        Title.innerText = "Candys Game";
        H1.innerText = "Click The Candy To Start";
        H2.innerText = "Rank: 0";
        H3.innerText = "coins: 0";
    }
    else{
        Title.innerHTML = "Candys: " + GetCollectedCandysCount();
        H1.innerText = "Candys: " + GetCollectedCandysCount();
        H2.innerText = "Rank: " + Rank;
        H3.innerText = "Coins: " + GetSavedCoinsCount();
    }
    if (GetSavedBackGround() == null || GetSavedBackGround() == undefined) {
        SetBackGround(DefaultBG);
    }
    else SetBackGround(GetSavedBackGround());
}
function Reset(){
    localStorage.clear();
    document.location.reload(true); 
}