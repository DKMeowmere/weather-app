import { Box } from "@mui/material"
import { useMemo } from "react"
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api"
import { useSelector } from "react-redux"
import { MAP_API_KEY } from "../../../API_KEYS"

export default function Home() {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: MAP_API_KEY,
	})

	if (!isLoaded) return <div>loading...</div>
	return <Map />
}

function Map() {
	const coord = useSelector(state => state.weather.weatherData.coord)

	const center = useMemo(() => {
		return {
			lat: coord.lat,
			lng: coord.lon,
		}
	}, [coord])

	return (
		<GoogleMap zoom={12} center={center}>
			<Box sx={{ height: "500px", width: "95%" }}>
				<MarkerF position={center} />
			</Box>
		</GoogleMap>
	)
}
