import axios from 'axios'
import { find, forEach, get, groupBy, toNumber } from 'lodash'
import Conference from '../objectTypes/Conference'
import Division from '../objectTypes/Division'
import Matchup from '../objectTypes/Matchup'
import Team from '../objectTypes/Team'
import RegularSeasonStanding from '../objectTypes/RegularSeasonStanding'

export default class StatsService {
  private readonly BASE_URL = 'https://statsapi.web.nhl.com/api/v1'
  private conferences: Array<Conference> = []
  private divisions: Array<Division> = []
  private regularSeasonStandings: Array<RegularSeasonStanding> = []
  private teams: Array<Team> = []

  private async init() {
    if (!this.conferences.length) {
      this.conferences = await this.getConferences()
    }

    if (!this.divisions.length) {
      this.divisions = await this.getDivisions()
    }

    if (!this.regularSeasonStandings.length) {
      this.regularSeasonStandings = await this.getRegularSeasonStandings()
    }

    if (!this.teams.length) {
      this.teams = await this.getTeams()
    }
  }

  private getPlayoffTeamRecords (): Array<any> {
    const records: any = []

    forEach(this.regularSeasonStandings, rss => {
      forEach(rss.teamRecords, tr => {
        const teamId = tr.team.id
        const conferenceId = rss.conference.id
        const divisionId = rss.division.id
        const conferenceRank = toNumber(tr.conferenceRank)
        const divisionRank = toNumber(tr.divisionRank)
        const wildCardRank = toNumber(tr.wildCardRank)

        if (wildCardRank > 2) return

        const record = {
          teamId,
          conferenceId,
          divisionId,
          conferenceRank,
          divisionRank,
          wildCardRank
        }

        records.push(record)
      })
    })

    return records
  }

  async getPlayoffMatchups (): Promise<Array<Matchup>> {
    await this.init()
    // matchups variable
    const matchups: Array<Matchup> = []

    // get the standings for playoff contenders
    const playoffTeamRecords = this.getPlayoffTeamRecords()

    // group 'em by conference
    const groupedTeamRecordsByConference = groupBy(playoffTeamRecords as any, 'conferenceId')

    // for each conference, grab the matchups
    forEach(groupedTeamRecordsByConference, (gtrbc: any, conferenceKey: string) => {
      const groupedTeamRecordsByDivision = groupBy(gtrbc as any, 'divisionId')

      forEach(groupedTeamRecordsByDivision, (gtrbd: any, divisionKey: string) => {
        const team1 = find(gtrbd, t => t.divisionRank === 1)
        const team2 = find(gtrbd, t => t.divisionRank === 2)
        const team3 = find(gtrbd, t => t.divisionRank === 3)

        const conference: Conference | any = find(this.conferences, c => c.id === toNumber(conferenceKey))
        const division: Division | any = find(this.divisions, d => d.id === toNumber(divisionKey))

        const otherTeam1 = find(gtrbc, thing => thing.divisionId !== division.id && thing.divisionRank === 1)
        const isThisTeamBetter = team1.conferenceRank > otherTeam1.conferenceRank

        const team4 = find(gtrbc, t => t.wildCardRank === (isThisTeamBetter ? 2 : 1))
        
        const firstMatchup = new Matchup({
          conference,
          division,
          rank: 1,
          home: this.getTeamById(team1.teamId),
          away: this.getTeamById(team4.teamId)
        })
        
        const secondMatchup = new Matchup({
          conference,
          division,
          rank: 2,
          home: this.getTeamById(team2.teamId),
          away: this.getTeamById(team3.teamId)
        })

        matchups.push(firstMatchup, secondMatchup)
      })
    })

    return matchups
  }

  private getTeamById (id: number): Team {
    return find(this.teams, t => t.id === id) as Team
  }
  
  private async getConferences (): Promise<Array<Conference>> {
    const result = await axios.get(`${this.BASE_URL}/conferences`)
    return get(result, 'data.conferences')
  }
  
  private async getDivisions (): Promise<Array<Division>> {
    const result = await axios.get(`${this.BASE_URL}/divisions`)
    return get(result, 'data.divisions')
  }

  private async getTeams (): Promise<Array<Team>> {
    const result = await axios.get(`${this.BASE_URL}/teams`)
    return get(result, 'data.teams')
  }

  private async getRegularSeasonStandings (): Promise<Array<RegularSeasonStanding>> {
    const result = await axios.get(`${this.BASE_URL}/standings/regularSeason`)
    return get(result, 'data.records', [])
  }
}

// export const getConferences = (): [Conference] => conferences as [Conference]

// export const getDivisions = (): [Division] => divisions as [Division]

// export const getTeams = (): [Team] => teams as [Team]

// export const getRegularSeasonStandings_test = () => testRegularSeasonStandings
