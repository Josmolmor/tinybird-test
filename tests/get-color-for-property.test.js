import { describe, it, expect } from 'vitest';
import {getColorForProperty} from "../components/chart.js";

describe('getColorForProperty', () => {
  it('returns correct color for known properties', () => {
    expect(getColorForProperty('passenger_count')).toBe('var(--blue)');
    expect(getColorForProperty('trip_distance')).toBe('var(--green)');
    expect(getColorForProperty('total_amount')).toBe('var(--purple)');
    expect(getColorForProperty('tip_amount')).toBe('var(--orange)');
  });

  it('returns default color for unknown properties', () => {
    expect(getColorForProperty('unknown_property')).toBe('#95a5a6');
    expect(getColorForProperty('')).toBe('#95a5a6');
  });

  it('is case sensitive', () => {
    expect(getColorForProperty('PASSENGER_COUNT')).toBe('#95a5a6');
  });
});