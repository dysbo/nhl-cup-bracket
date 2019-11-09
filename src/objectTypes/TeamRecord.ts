import Team from './Team'

type TeamRecord = {
    team: Partial<Team>
    leagueRecord: any
    divisionRank: string
    conferenceRank: string
    leagueRank: string
    wildCardRank: string
    lastUpdated: string
}

export default TeamRecord
