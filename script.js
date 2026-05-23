document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // --- CANVAS PARTICLES SYSTEM ---
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const container = document.getElementById("particles-js");
    container.appendChild(canvas);

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
        width = (canvas.width = window.innerWidth);
        height = (canvas.height = window.innerHeight);
    });

    const particles = [];
    const heartEmoji = ["❤️", "💖", "🌸", "✨", "💕"];

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = height + Math.random() * 100;
            this.type = Math.random() > 0.4 ? "sparkle" : "heart";
            this.emoji = heartEmoji[Math.floor(Math.random() * heartEmoji.length)];
            this.size = Math.random() * 12 + 6;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = -(Math.random() * 1.5 + 0.5);
            this.opacity = Math.random() * 0.5 + 0.2;
            this.rotation = Math.random() * Math.PI;
            this.rotationSpeed = Math.random() * 0.02 - 0.01;
            this.swaySpeed = Math.random() * 0.02 + 0.01;
            this.swayDistance = Math.random() * 1.5;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX + Math.sin(this.y * this.swaySpeed) * this.swayDistance;
            this.rotation += this.rotationSpeed;
            
            // Fade out near top
            if (this.y < 100) {
                this.opacity -= 0.005;
            }

            if (this.opacity <= 0 || this.y < -20 || this.x < -20 || this.x > width + 20) {
                this.reset();
            }
        }

        reset() {
            this.x = Math.random() * width;
            this.y = height + 20;
            this.opacity = Math.random() * 0.5 + 0.3;
            this.size = Math.random() * 12 + 6;
            this.speedY = -(Math.random() * 1.2 + 0.4);
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.globalAlpha = this.opacity;
            ctx.font = `${this.size}px Arial`;
            ctx.fillText(this.emoji, -this.size / 2, this.size / 2);
            ctx.restore();
        }
    }

    // Initialize particles
    const particleCount = Math.min(60, Math.floor(width / 25));
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
        // Scatter initial y positions so they don't all rise from the bottom together
        particles[i].y = Math.random() * height;
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach((p) => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();


    // --- BACKGROUND MUSIC LOGIC ---
    const bgMusic = document.getElementById("bgMusic");
    const musicToggle = document.getElementById("musicToggle");
    const muteSvg = document.getElementById("mute-svg");
    const playSvg = document.getElementById("play-svg");
    const musicText = musicToggle.querySelector(".music-text");
    const musicIcon = musicToggle.querySelector(".music-icon");

    let isPlaying = false;

    // Soft volume
    bgMusic.volume = 0.4;

    musicToggle.addEventListener("click", () => {
        if (isPlaying) {
            bgMusic.pause();
            muteSvg.style.display = "block";
            playSvg.style.display = "none";
            musicText.innerText = "Play Music";
            musicIcon.classList.remove("playing");
            musicIcon.classList.add("paused");
            isPlaying = false;
        } else {
            bgMusic.play().then(() => {
                muteSvg.style.display = "none";
                playSvg.style.display = "block";
                musicText.innerText = "Mute Music";
                musicIcon.classList.remove("paused");
                musicIcon.classList.add("playing");
                isPlaying = true;
            }).catch((err) => {
                console.error("Audio playback blocked by browser: ", err);
                // Standard browser fallback alert
                alert("Please interact with the page first to enable romantic background tunes! 🎵");
            });
        }
    });


    // --- SECTION 1: CINEMATIC OPENING (GSAP) ---
    // Scroll is fully allowed at all times so refresh does not lock navigation.
    document.body.style.overflowY = "auto";

    const lines = [
        document.getElementById("line-1"),
        document.getElementById("line-2"),
        document.getElementById("line-3"),
        document.getElementById("line-4"),
        document.getElementById("line-5"),
        document.getElementById("line-6"),
        document.getElementById("line-7"),
        document.getElementById("line-8")
    ];
    const heroCta = document.getElementById("heroCta");

    const introTl = gsap.timeline();

    // 1. Line 1: Hey Beta... ❤️
    introTl.set(lines[0], { display: "block" })
           .to(lines[0], { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" })
           .to(lines[0], { opacity: 0, y: -20, duration: 0.8, delay: 2.2, ease: "power2.in" })
           .set(lines[0], { display: "none" });

    // 2. Line 2 & 3: I know... I did something a little stupid 😭
    introTl.set([lines[1], lines[2]], { display: "block" })
           .to(lines[1], { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" })
           .to(lines[2], { opacity: 1, y: 0, duration: 1.0, delay: 0.4, ease: "power2.out" })
           .to([lines[1], lines[2]], { opacity: 0, y: -20, duration: 0.8, delay: 2.5, ease: "power2.in" })
           .set([lines[1], lines[2]], { display: "none" });

    // 3. Line 4 & 5: And yes... I know you were angry.
    introTl.set([lines[3], lines[4]], { display: "block" })
           .to(lines[3], { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" })
           .to(lines[4], { opacity: 1, y: 0, duration: 1.0, delay: 0.4, ease: "power2.out" })
           .to([lines[3], lines[4]], { opacity: 0, y: -20, duration: 0.8, delay: 2.5, ease: "power2.in" })
           .set([lines[3], lines[4]], { display: "none" });

    // 4. Line 6 & 7: But... Thank you for still understanding me.
    introTl.set([lines[5], lines[6]], { display: "block" })
           .to(lines[5], { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" })
           .to(lines[6], { opacity: 1, y: 0, duration: 1.0, delay: 0.4, ease: "power2.out" })
           .to([lines[5], lines[6]], { opacity: 0, y: -20, duration: 0.8, delay: 2.8, ease: "power2.in" })
           .set([lines[5], lines[6]], { display: "none" });

    // 5. Line 8: That genuinely meant a lot. + CTA Button
    introTl.set(lines[7], { display: "block" })
           .to(lines[7], { opacity: 1, y: 0, duration: 1.4, ease: "power2.out" })
           .to(heroCta, { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }, "-=0.4");

    // Smooth Scroll targets
    const scrollButtons = document.querySelectorAll(".scroll-trigger-btn");
    scrollButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-target");
            const targetSec = document.getElementById(targetId);
            if (targetSec) {
                targetSec.scrollIntoView({ behavior: "smooth" });
            }
        });
    });


    // --- SCROLL ANIMATIONS (GSAP ScrollTrigger) ---
    // Fade up headers, cards, and specific items on scroll
    gsap.utils.toArray(".fade-up").forEach((el) => {
        gsap.fromTo(el, 
            { opacity: 0, y: 35 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 1.5, 
                ease: "power4.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                    toggleActions: "play none none none"
                }
            }
        );
    });

    // Reveal apology lines progressively on scroll
    const revealTexts = document.querySelectorAll(".reveal-text");
    gsap.fromTo(revealTexts,
        { opacity: 0, x: -20 },
        {
            opacity: 1,
            x: 0,
            duration: 1,
            stagger: 0.35,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".apology-card",
                start: "top 70%"
            }
        }
    );


    // --- SECTION 2: INTERACTIVE PAW STAMPS ---
    const imageSection = document.getElementById("image-moment");
    const glassFrame = document.querySelector(".glass-frame");

    glassFrame.addEventListener("click", (e) => {
        // Create paw element
        const paw = document.createElement("div");
        paw.className = "paw-stamp";
        
        // Custom SVG paw path
        paw.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="14.5" r="4.5"/>
                <circle cx="6.5" cy="8.5" r="2"/>
                <circle cx="10" cy="5.5" r="2.2"/>
                <circle cx="14" cy="5.5" r="2.2"/>
                <circle cx="17.5" cy="8.5" r="2"/>
            </svg>
        `;

        // Position it absolute relative to document scroll
        const rect = glassFrame.getBoundingClientRect();
        const absoluteX = e.clientX - rect.left;
        const absoluteY = e.clientY - rect.top;
        
        paw.style.left = `${absoluteX}px`;
        paw.style.top = `${absoluteY}px`;
        
        glassFrame.appendChild(paw);

        // Remove paw stamp after animation completes
        setTimeout(() => {
            paw.remove();
        }, 900);
        
        // Spawn small flying hearts inside container
        spawnFloatingHearts(e.clientX, e.clientY + window.scrollY);
    });


    // Utility function to spawn bursting hearts on click
    function spawnFloatingHearts(x, y) {
        for (let i = 0; i < 6; i++) {
            const h = document.createElement("div");
            h.innerText = Math.random() > 0.5 ? "❤️" : "🐾";
            h.style.position = "absolute";
            h.style.left = `${x}px`;
            h.style.top = `${y}px`;
            h.style.fontSize = `${Math.random() * 14 + 12}px`;
            h.style.pointerEvents = "none";
            h.style.zIndex = "999";
            h.style.opacity = "1";
            document.body.appendChild(h);

            const travelX = (Math.random() - 0.5) * 120;
            const travelY = -Math.random() * 150 - 50;

            gsap.to(h, {
                x: travelX,
                y: travelY,
                opacity: 0,
                scale: 0.5,
                rotation: Math.random() * 360 - 180,
                duration: 1.2 + Math.random() * 0.4,
                ease: "power2.out",
                onComplete: () => h.remove()
            });
        }
    }


    // --- SECTION 4: 3D CARD TILT ON HOVER ---
    const factCards = document.querySelectorAll(".fact-card");
    factCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate tilt angle based on cursor position relative to card center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const tiltX = (y - centerY) / 8; // Max 10 deg
            const tiltY = -(x - centerX) / 12;
            
            gsap.to(card, {
                rotateX: tiltX,
                rotateY: tiltY,
                scale: 1.03,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener("mouseleave", () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                duration: 0.6,
                ease: "power3.out"
            });
        });
    });


    // --- SECTION 5: INTERACTIVE ANGER SLIDER ---
    const slider = document.getElementById("angerRange");
    const highlight = document.getElementById("sliderHighlight");
    const responseText = document.getElementById("responseText");
    const responseBox = document.getElementById("responseBox");
    const nodes = document.querySelectorAll(".slider-node");

    const responses = {
        1: "Fair. I probably deserve that 😭",
        2: "Oooo progress detected 👀",
        3: "I’m counting this as improvement 😌",
        4: "Achievement unlocked: Beta smiled ❤️"
    };

    function updateSlider(val) {
        // Move native range input just in case nodes are clicked
        slider.value = val;
        
        // Update highlight width
        const pct = ((val - 1) / 3) * 100;
        gsap.to(highlight, { width: `${pct}%`, duration: 0.4, ease: "power2.out" });

        // Update active class on nodes
        nodes.forEach(n => {
            const nodeVal = parseInt(n.getAttribute("data-val"));
            if (nodeVal === val) {
                n.classList.add("active");
            } else {
                n.classList.remove("active");
            }
        });

        // Bouncy animation for response text
        gsap.fromTo(responseBox, 
            { scale: 0.8, opacity: 0.5 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" }
        );
        responseText.innerText = responses[val];
    }

    // Input slider event
    slider.addEventListener("input", (e) => {
        updateSlider(parseInt(e.target.value));
    });

    // Click emoji nodes directly
    nodes.forEach(node => {
        node.addEventListener("click", () => {
            const val = parseInt(node.getAttribute("data-val"));
            updateSlider(val);
        });
    });

    // Set initial position
    updateSlider(2);


    // --- SECTION 6: GLOWING HEART MOMENT ---
    const heartBtn = document.getElementById("heartBtn");
    const mainHeart = document.getElementById("mainHeart");
    const heartMessageBox = document.getElementById("heartMessageBox");
    const revealHTexts = document.querySelectorAll(".reveal-h-text");

    let heartRevealed = false;

    // Both clicking the heart or clicking the button reveals the message
    const triggerHeartReveal = () => {
        if (heartRevealed) return;
        heartRevealed = true;
        
        // Hide button, expand heart
        gsap.to(heartBtn, { opacity: 0, scale: 0.5, duration: 0.4, pointerEvents: "none" });
        gsap.to(mainHeart, { 
            scale: 1.4, 
            filter: "drop-shadow(0 0 35px rgba(255, 92, 138, 0.9))", 
            duration: 0.8, 
            ease: "back.out(2.5)" 
        });

        // Show message box container
        heartMessageBox.classList.add("revealed");

        // Stagger fade-in message lines
        gsap.fromTo(revealHTexts,
            { opacity: 0, y: 20 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.8, 
                stagger: 0.6, 
                ease: "power2.out",
                onComplete: () => {
                    // Scroll target to view easily
                    heartMessageBox.scrollIntoView({ behavior: "smooth", block: "center" });
                }
            }
        );
        
        // Spawn screen hearts
        const heartRect = mainHeart.getBoundingClientRect();
        spawnFloatingHearts(heartRect.left + heartRect.width/2, heartRect.top + heartRect.height/2 + window.scrollY);
    };

    heartBtn.addEventListener("click", triggerHeartReveal);
    mainHeart.addEventListener("click", triggerHeartReveal);


    // --- FINAL ENDING: CUTE SMILE BURST ---
    const smileBtn = document.getElementById("smileBtn");
    const finalCard = document.getElementById("finalCard");
    const smileCheckitem = document.getElementById("smileCheckitem");
    const smileCheckIcon = document.getElementById("smileCheckIcon");
    const smileCheckText = document.getElementById("smileCheckText");
    const missionValue = document.getElementById("missionValue");

    smileBtn.addEventListener("click", (e) => {
        // 1. Massive particle burst
        const rect = smileBtn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2 + window.scrollY;
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                spawnFloatingHearts(centerX, centerY);
            }, i * 50);
        }

        // 2. Animate checkbox state
        if (!smileCheckitem.classList.contains("done")) {
            smileCheckitem.classList.add("done");
            smileCheckIcon.innerText = "✓";
            smileCheckText.innerHTML = "Make Beta smile <span style='color: var(--primary);'>❤️</span>";
            
            // 3. Update Mission Status
            missionValue.innerText = "Completed! ❤️";
            missionValue.classList.add("completed");

            // Bounce checklist effect
            gsap.fromTo(finalCard, 
                { y: 10, scale: 0.98 },
                { y: 0, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.4)" }
            );
        }
    });
});
