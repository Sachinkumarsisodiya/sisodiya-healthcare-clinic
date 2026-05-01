document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if(navLinks.classList.contains('active')) {
                hamburger.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            } else {
                hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
            }
        });

        // Close menu when link is clicked
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        });
    }

    // Navbar shadow on scroll
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
            }
        }
    });

    // 2. Active Link Highlighting
    const currentLocation = location.pathname;
    const menuItem = document.querySelectorAll('.nav-links a');
    
    // Default to index.html if path is empty or trailing slash
    let path = currentLocation.substring(currentLocation.lastIndexOf("/") + 1) || "index.html";

    menuItem.forEach(item => {
        if (item.getAttribute("href") === path) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });

    // Set minimum date for appointment form to today
    const dateInput = document.getElementById('appointmentDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }

    // 3. Appointment WhatsApp Logic
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Collect Data
            const name = document.getElementById('patientName').value.trim();
            const phone = document.getElementById('patientPhone').value.trim();
            const age = document.getElementById('patientAge').value.trim();
            const service = document.getElementById('patientService').value;
            const date = document.getElementById('appointmentDate').value;

            // Format Date safely
            let formattedDate = date;
            if (date) {
                const options = { year: 'numeric', month: 'short', day: 'numeric' };
                formattedDate = new Date(date).toLocaleDateString('en-IN', options);
            }

            // Construct WhatsApp Message
            const msg = `*New Appointment Request:*\n\n` +
                        `*Name:* ${name}\n` +
                        `*Phone:* ${phone}\n` +
                        `*Age:* ${age}\n` +
                        `*Service Required:* ${service}\n` +
                        `*Preferred Date:* ${formattedDate}\n\n` +
                        `Please confirm my booking.`;

            // Doctor's WhatsApp Number
            const doctorWhatsApp = "917733866682";

            // Generate WhatsApp URL
            const waUrl = `https://wa.me/${doctorWhatsApp}?text=${encodeURIComponent(msg)}`;

            // Reset Form
            this.reset();

            // Open in new tab
            window.open(waUrl, '_blank');
        });
    }
});
