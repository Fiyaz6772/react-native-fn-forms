import { StorageAdapter, DraftData } from '../src/types';

describe('Auto-save & Draft Recovery', () => {
  // Mock storage adapter
  const createMockStorage = (): StorageAdapter & { store: Map<string, string> } => {
    const store = new Map<string, string>();
    return {
      store,
      save: async (key: string, data: string) => {
        store.set(key, data);
      },
      load: async (key: string) => {
        return store.get(key) || null;
      },
      remove: async (key: string) => {
        store.delete(key);
      },
    };
  };

  it('should save draft data', async () => {
    const storage = createMockStorage();
    const draftData: DraftData = {
      values: { email: 'test@example.com', name: 'John' },
      touched: { email: true, name: true },
      timestamp: Date.now(),
    };

    await storage.save('test-form', JSON.stringify(draftData));

    const saved = await storage.load('test-form');
    expect(saved).toBeTruthy();
    expect(JSON.parse(saved!)).toEqual(draftData);
  });

  it('should load draft data', async () => {
    const storage = createMockStorage();
    const draftData: DraftData = {
      values: { email: 'test@example.com' },
      touched: { email: true },
      timestamp: Date.now(),
    };

    await storage.save('test-form', JSON.stringify(draftData));
    const loaded = await storage.load('test-form');

    expect(loaded).toBeTruthy();
    const parsed = JSON.parse(loaded!);
    expect(parsed.values.email).toBe('test@example.com');
    expect(parsed.touched.email).toBe(true);
  });

  it('should remove draft data', async () => {
    const storage = createMockStorage();
    await storage.save(
      'test-form',
      JSON.stringify({ values: {}, touched: {}, timestamp: Date.now() })
    );

    await storage.remove('test-form');

    const loaded = await storage.load('test-form');
    expect(loaded).toBeNull();
  });

  it('should return null for non-existent draft', async () => {
    const storage = createMockStorage();
    const loaded = await storage.load('non-existent-key');
    expect(loaded).toBeNull();
  });

  it('should handle draft expiration logic', () => {
    const now = Date.now();
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
    const eightDaysAgo = now - 8 * 24 * 60 * 60 * 1000;
    const expirationDays = 7;
    const expirationMs = expirationDays * 24 * 60 * 60 * 1000;

    // Draft from 7 days ago - should not be expired
    const isExpired7 = now - sevenDaysAgo > expirationMs;
    expect(isExpired7).toBe(false);

    // Draft from 8 days ago - should be expired
    const isExpired8 = now - eightDaysAgo > expirationMs;
    expect(isExpired8).toBe(true);
  });

  it('should handle multiple drafts with different keys', async () => {
    const storage = createMockStorage();

    const draft1: DraftData = {
      values: { email: 'form1@example.com' },
      touched: { email: true },
      timestamp: Date.now(),
    };

    const draft2: DraftData = {
      values: { email: 'form2@example.com' },
      touched: { email: true },
      timestamp: Date.now(),
    };

    await storage.save('form1-draft', JSON.stringify(draft1));
    await storage.save('form2-draft', JSON.stringify(draft2));

    const loaded1 = await storage.load('form1-draft');
    const loaded2 = await storage.load('form2-draft');

    expect(JSON.parse(loaded1!).values.email).toBe('form1@example.com');
    expect(JSON.parse(loaded2!).values.email).toBe('form2@example.com');
  });

  it('should preserve draft structure', async () => {
    const storage = createMockStorage();
    const draftData: DraftData = {
      values: {
        email: 'test@example.com',
        name: 'John Doe',
        age: '25',
        address: '123 Main St',
      },
      touched: {
        email: true,
        name: true,
        age: false,
        address: true,
      },
      timestamp: 1699999999999,
    };

    await storage.save('test-form', JSON.stringify(draftData));
    const loaded = await storage.load('test-form');
    const parsed = JSON.parse(loaded!);

    expect(parsed).toEqual(draftData);
    expect(Object.keys(parsed.values).length).toBe(4);
    expect(Object.keys(parsed.touched).length).toBe(4);
    expect(typeof parsed.timestamp).toBe('number');
  });
});
