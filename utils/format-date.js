export default function formatDate(dateString) {
    const date = new Date(dateString.replace(" ", "T"));

    const options = {
        year: 'numeric',
        month: 'short',     // Use short month name (e.g., Jan)
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false       // Use 24-hour format
    };

    return date.toLocaleString('en-US', options);
}