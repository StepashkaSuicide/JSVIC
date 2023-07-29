export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'app/set-status':
            return {...state, status: action.status}
        case "app/set-error-status":
            return {...state, error: action.error}
        default:
            return state
    }
}


export const setStatusAC = (status: RequestStatusType) => ({type: 'app/set-status', status} as const)
export const setErrorStatusAC = (error: string | null) => ({type: 'app/set-error-status', error} as const)

export type SetStatusType = ReturnType<typeof setStatusAC>
export type setErrorStatusType = ReturnType<typeof setErrorStatusAC>
type ActionsType = SetStatusType | setErrorStatusType