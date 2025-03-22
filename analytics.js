// js/analytics.js
import Chart from 'https://cdn.jsdelivr.net/npm/chart.js/auto/+esm';

export function renderAnalytics(metrics) {
  const ctx = document.getElementById('analyticsChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Clicks', 'Conversions', 'Revenue', 'ROI', 'ROAS'],
      datasets: [{
        label: 'Mission Stats',
        data: [
          metrics.clicks,
          metrics.conversions,
          metrics.revenue,
          metrics.roi,
          metrics.roas
        ],
        backgroundColor: '#ff00ff',
        borderColor: '#00ffff',
        borderWidth: 2
      }]
    },
    options: {
      scales: { y: { beginAtZero: true } },
      plugins: { legend: { labels: { color: '#e0e1dd' } } }
    }
  });
}