const currentPage = {
    page: "",
};

const driver = () => {
    currentPage.page = "lockscreen";
    const h1 = document.querySelector("#lockscreen h1");
    const h3 = document.querySelector("#lockscreen h3");

    let time = lockscreen.getTime();
    if (time.date < 10) time.date = time.date.split("")[1];
    h1.textContent = time.hours + ":" + time.minutes;
    h3.textContent = `${time.weekday} den ${time.date} ${time.month}`;

    currentPage.interval = setInterval(lockscreen.updateTime, 1000);

    document.querySelector("#log-in").style.display = "none";
    document.querySelector("#loading").style.display = "none";
    document.querySelector("#desktop").style.display = "none";

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

const lockscreen = {
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
        let time = lockscreen.getTime();
        document.querySelector("#lockscreen h1").textContent = time.hours + ":" + time.minutes;
    }
}

const logIn = (pwd) => {
    document.querySelector("#log-in").style.display = "none";
    document.querySelector("#loading").style.display = "flex";
    if (pwd.toLowerCase() !== "fotboll") {
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
                document.querySelector("#loading").style.display = "none";
                document.body.style.backgroundImage = "url(images/city.jpg)";
                currentPage.page = "desktop";
            }, 1500);
        }, 5000);
    }
}

const showLogin = () => {
    document.querySelector("#lockscreen").style.display = "none";
    document.querySelector("#log-in").style.display = "block";
    document.querySelector("#log-in #pwd").focus();
    currentPage.page = "login";
}

const showLockscreen = () => {
    document.querySelector("#log-in").style.display = "none";
    document.querySelector("#lockscreen").style.display = "block";
    currentPage.page = "lockscreen";
}

driver();