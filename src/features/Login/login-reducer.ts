import {Dispatch} from "redux";
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {authAPI, AuthLogin} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState = {
    isLoggedIn: false
}

type InitialStateType = typeof initialState

export const loginReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'is-logged-in': {
            return {...state, isLoggedIn: action.value}
        }
        default:
            return state
    }
}

export const loginAC = (value: boolean) => ({type: 'is-logged-in', value} as const)

export const loginTC = (data: AuthLogin) => async (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0 ) {
            dispatch(loginAC(true))
            dispatch(setAppStatusAC('succeeded'))
        }else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        const error = e as {message: string}
        handleServerNetworkError(error, dispatch)
    }
}
export const meTC = () => async (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0 ) {
            dispatch(loginAC(true))
            dispatch(setAppStatusAC('succeeded'))
        }else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        const error = e as {message: string}
        handleServerNetworkError(error, dispatch)
    }
}

export const logOutTC = () => async (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.logOut()
        if (res.data.resultCode === 0 ) {
            dispatch(loginAC(false))
            dispatch(setAppStatusAC('succeeded'))
        }else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        const error = e as {message: string}
        handleServerNetworkError(error, dispatch)
    }
}

type ActionType = ReturnType<typeof loginAC>  | SetAppStatusActionType | SetAppErrorActionType


