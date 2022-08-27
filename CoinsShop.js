let title = document.getElementById("TitleCS");
let Input = document.getElementById('InputCandysNum');
let CoinsHeader = document.getElementById('ConvertedCoins');
let ConvertButton = document.getElementById('Convert');
let GoBackButton = document.getElementById('BackButton');

title.innerText = "Coins: " + GetSavedCoinsCount();
CoinsHeader.innerText = "Enter the amount of Candys You want to convert";

Input.addEventListener('change', updateCoinsHeader);
ConvertButton.addEventListener("click", Convert);
GoBackButton.addEventListener("click", GoBackHome);

function updateCoinsHeader(event) {
    let InputValue = Math.round(event.target.value / 10) * 10;
    
    if (InputValue < 10 ) {
        InputValue = 10;
    }
    event.target.value = InputValue;
    CoinsHeader.innerText = InputValue + " Candys = " + InputValue / 10 + " Coins";
}
function Convert(){
    ConvertCandysToCoins(Input.value);
}