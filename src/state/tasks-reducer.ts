import {TasksStateType} from '../App';
import {v1} from "uuid";

type RemoveTaskACType = ReturnType<typeof RemoveTaskAC>
type AddTaskACType = ReturnType<typeof AddTaskAC>
type ChangeTaskStatusACType = ReturnType<typeof ChangeTaskAC>
type ChangeTaskTitleACType = ReturnType<typeof ChangeTaskTitleAC>

type ActionsType = AddTaskACType | RemoveTaskACType | ChangeTaskStatusACType | ChangeTaskTitleACType


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
        case 'CHANGE-TITLE': {

            return {
                ...state,
                [action.payload.todolistID]:state[action.payload.todolistID].map(t=>t.id ===action.payload.taskID ? {...t, title: action.payload.title}:t)
            }
        }

        default:
            throw new Error("I don't understand this type")
    }
}

export const RemoveTaskAC = (id: string, todolistID: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {id, todolistID}
    } as const
}

export const AddTaskAC = (title: string, todolistID: string) => {
    return {
        type: 'ADD-TASK',
        payload: {title, todolistID}
    } as const
}

export const ChangeTaskAC = (taskID: string, todolistID: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK',
        payload: {taskID, todolistID, isDone}
    } as const
}

export const ChangeTaskTitleAC = (taskID: string, todolistID: string, title: string) => {
    return {
        type: 'CHANGE-TITLE',
        payload: {taskID, todolistID, title}
    } as const
}
