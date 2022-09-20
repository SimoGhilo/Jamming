import React from "react";
import { ReactDOM } from "react-dom";
import Tracklist from '/Users/Simone Ghilotti/jamming/src/Components/Tracklist/Tracklist';
import './Playlist.css';

export class Playlist extends React.Component {
    constructor(props){
        super(props)
        this.handleNameChange = this.handleNameChange.bind(this)

    }
    


    handleNameChange(e) {
        this.props.onNameChange(e.target.value)
    }

    render(){

        return(

            <div className="Playlist">
                <input defaultValue={"New Playlist"} onChange={this.handleNameChange}/>
                <Tracklist tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true} />
                <button class="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>

        )

    }
}