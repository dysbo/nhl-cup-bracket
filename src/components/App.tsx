import React, { Component, ReactElement } from 'react'
import { connect } from 'react-redux'
import * as actions from '../store/actions'
import RegularSeasonStanding from '../objectTypes/RegularSeasonStanding';

type propTypes = {
  getPlayoffMatchups: any
  playoffMatchups: Array<RegularSeasonStanding>
}

class App extends Component {
  componentDidMount (): void {
    // TODO: This is really annoying.  Figure out how to not need this anymore.
    (this.props as propTypes).getPlayoffMatchups()
  }

  render (): ReactElement {
    const { playoffMatchups } = (this.props as propTypes)
    console.log(playoffMatchups)
    return (
      <div className="container-fluid">
        Hello
      </div>
    )
  }
}

const mapStateToProps = (state: any) => state
const mapDispatchToProps = (dispatch: any) => ({
  getPlayoffMatchups: () => dispatch(actions.getPlayoffMatchups())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
