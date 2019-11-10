import { without } from 'lodash'
import * as T from './types'

let pendingRequests: Array<string> = []
const INITIAL_STATE = {
    playoffMatchups: [],
    pendingRequests
}

type Action = {
    type: string
    requestType: string
    payload?: any
    error?: any
}

export default (state = INITIAL_STATE, action: Action): object => {
    (state as any) = {
        ...state,
        requestType: action.requestType        
    }
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
        case (T.REQUEST_TYPE.PLAYOFF_MATCHUPS):
            return {
                ...state,
                pendingRequests,
                playoffMatchups: action.payload
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
