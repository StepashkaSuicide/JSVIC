import { todolistsAPI, TodolistType } from 'api/todolists-api'
import { Dispatch } from 'redux'
import { appActions, RequestStatusType } from 'app/app-reducer'
import { handleServerNetworkError } from 'utils/error-utils'
import { AppThunk } from 'app/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from 'utils/create-app-async-thunk'

const initialState: Array<TodolistDomainType> = []

// export type InitialStateType = typeof initialState

const slice = createSlice({
  name: 'todolist',
  initialState,
  reducers: {
    // setTodolists: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
    //   return action.payload.todolists.map(tl => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
    // },
    addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' })
    },
    removeTodolist: (state, action: PayloadAction<({ id: string })>) => {
      const index = state.findIndex(todo => todo.id === action.payload.id)
      if (index !== -1) state.splice(index, 1)
    },
    changeTodolistTitle: (state, action: PayloadAction<{ id: string, title: string }>) => {
      const index = state.findIndex(todo => todo.id === action.payload.id)
      if (index !== -1) state[index].title = action.payload.title
    },
    changeTodolistFilter: (state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) => {
      const index = state.findIndex(todo => todo.id === action.payload.id)
      if (index !== -1) state[index].filter = action.payload.filter
    },
    changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) => {
      const index = state.findIndex(todo => todo.id === action.payload.id)
      if (index !== -1) state[index].entityStatus = action.payload.entityStatus
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodoList.fulfilled, (state, action) => {
        action.payload.todolists.map(tl => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
      })
  }

})


// thunks

const fetchTodoList = createAppAsyncThunk<{ todolists: TodolistType[] }>('todoLists/fetchTodoList', async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    dispatch(appActions.setAppStatus({ status: 'loading' }))
    const res = await todolistsAPI.getTodolists()
    dispatch(appActions.setAppStatus({ status: 'succeeded' }))
    return { todolists: res.data }
  } catch (e) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  }
})


export const removeTodolistTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    //изменим глобальный статус приложения, чтобы вверху полоса побежала
    dispatch(appActions.setAppStatus({ status: 'loading' }))
    //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
    dispatch(todolistActions.changeTodolistEntityStatus({ entityStatus: 'loading', id: todolistId }))
    todolistsAPI.deleteTodolist(todolistId)
      .then(() => {
        dispatch(todolistActions.removeTodolist({ id: todolistId }))
        //скажем глобально приложению, что асинхронная операция завершена
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      })
  }
}
export const addTodolistTC = (title: string): AppThunk => {
  return (dispatch) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }))
    todolistsAPI.createTodolist(title)
      .then((res) => {
        dispatch(todolistActions.addTodolist({ todolist: res.data.data.item }))
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      })
  }
}
export const changeTodolistTitleTC = (id: string, title: string): AppThunk => {
  return (dispatch) => {
    todolistsAPI.updateTodolist(id, title)
      .then(() => {
        dispatch(todolistActions.changeTodolistTitle({ title, id }))
      })
  }
}

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

export const todolistActions = slice.actions
export const todolistsReducer = slice.reducer
export const todoListsThunk = { fetchTodoList }