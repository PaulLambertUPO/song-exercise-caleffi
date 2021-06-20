import './App.css';
import React from 'react';
const songApi = require('./song_api');

export default class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			defaultArtist: "Two Steps From Hell",
			currentArtist: "Two Steps From Hell",
			lastArtist: "two+steps+from+hell",
			songs: [],
			buttonDisabled: true,
			errorMessage: ""
		};
		this.changeArtist = this.changeArtist.bind(this);
		this.getNewSongsList = this.getNewSongsList.bind(this);
	}
	
	componentDidMount() {
		document.title = this.state.defaultArtist;
		songApi.getSongsList(this.state.defaultArtist, this);
	}
	
	changeArtist = function(event) {
		this.setState({
			buttonDisabled: event.target.value === "" || event.target.value.trim().replaceAll(/\s+/g, "+").toLowerCase() === this.state.lastArtist,
			currentArtist: event.target.value,
		});
	}
	
	getNewSongsList = function() {
		songApi.getSongsList(this.state.currentArtist, this);
		document.title = this.state.currentArtist;
	}
	
	render() {
		return (
			<div className="app">
				<h1 className="bigMarginTop">Welcome!</h1>
				
				<div id="welcomeSection" className="bigMarginTop">
					<p>
						With this app you can get the title, album and cover of the first 50 songs of an artist or group of your choice; the results are taken from iTunes store.
						<br />
						I have already chosen an example for you: <strong>{this.state.defaultArtist}</strong>!
					</p>
				</div>
				
				<div id="inputSection" className="bigMarginTop">
					<label htmlFor="inputArtistBox">Insert an artist/group</label>
					<br />
					<input
						id="inputArtistBox"
						className="responsiveWidth paddingInput"
						type="text"
						maxLength="60"
						placeholder={"e.g. " + this.state.defaultArtist}
						defaultValue={this.state.defaultArtist}
						onChange={this.changeArtist}
					/>
					<br />
					<button id="searchButton" className="btn btn-primary smallMarginTop" disabled={this.state.buttonDisabled} onClick={this.getNewSongsList}>Search!</button>
					<br />
					{ this.state.buttonDisabled
						? this.state.currentArtist === ""
							? <p className="disabledInfoMissingInput">No value inserted yet...</p>
							: <p className="disabledInfoSameInput">The button is disabled because it's useless to search for the same artist/group twice in a row.</p>
						: ""
					}
				</div>
				
				<div id="errorSection" className="bigMarginTop">
				{
					this.state.errorMessage
				}
				</div>
				
				<div id="messageSection" className="bigMarginTop">
				{
					this.state.songs.length > 0 ? <p>Found <strong>{this.state.songs.length}</strong> results.</p> : ""
				}
				</div>
				
				<div id="songsSection" className="bigMarginTop">
				{
					this.state.songs.map(function(item, index) {
						let key = index + 1;
						return (
							<div className="row bigMarginTop rowSeparator" key={index}>
								<div className="col-sm-4">
									<p className="categoryTitle">SONG {key}</p>
									<p>{item.trackName}</p>
								</div>
								<div className="col-sm-4">
									<p className="categoryTitle">ALBUM {key}</p>
									<p>{item.collectionName}</p>
								</div>
								<div className="col-sm-4">
									<p className="categoryTitle">COVER {key}</p>
									<p><img src={item.artworkUrl100 !== "" ? item.artworkUrl100 : "default_if_missing.jpg"} alt="missing_cover" /></p>
								</div>
							</div>
						)
					})
				}
				</div>
			</div>
		);
	}
}