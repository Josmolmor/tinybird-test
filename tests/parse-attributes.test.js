import {describe, expect, it} from "vitest";
import parseAttributes from "../utils/parse-attributes.js";

describe('parseAttributes', () => {
    it('parses attribute names correctly', () => {
        expect(parseAttributes('tpep_pickup_datetime')).toBe('Pickup date');
        expect(parseAttributes('payment_type')).toBe('Payment type');
        expect(parseAttributes('tip_amount')).toBe('Tip amount');
        expect(parseAttributes('total_amount')).toBe('Total amount');
        expect(parseAttributes('trip_distance')).toBe('Trip distance');
        expect(parseAttributes('passenger_count')).toBe('Passenger count');
    });

    it('handles single word attributes', () => {
        expect(parseAttributes('distance')).toBe('distance');
    });

    it('handles attributes with multiple underscores', () => {
        expect(parseAttributes('average_trip_time')).toBe('average trip time');
    });

    it('handles empty string', () => {
        expect(parseAttributes('')).toBe('');
    });
});