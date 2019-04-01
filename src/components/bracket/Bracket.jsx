import React from 'react'
import PropTypes from 'prop-types'
import { concat, forIn, get, groupBy, isEqual, map } from 'lodash'

class Bracket extends React.Component {
  state = {}

  componentDidMount () {
    const { playoffTeams } = this.props
    this.calculateMatchups(playoffTeams)
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    const { playoffTeams } = this.props
    if (!isEqual(playoffTeams, prevProps.playoffTeams)) {
      this.calculateMatchups(playoffTeams)
    }
  }

  calculateMatchups (playoffTeams) {
    const conferencePlayoffTeams = groupBy(playoffTeams, 'conference.name')
    forIn(conferencePlayoffTeams, c => this.calculateConferenceMatchups(c))
  }

  calculateConferenceMatchups (conferencePlayoffTeams) {
    const divisionPlayoffTeams = groupBy(conferencePlayoffTeams, 'division.name')

  }

  render () {
    return (
      <div className="row">
        hi
      </div>
    )
  }
}

Bracket.propTypes = {
  playoffTeams: PropTypes.arrayOf(PropTypes.shape()).isRequired
}

Bracket.defaultProps = {
  playoffTeams: []
}

export default Bracket
