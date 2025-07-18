// H Archy Struct

document.querySelectorAll('[id-list-number="3"] #item-locks >* #background-lock').forEach(container => {
    const image = container.querySelector('.zoom-impact');
    if (!image) return;

    let targetX = 50;
    let targetY = 50;
    let currentX = 50;
    let currentY = 50;

    let hovering = false;

    container.addEventListener('mousemove', e => {
        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        targetX = x;
        targetY = y;
        hovering = true;
    });

    container.addEventListener('mouseleave', () => {
        targetX = 50;
        targetY = 50;
        hovering = false;
    });

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
        currentX = lerp(currentX, targetX, 0.1);
        currentY = lerp(currentY, targetY, 0.1);

        image.style.transformOrigin = `${currentX}% ${currentY}%`;

        requestAnimationFrame(animate);
    };

    animate();
});

const clients = document.getElementById('-va1');
const earned = document.getElementById('-va2');
const languages = document.getElementById('-va3');

function animateCountUp(element, start, end, duration, prefix = '', suffix = '', showPlus = false) {
    let startTimestamp = null;

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = `${prefix}${value}${suffix}${showPlus ? '+' : ''}`;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = `${prefix}${end}${suffix}${showPlus ? '+' : ''}`;
        }
    };

    window.requestAnimationFrame(step);
}

const statsSection = document.querySelector('[section="bottom"]');
let animated = false;

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
            animated = true;
            animateCountUp(earned, 0, 1000, 1500, '$', '', true);
            animateCountUp(clients, 0, 42, 700, '', '', true);
            animateCountUp(languages, 0, 10, 700, '', '', true);
        } else if (!entry.isIntersecting && animated) {
            animated = false;
            earned.textContent = '$0';
            clients.textContent = '0';
            languages.textContent = '0';
        }
    });
}, { threshold: 0.5 });

observer.observe(statsSection);

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[linklead]").forEach(el => {
    const url = el.getAttribute("linklead");
    if (url) {
      el.style.cursor = "pointer";
      el.addEventListener("click", () => window.open(url, "_blank", "noopener,noreferrer"));
    }
  });

  document.querySelectorAll("[copylead]").forEach(el => {
    const text = el.getAttribute("copylead");
        if (text) {
        el.style.cursor = "pointer";
            el.addEventListener("click", async () => {
                try {
                await navigator.clipboard.writeText(text);
                alert(`Copied: ${text}`);
                } catch {
                const ta = document.createElement("textarea");
                ta.value = text;
                document.body.appendChild(ta);
                ta.select();
                const ok = document.execCommand("copy");
                document.body.removeChild(ta);
                alert(ok ? `Copied: ${text} To Clipboard` : "Copy failed");
                }
            });
        }
    });

  document.querySelectorAll("[sitelead]").forEach(el => {
    const url = el.getAttribute("sitelead");
        if (url) {
            el.style.cursor = "pointer";
            el.addEventListener("click", () => { window.location.href = url; });
        }
    });
    document.querySelectorAll("[seperatelead]").forEach(el => {
    const url = el.getAttribute("seperatelead");
        if (url) {
            el.style.cursor = "pointer";
            el.addEventListener("click", () => { window.open(url, "_blank"); });
        }
    });
});