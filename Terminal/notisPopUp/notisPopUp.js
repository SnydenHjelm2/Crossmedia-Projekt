class NotisPopUp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
            <style>
                #container {
                    height: 150px;
                    transition: height 0.1s;
                }
                #content {
                    padding: 15px;
                    font-family: arial;
                    overflow: scroll;
                    height: auto;
                }
                #content div {
                    display: flex;
                    align-items: center;
                    padding-bottom: 35px;
                    border-bottom: 1px solid black;
                }
                #handle {
                    height: 60px;
                    cursor: ns-resize;
                    background: whitesmoke;

                    display: flex;
                    justify-content: center;
                    align-items: end;
                }
                #handle img {
                    transform: rotate(180deg);
                }
                p {
                    font-weight: 100;
                    line-height: 150%;
                }
                img {
                    width: 60px;
                }
                h5 {
                    font-style: italic;
                    margin: 0;
                    font-weight: 50;
                }
            </style>
            <div id="container">
                <div id="content">
                    <img src="notisPopUp/Till_Elias_v2.jpg">
                    <h4>JUST NU: Misstänkt kidnappning stoppad i Malmö</h4>
                    <p>Polisen kunde under kvällen gripa en man i 25-årsåldern, misstänkt för att ha planerat en kidnappning av en kvinna han tidigare haft en relation med.<br></br> Gripandet skedde efter att avgörande information inkommit i sista stund, vilket gjorde att polisen kunde ingripa innan brottet genomfördes.<br></br> Enligt uppgifter ska mannen under en längre tid ha kartlagt kvinnans rörelsemönster och förberett en plats där hon skulle hållas fången. <br></br> Polisen bekräftar att kvinnan inte kom till skada.</p>
                    <div>
                        <h5>Skrivbent: Rebecca Sjödin</h5>
                        <img src="notisPopUp/Cirkeljournalist.png">
                    </div>
                </div>
            </div>
            <div id="handle">
                <img src="notisPopUp/Pil.png">
            </div>
        `;

        const container = this.shadowRoot.querySelector("#container");
        const handle = this.shadowRoot.querySelector("#handle");

        let isDragging = false;

        const startDrag = (e) => {
            isDragging = true;
            e.preventDefault(); // Förhindra oönskade beteenden
        };

        const stopDrag = () => {
            isDragging = false;
        };

        const drag = (clientY) => {
            if (!isDragging) return;

            let newHeight = clientY; // Använd direkt `clientY` för att öka höjden när man drar nedåt

            if (newHeight < 100) newHeight = 100; // Minsta höjd
            if (newHeight > window.innerHeight) newHeight = window.innerHeight; // Max höjd

            container.style.height = newHeight + "px";
        };

        // Desktop
        handle.addEventListener("mousedown", startDrag);
        window.addEventListener("mouseup", stopDrag);
        window.addEventListener("mousemove", (e) => drag(e.clientY));

        // Mobile
        handle.addEventListener("touchstart", startDrag);
        window.addEventListener("touchend", stopDrag);
        window.addEventListener("touchmove", (e) => {
            if (isDragging) {
                drag(e.touches[0].clientY);
                e.preventDefault(); // Förhindra scrollning när användaren drar
            }
        });
    }
}
customElements.define("notis-comp", NotisPopUp);