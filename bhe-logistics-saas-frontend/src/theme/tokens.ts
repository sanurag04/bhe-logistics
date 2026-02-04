/** @format */

export type ThemeMode = 'light' | 'dark';

export type ThemeTokens = {
	spacing: {
		xs: string;
		sm: string;
		md: string;
		lg: string;
		xl: string;
		'2xl': string;
	};
	borderRadius: {
		sm: string;
		md: string;
		lg: string;
		xl: string;
		pill: string;
	};
	colors: {
		brand: {
			primary: string;
			secondary: string;
			accent: string;
		};
		background: {
			base: string;
			surface: string;
			elevated: string;
		};
		text: {
			primary: string;
			secondary: string;
			muted: string;
			inverse: string;
		};
		border: {
			default: string;
			subtle: string;
		};
		status: {
			success: string;
			warning: string;
			error: string;
			info: string;
		};
	};
};

export const defaultTokens: ThemeTokens = {
	spacing: {
		xs: '4px',
		sm: '8px',
		md: '12px',
		lg: '16px',
		xl: '24px',
		'2xl': '32px',
	},
	borderRadius: {
		sm: '4px',
		md: '8px',
		lg: '12px',
		xl: '16px',
		pill: '999px',
	},
	colors: {
		brand: {
			primary: '#1E40AF',
			secondary: '#0F172A',
			accent: '#38BDF8',
		},
		background: {
			base: '#F8FAFC',
			surface: '#FFFFFF',
			elevated: '#F1F5F9',
		},
		text: {
			primary: '#0F172A',
			secondary: '#334155',
			muted: '#64748B',
			inverse: '#FFFFFF',
		},
		border: {
			default: '#E2E8F0',
			subtle: '#F1F5F9',
		},
		status: {
			success: '#16A34A',
			warning: '#F59E0B',
			error: '#DC2626',
			info: '#0284C7',
		},
	},
};

export const whiteLabelTokens: Record<string, Partial<ThemeTokens>> = {
	default: {},
};
