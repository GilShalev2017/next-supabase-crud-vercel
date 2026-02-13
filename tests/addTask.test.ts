// __tests__/addTask.test.ts
import { addTask } from '../app/actions';
import { createClient } from '@/utils/supabase/server';

// Mock Supabase client
jest.mock('@/utils/supabase/server', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn().mockReturnThis(),
    insert: jest.fn().mockResolvedValue({ error: null }),
    select: jest.fn().mockResolvedValue({ data: [], error: null }),
  })),
}));

describe('addTask Server Action', () => {
  it('adds a task successfully', async () => {
    const formData = new FormData();
    formData.append('title', 'Test task');

    const result = await addTask({ success: false, error: '' }, formData);

    expect(result).toEqual({ success: true, error: '' });
  });

  it('returns error when title is missing', async () => {
    const formData = new FormData();

    const result = await addTask({ success: false, error: '' }, formData);

    expect(result).toEqual({ success: false, error: 'Title required' });
  });
});