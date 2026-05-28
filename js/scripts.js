/*!
* Start Bootstrap - Resume v7.0.4 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    setupModalGalleries();

});

const select = (el, all = false) => {
    el = el.trim()
    if (all) {
        return [...document.querySelectorAll(el)]
    } else {
        return document.querySelector(el)
    }
}

const typed = select('.typed')
if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
        strings: typed_strings,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000
    });
}

function setupModalGalleries() {
    const galleries = document.querySelectorAll('.modal-gallery');
    const previewTargets = document.querySelectorAll('.modal-gallery img, .cert-card img');
    if (!previewTargets.length) {
        return;
    }

    const lightbox = document.createElement('div');
    lightbox.className = 'image-preview';
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.innerHTML = `
        <button class="image-preview-close" type="button" aria-label="Close image preview">&times;</button>
        <img src="" alt="" />
    `;
    document.body.appendChild(lightbox);

    const previewImage = lightbox.querySelector('img');
    const closePreview = () => {
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
        previewImage.removeAttribute('src');
        previewImage.removeAttribute('alt');
    };

    lightbox.addEventListener('click', event => {
        if (event.target === lightbox || event.target.closest('.image-preview-close')) {
            closePreview();
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
            closePreview();
        }
    });

    const bindImagePreview = (image, label = 'image') => {
        image.setAttribute('tabindex', '0');
        image.setAttribute('role', 'button');
        image.setAttribute('aria-label', `Preview ${image.alt || label}`);

        const openPreview = () => {
            previewImage.src = image.src;
            previewImage.alt = image.alt || 'Image preview';
            lightbox.classList.add('is-open');
            lightbox.setAttribute('aria-hidden', 'false');
        };

        image.addEventListener('click', openPreview);
        image.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openPreview();
            }
        });
    };

    galleries.forEach(gallery => {
        const frame = document.createElement('div');
        frame.className = 'modal-gallery-frame';
        gallery.parentNode.insertBefore(frame, gallery);
        frame.appendChild(gallery);

        const previous = document.createElement('button');
        previous.className = 'gallery-nav gallery-nav-prev';
        previous.type = 'button';
        previous.textContent = '<';
        previous.setAttribute('aria-label', 'Scroll images left');

        const next = document.createElement('button');
        next.className = 'gallery-nav gallery-nav-next';
        next.type = 'button';
        next.textContent = '>';
        next.setAttribute('aria-label', 'Scroll images right');

        frame.appendChild(previous);
        frame.appendChild(next);

        const scrollGallery = direction => {
            const firstImage = gallery.querySelector('img');
            const distance = firstImage ? firstImage.getBoundingClientRect().width + 24 : 260;
            gallery.scrollBy({
                left: direction * distance,
                behavior: 'smooth',
            });
        };

        previous.addEventListener('click', () => scrollGallery(-1));
        next.addEventListener('click', () => scrollGallery(1));

        gallery.querySelectorAll('img').forEach(image => {
            bindImagePreview(image, 'project image');
        });
    });

    document.querySelectorAll('.cert-card img').forEach(image => {
        bindImagePreview(image, 'certification image');
    });
}
