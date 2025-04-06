// Parsear los datos del div
const itemsGroupByUserJSON = document.getElementById('itemsGroupByUser').dataset.items;
const ordersByUser = JSON.parse(itemsGroupByUserJSON);
// console.log('ordersByUser: ', ordersByUser)

// Función para procesar datos y generar gráficos
function renderCharts(data) {
    // 1. Gráfico de Barras (Cantidad por tipo)
    const barCtx = document.getElementById('barChart').getContext('2d');
    
    // Agrupar por tipo y sumar cantidades
    const typeCounts = {};
    data.forEach(user => {
        user.items.forEach(item => {
            if (!typeCounts[item.type]) typeCounts[item.type] = 0;
            typeCounts[item.type] += item.quantity;
        });
    });

    new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: Object.keys(typeCounts),
            datasets: [{
                label: 'Cantidad por Tipo',
                data: Object.values(typeCounts),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true, // Permite ajuste responsivo
            maintainAspectRatio: false, // Importante: Desactiva el aspect ratio automático
            aspectRatio: 1, // Proporción 1:1 (opcional, si quieres cuadrados)
            plugins: {
                legend: { display: false } // true muestra la leynda superior
            },
            scales: { y: { beginAtZero: true } }
        }
    });

    // 2. Gráfico Circular (Distribución por tipo)
    const pieCtx = document.getElementById('pieChart').getContext('2d');
    
    new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: Object.keys(typeCounts),
            datasets: [{
                data: Object.values(typeCounts),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.3)',
                    'rgba(255, 159, 64, 0.3)',
                    'rgba(255, 205, 86, 0.3)',
                    'rgba(75, 192, 192, 0.3)',
                    'rgba(54, 162, 235, 0.3)',
                    'rgba(153, 102, 255, 0.3)',
                    'rgba(201, 203, 207, 0.3)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Desactiva el aspect ratio automático
            aspectRatio: 1, // Proporción 1:1 (para que sea circular perfecto)
            plugins: {
                legend: { position: 'top' } // Leyenda a la derecha
            }
        }
    });

    // 3. Gráfico Acumulativo (Total por usuario)
    const lineCtx = document.getElementById('lineChart').getContext('2d');
    
    const userTotals = data.map(user => ({
        userId: user._id,
        name: user.userData[0].name,
        lastName: user.userData[0].lastName,
        total: user.items.reduce((sum, item) => sum + item.quantity, 0),
        eppTotal: user.items.reduce((sum, item) => sum + (item.type === 'epp' ? item.quantity : 0), 0),
        consumiblesAjusteTotal: user.items.reduce((sum, item) => sum + (item.type === 'consumiblesAjuste' ? item.quantity : 0), 0),
        consumiblesMecaTotal: user.items.reduce((sum, item) => sum + (item.type === 'consumiblesMeca' ? item.quantity : 0), 0),
        consumiblesLineasTotal: user.items.reduce((sum, item) => sum + (item.type === 'consumiblesLineas' ? item.quantity : 0), 0),
        ropaTotal: user.items.reduce((sum, item) => sum + (item.type === 'ropa' ? item.quantity : 0), 0)
    }));

    // console.log('userTotals: ', userTotals)

    new Chart(lineCtx, {
        type: 'line',
        data: {
            labels: userTotals.map(user => `${user.name}, ${user.lastName} - Id#:${user.userId}`),
            datasets: [
                {
                    label: 'Total de Items',
                    data: userTotals.map(user => user.total),
                    backgroundColor: 'rgb(144, 12, 0)',
                    borderColor: 'rgb(144, 12, 0)',
                    fill: false,
                    tension: 0.1
                },
                {
                    label: 'Items EPP',
                    data: userTotals.map(user => user.eppTotal),
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    fill: false,
                    tension: 0.1
                },
                {
                    label: 'Consumibles Ajuste',
                    data: userTotals.map(user => user.consumiblesAjusteTotal),
                    backgroundColor: 'rgb(255, 159, 64)',
                    borderColor: 'rgb(255, 159, 64)',
                    fill: false,
                    tension: 0.1
                },
                {
                    label: 'Consumibles Mecanizado',
                    data: userTotals.map(user => user.consumiblesMecaTotal),
                    backgroundColor: 'rgb(153, 102, 255)',
                    borderColor: 'rgb(153, 102, 255)',
                    fill: false,
                    tension: 0.1
                },
                {
                    label: 'Consumibles Líneas',
                    data: userTotals.map(user => user.consumiblesLineasTotal),
                    backgroundColor: 'rgb(75, 192, 192)',
                    borderColor: 'rgb(75, 192, 192)',
                    fill: false,
                    tension: 0.1
                },
                {
                    label: 'Ropa',
                    data: userTotals.map(user => user.ropaTotal),
                    backgroundColor: 'rgb(54, 162, 235)',
                    borderColor: 'rgb(54, 162, 235)',
                    fill: false,
                    tension: 0.1
                }

            ]
        },
        options: {
            responsive: true,
            scales: { y: { beginAtZero: false } },
            maintainAspectRatio: false,
            aspectRatio: 2,
        }
    });
}

// Llamar a la función con los datos obtenidos de MongoDB
document.addEventListener('DOMContentLoaded', () => {
    renderCharts(ordersByUser);
});