import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
	isLoading: false,
	weatherData: [],
	currentCity: "",
	initialCity: "",
	RANDOM_CITIES_LIST: {
		pl: [
			"londyn",
			"wisła",
			"bijeljina",
			"banja luka",
			"warszawa",
			"belgrad",
			"budapeszt",
			"lipinki łużyckie",
			"čavoglave",
			"helena",
			"mostar",
			"sarajewo",
			"vukovar",
			"ateny",
			"aleksandria",
			"brela",
			"dubrovnik",
			"herceg novi",
			"dover",
			"dublin",
			"katmandu",
			"dubaj",
			"montevideo",
			"lima",
			"santiago",
			"ostrawa",
			"winchester",
			"stavanger",
			"brczko",
			"montereal",
			"kraków",
			"katowice",
			"sparta,gr",
			"derry",
		],
	},
	weatherTypesData: [],
	isAdditionalInfoDialogOpen: false,
	isDataFetched: false,
	errorData: null,
}

export const fetchWeatherData = createAsyncThunk(
	"weather/fetchWeatherData",
	async URL => {
		const res = await axios.get(URL)
		return res.data
	}
)

const weatherSlice = createSlice({
	name: "weather",
	initialState,
	reducers: {
		selectInitialCity: state => {
			const randomCityIndex = Math.floor(
				Math.random() * state.RANDOM_CITIES_LIST.pl.length
			)
			state.initialCity = state.RANDOM_CITIES_LIST.pl[randomCityIndex]
		},
		openAdditionalInfoDialog: state => {
			state.isAdditionalInfoDialogOpen = true
		},
		closeAdditionalInfoDialog: state => {
			state.isAdditionalInfoDialogOpen = false
		},
		updateUserCurrentCity: (state, action) => {
			state.currentCity = action.payload.e.target.value
		},
		clearCurrentCity: state => {
			state.currentCity = ""
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchWeatherData.pending, state => {
			state.isLoading = true
		})
		builder.addCase(fetchWeatherData.fulfilled, (state, action) => {
			state.isLoading = false
			state.isDataFetched = true
			state.weatherData = action.payload
			state.error = ""
			state.errorData = null
		})
		builder.addCase(fetchWeatherData.rejected, (state, action) => {
			state.isLoading = false
			state.error = action.error.message
			state.errorData = action.error
		})
	},
})
export const {
	selectInitialCity,
	openAdditionalInfoDialog,
	closeAdditionalInfoDialog,
	updateUserCurrentCity,
	clearCurrentCity,
} = weatherSlice.actions
export default weatherSlice.reducer
