class NotisPopUp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:"open"});
        this.shadowRoot.innerHTML = `
            <style>
                #container {
                    position: absolut;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 150px;
                    transition: height 0.1s;

                }
                #content {
                    padding: 15px;
                    font-family: arial;
                    overflow: scroll;
                    height:auto;
                }
                #content div {
                    display: flex;
                    align-items: center;
                    padding-bottom: 35px;
                    border-bottom: 1px solid black;

                }
                #handle {
                    height: 20px;
                    cursor: ns-resize;
                }
                p {
                    font-weight: 100;
                    line-height: 150%
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
                    <h4>JUST NU: Misstänkt kidnappning stoppad i Malmö<h4>
                    <p>Polisen kunde under kvällen gripa en man i 25-årsåldern, misstänkt för att ha planerat en kidnappning av en kvinna han tidigare haft en relation med.<br></br> Gripandet skedde efter att avgörande information inkommit i sista stund, vilket gjorde att polisen kunde ingripa innan brottet genomfördes.<br></br> Enligt uppgifter ska mannen under en längre tid ha kartlagt kvinnans rörelsemönster och förberett en plats där hon skulle hållas fången. <br></br> Polisen bekräftar att kvinnan inte kom till skada.</p>
                    <div>
                        <h5>Skrivbent: Rebecca Sjödin</h5>
                        <img src="notisPopUp/Cirkeljournalist.png">
                    </div>
                </div>
            </div>
            <div id="handle"></div>

            
        `
        const container = this.shadowRoot.querySelector("#container");
        const handle = this.shadowRoot.querySelector("#handle");

        let isDragging = false;

        handle.addEventListener("mousedown", () => {
            isDragging = true;
        });

        window.addEventListener("mouseup", () => {
            isDragging = false;
        });

        window.addEventListener("mousemove", (e) => {
            if (!isDragging) return;

            let newHeight = e.clientY;

            // Begränsa min/max höjd
            if (newHeight < 100) newHeight = 100;
            if (newHeight > window.innerHeight) newHeight = window.innerHeight;

            container.style.height = newHeight + "px";
        });

                
    }
}
customElements.define("notis-comp", NotisPopUp);