import axios from 'axios'
import { get } from 'lodash'
import Conference from '../objectTypes/Conference'
import Division from '../objectTypes/Division'
import Team from '../objectTypes/Team'
import RegularSeasonStanding from '../objectTypes/RegularSeasonStanding';
// import conferences from '../data/conferences'
// import divisions from '../data/divisions'
// import teams from '../data/teams'
// import testRegularSeasonStandings from '../data/testRegularSeasonStandings'

export default class StatsService {
  private static BASE_URL = 'https://statsapi.web.nhl.com/api/v1'
  
  static async getConferences (): Promise<Array<Conference>> {
    const result = await axios.get(`${StatsService.BASE_URL}/conferences`)
    return get(result, 'data.conferences')
  }
  
  static async getDivisions (): Promise<Array<Division>> {
    const result = await axios.get(`${StatsService.BASE_URL}/divisions`)
    return get(result, 'data.divisions')
  }

  static async getTeams (): Promise<Array<Team>> {
    const result = await axios.get(`${StatsService.BASE_URL}/teams`)
    return get(result, 'data.teams')
  }

  static async getRegularSeasonStandings (): Promise<Array<RegularSeasonStanding>> {
    const result = await axios.get(`${StatsService.BASE_URL}/standings/regularSeason`)
    return get(result, 'data.records', [])
  }
}

// export const getConferences = (): [Conference] => conferences as [Conference]

// export const getDivisions = (): [Division] => divisions as [Division]

// export const getTeams = (): [Team] => teams as [Team]

// export const getRegularSeasonStandings_test = () => testRegularSeasonStandings
