import {TasksAssocType} from "../App";


export const TaskReducer = (state: TasksAssocType, action: tsarType): TasksAssocType => {
    switch (action.type) {
        case "remove-task": {
            // setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== id)})
            return {
                ...state,

            }
        }
        default:
            return state
    }
}


type tsarType = removeTaskACType
type removeTaskACType = ReturnType<typeof removeTaskAC>
const  removeTaskAC = (todolistID: string, id: string)=> {
    return {
        type: 'remove-task',
        payload: {todolistID, id}
    }as const
}




