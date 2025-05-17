import { render, screen } from '@testing-library/react';
import Heading from '../Heading';

describe('Heading component', () => {
  it('renders the heading with the correct text', () => {
    render(<Heading>Test Heading</Heading>);
    expect(screen.getByText('Test Heading')).toBeInTheDocument();
  });

  it('renders the correct HTML tag based on "as" prop', () => {
    const { rerender } = render(<Heading as="h1">Heading 1</Heading>);
    expect(screen.getByText('Heading 1').tagName).toBe('H1');

    rerender(<Heading as="h3">Heading 3</Heading>);
    expect(screen.getByText('Heading 3').tagName).toBe('H3');
  });

  it('applies the default size class when no size prop is provided', () => {
    render(<Heading>Default size</Heading>);
    expect(screen.getByText('Default size')).toHaveClass('mdHeading');
  });

  it('applies the correct size class based on the "size" prop', () => {
    const { rerender } = render(<Heading size="lg">Large size</Heading>);
    expect(screen.getByText('Large size')).toHaveClass('lgHeading');

    rerender(<Heading size="sm">Small size</Heading>);
    expect(screen.getByText('Small size')).toHaveClass('smHeading');
  });

  it('applies additional className if provided', () => {
    render(<Heading className="extra-class">Extra class</Heading>);
    expect(screen.getByText('Extra class')).toHaveClass('extra-class');
  });
});
