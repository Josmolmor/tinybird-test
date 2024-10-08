import {fetchData} from "../lib/api.js";
import {createBarChart, createPieChart} from "./chart.js";

function renderWidget(widgetData) {
    const data = widgetData;
    // this could've been two different API calls, but we'll leave it as it is for this test
    const filteredPaymentType = data.map(({ payment_type, ...rest }) => rest);
    createBarChart(filteredPaymentType);
    createPieChart(data.filter((item) => item.payment_type));
}

export async function fetchDataAndRenderWidget(filter) {
    const data = await fetchData(filter);
    renderWidget(data);
}