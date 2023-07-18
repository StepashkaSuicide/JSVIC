import {TasksStateType} from '../App';
import {v1} from "uuid";


type ActionsType = AddTaskACType | RemoveTaskAC | ChangeTaskStatusAC


export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].filter(t => t.id !== action.payload.id)
            }
        }
        case 'ADD-TASK': {

            return {
                ...state,
                [action.payload.todolistID]: [{id: v1(), title: action.payload.title, isDone: false}, ...state[action.payload.todolistID]]
            }
        }
        case 'CHANGE-TASK': {

            return {
                ...state,
                [action.payload.todolistID]:state[action.payload.todolistID].map(t=>t.id ===action.payload.taskID ? {...t, isDone: action.payload.isDone}:t)
            }
        }
        default:
            throw new Error("I don't understand this type")
    }
}
type RemoveTaskAC = ReturnType<typeof RemoveTaskAC>
export const RemoveTaskAC = (id: string, todolistID: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {id, todolistID}
    } as const
}

type AddTaskACType = ReturnType<typeof AddTaskAC>
export const AddTaskAC = (title: string, todolistID: string) => {
    return {
        type: 'ADD-TASK',
        payload: {title, todolistID}
    } as const
}
type ChangeTaskStatusAC = ReturnType<typeof ChangeTaskAC>
export const ChangeTaskAC = (taskID: string, todolistID: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK',
        payload: {taskID, todolistID, isDone}
    } as const
}
