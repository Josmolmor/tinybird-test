// Chart rendering function
import formatDate from "../utils/format-date.js";
import parseAttributes from "../utils/parse-attributes.js";

const paymentLabels = {
    1: 'Cash',
    2: 'Card',
    3: 'Other',
    4: 'Transference'
};

const paymentColors = {
    1: 'var(--green)', // Cash
    2: 'var(--blue)', // Card
    3: 'var(--orange)',  // Other
    4: 'var(--purple)' // transference
};

export function createPieChart(data) {
    const pieChart = document.getElementById('pie-chart');
    const legendContainer = document.getElementById('pie-legend');

    if (!data.length) {
        const emptyMessage = document.createElement('h2');
        emptyMessage.id = 'empty-message';
        emptyMessage.textContent = 'No data available';
        pieChart.removeAttribute('style');
        pieChart.appendChild(emptyMessage);
        legendContainer.innerHTML = '';
        return;
    }

    document.getElementById('empty-message')?.remove();

    // Count the occurrences of each payment type
    const counts = data.reduce((acc, item) => {
        const type = item.payment_type;
        acc[type] = (acc[type] || 0) + 1;
        return acc;
    }, {});

    // Calculate total number of payments
    const totalPayments = data.length;

    // Calculate the degrees for each payment type slice
    const degrees = Object.keys(counts).map(type => ({
        type,
        label: paymentLabels[type] ?? 'Unknown',
        color: paymentColors[type],
        degrees: (counts[type] / totalPayments) * 360
    }));

    // Create the pie chart
    let gradientString = '';
    let currentDegree = 0;

    degrees.forEach((entry, index) => {
        const nextDegree = currentDegree + entry.degrees;
        gradientString += `${entry.color} ${currentDegree}deg ${nextDegree}deg`;
        if (index < degrees.length - 1) gradientString += ', ';
        currentDegree = nextDegree;
    });

    // Apply the conic-gradient to the pie chart
    pieChart.style.backgroundImage = `conic-gradient(${gradientString})`;

    // Create the legend
    legendContainer.innerHTML = '';

    degrees.forEach(entry => {
        const legendItem = document.createElement('div');
        legendItem.classList.add('legend-item');

        const colorBox = document.createElement('div');
        colorBox.classList.add('legend-color-box');
        colorBox.style.backgroundColor = entry.color;

        const label = document.createElement('span');
        label.textContent = `${entry.label} (${counts[entry.type]})`;

        legendItem.appendChild(colorBox);
        legendItem.appendChild(label);

        legendContainer.appendChild(legendItem);
    });
}

export function createBarChart(data) {
    const chart = document.getElementById('widget');
    chart.innerHTML = '';

    const properties = ['passenger_count', 'trip_distance', 'total_amount', 'tip_amount'];
    const maxValue = Math.max(...data.flatMap(entry => properties.map(prop => entry[prop])));

    if (!data.length) {
        const emptyMessage = document.createElement('h2');
        emptyMessage.textContent = 'No data available';
        chart.appendChild(emptyMessage);
        return;
    }

    data.forEach((trip, index) => {
        const barGroup = document.createElement('div');
        barGroup.classList.add('bar-group');

        const barWrapper = document.createElement('div');
        barWrapper.classList.add('bar-wrapper');

        properties.forEach((property) => {
            const value = trip[property];
            const bar = document.createElement('div');
            bar.classList.add('bar');
            
            // Set the height of the bar relative to the value
            bar.style.height = `${(value / maxValue) * 100}%`;
            bar.style.backgroundColor = getColorForProperty(property);
            bar.title = `${parseAttributes(property)}: ${value}`;
            barWrapper.appendChild(bar);
        });

        barGroup.appendChild(barWrapper);

        // Add a label below the bars
        const barLabel = document.createElement('div');
        barLabel.classList.add('bar-label');
        barLabel.textContent = `${formatDate(trip.tpep_pickup_datetime)}`;
        barGroup.appendChild(barLabel);

        chart.appendChild(barGroup);
    });
}

export function getColorForProperty(property) {
    const colors = {
        'passenger_count': 'var(--blue)',
        'trip_distance': 'var(--green)',
        'total_amount': 'var(--purple)',
        'tip_amount': 'var(--orange)'
    };
    return colors[property] || '#95a5a6';
}

