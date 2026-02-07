import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	components: {
			/* 🔹 Base label typography */
		MuiFormLabel: {
			styleOverrides: {
				root: {
					fontSize: '0.9rem',
					lineHeight: '1.3em',
					letterSpacing: '0.00938em',
					fontWeight: 400,
					color: '#000',

					'&.Mui-focused': {
						color: '#000',
					},

					'&.Mui-disabled': {
						color: '#9ca3af',
					},
				},
			},
		},

		/* 🔹 Input label (outlined, animated, shrink states) */
		MuiInputLabel: {
			styleOverrides: {
				root: {
					fontSize: '0.9rem',
					lineHeight: '1.3em',
					letterSpacing: '0.00938em',
					fontWeight: 400,
					color: '#000',

					'&.MuiInputLabel-shrink': {
						fontSize: '0.9rem',
					},

					'&.Mui-focused': {
						color: '#000',
					},
				},
			},
		},

		/* 🔹 TextField / Input */
		MuiInputBase: {
			styleOverrides: {
				input: {
					fontSize: '14px',
					height: '2.5em',
					padding: '10px 12px', // important for usability
					boxSizing: 'border-box',
				},
			},
		},

		/* 🔹 Outlined variant (most of your inputs) */
		MuiOutlinedInput: {
			styleOverrides: {
				input: {
					fontSize: '14px',
					height: '2.5em',
					padding: '10px 12px',
				},
			},
		},

		/* 🔹 Select input text */
		MuiSelect: {
			styleOverrides: {
				select: {
					fontSize: '14px',
					minHeight: '2.5em',
					display: 'flex',
					alignItems: 'center',
				},
			},
		},
	},
});

export default theme;
