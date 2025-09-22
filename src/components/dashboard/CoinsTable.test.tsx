// src/components/dashboard/CoinsTable.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { CoinsTable } from './CoinsTable';
import { mockCoins } from '@/test/mocks/data';
import { BrowserRouter } from 'react-router-dom';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe('CoinsTable component', () => {
  it('renders the list of coins correctly', () => {
    renderWithRouter(
      <CoinsTable coins={mockCoins} isLoading={false} onRowClick={vi.fn()} />
    );

    // Check if both coins are in the table
    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByText('Ethereum')).toBeInTheDocument();
  });

  it('filters the list based on search term', async () => {
    const user = userEvent.setup();
    renderWithRouter(
      <CoinsTable coins={mockCoins} isLoading={false} onRowClick={vi.fn()} />
    );

    const searchInput = screen.getByPlaceholderText(/Search by name or symbol/i);
    await user.type(searchInput, 'bit');

    // After typing "bit", only Bitcoin should be visible
    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.queryByText('Ethereum')).not.toBeInTheDocument();
  });

  it('shows a "no coins found" message when filter returns no results', async () => {
    const user = userEvent.setup();
    renderWithRouter(
      <CoinsTable coins={mockCoins} isLoading={false} onRowClick={vi.fn()} />
    );

    const searchInput = screen.getByPlaceholderText(/Search by name or symbol/i);
    await user.type(searchInput, 'xyz');

    expect(screen.getByText('No coins found.')).toBeInTheDocument();
  });
});