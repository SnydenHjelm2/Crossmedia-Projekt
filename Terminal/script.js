let input = document.querySelector("input");
let logsCont = document.getElementById("logsCont");
let body = document.querySelector("body");

body.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        let inputValue = input.value.trim(); 
        let inputParts = inputValue.split(":"); 
        let command = inputParts[0].trim(); 
        let text = inputParts[1] ? inputParts[1].trim() : undefined; 

        console.log(command);
        console.log(text);

        let div = document.createElement("div");
        let p = document.createElement("p");

        if (command === "decode") {
            if (text === "Iakttagen") {
                const sound = new Audio(`Station2MP3.mp3`); 
                sound.currentTime = 0;
                sound.play(); 

                let remainingTime = 102; // Total tid i sekunder (1:42 = 102 sekunder)

                // Starta nedräkningen
                const countdownInterval = setInterval(() => {
                    remainingTime--;

                    // Beräkna minuter och sekunder
                    const minutes = Math.floor(remainingTime / 60);
                    const seconds = remainingTime % 60;

                    // Uppdatera nedräkningsdisplayen
                    p.innerHTML = `<p>Spelar upp ljud: ${minutes}:${seconds.toString().padStart(2, '0')}</p>`;

                    // Stoppa nedräkningen när tiden är slut
                    if (remainingTime <= 32) {
                        p.innerHTML = `<p>Ta med boken och hitta nycklen <br></br> 55°36'24.5"N 12°59'35.8"E </p>`;
                    } else if(remainingTime === 0) {
                        clearInterval(countdownInterval);
                    }
                }, 1000);

                // Stoppa nedräkningen och visa meddelande när ljudet är klart
                setTimeout(() => {
                    p.innerHTML = `<p>Ljudet är klart!</p>`;
                }, 102000); // 102 sekunder = 1:42

                
                
            } else if(text === "Nå mig via telefon") {
                let countdown = 15; 
                p.innerHTML = `<p>RING MIG: 0738151380 <br></br> Du kommer att transporteras till telefonen om <span id="timer">${countdown}</span> sekunder...</p>`;
                div.appendChild(p);
                logsCont.appendChild(div);

                const timerInterval = setInterval(() => {
                    countdown--;
                    document.getElementById("timer").textContent = countdown;
        
                    if (countdown <= 0) {
                        clearInterval(timerInterval); 
                    }
                }, 1000);
        
                setTimeout(() => {
                    window.location.href = "https://webshare.mah.se/aq2168/telefon/";
                }, 15000);

            } else if(text === "Återställ") {
                let req = new Request("https://railway-timer-production.up.railway.app/reset", {
                    headers: {"Content-type": "application/json"},
                    method: "DELETE",
                    
                    body: JSON.stringify({
                    }) 
                });
                fetch(req).then(resp => resp.json()).then(reso => console.log(reso));

                document.querySelector("notis-comp").style.display = "block";

            } else {
                p.innerHTML = `<p>Could not decode the message</p>`

            }
        } else if (command === "help") {
            p.innerHTML = `help:<br>
                - decode: message -> Decodes the given message.<br>
                - clear -> Clears the terminal logs.<br>
                - help -> Displays this help message.`;
        } else if (command === "clear") {
            logsCont.innerHTML = "";
            p.textContent = "Welcome to the terminal, tools ready [decode, clear, help]";
        } else {
            p.textContent = `Command not found: ${input.value}`;
        }

        div.appendChild(p);
        logsCont.appendChild(div);
        input.value = "";
    }
});