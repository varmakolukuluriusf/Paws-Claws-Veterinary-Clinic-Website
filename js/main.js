document.addEventListener('DOMContentLoaded', () => {
    const appointmentForm = document.getElementById('appointmentForm');

    if (appointmentForm) {
        // Handle appointment form submission
        appointmentForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const petName = document.getElementById('petName').value;
            const petType = document.getElementById('petType').value;
            const ownerName = document.getElementById('ownerName').value;
            const appointmentDate = document.getElementById('appointmentDate').value;
            const contactInfo = document.getElementById('contactInfo').value;
            const packageType = document.getElementById('package').value;

            // Retrieve existing appointments from localStorage
            let appointments = JSON.parse(localStorage.getItem('appointments')) || [];

            // Add the new appointment
            appointments.push({ petName, petType, ownerName, appointmentDate, contactInfo, packageType });

            // Store the updated list in localStorage
            localStorage.setItem('appointments', JSON.stringify(appointments));

            // Optionally, reset the form
            appointmentForm.reset();

            alert('Appointment booked successfully!');
        });
    }

    // Scroll-to-Top Button
    const scrollTopBtn = document.getElementById('scrollTopContainer');
    if (scrollTopBtn) {
        // Show or hide the button based on scroll position
        window.onscroll = function() {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                scrollTopBtn.style.display = 'block';
            } else {
                scrollTopBtn.style.display = 'none';
            }
        };

        // Scroll to the top when the button is clicked
        scrollTopBtn.onclick = function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Smooth scroll
            });
        };
    } else {
        console.error('Scroll-to-top button element not found.');
    }
    
});
