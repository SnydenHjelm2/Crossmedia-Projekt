const driver = () => {
    elements.overlay.style.display = "none";

    elements.mainImgs.forEach(x  => {
        x.addEventListener("click", () => {
            elements.overlay.style.display = "flex";
            let split = x.src.split("/");
            elements.overlayImg.src = `images/${split[split.length - 1]}`;
        });
    });

    elements.overlay.addEventListener("click", () => {
        elements.overlay.style.display = "none";
    });
    
    elements.overlayImg.addEventListener("click", () => {
        elements.overlay.style.display = "none";
    });
}

const elements = {
    mainImgs: document.querySelectorAll("main img"),

    overlay: document.querySelector("#overlay"),

    overlayImg: document.querySelector("#overlay img")
}

driver();