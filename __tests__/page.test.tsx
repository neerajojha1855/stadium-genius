import { render, screen, fireEvent } from '@testing-library/react';
import Home from '@/app/page';

describe('Stadium OS Dashboard', () => {
  it('renders the main dashboard heading', () => {
    render(<Home />);
    // Fixed: Search specifically for the heading role
    const heading = screen.getByRole('heading', { name: /STADIUM OS/i, level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('allows user to type in the chat input', () => {
    render(<Home />);
    const input = screen.getByPlaceholderText(/Ask AI to optimize gates/i);
    fireEvent.change(input, { target: { value: 'Test message' } });
    expect(input).toHaveValue('Test message');
  });

  it('disables the send button when input is empty', () => {
    render(<Home />);
    const button = screen.getByRole('button', { name: /Send message/i });
    expect(button).toBeDisabled();
  });
});
