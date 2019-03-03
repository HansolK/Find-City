import React, { Component } from 'react';
import './GaugeBar.css'

const GaugeBar=(props)=> {
  const percentage = props.score / props.outOf * 100
  return (
    <div className="bar">
      <div 
      className="innerbar"
      style={{
        width: `${percentage}%`,
        backgroundColor: props.color
      }}>
      </div>
    </div>
  )
}

export default GaugeBar