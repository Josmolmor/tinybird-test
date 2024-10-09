import {fetchDataAndRenderWidget} from "./widget.js";
import parseAttributes from "../utils/parse-attributes.js";
import getSearchParams from "../utils/get-search-params.js";

export const FILTER_ELEMENT_IDS = ['trip_date_before', 'trip_date_after', 'limit', 'order_by', 'sort_order'];
export const VALID_FILTER_KEYS = ['Select a field', 'passenger_count','total_amount','trip_distance', 'tip_amount', 'tpep_pickup_datetime'];

function cleanUrlSearchParams() {
    // Get the current URL
    const url = new URL(window.location);
    // Clear all query parameters by setting `search` to an empty string
    url.search = '';
    return url;
}

function commonUrlChangeEvent(elementId) {
    const filterElement = document.getElementById(elementId);
    filterElement.addEventListener('change', async (event) => {
        const newFilter = event.target.value;

        // Get current URLSearchParams from the URL
        const urlParams = getSearchParams();

        // If newFilter has a value, update or add the query param
        if (newFilter !== 'null' && newFilter !== '') {
            urlParams.set(elementId, newFilter);  // Update or add the parameter
        } else {
            urlParams.delete(elementId);  // Remove the parameter if newFilter is empty
        }

        // Push the updated query string to the browser's history
        window.history.pushState({}, '', `${window.location.pathname}?${urlParams.toString()}`);

        // Call your fetch function with updated filters
        await fetchDataAndRenderWidget(Object.fromEntries(urlParams.entries()));
    });
}

function createNewFilterElement(elId, type, labelText, filters) {
    const label = document.createElement("label");
    label.textContent = labelText;
    const input = document.createElement("input");
    input.type = type;
    input.id = elId;
    input.defaultValue = filters[elId];
    label.appendChild(input);
    return document.getElementById('filter-container').appendChild(label);
}

export function setupFilters(filters) {
    FILTER_ELEMENT_IDS.map((elId) => {
        switch(elId) {
            case 'trip_date_before':
                createNewFilterElement(elId, 'datetime-local', "Trip date before", filters);
                break;
            case 'trip_date_after':
                createNewFilterElement(elId, 'datetime-local', "Trip date after", filters);
                break;
            case 'limit':
                const label = document.createElement("label");
                label.textContent = "Number of trips";
                const select = document.createElement("select");
                select.id = elId;
                [10,20,30,40,50].map((n) => {
                    const option = document.createElement("option");
                    option.value = n.toString();
                    option.textContent = n.toString();
                    if (n === +filters.limit) {
                        option.selected = true;
                    }
                    select.appendChild(option);
                })
                label.appendChild(select);
                document.getElementById('filter-container').appendChild(label);
                break;
            case 'order_by':
                const sort_label = document.createElement("label");
                sort_label.textContent = "Sort by";
                const sort_select = document.createElement("select");
                sort_select.id = elId;
                VALID_FILTER_KEYS.map((n) => {
                    const option = document.createElement("option");
                    option.value = n.toLowerCase() === 'select a field' ? null : n.toString();
                    option.textContent = parseAttributes(n) ?? 'Select an option';
                    if (n === filters.order_by) {
                        option.selected = true;
                    }
                    sort_select.appendChild(option);
                })
                sort_label.appendChild(sort_select);
                document.getElementById('filter-container').appendChild(sort_label);
                break;
            case 'sort_order':
                const sort_order_label = document.createElement("label");
                sort_order_label.textContent = "Sort direction";
                const sort_order_select = document.createElement("select");
                sort_order_select.id = elId;
                ['desc', 'asc'].map((n) => {
                    const option = document.createElement("option");
                    option.value = n.toString();
                    option.textContent = n;
                    if (n === filters.sort_order) {
                        option.selected = true;
                    }
                    sort_order_select.appendChild(option);
                })
                sort_order_label.appendChild(sort_order_select);
                document.getElementById('filter-container').appendChild(sort_order_label);
                break;
            default:
                createNewFilterElement(elId, 'text', "Filter");
                break;
        }
        commonUrlChangeEvent(elId);
    })
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset filters';
    resetButton.addEventListener('click', async (e) => {
        const url = cleanUrlSearchParams();
        // Update the URL in the browser without reloading the page
        window.history.pushState({}, '', url);
        await fetchDataAndRenderWidget();
    })
    document.getElementById('filter-container').appendChild(resetButton);
}