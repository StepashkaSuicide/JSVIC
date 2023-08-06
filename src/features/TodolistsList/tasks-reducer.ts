import {
  TaskAddArgType,
  TaskPriorities,
  TaskStatuses,
  TaskType,
  todolistsAPI, UpdateTaskArgType,
  UpdateTaskModelType
} from 'api/todolists-api'
import { Dispatch } from 'redux'
import { AppRootStateType, AppThunk } from 'app/store'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import { appActions } from 'app/app-reducer'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { todolistActions } from 'features/TodolistsList/todolists-reducer'
import { createAppAsyncThunk } from 'utils/create-app-async-thunk'

const initialState: TasksStateType = {}


const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    removeTask: (state, action: PayloadAction<{ todolistId: string, taskId: string }>) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex(todo => todo.id === action.payload.taskId)
      if (index !== -1) tasks.splice(index, 1)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.task.todoListId]
        tasks.unshift(action.payload.task)
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex(t => t.id === action.payload.taskId)
        if (index !== -1) tasks[index] = { ...tasks[index], ...action.payload.domainModel }
      })
      .addCase(todolistActions.addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(todolistActions.removeTodolist, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(todolistActions.setTodolists, (state, action) => {
        action.payload.todolists.forEach(tl => {
          state[tl.id] = []
        })
      })
  }
})

// thunks
const fetchTasks = createAppAsyncThunk<{ tasks: TaskType[], todolistId: string }, string>('tasks/fetchTasks',
  async (todolistId, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(appActions.setAppStatus({ status: 'loading' }))
      const res = await todolistsAPI.getTasks(todolistId)
      const tasks = res.data.items
      dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      return { tasks, todolistId }
    } catch (e: any) {
      handleServerNetworkError(e, dispatch)
      return rejectWithValue(null)
    }
  }
)


export const addTask = createAppAsyncThunk<{ task: TaskType }, TaskAddArgType>('tasks/addTask',
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(appActions.setAppStatus({ status: 'loading' }))
      const res = await todolistsAPI.createTask(arg)
      if (res.data.resultCode === 0) {
        const task = res.data.data.item
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        return { task }
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      return rejectWithValue(null)
    }
  }
)

const updateTask = createAppAsyncThunk<UpdateTaskArgType, UpdateTaskArgType>('tasks/updateTask', async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI
    try {
      const state = getState()
      const task = state.tasks[arg.todolistId].find(t => t.id === arg.taskId)
      if (!task) {
        dispatch(appActions.setAppError({ error: 'Task not found' }))
        return rejectWithValue(null)
      }
      const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...arg.domainModel
      }
      const res =  await todolistsAPI.updateTask(arg.todolistId, arg.taskId, apiModel)
      if (res.data.resultCode === 0) {
        // dispatch(tasksActions.updateTask({ taskId, todolistId, model: domainModel }))
        return arg
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch
      (e) {
      handleServerNetworkError(e, dispatch)
      return rejectWithValue(null)
    }
  }
)


// export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
//   (dispatch: Dispatch, getState: () => AppRootStateType) => {
//     const state = getState()
//     const task = state.tasks[todolistId].find(t => t.id === taskId)
//     if (!task) {
//       //throw new Error("task not found in the state");
//       console.warn('task not found in the state')
//       return
//     }
//     const apiModel: UpdateTaskModelType = {
//       deadline: task.deadline,
//       description: task.description,
//       priority: task.priority,
//       startDate: task.startDate,
//       title: task.title,
//       status: task.status,
//       ...domainModel
//     }
//     todolistsAPI.updateTask(todolistId, taskId, apiModel)
//       .then(res => {
//         if (res.data.resultCode === 0) {
//           dispatch(tasksActions.updateTask({ taskId, todolistId, model: domainModel }))
//         } else {
//           handleServerAppError(res.data, dispatch)
//         }
//       })
//       .catch((error) => {
//         handleServerNetworkError(error, dispatch)
//       })
//   }


export const removeTaskTC = (taskId: string, todolistId: string): AppThunk => (dispatch) => {
  todolistsAPI.deleteTask(todolistId, taskId)
    .then(() => {
      dispatch(tasksActions.removeTask({ taskId, todolistId }))
    })
}


// types
export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}


export const tasksActions = slice.actions
export const tasksReducer = slice.reducer
export const tasksThunk = { fetchTasks, addTask, updateTask }
