import Conference from "./Conference";
import Division from "./Division";
import TeamRecord from "./TeamRecord";

type RegularSeasonStanding = {
    standingsType: 'regularSeason'
    league: any
    division: Partial<Division>
    conference: Partial<Conference>
    teamRecords: Array<TeamRecord>
}

export default RegularSeasonStanding
