import React from "react";
import { ReactDOM } from "react-dom";
import './SearchBar.css';

export class SearchBar extends React.Component {
    constructor(props){
        super(props)
        this.search = this.search.bind(this)
        this.handleTermChange = this.handleTermChange.bind(this)
        this.state = {
            term: ''
        }
    }

    handleTermChange (e) {
        this.setState({term: e.target.value});

    }

    search(){
        this.props.onSearch(this.state.term)
    }

    render() {

        return(
            <div class="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
                <button className="SearchButton">SEARCH</button>
            </div>
        )
    }
}