import { forEach } from 'lodash'
import Team from './Team'
import Division from './Division';
import Conference from './Conference';

class Matchup {
    conference?: Conference
    division?: Division
    home?: Team
    away?: Team
    rank?: 1 | 2

    constructor(params: { 
        conference?: Conference, 
        division?: Division, 
        home?: Team, 
        away?: Team, 
        rank?: 1 | 2 } = {}
    ) {
        forEach(params, (v: any, k: string) => {
            (this as any)[k] = v
        })
    }
}

export default Matchup
