import './styles/main.css';
import './styles/trips-chart.css';
import './styles/pie-chart.css';

import {fetchDataAndRenderWidget} from "./components/widget.js";
import {setupFilters} from "./components/filter.js";

document.querySelector('#app').innerHTML = `
    <div class="card">
        <h1>Filters</h1>
        <form class="card" id="filter-container"></form>
    </div>
    <div class="card">
        <h1>Trips data</h1>
        <div id="widget" class="widget"></div>
        <div class="legend">
            <div class="legend-item"><span class="legend-color" style="background-color: var(--blue)"></span>Passenger Count</div>        
            <div class="legend-item"><span class="legend-color" style="background-color: var(--green)"></span>Tip Amount</div>
            <div class="legend-item"><span class="legend-color" style="background-color: var(--purple)"></span>Total Amount</div>
            <div class="legend-item"><span class="legend-color" style="background-color: var(--orange)"></span>Trip Distance</div>
        </div>
    </div>
    <div class="card">
        <h1>Payment data</h1>
        <div id="pie-chart"></div>
        <div class="pie-legend" id="pie-legend"></div>
    </div>
`;

const urlParams = new URLSearchParams(window.location.search);
setupFilters(Object.fromEntries(urlParams.entries()));
await fetchDataAndRenderWidget(Object.fromEntries(urlParams.entries()))