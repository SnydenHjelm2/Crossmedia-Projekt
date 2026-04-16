const clock = {
    getTime: () => {
        let now = new Date();
        let time = now.toLocaleTimeString("sv-SE");
        let date = now.toLocaleDateString("sv-SE");
        let weekday = now.toLocaleDateString("sv-SE", {weekday: "long"});
        let month = now.toLocaleDateString("sv-SE", {month: "long"});
        return {
            hours: time.split(":")[0],
            minutes: time.split(":")[1],
            date: date.split("-")[2],
            weekday: weekday,
            month: month
        };
    },

    updateTime: () => {
        let time = clock.getTime();
        document.querySelector("#lockscreen h1").textContent = time.hours + ":" + time.minutes;
    }
}

const crypt = {
    alphabet: [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
        'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
        'u', 'v', 'w', 'x', 'y', 'z', "å", "ä", "ö"
    ],

    code: [
        'å', 'w', 'h', 'p', 'j', 'ä',
        'i', 'v', 'm', 'b', 'ö', 'f',
        'c', 's', 'y', 'r', 't', 'l',
        'k', 'u', 'g', 'e', 'd', 'q',
        'n', 'a', 'x', 'z', 'o'
    ],

    encode: (word) => {
        if (typeof word !== "string") return null;
        word = word.toLowerCase();
        let splitCode = word.split("");
        let code = "";
        for (let c of splitCode) {
            let indexAlph = crypt.alphabet.indexOf(c);
            code += crypt.code[indexAlph];
        }
        return code;
    }
}

const currentPage = {
    page: "",
};

const driver = () => {
    currentPage.page = "lockscreen";
    const h1 = document.querySelector("#lockscreen h1");
    const h3 = document.querySelector("#lockscreen h3");

    let time = clock.getTime();
    if (time.date < 10) time.date = time.date.split("")[1];
    h1.textContent = time.hours + ":" + time.minutes;
    h3.textContent = `${time.weekday} den ${time.date} ${time.month}`;

    setInterval(clock.updateTime, 1000);

    document.querySelector("#log-in").style.display = "none";
    document.querySelector("#loading").style.display = "none";
    //document.querySelector("#desktop").style.display = "none";
    document.body.style.backgroundImage = "url(images/city.jpg)";
    document.querySelector("#lockscreen").style.display = "none";

    window.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            switch (currentPage.page) {
                case "lockscreen":
                    showLogin();
                    break;
                
                case "login":
                    logIn(document.querySelector("#log-in #pwd").value);
                    break;
            }
        } else if (e.key === "Escape") {
            switch (currentPage.page) {
                case "login":
                    showLockscreen();
                    break;
            }
        }
    });
    window.addEventListener("click", (e) => {
        if (e.target.parentElement.id === "back") return;
        if (currentPage.page === "lockscreen") showLogin();
    });

    document.querySelector("#back").addEventListener("click", () => {
        showLockscreen();
    });
}

const logIn = (pwd) => {
    document.querySelector("#log-in").style.display = "none";
    document.querySelector("#loading").style.display = "flex";
    if (crypt.encode(pwd) !== "äyuwyff") {
        setTimeout(() => {
            document.querySelector("#log-in").style.display = "block";
            document.querySelector("#loading").style.display = "none";
            document.querySelector("#log-in #status").textContent = "Fel lösenord, försök igen";
            document.querySelector("#log-in #pwd").value = "";
        }, 3000);
    } else {
        setTimeout(() => {
            document.querySelector("#loading h2").textContent = "Välkommen August!";
            setTimeout(() => {
                document.querySelector("#desktop").style.display = "block";
                d3.select("#desktop").transition().duration(300).style("opacity", 1);
                document.querySelector("#loading").style.display = "none";
                document.body.style.backgroundImage = "url(images/city.jpg)";
                currentPage.page = "desktop";
            }, 1500);
        }, 4000);
    }
}

const showLogin = () => {
    document.querySelector("#lockscreen").style.display = "none";
    document.querySelector("#log-in").style.display = "block";
    d3.select("#log-in").transition().duration(300).style("opacity", "1");
    document.querySelector("#log-in #pwd").focus();
    currentPage.page = "login";
}

const showLockscreen = () => {
    document.querySelector("#log-in").style.display = "none";
    document.querySelector("#log-in").style.opacity = "0";
    document.querySelector("#lockscreen").style.display = "block";
    currentPage.page = "lockscreen";
}

driver();