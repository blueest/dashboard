// static/js/main.js
// static/js/main.js
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('sidebarCollapse').addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('active');
    });

    document.getElementById('theme-toggle').addEventListener('click', function() {
        const body = document.body;
        const themeIcon = this.querySelector('i');
        const themeText = this.querySelector('i').nextSibling;

        if (body.getAttribute('data-bs-theme') === 'dark') {
            body.setAttribute('data-bs-theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            themeText.textContent = ' Dark Mode';
        } else {
            body.setAttribute('data-bs-theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            themeText.textContent = ' Light Mode';
        }
    });

    initializeCharts();
});

// Objek untuk menyimpan referensi grafik
let chartInstances = {};

// Fungsi untuk menghapus grafik lama sebelum membuat yang baru
function destroyChart(chartId) {
    if (chartInstances[chartId]) {
        chartInstances[chartId].destroy();
        delete chartInstances[chartId];
    }
}

// Fungsi untuk inisialisasi semua grafik
function initializeCharts() {
    initUserTrendsChart();
    initSentimentChart();
    initPredictionsChart();
    initTrafficSourcesChart();
    initAnomalyChart();
}

// Grafik Jumlah Pengguna Aktif
function initUserTrendsChart() {
    fetch('/api/analytics/users')
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('userTrendsChart').getContext('2d');
            destroyChart('userTrendsChart'); // Hapus chart sebelumnya

            chartInstances['userTrendsChart'] = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.dates.reverse(),
                    datasets: [{
                        label: 'Jumlah Pengguna Aktif',
                        data: data.users.reverse(),
                        backgroundColor: 'rgba(78, 115, 223, 0.2)',
                        borderColor: 'rgba(78, 115, 223, 1)',
                        borderWidth: 2,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        });
}

// Grafik Sentiment Analysis
function initSentimentChart() {
    fetch('/api/analytics/sentiment')
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('sentimentChart').getContext('2d');
            destroyChart('sentimentChart'); // Hapus chart sebelumnya

            chartInstances['sentimentChart'] = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: data.sentiments,
                    datasets: [{
                        data: data.values,
                        backgroundColor: ['rgba(28, 200, 138, 0.8)', 'rgba(54, 185, 204, 0.8)', 'rgba(231, 74, 59, 0.8)']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        });
}

// Grafik Prediksi AI vs Aktual
function initPredictionsChart() {
    fetch('/api/analytics/ai_predictions')
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('predictionsChart').getContext('2d');
            destroyChart('predictionsChart'); // Hapus chart sebelumnya

            chartInstances['predictionsChart'] = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.categories,
                    datasets: [
                        {
                            label: 'Aktual',
                            data: data.actual,
                            backgroundColor: 'rgba(78, 115, 223, 0.8)'
                        },
                        {
                            label: 'Prediksi AI',
                            data: data.predicted,
                            backgroundColor: 'rgba(54, 185, 204, 0.8)'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        });
}

// Grafik Sumber Traffic
function initTrafficSourcesChart() {
    fetch('/api/analytics/traffic')
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('trafficSourcesChart').getContext('2d');
            destroyChart('trafficSourcesChart'); // Hapus chart sebelumnya

            chartInstances['trafficSourcesChart'] = new Chart(ctx, {
                type: 'polarArea',
                data: {
                    labels: data.sources,
                    datasets: [{
                        data: data.values,
                        backgroundColor: ['rgba(78, 115, 223, 0.7)', 'rgba(28, 200, 138, 0.7)', 'rgba(54, 185, 204, 0.7)', 'rgba(246, 194, 62, 0.7)', 'rgba(231, 74, 59, 0.7)']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        });
}

// Grafik Anomali
function initAnomalyChart() {
    fetch('/api/analytics/anomalies')
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('anomalyChart').getContext('2d');
            destroyChart('anomalyChart'); // Hapus chart sebelumnya

            chartInstances['anomalyChart'] = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.dates,
                    datasets: [
                        {
                            label: 'Normal',
                            data: data.values,
                            borderColor: 'rgba(78, 115, 223, 1)',
                            backgroundColor: 'rgba(78, 115, 223, 0.1)',
                            tension: 0.4
                        },
                        {
                            label: 'Anomali',
                            data: data.anomalies.map(a => a.value),
                            borderColor: 'rgba(231, 74, 59, 1)',
                            backgroundColor: 'rgba(231, 74, 59, 1)',
                            pointRadius: 6,
                            pointHoverRadius: 8
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        });
}


// Load AI Recommendations
function loadAIRecommendations() {
    const container = document.getElementById('aiRecommendations');
    container.innerHTML = '<p class="text-center">Loading recommendations...</p>'; // Loader sementara

    fetch('/api/analytics/recommendations')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch recommendations');
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                container.innerHTML = '<p class="text-center text-muted">No recommendations available.</p>';
                return;
            }

            container.innerHTML = data.map(recommendation => {
                let impactClass = recommendation.impact === 'Tinggi' ? 'high' :
                                  recommendation.impact === 'Sedang' ? 'medium' : 'low';
                
                let confidenceClass = recommendation.confidence >= 85 ? 'bg-success' :
                                      recommendation.confidence >= 70 ? 'bg-info' : 'bg-warning';
                
                return `
                    <div class="col-md-4 mb-4">
                        <div class="card recommendation-card h-100 position-relative">
                            <span class="badge ${confidenceClass} confidence-badge">${recommendation.confidence}% Confidence</span>
                            <div class="card-body">
                                <h5 class="card-title">${recommendation.title}</h5>
                                <p class="card-text">${recommendation.description}</p>
                                <span class="impact ${impactClass}">Impact: ${recommendation.impact}</span>
                            </div>
                            <div class="card-footer bg-transparent border-0">
                                <button class="btn btn-sm btn-outline-primary">Implement</button>
                                <button class="btn btn-sm btn-outline-secondary">Analyze</button>
                            </div>
                        </div>
                    </div>
                `;
            }).join(''); // Gunakan .map().join('') untuk performa lebih baik
        })
        .catch(error => {
            console.error("Error fetching recommendations:", error);
            container.innerHTML = '<p class="text-center text-danger">Failed to load recommendations.</p>';
        });
}

// Panggil fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', loadAIRecommendations);


// Add event listeners for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Notification badge animation
    const badges = document.querySelectorAll('.badge');
    badges.forEach(badge => {
        if (badge.classList.contains('bg-danger')) {
            badge.classList.add('pulse');
        }
    });
    
    // Add responsive behavior for charts
    window.addEventListener('resize', function() {
        const charts = Chart.instances;
        for (let i = 0; i < charts.length; i++) {
            charts[i].resize();
        }
    });
    
    // Add animated transitions for cards
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // Custom tooltip initialization for charts
    function createCustomTooltip() {
        const tooltipEl = document.createElement('div');
        tooltipEl.classList.add('chart-tooltip');
        tooltipEl.style.opacity = 0;
        document.body.appendChild(tooltipEl);
        return tooltipEl;
    }
    
    const customTooltip = createCustomTooltip();
    
    // Additional interactive features can be added here
});

/* Sidebar Toggle JS */
document.addEventListener("DOMContentLoaded", function() {
    const sidebar = document.querySelector(".sidebar");
    const toggleBtn = document.querySelector("#sidebarToggle");
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);
    
    toggleBtn.addEventListener("click", function() {
        sidebar.classList.toggle("open");
        overlay.classList.toggle("active");
    });
    
    overlay.addEventListener("click", function() {
        sidebar.classList.remove("open");
        overlay.classList.remove("active");
    });
});