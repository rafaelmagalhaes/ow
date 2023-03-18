import { describe, it, expect } from 'vitest';

import { useLandTitles } from '../index';

describe('useLandTitles', () => {
  it('fetches land titles correctly', async () => {
    const store = useLandTitles();
    await store.fetchLandTitles();
    expect(store.landTitles).toHaveLength(17);
  });

  it('fetches a single land title correctly', async () => {
    const store = useLandTitles();
    await store.fetchSingleLandTitle('243751');
    expect(store.landTitle.titleNumber).toBe('243751');
  });
});
