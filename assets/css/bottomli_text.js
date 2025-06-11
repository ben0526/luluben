// randomFontSize.js
document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".work__overview li");

    const colorVars = [
    "--first-color",
    "--second2-color",
    "--third-color",
    "--fourth-color",
    "--fifth-color"
    ];

    const fontWeights = ["normal", "bold", "lighter", "600", "900"];
    const fontFamilies = [
        "'Noto Sans TC', sans-serif",
        "'微軟正黑體', sans-serif",
        "'Arial', sans-serif",
        "'Courier New', monospace",
        "'Georgia', serif"
    ];

    items.forEach(li => {
    if (li.classList.contains("active")) {
      // 固定樣式：較大字體、粗體、主色
        li.style.fontSize = "1.8rem";
        li.style.fontWeight = "bold";
        li.style.color = getComputedStyle(document.documentElement).getPropertyValue("--first-color");
        li.style.fontFamily = "'Noto Sans TC', sans-serif";
        } else {
        // 隨機樣式
        const size = Math.floor(Math.random() * 6) + 14;
        const colorVar = colorVars[Math.floor(Math.random() * colorVars.length)];
        li.style.fontSize = `${size}px`;
        li.style.color = getComputedStyle(document.documentElement).getPropertyValue(colorVar);
        li.style.fontWeight = fontWeights[Math.floor(Math.random() * fontWeights.length)];
        li.style.fontFamily = fontFamilies[Math.floor(Math.random() * fontFamilies.length)];
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    applyRandomFontSize();
});