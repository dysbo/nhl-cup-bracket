import React, { Component } from 'react'
import { get, filter, forEach, toNumber } from 'lodash'
import Header from './Header'
import Bracket from './bracket/Bracket'

import * as StatsService from '../service/stats'

class App extends Component {
  state = {}

  async componentDidMount () {
    const standings = await StatsService.getRegularSeasonStandings_test()
    const playoffTeams = this.filterPlayoffTeams(standings)
    this.setState({
      playoffTeams
    })
  }

  filterPlayoffTeams (standings) {
    const playoffTeams = []

    forEach(standings, record => {
      const conference = get(record, 'conference')
      const division = get(record, 'division')
      forEach(get(record, 'teamRecords', []), team => {
        if (toNumber(get(team, 'wildCardRank', 999)) < 3) {
          playoffTeams.push({
            conference,
            division,
            team
          })
        }
      })
    })

    return playoffTeams
  }

  filterConferenceTeams (playoffTeams, conferenceId) {
    return filter(playoffTeams, team => get(team, 'conference.id', 0) === conferenceId)
  }

  render () {
    const { playoffTeams } = this.state
    return (
      <div className="container-fluid">
        <Header />
        <Bracket playoffTeams={playoffTeams} />
      </div>
    )
  }
}

export default App
