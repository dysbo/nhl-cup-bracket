import React from 'react'

class Header extends React.Component {
  state = {
    year: (new Date()).getFullYear()
  }

  render () {
    const { year } = this.state
    return (
      <div>
        <h1>{year} NHL Stanley Cup Bracket</h1>
      </div>
    )
  }
}

export default Header
