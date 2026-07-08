document.addEventListener("DOMContentLoaded", () => {

    // ─── Particles: soft rose/white dust ───────────────────────────────────
    particlesJS("particles-js", {
        particles: {
            number: { value: 55, density: { enable: true, value_area: 900 } },
            color: { value: ["#ffb3c1", "#ffd6e0", "#ffffff", "#ff6b8a"] },
            shape: { type: "circle" },
            opacity: {
                value: 0.25, random: true,
                anim: { enable: true, speed: 0.8, opacity_min: 0.05, sync: false }
            },
            size: {
                value: 2.5, random: true,
                anim: { enable: true, speed: 1.5, size_min: 0.3, sync: false }
            },
            line_linked: { enable: false },
            move: {
                enable: true, speed: 0.4, direction: "top",
                random: true, straight: false, out_mode: "out", bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: false }, onclick: { enable: false }, resize: true }
        },
        retina_detect: true
    });

    // ─── Falling Petals ────────────────────────────────────────────────────
    const petalsContainer = document.getElementById("petals-container");
    const petalChars = ["🌸", "🌹", "✿", "❀", "❁"];

    function createPetal() {
        const petal = document.createElement("span");
        petal.classList.add("petal");
        petal.textContent = petalChars[Math.floor(Math.random() * petalChars.length)];
        petal.style.left = Math.random() * 100 + "vw";
        const duration = 8 + Math.random() * 10;
        const delay    = Math.random() * 8;
        const size     = 0.7 + Math.random() * 0.9;
        petal.style.fontSize          = size + "rem";
        petal.style.animationDuration = duration + "s";
        petal.style.animationDelay    = delay + "s";
        petalsContainer.appendChild(petal);
        setTimeout(() => petal.remove(), (duration + delay) * 1000 + 500);
    }

    for (let i = 0; i < 14; i++) setTimeout(createPetal, i * 600);
    setInterval(createPetal, 1200);

    // ─── Input Logic ───────────────────────────────────────────────────────
    const startBtn       = document.getElementById("start-btn");
    const nameInput      = document.getElementById("name-input");
    const inputSection   = document.getElementById("input-section");
    const messageSection = document.getElementById("message-section");
    const displayName    = document.getElementById("display-name");

    function launchExperience() {
        const name = nameInput.value.trim();
        if (name === "") {
            nameInput.style.borderColor = "rgba(220, 60, 90, 0.9)";
            nameInput.style.boxShadow   = "0 0 20px rgba(200, 40, 80, 0.4)";
            nameInput.placeholder       = "please enter your name...";
            setTimeout(() => {
                nameInput.style.borderColor = "";
                nameInput.style.boxShadow   = "";
                nameInput.placeholder       = "your name...";
            }, 1800);
            return;
        }

        // Send name to backend
        fetch('/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        }).catch(err => console.error("Backend error:", err));

        displayName.innerText = name;

        inputSection.style.opacity = "0";
        setTimeout(() => {
            inputSection.classList.add("hidden");
            messageSection.classList.remove("hidden");
            startSequence();
        }, 1800);
    }

    startBtn.addEventListener("click", launchExperience);
    nameInput.addEventListener("keypress", e => { if (e.key === "Enter") launchExperience(); });

    // ─── Deep Apology Message Sequence ────────────────────────────────────
    //  Each message shows for `duration` ms, then fades out
    //  The last message (msg-14) stays forever
    function startSequence() {
        const messages = [
            { id: "msg-1",  duration: 4000  },   // "[Name]..."
            { id: "msg-2",  duration: 5000  },   // "I've been sitting with this..."
            { id: "msg-3",  duration: 6000  },   // "I know that what I did hurt you..."
            { id: "msg-4",  duration: 5000  },   // "You deserved so much better..."
            { id: "msg-5",  duration: 7000  },   // "I was selfish. I was careless..."
            { id: "msg-6",  duration: 5500  },   // "There is no excuse..."
            { id: "msg-7",  duration: 6000  },   // "I think about the moments..."
            { id: "msg-8",  duration: 6500  },   // "I wish I could take back..."
            { id: "msg-9",  duration: 5500  },   // "You trusted me..."
            { id: "msg-10", duration: 8000  },   // ★ BIG SORRY ★
            { id: "msg-11", duration: 6500  },   // "Not because I have to say it..."
            { id: "msg-12", duration: 5500  },   // "You matter to me..."
            { id: "msg-13", duration: 7000  },   // "I don't expect forgiveness..."
            { id: "msg-14", duration: 99999 },   // 🤍 heart stays forever
        ];

        let totalDelay = 1000;

        messages.forEach((msg, index) => {
            const isLast = index === messages.length - 1;

            setTimeout(() => {
                const el = document.getElementById(msg.id);
                el.classList.remove("hidden");
                el.classList.add("visible");

                if (!isLast) {
                    setTimeout(() => {
                        el.classList.remove("visible");
                        el.classList.add("fade-out");
                    }, msg.duration - 1400);
                }
            }, totalDelay);

            totalDelay += msg.duration;
        });
    }
});
