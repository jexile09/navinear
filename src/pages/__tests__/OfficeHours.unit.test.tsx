// __tests__/OfficeHours.unit.test.tsx
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

describe('OfficeHours Unit Tests', () => {
  test('displays loading state while fetching professors', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });
    
    render(<OfficeHours />);
    
    expect(screen.getByText('Loading professors...')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('Loading professors...')).not.toBeInTheDocument();
    });
  });

  test('shows error message when professor fetch fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));
    render(<OfficeHours />);
    
    await waitFor(() => {
      expect(screen.getByText('Unable to load professor data.')).toBeInTheDocument();
    });
  });

  test('requires all form fields before submission', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([mockProfessor]),
    });
    
    render(<OfficeHours />);
    
    await waitFor(() => {
      fireEvent.click(screen.getByText('Submit Appointment'));
      expect(screen.getByText('Please fill all fields')).toBeInTheDocument();
    });
  });
});