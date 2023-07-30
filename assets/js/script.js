
const experienceSection = document.getElementById('experience');
const skillsSection = document.getElementById('skills');
const contactSection = document.getElementById('contact');
const navbarElement = document.getElementsByClassName('navbar')[0];
const contactContent = document.getElementsByClassName('contact-content')[0];

const homeTab = document.getElementsByClassName('navbar-item')[0];
const experienceTab = document.getElementsByClassName('navbar-item')[1];
const projectsTab = document.getElementsByClassName('navbar-item')[2];
const skillsTab = document.getElementsByClassName('navbar-item')[3];
const contactTab = document.getElementsByClassName('navbar-item')[4];

const fadeSideElements = document.querySelectorAll('div[data-animate=fade-side-init]');
const fadeBottomElements = document.querySelectorAll('div[data-animate=fade-bottom-init]') ;

// Offset to enter next section early
const offset = 400;
const windowHeight = window.innerHeight;
const experienceSectionOffsetTop = experienceSection.offsetTop - offset;
const skillsSectionOffsetTop = skillsSection.offsetTop - offset;
const contactSectionOffsetTop = contactSection.offsetTop - offset;

const fadeSideElementsTop = [];
for (let i = 0; i < fadeSideElements.length; i++) {
    const rect = fadeSideElements[i].getBoundingClientRect();

    // fade-in effect animation starts when half of the element is viewable
    const top = rect.top + rect.height / 2 + window.scrollY;
    fadeSideElementsTop.push(top);
}

const fadeBottomElementsTop = [];
for (let i = 0; i < fadeBottomElements.length; i++) {
    const matrix = window.getComputedStyle(fadeBottomElements[i]).transform;
    const transformY = Number(matrix.split(',')[5].replace(')', ''));
    const rect = fadeBottomElements[i].getBoundingClientRect();
    const top = rect.top + rect.height/2 - transformY + window.scrollY;
    fadeBottomElementsTop.push(top);
}

let previousSection = 'home';

document.getElementById('hamburger-menu').addEventListener('click', (e) => {
    e.currentTarget.classList.toggle('open');
    navbarElement.classList.toggle('open');
})

document.addEventListener('scroll', (e) => {
    const scrollY = Math.ceil(window.scrollY);

    console.log(contactSectionOffsetTop, scrollY)
    // Set the active tab 
    if (scrollY >= contactSectionOffsetTop) {
        if (previousSection !== 'contact') {
            previousSection = 'contact';
            setActiveTab(contactTab);
        }
    } else if (scrollY >= skillsSectionOffsetTop) {
        if (previousSection !== 'skills') {
            previousSection = 'skills';
            setActiveTab(skillsTab);
        }
    } else if (scrollY >= experienceSectionOffsetTop) {
        if (previousSection !== 'experience') {
            previousSection = 'experience';
            setActiveTab(experienceTab);
        }
    } else {
        if (previousSection !== 'home') {
            previousSection = 'home';
            setActiveTab(homeTab);
        }
    }

    // animate the fade in from left effect
    for(let i = 0; i < fadeSideElementsTop.length; i++) {
        const top = fadeSideElementsTop[i];
        if (windowHeight + scrollY  > top) {
            fadeSideElements[i].classList.add('fade-in');
        } else {
            fadeSideElements[i].classList.remove('fade-in');
        }
    }

    for(let i = 0; i < fadeBottomElementsTop.length; i ++) {
        const top = fadeBottomElementsTop[i];
        if (windowHeight + scrollY  > top) {
            fadeBottomElements[i].classList.add('fade-in');
        } else {
            fadeBottomElements[i].classList.remove('fade-in');
        }
    }
})

function setActiveTab(element) {
    const tabs = element.parentElement.children;
    
    for (let i = 0; i < tabs.length; i ++) {
        if (tabs[i].classList.contains('active')) {
            tabs[i].classList.remove('active');
            break;
        }
    }

    element.classList.toggle('active');
}