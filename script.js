// Data for charts
const skillData = {
    labels: ['Python', 'SQL', 'Statistics', 'Deep Learning', 'Visualization', 'Cloud (AWS)'],
    datasets: [{
        label: 'Proficiency Level',
        data: [90, 85, 80, 75, 85, 60],
        fill: true,
        backgroundColor: 'rgba(100, 255, 218, 0.2)',
        borderColor: '#64ffda',
        pointBackgroundColor: '#64ffda',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#64ffda'
    }]
};

// Skill Radar Chart
const ctxSkills = document.getElementById('skillsRadarChart').getContext('2d');
const skillsChart = new Chart(ctxSkills, {
    type: 'radar',
    data: skillData,
    options: {
        elements: {
            line: {
                borderWidth: 3
            }
        },
        scales: {
            r: {
                angleLines: {
                    display: true,
                    color: 'rgba(136, 146, 176, 0.2)'
                },
                grid: {
                    color: 'rgba(136, 146, 176, 0.2)'
                },
                suggestedMin: 0,
                suggestedMax: 100,
                ticks: {
                    display: false // Hide numbers
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }
});


// Dashboard Simulation Logic
const revenueDisplay = document.getElementById('revenue-display');
const usersDisplay = document.getElementById('users-display');
const refreshBtn = document.getElementById('refresh-data');
const datasetSelect = document.getElementById('dataset-select');
const ctxRevenue = document.getElementById('revenueChart').getContext('2d');

let revenueChart;

// Data Generators
function generateRandomData(count, min, max) {
    return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min) + min));
}

function updateDashboard(type) {
    let labels, dataPoints, label;
    
    if (type === 'tech') {
        labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        dataPoints = generateRandomData(6, 10000, 25000);
        label = "Tech Sales ($)";
    } else {
        labels = ['July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        dataPoints = generateRandomData(6, 20000, 50000);
        label = "Retail Sales ($)";
    }

    // Update Text
    const currentRev = dataPoints.reduce((a, b) => a + b, 0);
    revenueDisplay.textContent = "$" + currentRev.toLocaleString();
    usersDisplay.textContent = Math.floor(currentRev / 45).toLocaleString(); // Mock logic

    // Update Chart
    if (revenueChart) revenueChart.destroy();

    revenueChart = new Chart(ctxRevenue, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: dataPoints,
                borderColor: '#64ffda',
                backgroundColor: 'rgba(100, 255, 218, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    grid: { color: 'rgba(136, 146, 176, 0.1)' },
                    ticks: { color: '#8892b0' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#8892b0' }
                }
            },
            plugins: {
                legend: { display: true, labels: { color: '#ccd6f6' } }
            }
        }
    });
}

// Event Listeners
refreshBtn.addEventListener('click', () => {
    // Add rotation animation to button
    refreshBtn.querySelector('i').style.transition = 'transform 0.5s';
    refreshBtn.querySelector('i').style.transform = 'rotate(360deg)';
    setTimeout(() => refreshBtn.querySelector('i').style.transform = 'rotate(0deg)', 500);
    
    updateDashboard(datasetSelect.value);
});

datasetSelect.addEventListener('change', (e) => {
    updateDashboard(e.target.value);
});

// Init Dashboard
updateDashboard('tech');


// Smooth Scroll for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Cursor Effect (Optional Polish)
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot follows immediately
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline follows with slight delay (handled by CSS transition usually, or JS animation frame)
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Scroll Reveal Animation via Intersection Observer
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // You can add CSS for .visible { opacity: 1; transform: translateY(0); }
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    // Add initial hidden state in CSS if desired
    // section.classList.add('hidden');
    observer.observe(section);
});
