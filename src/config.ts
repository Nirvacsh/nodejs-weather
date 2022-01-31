export const config = {
	app: {
		port: process.env.PORT || 3000
	},
	weather: {
		geoCoding: {
			host: process.env.GEOCODING_HOST,
			accessToken: process.env.GEOCODE_ACCESS_TOKEN,
		},
		forecast: {
			host: process.env.FORECAST_HOST,
			accessToken: process.env.FORECAST_ACCESS_TOKEN,
		},
	}
};
