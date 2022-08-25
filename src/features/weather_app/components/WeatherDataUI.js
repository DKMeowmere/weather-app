import { Box, Typography, Stack, IconButton, Tooltip } from "@mui/material"
import { Info as InfoIcon } from "@mui/icons-material"
import React, { useEffect } from "react"
import { AdditionalInfoDialog } from "./AdditionalInfoDialog"
import { useDispatch, useSelector } from "react-redux"
import { openAdditionalInfoDialog } from "../weatherAppDataSlice"

export const WeatherDataUI = () => {
	const dispatch = useDispatch()
	const weatherData = useSelector(state => state.weather.weatherData)
	const styles = theme => ({
		containerBox: {
			backgroundImage: `url(https://c1702cd1-4bd8-4c4c-8a01-e9e79c14.netlify.app/${weatherData.weather[0].main.toLowerCase()}.jpg)`,
			backgroundPosition: "center",
			width: "80%",
			[theme.breakpoints.down("md")]: {
				width: "100%",
			},
			height: "100%",
			backgroundSize: "cover",
			filter: "brightness(100%)",
			borderRadius: "20px",
		},
	})
	return (
		<Box
			sx={theme => ({
				backgroundImage: `url(https://c1702cd1-4bd8-4c4c-8a01-e9e79c14.netlify.app/${weatherData.weather[0].main.toLowerCase()}.jpg)`,
				backgroundPosition: "center",
				width: "80%",
				[theme.breakpoints.down("md")]: {
					width: "95%",
				},
				height: "100%",
				backgroundSize: "cover",
				filter: "brightness(100%)",
				borderRadius: "20px",
			})}
		>
			<Box
				sx={{
					opacity: ".5",
					position: "absolute",
					bottom: "0",
					left: "0",
					width: "100%",
					background: "#000",
					height: "60px",
					borderRadius: "0 0 20px 20px",
				}}
			/>
			<Box
				sx={{
					width: "100%",
					height: "60px",
					position: "absolute",
					bottom: "0",
					left: "0",
				}}
			>
				<Stack direction="row" padding="0 20px">
					<img
						src={
							weatherData.weather &&
							`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
						}
						alt="weather type icon"
						style={{ height: "60px", width: "60px" }}
					/>
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<Typography
							variant="h2"
							sx={{
								margin: "0",
								fontSize: "24px",
								color: "#fff",
								fontWeight: "700",
							}}
						>
							{weatherData.name} -{" "}
							{weatherData.weather &&
								weatherData.weather[0].description}
						</Typography>
					</Box>
					<Tooltip title="Dodatkowe informacje">
						<IconButton
							onClick={() => {
								dispatch(openAdditionalInfoDialog())
							}}
							size="large"
							sx={{ color: "#fff", margin: "0 0px 0 auto" }}
							aria-label="additional information"
						>
							<InfoIcon />
						</IconButton>
					</Tooltip>
				</Stack>
			</Box>
			{weatherData.main && weatherData.wind && weatherData && (
				<AdditionalInfoDialog />
			)}
		</Box>
	)
}
