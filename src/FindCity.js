import React, { Component } from "react";
import "./FindCity.css";

class FindCity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      cities: [],
    };
  }

  GetCity(url) {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({
          cities: data._embedded["city:search-results"]
        });
        return data._embedded["city:search-results"];
      });
  }

  render() {
    return (
      <div className="findCity">
        <form
          className="findCity_form"
          onSubmit={e => {
            e.preventDefault();
            if(this.state.cities.length === 0) {
              return
            }
            this.props.onSelect(this.state.cities[0]._links["city:item"].href)
              this.setState({
                cities: [],
                input: this.state.cities[0].matching_full_name
              });
          }}
        >
          <input
            value={this.state.input}
            onChange={event => {
              this.setState({
                input: event.target.value
              });
              this.GetCity(
                `https://api.teleport.org/api/cities/?search=${event.target.value}`
              );
            }}
            type="text"
          />
        </form>
        {this.state.cities.length > 0 && (
          <div className="list_container">
            <ul>
              {this.state.cities.map(city => {
                return (
                  <li
                    onClick={e => {
                      this.props.onSelect(city._links["city:item"].href)
                      this.setState({
                        cities: [],
                        input: city.matching_full_name
                      });
                    }}
                  >
                    {city.matching_full_name}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default FindCity;
