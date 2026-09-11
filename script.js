 function id(name) {
            return document.getElementById(name);
        }

        // Mobile Nav Toggle
        const hamburger = id('hamburger');
        const navLinks = id('navLinks');
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Time-based Greeting
        function updateTimeGreeting() {
            const hour = new Date().getHours();
            const greetingEl = id('timeGreeting');
            if (hour < 12) {
                greetingEl.textContent = '🌅 Good Morning ☕';
            } else if (hour < 18) {
                greetingEl.textContent = '☀️ Good Afternoon ☕';
            } else {
                greetingEl.textContent = '🌙 Good Evening ☕';
            }
        }
        updateTimeGreeting();

        // Hero Background Slider
        const slides = document.querySelectorAll('.hero-slider .slide');
        let currentSlide = 0;

        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
        setInterval(nextSlide, 4000);

        // Catalogue Filter
        let activeCategory = 'all';

        function filterCatalogue(category) {
            activeCategory = category;
            
            const tabBtns = document.querySelectorAll('.tab-btn');
            tabBtns.forEach(btn => btn.classList.remove('active'));
            event.currentTarget.classList.add('active');

            applyCatalogueLimits();
        }

        function applyCatalogueLimits() {
            const items = document.querySelectorAll('.catalogue-item');
            const isMobile = window.innerWidth <= 768;
            const maxVisible = isMobile ? 6 : 8;
            let visibleCount = 0;

            items.forEach(item => {
                const matchesCategory = (activeCategory === 'all') || item.classList.contains(activeCategory);
                
                if (matchesCategory) {
                    if (visibleCount < maxVisible) {
                        item.style.display = 'flex';
                        item.classList.remove('hidden-item');
                    } else {
                        item.style.display = 'none';
                        item.classList.add('hidden-item');
                    }
                    visibleCount++;
                } else {
                    item.style.display = 'none';
                }
            });
        }

        window.addEventListener('resize', applyCatalogueLimits);
        window.addEventListener('DOMContentLoaded', applyCatalogueLimits);

        // Custom Dropdown
        const dropdownWrapper = id('customDropdown');
        const dropdownTrigger = id('dropdownTrigger');
        const dropdownHiddenInput = id('orderProduct');
        const options = document.querySelectorAll('.custom-option');

        dropdownTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownWrapper.classList.toggle('open');
        });

        options.forEach(opt => {
            opt.addEventListener('click', (e) => {
                e.stopPropagation();
                options.forEach(o => o.classList.remove('selected'));
                opt.classList.add('selected');
                
                const val = opt.getAttribute('data-value');
                dropdownTrigger.textContent = val;
                dropdownHiddenInput.value = val;
                dropdownWrapper.classList.remove('open');
            });
        });

        document.addEventListener('click', () => {
            dropdownWrapper.classList.remove('open');
        });

        // Modals
        function openModal(modalId) {
            id(modalId).classList.add('active');
        }

        function closeModal(modalId) {
            id(modalId).classList.remove('active');
        }

        function openSignatureModal(title, desc, price, img) {
            id('sigModalTitle').textContent = title;
            id('sigModalDesc').textContent = desc;
            id('sigModalPrice').textContent = price;
            id('sigModalImg').src = img;
            
            id('sigModalOrderBtn').onclick = function() {
                closeModal('signatureModal');
                setOrderProduct(title);
            };

            openModal('signatureModal');
        }

        function setOrderProduct(productName) {
            dropdownTrigger.textContent = productName;
            dropdownHiddenInput.value = productName;
            
            options.forEach(o => {
                if (o.getAttribute('data-value') === productName) {
                    o.classList.add('selected');
                } else {
                    o.classList.remove('selected');
                }
            });

            id('order').scrollIntoView({ behavior: 'smooth' });
        }

        // Form Submit
        function handleLoginSubmit(e) {
            e.preventDefault();
            alert('Successfully logged in!');
            closeModal('loginModal');
        }

        function handleOrderSubmit(e) {
            e.preventDefault();
            const name = id('orderName').value;
            const product = dropdownHiddenInput.value;

            if (!product) {
                alert('Please select a product from the dropdown!');
                return;
            }

            alert(`Thank you ${name}! Your order for "${product}" has been placed successfully.`);
            id('orderForm').reset();
            dropdownTrigger.textContent = '-- Choose an item --';
            dropdownHiddenInput.value = '';
        }

        function handleFeedbackSubmit(e) {
            e.preventDefault();
            const category = id('fbCategory').value;
            alert(`Thank you for submitting your ${category.toLowerCase()}. We appreciate your feedback!`);
            e.target.reset();
        }