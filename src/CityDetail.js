import React, {Component} from 'react';
import GaugeBar from './GaugeBar'
import './CityDetail.css'

class CityDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      error: false
    }
  }
  componentDidUpdate(previousProps) {
    if(previousProps.url !== this.props.url) {
      this.fetchInfo(this.props.url)
    }
  }

  fetchInfo(url) {
    this.setState({
      error: false
    })
    fetch(url)
    .then(res=>res.json())
    .then(data => {
      
      if(data._links["city:urban_area"] === undefined) {
        throw new Error("We cannot find the urban area")
      }
      this.setState({
        name: data.full_name
      })
      console.log(data)
      return fetch(`${data._links["city:urban_area"].href}scores`)
    })
    .then(res => res.json())
    .then(data => {
      this.setState({
        categories: data.categories
      })
    })
    .catch(error => {
      this.setState({
        error: true
      })
    })
  }
  
  render() {
    if(this.state.error) {
      return <p>We cannot find the urban area</p>
    }
    return (
      <div className="CityDetail">
        {this.state.categories.map((category)=> {
          return ( 
          <div>
            <div>
              <p>{category.name} {Math.round(category.score_out_of_10)}/10</p>
            </div>
            <GaugeBar 
            color={category.color}
            score={category.score_out_of_10} outOf={10}/>
            
          </div>
          )
        })}
      </div>
    )
  }
}


export default CityDetail