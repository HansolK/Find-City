import React, { Component } from "react";
import FindCity from "./FindCity.js";
import CityDetail from "./CityDetail.js"

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ""
    };
  }

  render() {
    return (
      <div>
        <div className="heading">
          <h1>City Life Finder</h1>
          <h3>Have to move to another city? But you are not sure what it is going to be linke? Simply enter the city that you want to find out!</h3>
        </div>
        <FindCity
          onSelect={url => {
            this.setState({
              url: url
            });
          }}
        />

        <CityDetail url={this.state.url} />
      </div>
    );
  }
}

export default App;
