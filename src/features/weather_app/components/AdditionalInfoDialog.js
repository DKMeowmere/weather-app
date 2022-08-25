import {
	Dialog,
	DialogTitle,
	Typography,
	Stack,
	DialogContent,
} from "@mui/material"
import {
	Thermostat as ThermostatIcon,
	ColorizeRounded as ColorizeRoundedIcon,
	Air as AirIcon,
	Compress as CompressIcon,
} from "@mui/icons-material"
import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { closeAdditionalInfoDialog } from "../weatherAppDataSlice"

export const AdditionalInfoDialog = () => {
	const dispatch = useDispatch()
	const weatherData = useSelector(state => state.weather.weatherData)
	const isAdditionalInfoDialogOpen = useSelector(
		state => state.weather.isAdditionalInfoDialogOpen
	)

	return (
		<Dialog
			onClose={() => {
				dispatch(closeAdditionalInfoDialog())
			}}
			open={isAdditionalInfoDialogOpen}
		>
			<DialogTitle>
				Dodatkowe informacje o pogodzie w: {weatherData.name}
			</DialogTitle>
			<DialogContent dividers>
				<Stack direction="row" spacing="5px">
					<ThermostatIcon />
					<Typography variant="body1">
						Temperatura: {Math.round(weatherData.main.temp)} °C
					</Typography>
				</Stack>
				<Stack direction="row" spacing="5px">
					<CompressIcon />
					<Typography variant="body1">
						Ciśnienie: {weatherData.main.pressure}hPa
					</Typography>
				</Stack>
				<Stack direction="row" spacing="5px">
					<AirIcon />
					<Typography variant="body1">
						Predkość wiatru: {weatherData.wind.speed} m/s ||{" "}
						{Math.round(weatherData.wind.speed * 36)/10} km/s
					</Typography>
				</Stack>
				<Stack direction="row" spacing="5px">
					<ColorizeRoundedIcon />
					<Typography variant="body1">
						Wilgotność: {weatherData.main.humidity}%
					</Typography>
				</Stack>
			</DialogContent>
		</Dialog>
	)
}
