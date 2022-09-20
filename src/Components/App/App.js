import logo from './logo.svg';
import './App.css';
import React from 'react';
import Playlist from '/Users/Simone Ghilotti/jamming/src/Components/Playlist/Playlist';
import SearchBar from '/Users/Simone Ghilotti/jamming/src/Components/SearchBar/SearchBar';
import SearchResults from '/Users/Simone Ghilotti/jamming/src/Components/SearchResults/SearchResults';
import Spotify from '../../util/Spotify';


export class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      SearchResults:[], 
      playlistName: "Playlist1",
       playlistTracks: []
    }
    
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      tracks.push(track);
      this.setState({playlistTracks:tracks})
    }
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks.filter(chosenTrack => chosenTrack.id !== track.id)
    this.setState({playlistTracks:tracks});

  }

  updatePlaylistName (name) {
    this.setState({playlistName:name})

  }

  savePlaylist () {

    const trackUris = this.state.playlistTracks.map(track => track.uri)
    Spotify.savePlayList(this.state.playlistName,trackUris).then(()=>{
      this.setState({
        playlistName:'New Playlist',
        playlistTracks: []
      })
    })
  }

  search (term) {
    Spotify.search(term).then(SearchResults => {
      this.setState({ SearchResults: SearchResults })
    })

  }

  render() {

    return (

        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar onSearch={this.search} />
              <div className="App-playlist">
                <SearchResults SearchResults={this.state.SearchResults} onAdd={this.addTrack}/>
                <Playlist playlistName={this.state.playlistName}
                  playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack}
                  onNamechange={this.updatePlaylistName}
                  onSave={this.savePlaylist}/>
              </div>
          </div>
        </div>
    )

  }

}

export default App;
