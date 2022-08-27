let BuyBoxesButton = document.getElementById("BuyBoxes");

let BackToHomeButton = document.getElementById("GoHomeButton");

let openGrayBoxButton = document.getElementById("openGrayBox");
let openBlueBoxButton = document.getElementById("openBlueBox");
let openRedBoxButton = document.getElementById("openRedBox");

const OpenBoxesButtons = [openGrayBoxButton, openBlueBoxButton, openRedBoxButton]

let ImgGrayBox = document.getElementById("GrayBoxImage");
let ImgBlueBox = document.getElementById("BlueBoxImage");
let ImgRedBox = document.getElementById("RedBoxImage");

let H1Inventory = document.getElementById("BoxesCount");
let GrayBoxH3 = document.getElementById("GrayBoxesCount");
let BlueBoxH3 = document.getElementById("BlueBoxesCount");
let RedBoxH3 = document.getElementById("RedBoxesCount");

H1Inventory.innerText = "Boxes: " + BoxesCount;
GrayBoxH3.innerText = "Gray Boxes: " + GrayBox.amount;
BlueBoxH3.innerText = "Blue Boxes: " + BlueBox.amount;
RedBoxH3.innerText = "Red Boxes: " + RedBox.amount;

//if box amount is 0 disable open box button
for (let i = 0; i < 3; i++) {
    if (Boxes[i].amount <= 0) {
        OpenBoxesButtons[i].disabled = true;
    }
    OpenBoxesButtons[i].addEventListener("click", ()=>{SaveOpeningAXBox(Boxes[i].name, true); GoBackHome()})
}

BackToHomeButton.addEventListener("click", GoBackHome);
BuyBoxesButton.addEventListener("click", OpenShopPage);

ImgGrayBox.style.width = '150px';
ImgGrayBox.style.height = "auto";
ImgGrayBox.src = "Images/Boxes/Gray Box 1920x1520.png";

ImgBlueBox.style.width = '150px';
ImgBlueBox.style.height = "auto";
ImgBlueBox.src = "Images/Boxes/Blue Box 1920x1520.png";

ImgRedBox.style.width = '150px';
ImgRedBox.style.height = "auto";
ImgRedBox.src = "Images/Boxes/Red Box 1920x1520.png";