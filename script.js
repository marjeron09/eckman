/* =====================================================
   1. TYPEWRITER EFFECT WITH AUTO-SCROLL
===================================================== */
const letterParagraphs = [
    "Miss you guys. ❤️",
    "Yown nakapasok siya HAHHAHHAA.",
    "I wanted to make something different this time. Not just random videos, and things that people can scroll through and forget after a few minutes.",
    "I wanted to make a small place where I could keep some of the memories, moments, laughs, random adventures, and stories that we've shared together.",
    "We've probably had moments where we laughed over the dumbest things, talked about random topics for hours, made jokes that nobody else would understand, or simply spent time together without realizing that those ordinary moments would eventually become memories.",
    "And honestly, those are some of the moments I appreciate the most.",
    "Life keeps moving. People get busy. Everyone starts taking different paths, meeting new people, chasing different dreams, and dealing with their own problems.",
    "That's why I wanted to make this.",
    "So someday, when we look back, there will be something here that reminds us of the people we were, the things we did, and the friendships we had during this part of our lives.",
    "Thank you for being part of my story. Thank you for the laughs, the conversations, the memories, and even the annoying moments.",
    "You guys probably don't realize it, but every person I've met has left some kind of mark on my life.",
    "And I'm genuinely grateful that our paths crossed.",
    "I don't know where life will take all of us in the future, but I hope that even years from now, we'll still be able to look back at these memories and smile.",
    "No matter how much things change, I hope we never completely forget the crazy, simple, funny, and sometimes chaotic moments we had together.",
    "So this website is more than just code. It's a little time capsule.",
    "A collection of memories. A collection of stories. And a small reminder that, at one point in our lives, we were all here together.",
    "Thank you for being my friends. 🖤",
    "And if you're reading this right now... just know that you are appreciated more than you probably realize.",
    "Cheer's to the memories we've already made and the ones we haven't made yet. 🥂✨"
];

let paraIndex = 0;
let charIndex = 0;

function startTypewriterLetter() {
    const container = document.getElementById("typewriterLetterBody");
    const letterBox = document.querySelector(".friend-letter");
    const signature = document.getElementById("letterSignature");
    if (!container) return;

    container.innerHTML = "";
    paraIndex = 0;
    charIndex = 0;

    function typeNextChar() {
        if (paraIndex < letterParagraphs.length) {
            let currentP = container.children[paraIndex];
            if (!currentP) {
                currentP = document.createElement("p");
                currentP.className = "typing-cursor";
                container.appendChild(currentP);
            }

            const currentText = letterParagraphs[paraIndex];

            if (charIndex < currentText.length) {
                currentP.textContent += currentText.charAt(charIndex);
                charIndex++;
                
                // AUTO-SCROLL TO FOLLOW TYPING CURSOR
                if (letterBox) {
                    letterBox.scrollTop = letterBox.scrollHeight;
                }
                
                setTimeout(typeNextChar, 20);
            } else {
                currentP.classList.remove("typing-cursor");
                paraIndex++;
                charIndex = 0;
                setTimeout(typeNextChar, 250);
            }
        } else {
            if (signature) signature.style.display = "block";
            if (letterBox) letterBox.scrollTop = letterBox.scrollHeight;
        }
    }

    typeNextChar();
}

/* =====================================================
   2. ENVELOPE & PASSWORD LOGIC
===================================================== */
function openLetterPassword() {
    document.getElementById("letterIntro")?.classList.remove("show");
    document.getElementById("letterPassword")?.classList.add("show");
}

function unlockLetter() {
    const input = document.getElementById("letterPasswordInput");
    const passBox = document.getElementById("letterPassword");
    const letter = document.getElementById("friendLetter");
    const error = document.getElementById("passwordError");
    const music = document.getElementById("letterMusic");

    if (input && input.value.trim().toLowerCase() === "eckman") {
        passBox?.classList.remove("show");
        letter?.classList.add("show");
        if (error) error.textContent = "";

        if (music) {
            music.volume = 0.4;
            music.play().catch(() => {});
        }

        startTypewriterLetter();
    } else {
        if (error) error.textContent = "❌ Wrong password! Try again kupal.";
    }
}

function closeLetterAndGoHome() {
    document.getElementById("friendLetter")?.classList.remove("show");
    const music = document.getElementById("letterMusic");
    if (music) music.pause();
    goHome();
}

/* =====================================================
   3. NAVIGATION & FRIEND MODALS
===================================================== */
function goHome() {
    closeAllModals();
    document.getElementById("home").style.display = "flex";
    document.getElementById("friends").style.display = "none";
    document.getElementById("memories").style.display = "none";
    pauseVideos();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function showFriends() {
    closeAllModals();
    document.getElementById("home").style.display = "none";
    document.getElementById("friends").style.display = "block";
    document.getElementById("memories").style.display = "none";
    pauseVideos();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function showMemories() {
    closeAllModals();
    document.getElementById("home").style.display = "none";
    document.getElementById("friends").style.display = "none";
    document.getElementById("memories").style.display = "block";
    pauseVideos();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function openFriend(friendName) {
    closeAllModals();
    const target = document.getElementById(`${friendName}-profile`);
    if (target) {
        target.classList.add("active");
        document.body.style.overflow = "hidden"; // Stop background scroll
    }
}

function closeFriend() {
    closeAllModals();
    document.body.style.overflow = "auto";
}

function closeAllModals() {
    document.querySelectorAll(".friend-profile").forEach(p => p.classList.remove("active"));
    document.body.style.overflow = "auto";
}

function pauseVideos() {
    document.querySelectorAll("video").forEach(v => v.pause());
}

function goTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* =====================================================
   4. 50-PHOTO GALLERY GENERATOR
===================================================== */
function generateIosGallery() {
    const grid = document.getElementById("iosPhotoGrid");
    if (!grid) return;

    grid.innerHTML = "";

    for (let i = 1; i <= 50; i++) {
        const card = document.createElement("div");
        card.className = "ios-photo-card";

        const img = document.createElement("img");
        img.src = `images/picture${i}.jpg`;
        img.alt = `Memory ${i}`;
        img.loading = "lazy";

        img.onerror = function () {
            this.onerror = null;
            this.src = `https://via.placeholder.com/300x300/141420/a78bfa?text=Photo+${i}`;
        };

        card.onclick = () => openLightbox(img.src);
        card.appendChild(img);
        grid.appendChild(card);
    }
}

function openLightbox(src) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    if (lightbox && lightboxImg) {
        lightboxImg.src = src;
        lightbox.classList.add("show");
    }
}

function closeLightbox() {
    document.getElementById("lightbox")?.classList.remove("show");
}

/* Initialize Page */
window.addEventListener("DOMContentLoaded", () => {
    generateIosGallery();
    goHome();
});
