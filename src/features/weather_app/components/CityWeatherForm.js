import React from "react"
import { TextField, Button, InputAdornment } from "@mui/material"
import { Done as DoneIcon } from "@mui/icons-material"
import {
	updateUserCurrentCity,
	fetchWeatherData,
	clearCurrentCity,
} from "../weatherAppDataSlice"
import { useDispatch, useSelector } from "react-redux"
import { WEATHER_API_KEY } from "../../../API_KEYS"

export const CityWeatherForm = () => {
	const dispatch = useDispatch()
	const currentCity = useSelector(state => state.weather.currentCity)
	const errorData = useSelector(state => state.weather.errorData)

	return (
		<TextField
			id="city-name-input"
			label="Wpisz nazwę miasta"
			variant="outlined"
			color={errorData ? "error" : "success"}
			value={currentCity}
			sx={{
				margin: "auto",
				width: "90%",
				maxWidth: "500px",
			}}
			onChange={e => dispatch(updateUserCurrentCity({ e }))}
			helperText={
				errorData
					? `Zła nazwa miasta lub inny problem. ${errorData.message}`
					: " "
			}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<Button
							color={errorData ? "error" : "success"}
							variant="contained"
							startIcon={<DoneIcon />}
							onClick={() => {
								if (!currentCity) return
								dispatch(
									fetchWeatherData(
										`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${WEATHER_API_KEY}&lang=pl&units=metric`
									)
								)
								dispatch(clearCurrentCity())
							}}
						>
							Zatwierdź
						</Button>
					</InputAdornment>
				),
			}}
		/>
	)
}
