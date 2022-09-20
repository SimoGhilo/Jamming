import React from "react";
import { ReactDOM } from "react-dom";
import Tracklist from '/Users/Simone Ghilotti/jamming/src/Components/Tracklist/Tracklist';
import 'SearchResults.css';

export class SearchResults extends React.Component {

        
    render() {
        
        return(
            <div className="SearchResults">
                <h2>Results</h2>
                <Tracklist tracks={this.props.SearchResults} onAdd={this.props.onAdd} isRemoval={false}/>
            </div>
        )
    }

}