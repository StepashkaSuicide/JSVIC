export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'app/set-status':
            return {...state, status: action.status}
        default:
            return state
    }
}

export const setStatusAC = (status: RequestStatusType) => ({type: 'app/set-status', status} as const)

export type SetStatusType = ReturnType<typeof setStatusAC>
type ActionsType = SetStatusType