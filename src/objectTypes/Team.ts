import Division from './Division';
import Conference from './Conference';

type Team = {
    id: number,
    name: string,
    link: string,
    venue: any,
    abbreviation: string,
    teamName: string,
    locationName: string,
    firstYearOfPlay: string,
    division: Partial<Division>,
    conference: Partial<Conference>,
    franchise: any,
    shortName: string,
    officialSiteUrl: string,
    franchiseId: number,
    active: boolean
}

export default Team
