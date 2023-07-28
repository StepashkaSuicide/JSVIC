import {TasksStateType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType, setTotdolistsType} from './todolists-reducer';
import {TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";



const initialState: TasksStateType = {
    /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        }
        case 'SET_TODOLISTS': {
            const copyState = {...state}
            action.todos.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.todolistID]: [action.task, ...state[action.todolistID]]
            }
        }
        case 'CHANGE-TASK-STATUS': {

            return {
                ...state, [action.todolistId]: state[action.todolistId].map(t=> t.id ===action.taskId ? {...t, status: action.status}: t)
            }
       }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(t=>t.id ===action.taskId ? {...t, title: action.title}: t)
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case "SET_TASKS": {
            return {
                ...state,
                [action.todoID]: action.tasks
            }
        }
        default:
            return state;
    }
}


export const getTasksTC = (todoID: string) => (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todoID)
        .then((res) => {
            dispatch(setTasksAC(res.data.items, todoID))
        })
}

export const deleteTasksTC = (todoID: string, taskID: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todoID, taskID)
        .then((res) => {
            dispatch(removeTaskAC(taskID, todoID))
        })
}

export const createTaskTC = (todoID: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTask(todoID, title)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item, todoID))
        })
}


export const changeTaskStatusTC = (taskID: string, status: TaskStatuses, todoID: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todoID].find(t => t.id === taskID)

    if (task) {
        const model: UpdateTaskModelType = {
            title: task.title,
            startDate: task.startDate,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            status
        }
        todolistsAPI.updateTask(todoID, taskID, model)
            .then((res) => {
                dispatch(changeTaskStatusAC(taskID, status, todoID))
            })
    }
}
export const setTasksAC = (tasks: TaskType[], todoID: string) => {
    return {type: 'SET_TASKS', tasks, todoID} as const
}


export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskType, todolistID: string): AddTaskActionType => {
    return {type: 'ADD-TASK', task, todolistID}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}

//types
export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
    todolistID: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    taskId: string
    status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | ReturnType<typeof setTasksAC>
    | setTotdolistsType