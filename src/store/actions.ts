import * as T from './types'
import StatsService from '../service/stats';

const statsService = new StatsService()

const request = (requestType: string) => ({
    type: T.REQUEST, requestType
})

const success = (requestType: string, payload: any) => ({
    type: T.SUCCESS, requestType, payload
})

const failure = (requestType: string, error: any) => ({
    type: T.FAILURE, requestType, error
})

export const getPlayoffMatchups = () => async (dispatch: any) => {
    const requestType = T.REQUEST_TYPE.PLAYOFF_MATCHUPS
    dispatch(request(requestType))
    try {
        const payload = await statsService.getPlayoffMatchups()
        dispatch(success(requestType, payload))
    } catch (error) {
        console.error(error)
        dispatch(failure(requestType, error))
    }
}
