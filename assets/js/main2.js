/*=============== MIXITUP FILTER FEATURED ===============*/
let mixerFeatured = mixitup('.featured__content', {
    selectors: {
        target: '.featured__card'
    },
    animation: {
        duration: 300
    }
});

/* Link active featured */
const linkFeatured = document.querySelectorAll('.featured__item');

function activeFeatured(){
    linkFeatured.forEach(l => l.classList.remove('active-featured'));
    this.classList.add('active-featured');
}
linkFeatured.forEach(l => l.addEventListener('click', activeFeatured));

/*=============== GSAP ScrollTrigger 背景圖與動畫 ===============*/
window.addEventListener("load", function () {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const slides = document.querySelectorAll(".bg-slide");
    const isMobile = window.innerWidth <= 768;

    if (!isMobile) {
        // 背景圖桌機動畫
        slides.forEach((slide, index) => {
            gsap.fromTo(
                slide,
                { opacity: 0, y: 60, filter: "blur(10px)" },
                {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: "#home",
                        start: `top+=${index * 100}% top`,
                        end: `top+=${(index + 1) * 100}% top`,
                        scrub: true,
                        onEnter: () => {
                            slides.forEach((s, i) => {
                                gsap.to(s, { opacity: i === index ? 1 : 0, duration: 0.5 });
                            });
                        }
                    }
                }
            );
        });

        ScrollTrigger.create({
            trigger: "#home",
            start: "top top",
            end: `+=${slides.length * 100 + 100}%`,
            pin: true,
            pinSpacing: true
        });

        gsap.to("#home", {
            y: -100,
            ease: "power2.out",
            scrollTrigger: {
                trigger: "#home",
                start: "top top",
                end: `+=${slides.length * 100 + 100}%`,
                scrub: true
            }
        });
    } else {
        // 手機版背景輪播
        const container = document.querySelector(".bg-slider");
        container.classList.add("swiper", "mySwiper");
        slides.forEach((s) => s.classList.add("swiper-slide"));

        container.innerHTML = `<div class="swiper-wrapper">${container.innerHTML}</div>
                            <div class="swiper-pagination"></div>`;

        new Swiper(".mySwiper", {
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false
            },
            effect: "fade",
            fadeEffect: { crossFade: true }
        });

        slides.forEach(s => s.style.opacity = 1);
    }

    /*=============== 群組動畫 + 技能條連動 ===============*/
    const groups = {};

    document.querySelectorAll('[data-animate-group]').forEach(el => {
        const groupName = el.dataset.animateGroup;
        if (!groups[groupName]) groups[groupName] = [];
        groups[groupName].push(el);
    });

    Object.entries(groups).forEach(([groupName, elements]) => {
        const triggerEl = elements[0].closest('[data-trigger]') || elements[0];

        let fromVars = { opacity: 0 };
        let toVars = {
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out',
            paused: true,
            onComplete: () => {
                // 🔥 fade 動畫跑完才觸發技能條動畫
                elements.forEach(el => {
                    if (el.classList.contains('skills__data')) {
                        animateSkillBar(el);
                    }
                });
            }
        };
        let leaveVars = {
            opacity: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power3.in',
            paused: true
        };

        switch (groupName) {
            case 'fadeUp':
                fromVars.y = 500;
                toVars.y = 0;
                leaveVars.y = -500;
                break;
            case 'fadeDown':
                fromVars.y = -500;
                toVars.y = 0;
                leaveVars.y = 500;
                break;
            case 'slideLeft':
                fromVars.x = -500;
                toVars.x = 0;
                leaveVars.x = 500;
                break;
            case 'slideRight':
                fromVars.x = 500;
                toVars.x = 0;
                leaveVars.x = -500;
                break;
            case 'fadeIn':
            default:
                break;
        }

        const enterAnim = gsap.fromTo(elements, fromVars, toVars);
        const leaveAnim = gsap.to(elements, leaveVars);

        ScrollTrigger.create({
            trigger: triggerEl,
            start: 'top 80%',
            end: 'top 20%',
            onEnter: () => {
                leaveAnim.pause();
                enterAnim.restart();
            },
            onLeaveBack: () => {
                enterAnim.pause();
                leaveAnim.restart();
            }
        });
    });

    document.addEventListener("DOMContentLoaded", () => {
        gsap.registerPlugin(ScrollTrigger);

        // 對每個有 data-animate-group 的元素群組進行動畫註冊
        const groups = {};
        document.querySelectorAll('[data-animate-group]').forEach(el => {
            const groupName = el.dataset.animateGroup;
            if (!groups[groupName]) groups[groupName] = [];
            groups[groupName].push(el);
        });

        Object.entries(groups).forEach(([groupName, elements]) => {
            elements.forEach((el, i) => {
            gsap.from(el, {
                scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                end: 'top 20%',
                toggleActions: 'play reverse play reverse', // 動畫上下滑都執行
                },
                opacity: 0,
                y: 200,
                duration: 0.8,
                ease: 'power2.out',
                delay: i * 0.1
            });
            });
        });

        // 確保所有資源載入後刷新 ScrollTrigger
        window.addEventListener("load", () => {
            ScrollTrigger.refresh();
        });
    });

    /*=============== 單一元素動畫 ===============*/
    const singleSelectors = ['[data-animate-single]', '[data-animate-single2]'];

    singleSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            const yOffset = selector === '[data-animate-single2]' ? 80 : 100;

            const enter = gsap.fromTo(el, {
                opacity: 0,
                y: yOffset
            }, {
                opacity: 1,
                y: 0,
                duration: .8,
                ease: 'power3.out',
                paused: true
            });

            const leave = gsap.to(el, {
                opacity: 0,
                y: -yOffset,
                duration: .8,
                ease: 'power3.in',
                paused: true
            });

            ScrollTrigger.create({
                trigger: el.closest('section') || el,
                start: 'top 100%',
                end: 'top 0%',
                onEnter: () => {
                    leave.pause(0);
                    enter.restart();
                },
                onLeaveBack: () => {
                    enter.pause(0);
                    leave.restart();
                }
            });
        });
    });

});

/*=============== 技能進度條動畫函式 ===============*/
function animateSkillBar(skill) {
    const bar = skill.querySelector(".skills__bar");
    const percentEl = skill.querySelector(".skills__percentage");
    const percent = parseInt(percentEl.dataset.percentage, 10) || 0;

    // 顯示初始狀態
    bar.style.width = "0%";
    percentEl.textContent = "0%";

    gsap.killTweensOf(bar);
    gsap.killTweensOf(percentEl);

    const tl = gsap.timeline();

    tl.fromTo(bar, {
        width: "0%"
    }, {
        width: percent + "%",
        duration: 2,
        ease: "power3.out"
    });

    tl.to({ val: 0 }, {
        val: percent,
        duration: 2,
        ease: "power3.out",
        onUpdate: function () {
            percentEl.textContent = `${Math.round(this.targets()[0].val)}%`;
        }
    }, "<");
}


/*=============== 滾動箭頭動畫 & 隱藏 ===============*/
document.addEventListener("DOMContentLoaded", () => {
    gsap.fromTo(".scroll-down-indicator .arrow", 
        { y: 0 },
        {
            y: 10,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            duration: 0.8
        }
    );

    window.addEventListener("scroll", () => {
        const indicator = document.querySelector('.scroll-down-indicator');
        if (!indicator) return;
        if (window.scrollY > 200) {
            gsap.to(indicator, { opacity: 0, duration: 0.5, pointerEvents: "none" });
        } else {
            gsap.to(indicator, { opacity: 1, duration: 0.5, pointerEvents: "auto" });
        }
    });
});

/*=============== 點擊 scroll-down-indicator 跳到 #about（底圖跑完後） ===============*/
document.querySelector(".scroll-down-indicator a").addEventListener("click", function (e) {
    e.preventDefault();

    // 確保 ScrollTrigger 已初始化
    if (!ScrollTrigger.getAll().length) return;

    // 找到 #home 的 ScrollTrigger（背景 pin 的那個）
    const bgTrigger = ScrollTrigger.getAll().find(t => t.trigger && t.trigger.id === "home");

    if (bgTrigger) {
        // 利用 ScrollTrigger 的 scroll() API 直接滾到底（動畫區域最下方）
        gsap.to(window, {
            scrollTo: bgTrigger.end,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
                // 背景動畫完成後，再跳到 #about
                const aboutSection = document.querySelector("#about");
                if (aboutSection) {
                    gsap.to(window, {
                        scrollTo: aboutSection,
                        duration: 1.5,
                        ease: "power2.inOut"
                    });
                }
            }
        });
    }
});

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

document.querySelectorAll('a[href="#home"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        gsap.to(window, {
            scrollTo: 0,
            duration: 1.2,
            ease: "power2.inOut"
        });
    });
});

/*=============== 點擊 Portfolio 回到 #work (示範) ===============*/
document.querySelectorAll('a[href="#work"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector('#work');
        if (target) {
            gsap.to(window, {
                scrollTo: { y: target, offsetY: 0 },
                duration: 1.2,
                ease: "power2.out"
            });
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll('[data-animate-group]').forEach((el) => {
        const groupName = el.dataset.animateGroup;

        // 設定初始狀態
        gsap.set(el, { opacity: 0, y: 60 });

        // 建立 ScrollTrigger
        ScrollTrigger.create({
            trigger: el,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play reverse play reverse',
            scrub: true,
            onEnter: () => {
                gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
                });
            },
            onLeaveBack: () => {
                gsap.to(el, {
                opacity: 0,
                y: 60,
                duration: 0.6,
                ease: 'power2.in',
                });
            },
        });
    });
});

// 自動綁定每種 data-animate-group
window.addEventListener("load", function () {
  document.querySelectorAll('img[data-cdn]').forEach(img => {
    if (img.dataset.cdn) img.src = img.dataset.cdn;
  });

  document.querySelectorAll('[data-cdn-style]').forEach(el => {
    if (el.dataset.cdnStyle) el.style.backgroundImage = `url('${el.dataset.cdnStyle}')`;
  });
});
