document.addEventListener("DOMContentLoaded", () => {
    if (typeof ScrollReveal !== "undefined") {
        ScrollReveal().reveal('.work__grid > *, .work__title, .work__description, .work__meta, .work__wireframe, .work__project__img, .work__img1, .work__overview li', {
            distance: '60px',
            duration: 1000,
            delay: 200,
            reset: true,
            interval: 80,
            origin: 'bottom'
        });
    }
});

// ScrollReveal 設定初始化
const sr = ScrollReveal({
    distance: '60px',
    duration: 1000,
    delay: 200,
    reset: false // true = 滾回來會再次播放動畫
});

// 主標題動畫
sr.reveal('.work__title', {
    origin: 'bottom'
});

// 說明文字從左滑入
sr.reveal('.work__description', {
    origin: 'left',
    delay: 300
});

// 元資訊從右滑入
sr.reveal('.work__meta', {
    origin: 'right',
    delay: 400
});

// 線框圖由左進來
sr.reveal('.work__wireframe', {
    origin: 'left',
    delay: 300
});

// 大圖由右進來
sr.reveal('.work__project__img', {
    origin: 'right',
    delay: 400
});

// 手機圖由下進來
sr.reveal('.work__img1', {
    origin: 'bottom',
    delay: 500
});

// overview 逐個淡入
sr.reveal('.work__overview li', {
    origin: 'bottom',
    interval: 80,
    delay: 100
});

sr.reveal('.work__grid > *', {
    origin: 'bottom',
    interval: 150
});