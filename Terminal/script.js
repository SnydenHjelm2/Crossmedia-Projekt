let input = document.querySelector("input");
let logsCont = document.getElementById("logsCont")
let body = document.querySelector("body");
body.addEventListener("keydown", function(e) {
    if(e.key === "Enter") {
        let text = input.value.toLowerCase().split(":");
        let div = document.createElement("div");
        let p = document.createElement("p");
        if((text[0] ==="decode")) {
            p.textContent = "Happy to encode you";
        } else if(text[0] ==="help" ) {
            p.innerHTML = `help:<br>
                - decode:message -> Decodes the given message.<br>
                - clear -> Clears the terminal logs.<br>
                - help -> Displays this help message.`;
        } else if(text[0] ==="clear") {
            logsCont.innerHTML = "";
            p.textContent = "Welcome to the terminal, tools ready [decode, clear, help]"
        }
        else {
            p.textContent = `Command not found: ${input.value}`;

        }
        div.appendChild(p);
        logsCont.appendChild(div);
        input.value = ""



        
        
        
        
        
    }
})