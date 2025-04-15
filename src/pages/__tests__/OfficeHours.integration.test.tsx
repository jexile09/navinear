// __tests__/OfficeHours.integration.test.tsx
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import OfficeHours from '../OfficeHours';

// Mock react-datepicker
vi.mock('react-datepicker', () => ({
  __esModule: true,
  default: vi.fn().mockImplementation(({ onChange, selected, placeholderText }) => (
    <input
      data-testid="datepicker"
      value={selected?.toDateString() || ''}
      placeholder={placeholderText}
      onChange={() => onChange(new Date('2023-05-15'))}
      readOnly
    />
  ))
}));

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

const mockProfessor = {
  id: 1,
  name: 'Dr. Smith',
  office: 'Building 1, Room 101',
  office_hours: 'Monday 9:00am-11:00am',
  email: 'smith@university.edu',
  phone: '555-1234',
  course_id: 'CS101'
};

beforeEach(() => vi.resetAllMocks());

describe('OfficeHours Integration Tests', () => {
  test('displays professor details when selected', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([mockProfessor]),
    });
    
    render(<OfficeHours />);
    
    const professorSelect = screen.getByRole('combobox', { name: /select a professor/i });
    fireEvent.change(professorSelect, { target: { value: '1' } });
    
    await waitFor(() => {
      expect(screen.getByText('Building 1, Room 101')).toBeInTheDocument();
    });
  });

  test('generates available time slots when date selected', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([mockProfessor]),
    }).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });
    
    render(<OfficeHours />);
    
    const professorSelect = screen.getByRole('combobox', { name: /select a professor/i });
    fireEvent.change(professorSelect, { target: { value: '1' } });
    fireEvent.click(screen.getByTestId('datepicker'));
    
    await waitFor(() => {
      const timeSlotSelect = screen.getByRole('combobox', { name: /time slot/i });
      expect(timeSlotSelect).toBeInTheDocument();
      expect(screen.getByText('9:00 AM')).toBeInTheDocument();
    });
  });

  test('submits appointment successfully', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([mockProfessor]),
    }).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    }).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });
    
    render(<OfficeHours />);
    
    const professorSelect = screen.getByRole('combobox', { name: /select a professor/i });
    fireEvent.change(professorSelect, { target: { value: '1' } });
    fireEvent.click(screen.getByTestId('datepicker'));
    fireEvent.change(screen.getByPlaceholderText('Full Name'), { 
      target: { value: 'John Doe' } 
    });
    fireEvent.change(screen.getByPlaceholderText('Student Email'), { 
      target: { value: 'john@university.edu' } 
    });
    fireEvent.change(screen.getByRole('combobox', { name: /time slot/i }), { 
      target: { value: '9:00 AM' } 
    });
    fireEvent.click(screen.getByText('Submit Appointment'));
    
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        'http://127.0.0.1:5000/api/students',
        expect.objectContaining({
          method: 'POST'
        })
      );
    });
  });

  test('disables booked time slots', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([mockProfessor]),
    }).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([{
        professor_id: 1,
        time_slot: '2023-05-15 9:00 AM'
      }]),
    });
    
    render(<OfficeHours />);
    
    const professorSelect = screen.getByRole('combobox', { name: /select a professor/i });
    fireEvent.change(professorSelect, { target: { value: '1' } });
    fireEvent.click(screen.getByTestId('datepicker'));
    
    await waitFor(() => {
      const timeSlotSelect = screen.getByRole('combobox', { name: /time slot/i });
      fireEvent.click(timeSlotSelect);
      expect(screen.getByText('9:00 AM')).toBeDisabled();
    });
  });
});