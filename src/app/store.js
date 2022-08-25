import { configureStore } from "@reduxjs/toolkit"
import weatherReducer from "../features/weather_app/weatherAppDataSlice"

export const store = configureStore({
	reducer: {
		weather: weatherReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
})
