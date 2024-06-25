// Function to generate random appointments for the past month
function generateRandomAppointments(numAppointments) {
    const petTypes = ['Dog', 'Cat', 'Bird', 'Rabbit'];
    const packages = [50, 100, 150];
    const appointments = [];
    const today = new Date();

    for (let i = 0; i < numAppointments; i++) {
        const daysAgo = Math.floor(Math.random() * 30); // random day within the last 30 days
        const date = new Date();
        date.setDate(today.getDate() - daysAgo);
        const formattedDate = date.toISOString().split('T')[0];

        const petType = petTypes[Math.floor(Math.random() * petTypes.length)];
        const packagePrice = packages[Math.floor(Math.random() * packages.length)];
        const hour = Math.floor(Math.random() * 24);
        const minute = Math.floor(Math.random() * 60);
        const formattedTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;

        appointments.push({
            date: formattedDate,
            petType: petType,
            time: formattedTime,
            package: packagePrice,
        });
    }

    return appointments;
}

const sampleAppointments = generateRandomAppointments(100); // Generate 100 random appointments

// Function to group by property
function groupBy(arr, property) {
    return arr.reduce((acc, obj) => {
        const key = obj[property];
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
    }, {});
}

// Chart 1: Appointment Trends Over Time
function createAppointmentTrendChart(data) {
    const ctx = document.getElementById('appointmentTrendChart').getContext('2d');
    const dates = [...new Set(data.map(d => d.date))].sort();

    const counts = dates.map(date => data.filter(d => d.date === date).length);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Appointments Over Time',
                data: counts,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            }],
        },
    });
}

// Chart 2: Distribution of Pet Types
function createPetTypeChart(data) {
    const ctx = document.getElementById('petTypeChart').getContext('2d');
    const groupedByType = groupBy(data, 'petType');

    const types = Object.keys(groupedByType);
    const counts = types.map(type => groupedByType[type].length);

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: types,
            datasets: [{
                label: 'Pet Type Distribution',
                data: counts,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            }],
        },
    });
}

// Chart 3: Appointments by Day of the Week
function createAppointmentsByDayChart(data) {
    const ctx = document.getElementById('appointmentsByDayChart').getContext('2d');
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const counts = daysOfWeek.map(day => data.filter(d => new Date(d.date).toLocaleDateString('en-US', { weekday: 'long' }) === day).length);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: daysOfWeek,
            datasets: [{
                label: 'Appointments by Day of the Week',
                data: counts,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            }],
        },
    });
}

// Chart 4: Appointments by Hour
function createAppointmentHourChart(data) {
    const ctx = document.getElementById('appointmentHourChart').getContext('2d');
    const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

    const counts = hours.map(hour => data.filter(d => d.time.startsWith(hour.split(':')[0])).length);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: hours,
            datasets: [{
                label: 'Appointments by Hour',
                data: counts,
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
            }],
        },
    });
}

// Chart 5: Appointments by Package
function createAppointmentsByPackageChart(data) {
    const ctx = document.getElementById('appointmentsByPackageChart').getContext('2d');
    const groupedByPackage = groupBy(data, 'package');

    const packages = Object.keys(groupedByPackage);
    const counts = packages.map(pkg => groupedByPackage[pkg].length);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: packages,
            datasets: [{
                label: 'Appointments by Package',
                data: counts,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            }],
        },
    });
}

// Initialize charts with sample data
window.addEventListener('DOMContentLoaded', () => {
    createAppointmentTrendChart(sampleAppointments);
    createPetTypeChart(sampleAppointments);
    createAppointmentsByDayChart(sampleAppointments);
    createAppointmentHourChart(sampleAppointments);
    createAppointmentsByPackageChart(sampleAppointments);
});
