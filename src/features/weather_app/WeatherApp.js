import { Backdrop, CircularProgress, Stack } from "@mui/material"
import React, { useEffect } from "react"
import { CityWeatherForm } from "./components/CityWeatherForm"
import { WeatherDataUI } from "./components/WeatherDataUI"
import { useDispatch, useSelector } from "react-redux"
import { selectInitialCity, fetchWeatherData } from "./weatherAppDataSlice"
import { WEATHER_API_KEY } from "../../API_KEYS"
import Map from "./components/Map"

export const WeatherApp = () => {
	const isLoading = useSelector(state => state.weather.isLoading)
	const isDataFetched = useSelector(state => state.weather.isDataFetched)
	const weatherData = useSelector(state => state.weather.weatherData)
	const initialCity = useSelector(state => state.weather.initialCity)

	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(selectInitialCity())
		dispatch(
			fetchWeatherData(
				`https://api.openweathermap.org/data/2.5/weather?q=${initialCity}&appid=${WEATHER_API_KEY}&lang=pl&units=metric`
			)
		)
	}, [initialCity])
	return (
		<>
			<Stack
				pt={15}
				pb={5}
				px={5}
				spacing={4}
				sx={theme => ({
					padading: "120px 40px 40px 40px",
					[theme.breakpoints.down("md")]: {
						padding: "120px 0 40px 0",
					},
					display: "flex",
					justifyContent: "center",
				})}
			>
				<CityWeatherForm />
				<Stack
					direction="row"
					sx={{
						width: "100%",
						height: "500px",
						display: "flex",
						justifyContent: "center",
					}}
				>
					{isDataFetched && weatherData && <WeatherDataUI />}
				</Stack>
				{weatherData && <Map />}
			</Stack>
			<Backdrop open={isLoading} sx={{ color: "#fff", margin: "0" }}>
				<CircularProgress color="inherit" />
			</Backdrop>
		</>
	)
}
