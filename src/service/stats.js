import { get } from 'axios'
import { get as _get } from 'lodash'

import conferences from '../data/conferences'
import divisions from '../data/divisions'
import teams from '../data/teams'
import testRegularSeasonStandings from '../data/testRegularSeasonStandings'

const BASE_URL = 'https://statsapi.web.nhl.com/api/v1'

// export const getTeams = async () => {
//   const result = await get(`${BASE_URL}/teams`)
//   return _get(result, 'data.teams')
// }
//
// export const getDivisions = async () => {
//   const result = await get(`${BASE_URL}/divisions`)
//   return _get(result, 'data.divisions')
// }
//
// export const getConferences = async () => {
//   const result = await get(`${BASE_URL}/conferences`)
//   return _get(result, 'data.conferences')
// }

export const getConferences = () => conferences

export const getDivisions = () => divisions

export const getTeams = () => teams

export const getRegularSeasonStandings = async () => {
  const result = await get(`${BASE_URL}/standings/regularSeason`)
  return _get(result, 'data.records', [])
}

export const getRegularSeasonStandings_test = () => testRegularSeasonStandings
