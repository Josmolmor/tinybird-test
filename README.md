# tinybird frontend engineer test

https://gist.github.com/xavijam/bf2226f8d2bb16b497f59f48ee18896d

This project visualizes trip data using a custom bar chart implementation. The chart displays information about passenger count, trip distance, total amount, and tip amount for various trips.
It also includes a secondary pie chart to display payment data information as a bonus.

For filtering, I've included both `before` and `after` filtering based on the trip date, a predefined set number of trips (10, 20, 30, 40 and 50).
As for sorting, you can sort by all the params being retrieved; both ascending and descending (default).
There's also a handy `reset` button that should make it easier to get rid of all the actives filters.

Had to check the tinybird docs multiple times to come up with proper search params, mainly:
- [Swagger docs](https://app.tinybird.co/gcp/europe-west3/openapi?token=p.eyJ1IjogIjdmOTIwMmMzLWM1ZjctNDU4Ni1hZDUxLTdmYzUzNTRlMTk5YSIsICJpZCI6ICJmZTRkNWFiZS05ZWIyLTRjMjYtYWZiZi0yYTdlMWJlNDQzOWEifQ.P67MfoqTixyasaMGH5RIjCrGc0bUKvBoKMwYjfqQN8c&url=https%3A%2F%2Fapi.tinybird.co%2Fv0%2Fpipes%2Fopenapi.json%3Ftoken%3Dp.eyJ1IjogIjdmOTIwMmMzLWM1ZjctNDU4Ni1hZDUxLTdmYzUzNTRlMTk5YSIsICJpZCI6ICJmZTRkNWFiZS05ZWIyLTRjMjYtYWZiZi0yYTdlMWJlNDQzOWEifQ.P67MfoqTixyasaMGH5RIjCrGc0bUKvBoKMwYjfqQN8c)
- [Query overview](https://www.tinybird.co/docs/query/overview)

Spent ~5 hours on this (spent way much time fighting the chart bars for no reason)

## Key Decisions and Implementation Details

1. **Tech stack**:
   - Kept it as lightweight as possible. Vanilla JS with Vite and Vitest for testing.
2. **Data fetching**:
   - Limited the query by selecting only the fields that I wanted to use instead of selecting `*`.
3. **Deep linking**:
   - Working as expected for all the params. If the value used doesn't match any real DB column, the app will prompt the user with an error.
4. **Bar Chart Structure**:
    - We use a nested structure with `.bar-group` and `.bar-wrapper` to allow for bottom alignment of bars with different heights.
    - Each bar group represents a single trip, containing multiple bars for different data points.
5. **Responsive Design**:
    - The chart is horizontally scrollable to accommodate a large number of trips.
    - A fixed height is set for the chart container to ensure consistent visualization.
    - Bar heights are calculated relative to the maximum value across all properties and trips, ensuring proper visual representation.
6. **Color Coding**:
    - Each property (passenger count, trip distance, etc.) is assigned a unique color for easy identification.
7. **Tooltips**:
    - Each bar has a tooltip showing the exact value and property it represents.
8. **Date Labels**:
    - Each trip's date is displayed below its bar group for context.
9. **Themes**
   - App should load based on the `prefers-color-scheme` to show either on light or dark mode.
   - Usage of CSS variables to ease tweaking colors around.

## Installation Instructions

1. Clone the repository:
   ```
   git clone [repository-url]
   cd [repository-name]
   ```

2. Install dependencies:
   ```
   pnpm install
   ```

3. Start the development server:
   ```
   pnpm dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port specified by your development server).

## Usage

The chart will automatically populate with trip data when the page loads. You can scroll horizontally to view more trips if they exceed the width of the viewport.

## Possible Follow-ups and Improvements

1. **Dependencies**: Add typescript functionality.

2. **Interactive Features**: Implement click events on bars to show more detailed information about each trip.

3. **Performance Optimization**: For large datasets, implement virtualization or pagination to improve rendering performance.

4. **Accessibility**: Enhance keyboard navigation and screen reader support for better accessibility.

5. **Data Loading**: Implement lazy loading or pagination for handling large datasets more efficiently.

6. **Customization Options**: Allow users to choose which properties to display or customize color schemes as well as adding a dark mode toggle to allow the user changing between themes

7. **Animation**: Add smooth transitions when data updates or when filtering/sorting is applied.

8. **Export Functionality**: Add options to export the chart as an image or the data as a CSV file.

9. **Comparative Analysis**: Implement features to compare trips or aggregate data over time periods.

10. **Search params**: Handle unrecognized search params manually input by the user and remove them before performing the API call to avoid unnecessary network requests.