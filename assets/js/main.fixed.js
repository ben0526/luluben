/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 350) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== ENTRY portfolio another CARD CLICK =================*/
document.querySelectorAll('.entry-card').forEach(card => {
    card.addEventListener('click', () => {
        const target = card.getAttribute('data-target');
        const overlay = document.getElementById('iframeOverlay');
        const iframe = document.getElementById('iframeContent');
        const body = document.body;

        if (target !== 'comingsoon') {
            iframe.src = `works/work-${target}.html`;
            overlay.classList.add('show');
            body.classList.add('noscroll');
            document.querySelectorAll('.iframe-tab').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-tab') === target) {
                btn.classList.add('active');
            }
            });
        }
    });
});

document.getElementById('iframeClose').addEventListener('click', closeOverlay);
document.getElementById('iframeOverlay').addEventListener('click', (e) => {
    if (e.target.id === 'iframeOverlay') {
    closeOverlay();
    }
});

function closeOverlay() {
    const overlay = document.getElementById('iframeOverlay');
    const iframe = document.getElementById('iframeContent');
    overlay.classList.remove('show');
    iframe.src = '';
    document.body.classList.remove('noscroll');
}

document.querySelectorAll('.iframe-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-tab');
        const iframe = document.getElementById('iframeContent');
        iframe.src = `works/work-${target}.html`;

        document.querySelectorAll('.iframe-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const overlay = document.getElementById('iframeOverlay');
        if (overlay.classList.contains('show')) {
            closeOverlay();
        }
    }
});


/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
    contactName = document.getElementById('contact-name'),
    contactEmail = document.getElementById('contact-email'),
    contactProject = document.getElementById('contact-project'),
    contactMessage = document.getElementById('contact-message')

const sendEmail = (e) =>{
    e.preventDefault()

    // Check if the field has a value
    if(contactName.value === '' || contactEmail.value === '' || contactProject.value === ''){
        // Add and remove color
        contactMessage.classList.remove('color-blue')
        contactMessage.classList.add('color-red')

        // Show message	
        contactMessage.textContent = 'Write all the input fields 📩'
    }else{
        // serviceID - templateID - #form - publicKey
        emailjs.sendForm('service_gjwy2v7','template_u4bxm5k','#contact-form','U31vm9dvWMZULEy1P')
            .then(() =>{
                // Show message and add color
                contactMessage.classList.add('color-blue')
                contactMessage.textContent = 'Message sent ✅'

                // Remove message after five seconds
                setTimeout(() => {
                    contactMessage.textContent = ''
                }, 5000)
            }, (error) =>{
                alert('OOPS! SOMETHING HAS FAILED...', error)
            })

        // To clear the input field
        contactName.value = ''
        contactEmail.value = ''
        contactProject.value = ''
    }
}

contactForm.addEventListener('submit', sendEmail)

/*=============== SHOW SCROLL UP ===============*/
document.addEventListener("DOMContentLoaded", () => {
    const scrollUp = document.getElementById("scroll-up");

    if (!scrollUp) return;

    // 顯示/隱藏按鈕
    window.addEventListener("scroll", () => {
    if (window.scrollY >= 200) {
        scrollUp.classList.add("show-scroll");
    } else {
        scrollUp.classList.remove("show-scroll");
    }
    });

    // 點擊時平滑捲動回頂
    scrollUp.addEventListener("click", function (e) {
    e.preventDefault();
    if (typeof gsap !== 'undefined' && gsap.to) {
        gsap.to(window, {
        scrollTo: { y: 0 },
        duration: 0.6,
        ease: "power2.out"
        });
    } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    });
});


/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selectef-theme')
const selectedIcon = localStorage.getItem('selectef-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () =>{
    // Add or remove the dark /licon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})