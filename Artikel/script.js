let date = new Date()
let year = date.getFullYear(); // Hämtar året
let month = String(date.getMonth() + 1).padStart(2, '0'); // Hämtar månaden (0-indexerad, +1) och lägger till en ledande nolla
let day = String(date.getDate()).padStart(2, '0'); // Hämtar dagen och lägger till en ledande nolla
let formattedDate = `${year}-${month}-${day}`; // Formaterar till xxxx-xx-xx



let btn = document.querySelector("button");
let span = document.querySelector("span");
let article = document.querySelector("article");
btn.addEventListener("click", function() {
    article.style.opacity = "1";
    span.style.display = "none";

    let req = new Request("https://railway-timer-production.up.railway.app/start", {
        headers: {"Content-type": "application/json"},
        method: "POST",
        
        body: JSON.stringify({
            
    
        })
        
    });
    
    fetch(req).then(resp => resp.json()).then(reso => console.log(reso));
})
