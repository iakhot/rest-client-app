import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FooterElement from './FooterElement';
import { renderWithProviders } from '@/__tests__/setupTests';

describe('FooterElement', () => {
  it('renders elements correctly', () => {
    renderWithProviders(<FooterElement />);

    expect(screen.getByText('© 2025')).toBeInTheDocument();
    expect(screen.getByText('Locust13region')).toBeInTheDocument();
    expect(screen.getByText('iakhot')).toBeInTheDocument();
    expect(screen.getByText('Dedal88')).toBeInTheDocument();

    const rsLink = screen.getByAltText('Logo RS School');
    expect(rsLink).toBeInTheDocument();
    expect(rsLink.closest('a')).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );

    expect(rsLink).toHaveAttribute('src', '/logo-rs.svg');
  });
});
