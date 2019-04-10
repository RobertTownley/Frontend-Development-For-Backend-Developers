import React from 'react'

export default class NextButton extends React.Component {
  constructor(props){ 
    super(props)
    this.state = {start: new Date()}
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    var secondsSince = (new Date() - this.start) / 1000
    if(secondsSince > 10) {
      window.location.reload()
    } else {
      alert("Think about the current quote before asking for another!")
    }
  }
  render() {
    return (
      <button onClick={this.handleClick}>
        <img src='/static/cowboy.svg' />
        <span>Gimme Another</span>
      </button>
    )
  }
}
