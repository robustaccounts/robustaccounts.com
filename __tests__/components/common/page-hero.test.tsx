import { render, screen } from '@testing-library/react';

import PageHero from '@/components/common/page-hero';

describe('PageHero', () => {
    it('renders title correctly', () => {
        render(<PageHero title="Test Title" />);
        expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('renders subtitle when provided', () => {
        render(<PageHero title="Test Title" subtitle="Test Subtitle" />);
        expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    });

    it('renders trust indicators when provided', () => {
        const indicators = ['Indicator 1', 'Indicator 2'];
        render(<PageHero title="Test Title" trustIndicators={indicators} />);
        indicators.forEach((indicator) => {
            expect(screen.getByText(indicator)).toBeInTheDocument();
        });
    });

    it('renders stats when provided', () => {
        const stats = [
            { number: '500+', label: 'Clients' },
            { number: '15+', label: 'Years' },
        ];
        render(<PageHero title="Test Title" stats={stats} />);
        expect(screen.getByText('500+')).toBeInTheDocument();
        expect(screen.getByText('Clients')).toBeInTheDocument();
    });

    it('renders badge when provided', () => {
        render(<PageHero title="Test Title" badge="Professional Services" />);
        expect(screen.getByText('Professional Services')).toBeInTheDocument();
    });

    it('hides CTA when showCTA is false', () => {
        render(<PageHero title="Test Title" showCTA={false} />);
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
});
