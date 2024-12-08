export default
{
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme:
	{
		extend:
		{
			fontFamily: 
			{
				cambria: [
					'Cambria',
					'Cochin',
					'Georgia',
					'Times',
					'"Times New Roman"',
					'serif',
				],
			},
			width: {
				'72': '20rem',
			},
		},
	},
	colors: {
		'bharath-blue': '#0073e6',
	},
	plugins: [],
};