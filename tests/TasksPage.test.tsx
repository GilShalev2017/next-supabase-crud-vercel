// __tests__/TasksPage.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../app/page';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

jest.mock('../app/actions', () => ({
  getTasks: jest.fn().mockResolvedValue([]),
  addTask: jest.fn(),
  toggleTask: jest.fn(),
  deleteTask: jest.fn(),
}));

describe('Tasks Page', () => {
  it('renders add form and filter buttons', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByPlaceholderText('New task...')).toBeInTheDocument();
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('updates search input via Redux', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'test search' } });

    expect(searchInput).toHaveValue('test search');
  });
});