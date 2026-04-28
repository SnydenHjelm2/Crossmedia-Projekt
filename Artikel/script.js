let date = new Date()
let year = date.getFullYear(); // Hämtar året
let month = String(date.getMonth() + 1).padStart(2, '0'); // Hämtar månaden (0-indexerad, +1) och lägger till en ledande nolla
let day = String(date.getDate()).padStart(2, '0'); // Hämtar dagen och lägger till en ledande nolla
let formattedDate = `${year}-${month}-${day}`; // Formaterar till xxxx-xx-xx

let dateText = document.getElementById("dateText");
dateText.textContent = formattedDate;
