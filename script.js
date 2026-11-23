document.addEventListener('DOMContentLoaded', () => {
  // Мобільне навігаційне меню
  const menuToggle = document.getElementById('menuToggle');
  const siteNav = document.getElementById('siteNav');

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Фільтрація таблиці індикаторів на сторінці Словаччини
  const statusFilter = document.getElementById('statusFilter');
  const indicatorsTable = document.getElementById('indicatorsTable');

  if (statusFilter && indicatorsTable) {
    statusFilter.addEventListener('change', () => {
      const selected = statusFilter.value;
      const rows = indicatorsTable.querySelectorAll('tbody tr');
      rows.forEach((row) => {
        const level = row.getAttribute('data-level');
        if (selected === 'all' || level === selected) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  }

  // Графіки Chart.js (ініціалізуються лише на сторінці slovakia.html)
  if (typeof Chart !== 'undefined') {
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.color = '#334155';

    // 1. Макроекономічна динаміка (2016–2025)
    const macroCtx = document.getElementById('macroChart');
    if (macroCtx) {
      new Chart(macroCtx, {
        type: 'line',
        data: {
          labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
          datasets: [
            {
              label: 'Інфляція, %',
              data: [-0.52, 1.31, 2.51, 2.66, 1.94, 3.15, 12.77, 10.53, 2.76, 4.00],
              borderColor: '#b91c1c',
              backgroundColor: 'rgba(185, 28, 28, 0.1)',
              tension: 0.25,
              borderWidth: 2.5
            },
            {
              label: 'Безробіття, %',
              data: [9.68, 8.14, 6.54, 5.76, 6.72, 6.89, 6.14, 5.84, 5.30, 5.36],
              borderColor: '#18345e',
              backgroundColor: 'rgba(24, 52, 94, 0.1)',
              tension: 0.25,
              borderWidth: 2.5
            },
            {
              label: 'Сальдо поточного рахунку, % ВВП',
              data: [-1.42, -1.72, -1.59, -3.51, -0.44, -4.79, -9.61, -3.02, -4.61, -3.63],
              borderColor: '#b68b38',
              backgroundColor: 'rgba(182, 139, 56, 0.12)',
              tension: 0.25,
              borderWidth: 2.5
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom' }
          },
          scales: {
            y: {
              grid: { color: '#e2e8f0' },
              ticks: { callback: (val) => val + '%' }
            },
            x: {
              grid: { display: false }
            }
          }
        }
      });
    }

    // 2. Борг центрального уряду (% ВВП, 2015–2024)
    const debtCtx = document.getElementById('debtChart');
    if (debtCtx) {
      new Chart(debtCtx, {
        type: 'bar',
        data: {
          labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
          datasets: [
            {
              label: 'Борг центрального уряду, % ВВП',
              data: [55.79, 56.86, 55.74, 54.18, 52.70, 64.03, 65.31, 65.00, 61.43, 64.04],
              backgroundColor: (ctx) => (ctx.raw > 60 ? '#9f2222' : '#24497d'),
              borderRadius: 4
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom' }
          },
          scales: {
            y: {
              min: 40,
              max: 72,
              grid: { color: '#e2e8f0' },
              ticks: { callback: (val) => val + '%' }
            },
            x: {
              grid: { display: false }
            }
          }
        }
      });
    }

    // 3. Оцінка 9 складових економічної безпеки (шкала 1–6)
    const compCtx = document.getElementById('componentsChart');
    if (compCtx) {
      new Chart(compCtx, {
        type: 'bar',
        data: {
          labels: [
            'Виробнича',
            'Демографічна',
            'Соціальна',
            'Макроекономічна',
            'Енергетична',
            'Зовнішньоекономічна',
            'Інвестиційно-інноваційна',
            'Продовольча',
            'Фінансова'
          ],
          datasets: [
            {
              label: 'Узагальнений бал (з 6,00)',
              data: [5.00, 5.00, 4.50, 4.00, 3.75, 3.50, 3.00, 2.50, 1.50],
              backgroundColor: [
                '#1b6535',
                '#1b6535',
                '#1b6535',
                '#b68b38',
                '#b68b38',
                '#b68b38',
                '#c25918',
                '#c25918',
                '#9f2222'
              ],
              borderRadius: 5
            }
          ]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            x: {
              min: 0,
              max: 6,
              grid: { color: '#e2e8f0' }
            },
            y: {
              grid: { display: false }
            }
          }
        }
      });
    }
  }
});
