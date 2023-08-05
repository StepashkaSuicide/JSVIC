import { todolistsAPI, TodolistType } from 'api/todolists-api'
import { Dispatch } from 'redux'
import { appActions, RequestStatusType } from 'app/app-reducer'
import { handleServerNetworkError } from 'utils/error-utils'
import { AppThunk } from 'app/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: Array<TodolistDomainType> = []

// export type InitialStateType = typeof initialState

const slice = createSlice({
  name: 'todolist',
  initialState,
  reducers: {
    removeTodolist: (state, action: PayloadAction<({ id: string })>) => {
      const index = state.findIndex(todo => todo.id === action.payload.id)
      if (index !== -1) state.splice(index, 1)
    },
    addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' })
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
    },
    setTodolists: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
      return action.payload.todolists.map(tl => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
    }


  }
})


export const todolistActions = slice.actions
export const todolistsReducer = slice.reducer


// thunks
export const fetchTodolistsTC = (): AppThunk => {
  return (dispatch) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }))
    todolistsAPI.getTodolists()
      .then((res) => {
        dispatch(todolistActions.setTodolists({ todolists: res.data }))
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch)
      })
  }
}
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

