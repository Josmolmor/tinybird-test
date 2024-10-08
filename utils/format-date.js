export default function formatDate(dateString) {
    const date = new Date(dateString.trim().replace(" ", "T"));

    const options = {
        year: 'numeric',
        month: 'short',     // Use short month name (e.g., Jan)
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false       // Use 24-hour format
    };

    let formattedDate = date.toLocaleString('en-US', options);
    // Manually fix '24:00:00' case by replacing it with '00:00:00'
    formattedDate = formattedDate.replace('24:00:00', '00:00:00');
    return formattedDate;
}