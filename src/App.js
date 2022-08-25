import { Box } from "@mui/material"
import react, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { WeatherApp } from "./features/weather_app/WeatherApp"

// https://openweathermap.org/weather-conditions
function App() {
	return (
		<Box
			sx={{
				minWidth: "100vw",
				minHeight: "100vh",
			}}
		>
			<WeatherApp />
		</Box>
	)
}

export default App
