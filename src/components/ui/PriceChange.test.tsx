// src/components/ui/PriceChange.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PriceChange } from './PriceChange';

describe('PriceChange component', () => {
  it('renders a positive percentage with a green color', () => {
    render(<PriceChange percent={5.25} />);
    const percentageText = screen.getByText('5.25%');
    
    // Check for correct text and class
    expect(percentageText).toBeInTheDocument();
    expect(percentageText.parentElement).toHaveClass('text-green-500');
  });

  it('renders a negative percentage with a red color', () => {
    render(<PriceChange percent={-2.10} />);
    const percentageText = screen.getByText('2.10%');

    expect(percentageText).toBeInTheDocument();
    expect(percentageText.parentElement).toHaveClass('text-red-500');
  });

  it('renders fallback for null percentage', () => {
    render(<PriceChange percent={null} />);
    expect(screen.getByText('--')).toBeInTheDocument();
  });
});