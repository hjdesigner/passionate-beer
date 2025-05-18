// FormField.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import FormField from '../FormField';

describe('FormField', () => {
  const mockChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders a text input', () => {
    render(<FormField name="testText" label="Text" value="Hello" onChange={mockChange} />);
    const input = screen.getByLabelText(/Text/i) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('Hello');

    fireEvent.change(input, { target: { value: 'Changed' } });
    expect(mockChange).toHaveBeenCalled();
  });

  it('renders a number input', () => {
    render(<FormField name="testNumber" label="Number" type="number" value="10" onChange={mockChange} />);
    const input = screen.getByLabelText(/Number/i) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.type).toBe('number');
    expect(input.value).toBe('10');
  });

  it('renders a textarea', () => {
    render(<FormField name="testArea" label="Text Area" type="textarea" value="Some text" onChange={mockChange} />);
    const textarea = screen.getByLabelText(/Text Area/i) as HTMLTextAreaElement;
    expect(textarea).toBeInTheDocument();
    expect(textarea.value).toBe('Some text');
  });

  it('renders a range input', () => {
    render(<FormField name="testRange" label="Range" type="range" value="5" onChange={mockChange} />);
    const input = screen.getByLabelText(/Range/i) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.type).toBe('range');
    expect(input.value).toBe('5');
  });

  it('renders a select input with options', () => {
    render(
      <FormField
        name="testSelect"
        label="Select"
        type="select"
        value="2"
        onChange={mockChange}
        options={[
          { label: 'One', value: '1' },
          { label: 'Two', value: '2' },
        ]}
      />
    );
    const select = screen.getByLabelText(/Select/i) as HTMLSelectElement;
    expect(select).toBeInTheDocument();
    expect(select.value).toBe('2');
    expect(screen.getByText('One')).toBeInTheDocument();
    expect(screen.getByText('Two')).toBeInTheDocument();
  });

  it('renders help and error messages', () => {
    render(
      <FormField
        name="test"
        label="With help"
        value=""
        onChange={mockChange}
        help="This is help text"
        error="This is an error"
      />
    );
    expect(screen.getByText('This is help text')).toBeInTheDocument();
    expect(screen.getByText('This is an error')).toBeInTheDocument();
  });

  it('renders required asterisk if required', () => {
    render(<FormField name="requiredField" label="Required" value="" onChange={mockChange} required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });
});
