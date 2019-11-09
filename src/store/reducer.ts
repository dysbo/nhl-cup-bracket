import { without } from 'lodash'
import * as T from './types'

let pendingRequests: Array<string> = []
const INITIAL_STATE = {
    regularSeasonStandings: [],
    pendingRequests
}

type Action = {
    type: string
    requestType: string
    payload?: any
    error?: any
}

export default (state = INITIAL_STATE, action: Action): object => {
    switch (action.type) {
    case (T.REQUEST):
        pendingRequests.push(action.requestType)
        return {
            ...state,
            pendingRequests
        }
    case (T.FAILURE):
        pendingRequests = without(pendingRequests, action.requestType)
        return {
            ...state,
            pendingRequests,
            error: action.error
        }
    case (T.SUCCESS):
        pendingRequests = without(pendingRequests, action.requestType)
        switch (action.requestType) {
        case (T.REQUEST_TYPE.REGULAR_SEASON_STANDINGS):
            return {
                ...state,
                pendingRequests,
                regularSeasonStandings: action.payload
            }
        default:
            return {
                ...state,
                pendingRequests
            }
        }
    default:
        return state
    }
}
