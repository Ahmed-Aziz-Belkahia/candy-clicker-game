for (let i = 1; i <= 5; i++) {
    CreateDOMElement("img", "", "BG" + i, 'Images/BackGroundes/BackGround ' + i + '.png', 100);
    CreateDOMElement("br");
    document.getElementById("BG" + i).addEventListener("click",()=>{SetBackGround('Images/BackGroundes/BackGround ' + i + '.png'); GoBackHome();});
}
CreateDOMElement("button", "Cancel", "Cancel");
let Cancel = document.getElementById("Cancel");
Cancel.addEventListener("click", GoBackHome);