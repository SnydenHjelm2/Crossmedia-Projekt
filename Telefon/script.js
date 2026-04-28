const phoneNumberInput = document.getElementById('phoneNumber');
const keys = document.querySelectorAll('.keyNum');
const callButton = document.getElementById('call');
const backButton = document.getElementById('back');

const keyPressSound = new Audio(`phone-keypad-button-dial-ni-sound-1-1-00-00.mp3`); 
const callSound = new Audio(`Telefonsamtal.mp3`)


keys.forEach(key => {
    key.addEventListener('click', () => {
        phoneNumberInput.value += key.textContent;
        keyPressSound.currentTime = 0;
        keyPressSound.play(); 
    });
});

backButton.addEventListener('click', () => {
    if(phoneNumberInput.value === "Röstbrevlåda") {
        phoneNumberInput.value = "";
        callSound.pause(); 
        callSound.currentTime = 0; 
    } else {
        phoneNumberInput.value = phoneNumberInput.value.slice(0, -1);
    }

});
callButton.addEventListener("click", () => {
    if(phoneNumberInput.value === "#1") {
        phoneNumberInput.value = "Röstbrevlåda";
        callSound.play(); 
    } 
})



