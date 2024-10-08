export default function parseAttributes(attrString) {
    switch (attrString) {
        case 'tpep_pickup_datetime':
            return 'Pickup date';
        case 'passenger_count':
            return 'Passenger count';
        case 'payment_type':
            return "Payment type";
        case 'tip_amount':
            return "Tip amount";
        case 'total_amount':
            return "Total amount";
        case 'trip_distance':
            return "Trip distance";
        default:
            return attrString.replaceAll('_',' ');
    }
}