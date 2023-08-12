import {
  DeleteTaskArgType,
  TaskAddArgType,
  TaskPriorities,
  TaskStatuses,
  TaskType,
  todolistsAPI,
  UpdateTaskArgType,
  UpdateTaskModelType
} from 'api/todolists-api'

import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import { appActions } from 'app/app-reducer'
import { createSlice } from '@reduxjs/toolkit'
import { todolistActions, todoListsThunk } from 'features/TodolistsList/todolists-reducer'
import { createAppAsyncThunk } from 'utils/create-app-async-thunk'

const initialState: TasksStateType = {}


const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.task.todoListId]
        tasks.unshift(action.payload.task)
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex(todo => todo.id === action.payload.taskId)
        if (index !== -1) tasks.splice(index, 1)
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
      .addCase(

        todoListsThunk.fetchTodoList, (state, action) => {
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

const removeTask = createAppAsyncThunk<DeleteTaskArgType, DeleteTaskArgType>('tasks/removeTask',
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    dispatch(appActions.setAppStatus({ status: 'loading' }))
    try {
      await todolistsAPI.deleteTask(arg.todolistId, arg.taskId)
      dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      return { taskId: arg.taskId, todolistId: arg.todolistId }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      return rejectWithValue(null)
    }
  })

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
      const res = await todolistsAPI.updateTask(arg.todolistId, arg.taskId, apiModel)
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
export const tasksThunk = { fetchTasks, addTask, updateTask, removeTask }
