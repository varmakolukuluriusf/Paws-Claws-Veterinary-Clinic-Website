document.addEventListener('DOMContentLoaded', () => {
    // Load existing appointments from localStorage
    loadAppointments();

    // Function to load stored appointments into the table
    function loadAppointments() {
        const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        const appointmentTableBody = document.getElementById('appointmentTableBody');
        appointmentTableBody.innerHTML = '';

        appointments.forEach((appointment, index) => {
            // Clone the row template and fill in the data
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td class="pet-name">${appointment.petName}</td>
                <td class="pet-type">${appointment.petType}</td>
                <td class="owner-name">${appointment.ownerName}</td>
                <td class="appointment-date">${appointment.appointmentDate}</td>
                <td class="contact-info">${appointment.contactInfo}</td>
                <td class="package-type">${appointment.packageType}</td>
                <td>
                    <button class="btn btn-warning btn-sm me-2 edit-btn" style="background:#FFC700;" type="button" data-index="${index}">Edit</button>
                    <button class="btn btn-danger btn-sm delete-btn" style="background:C80036;" type="button" data-index="${index}">Delete</button>
                </td>
            `;
            appointmentTableBody.appendChild(row);
        });

        // Bind event listeners to edit and delete buttons
        bindEventListeners();
    }

    // Function to bind events to the buttons
    function bindEventListeners() {
        // Edit button
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.dataset.index;
                editAppointment(index);
            });
        });

        // Delete button
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.dataset.index;
                deleteAppointment(index);
            });
        });
    }

    // Edit appointment
    function editAppointment(index) {
        let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        const appointment = appointments[index];

        document.getElementById('editAppointmentIndex').value = index;
        document.getElementById('editPetName').value = appointment.petName;
        document.getElementById('editPetType').value = appointment.petType;
        document.getElementById('editOwnerName').value = appointment.ownerName;
        document.getElementById('editAppointmentDate').value = appointment.appointmentDate;
        document.getElementById('editPackageType').value = appointment.packageType;
        document.getElementById('editContactInfo').value = appointment.contactInfo;

        const editModal = new bootstrap.Modal(document.getElementById('editAppointmentModal'));
        editModal.show();
    }

    // Handle edit form submission
    const editAppointmentForm = document.getElementById('editAppointmentForm');
    if (editAppointmentForm) {
        editAppointmentForm.addEventListener('submit', function(event) {
            event.preventDefault();

            let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
            const index = document.getElementById('editAppointmentIndex').value;
            appointments[index] = {
                petName: document.getElementById('editPetName').value,
                petType: document.getElementById('editPetType').value,
                ownerName: document.getElementById('editOwnerName').value,
                appointmentDate: document.getElementById('editAppointmentDate').value,
                packageType: document.getElementById('editPackageType').value,
                contactInfo: document.getElementById('editContactInfo').value
            };

            localStorage.setItem('appointments', JSON.stringify(appointments));
            loadAppointments();

            const editModal = bootstrap.Modal.getInstance(document.getElementById('editAppointmentModal'));
            editModal.hide();
        });
    }

    // Delete appointment
    function deleteAppointment(index) {
        let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        if (confirm('Are you sure you want to delete this appointment?')) {
            appointments.splice(index, 1);
            localStorage.setItem('appointments', JSON.stringify(appointments));
            loadAppointments();
        }
    }
});
