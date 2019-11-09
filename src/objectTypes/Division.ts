import Conference from './Conference'

type Division = {
    id: number,
    name: string,
    nameShort: string,
    link: string,
    abbreviation: string,
    conference: Partial<Conference>,
    active: boolean
}

export default Division
