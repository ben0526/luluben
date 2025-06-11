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

// Wait for lightbox to open, then inject HTML
document.addEventListener("DOMContentLoaded", function () {
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            const caption = document.querySelector(".lightbox .lightbox-caption");
            if (caption && caption.innerText.includes("http")) {
            caption.innerHTML = caption.innerText; // 將 innerText 轉為 HTML
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

/*=============== SWIPER PROJECTS ===============*/
const swiperInstances = {};
document.querySelectorAll('.swiper-container').forEach((container, index) => {
    const swiper = new Swiper(container.querySelector('.mySwiper2'), {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    pagination: {
        el: container.querySelector('.swiper-pagination'),
        clickable: true
    },
    navigation: {
        nextEl: container.querySelector('.swiper-button-next'),
        prevEl: container.querySelector('.swiper-button-prev')
    },
    breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 2 }
    }
    });
    if (container.classList.contains('swiper-ui')) swiperInstances.ui = swiper;
    if (container.classList.contains('swiper-illustration')) swiperInstances.illustration = swiper;
    if (container.classList.contains('swiper-graphic')) swiperInstances.graphic = swiper;
});

const filterButtons2 = document.querySelectorAll('#group2 .featured__item');
const swiperContainers = document.querySelectorAll('.swiper-container');

filterButtons2.forEach(btn => {
    btn.addEventListener('click', () => {
    filterButtons2.forEach(b => b.classList.remove('active-featured'));
    btn.classList.add('active-featured');

    swiperContainers.forEach(container => container.classList.remove('active-swiper'));

    const filter = btn.getAttribute('data-filter');
    const targetContainer = document.querySelector(`.swiper-${filter}`);

    if (targetContainer) {
        targetContainer.classList.add('active-swiper');
        setTimeout(() => {
        swiperInstances[filter]?.update();
        swiperInstances[filter]?.slideTo(0);
        }, 50);
    }
    });
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
    window.addEventListener("scroll", () => {
        const scrollUp = document.getElementById("scroll-up");
        if (window.scrollY >= 200) {
            scrollUp.classList.add("show-scroll");
        } else {
            scrollUp.classList.remove("show-scroll");
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