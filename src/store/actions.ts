import * as T from './types'
import StatsService from '../service/stats';

const request = (requestType: string) => ({
    type: T.REQUEST, requestType
})

const success = (requestType: string, payload: any) => ({
    type: T.SUCCESS, requestType, payload
})

const failure = (requestType: string, error: any) => ({
    type: T.FAILURE, requestType, error
})

export const getRegularSeasonStandings = () => async (dispatch: any) => {
    const requestType = T.REQUEST_TYPE.REGULAR_SEASON_STANDINGS
    dispatch(request(requestType))
    try {
        const payload = await StatsService.getRegularSeasonStandings()
        dispatch(success(requestType, payload))
    } catch (error) {
        dispatch(failure(requestType, error))
    }
}
