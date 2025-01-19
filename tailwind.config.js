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
		'#076ad4' : '#076ad4',
		'#3498db' : '#3498db',
	},
	plugins: [],
};