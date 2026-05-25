const disableEnableButtons = () => {
    if (current === 1) {
        left.disabled = true;
        return;
    }

    if (current === 3) {
        right.disabled = true;
        return;
    }

    left.disabled = false;
    right.disabled = false;
}

let current = 1;
const img = document.querySelector("img");
const left = document.querySelector("#left");
const right = document.querySelector("#right");

left.addEventListener("click", () => {
    if (current === 1) return;

    current--;
    img.src = `images/dagbok${current}.jpg`;
    disableEnableButtons();
});

right.addEventListener("click", () => {
    if (current === 3) return;

    current++;
    img.src = `images/dagbok${current}.jpg`;
    disableEnableButtons();
});

disableEnableButtons();