import React from "react";
import { ReactDOM } from "react-dom";
import './Track.css';


export class Track extends React.Component {

    constructor(props){
        super(props)
        this.addTrack = this.addTrack.bind(this)
        this.removeTrack = this.removeTrack.bind(this)
    }

    renderAction () {


        if (this.props.isRemoval) {
            
            <button onClick={this.removeTrack}>-</button>

        } else {

            <button onClick={this.addTrack}>+</button>

        }
        
    }

    addTrack() {

        this.props.onAdd(this.props.track)
    }

    removeTrack () {

        this.props.onRemove(this.props.track)
    }

    render(){

        return(

            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} , {this.props.track.artist}</p>
                </div>
                <button className="Track-action">+ or - will go here</button>
            </div>
        )
    }
}