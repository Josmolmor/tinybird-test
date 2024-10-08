import { describe, it, expect } from 'vitest';
import formatDate from "../utils/format-date.js";

describe('formatDate', () => {
    it('should format a valid date string in "YYYY-MM-DD HH:mm:ss" format', () => {
        const dateString = '2017-01-01 00:00:00';
        const result = formatDate(dateString);
        expect(result).toBe('Jan 1, 2017, 00:00:00');
    });

    it('should correctly handle a different valid date string', () => {
        const dateString = '2023-10-08 14:30:45';
        const result = formatDate(dateString);
        expect(result).toBe('Oct 8, 2023, 14:30:45');
    });

    it('should handle leap year dates correctly', () => {
        const dateString = '2020-02-29 23:59:59';
        const result = formatDate(dateString);
        expect(result).toBe('Feb 29, 2020, 23:59:59');
    });

    it('should return "Invalid Date" for an invalid date string', () => {
        const dateString = 'invalid-date';
        const result = formatDate(dateString);
        expect(result).toBe('Invalid Date');
    });

    it('should correctly handle a different timezone', () => {
        const dateString = '2024-01-01 15:00:00';
        const result = formatDate(dateString);
        const expectedResult = new Date('2024-01-01T15:00:00').toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false
        });
        expect(result).toBe(expectedResult);
    });
});
