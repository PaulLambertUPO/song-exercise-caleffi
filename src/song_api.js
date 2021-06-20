/*
- for reference, see https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/
- query params needed are: "term" for the artist, "entity" for the type of result and "limit" for the maximum number of results
- the artist for "term" is dynamic based on the value inserted in the textbox, "entity" is static with value "song"
- use static value "50" for "limit" (now it is not truly necessary because the documentation specifies that it's the default value, but it might change in the future)
- the response contains a list field called "results"
- to avoid React code duplication, it's better to use setState here
*/
const axiosModule = require("axios");

module.exports.getSongsList = (artist, reactCaller) => {
	if (artist && artist !== "") {
		let artistQueryParam = artist.trim().replaceAll(/\s+/g, "+").toLowerCase();
		axiosModule.get(
			`https://itunes.apple.com/search?term=${artistQueryParam}&entity=song&limit=50`
		).then((response) => {
			//console.log("results", response.data.results);
			reactCaller.setState({
				songs: response.data.results,
				lastArtist: artistQueryParam,
				buttonDisabled: true,
				errorMessage: response.data.results.length === 0 ? 'No songs found for "' + artist + '", try with another one.' : ""
			});
		}).catch((error) => {
			console.error("error during axios call:", error);
			//in this case the button is not disabled because it might be a connection/server problem and the value inserted might be correct
			//lastArtist is refreshed to allow the user to insert the same artist to try again
			reactCaller.setState({
				songs: [],
				lastArtist: "",
				buttonDisabled: false,
				errorMessage: "Something went wrong :( try with another artist/group, check your connection or retry later."
			});
		});
	}
	else {
		reactCaller.setState({
			buttonDisabled: true,
			errorMessage: "You forgot to insert the artist/group."
		});
	}
};