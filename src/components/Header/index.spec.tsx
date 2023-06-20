import { render, screen } from '@testing-library/react';
import { Header } from './';

describe('Header', () => {
  test('renders with title', () => {
    const title = 'My Header';

    render(<Header title={title} />);

    const headerTitle = screen.getByText(title);
    expect(headerTitle).toBeDefined();
  });

  test('renders with left and right elements', () => {
    const leftElement = <button>Left</button>;
    const rightElement = <button>Right</button>;

    render(<Header left={leftElement} right={rightElement} />);

    const leftButton = screen.getByText('Left');
    const rightButton = screen.getByText('Right');

    expect(leftButton).toBeDefined();
    expect(rightButton).toBeDefined();
  });
});