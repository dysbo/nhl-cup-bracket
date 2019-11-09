import React, { Component, ReactElement } from 'react'
import { connect } from 'react-redux'
import * as actions from '../store/actions'
import RegularSeasonStanding from '../objectTypes/RegularSeasonStanding';

type propTypes = {
  getRegularSeasonStandings: any
  regularSeasonStandings: Array<RegularSeasonStanding>
}

class App extends Component {
  componentDidMount (): void {
    // TODO: This is really annoying.  Figure out how to not need this anymore.
    (this.props as propTypes).getRegularSeasonStandings()
  }

  render (): ReactElement {
    const { regularSeasonStandings } = (this.props as propTypes)
    console.log(regularSeasonStandings)
    return (
      <div className="container-fluid">
        Hello
      </div>
    )
  }
}

const mapStateToProps = (state: any) => state
const mapDispatchToProps = (dispatch: any) => ({
  getRegularSeasonStandings: () => dispatch(actions.getRegularSeasonStandings())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
