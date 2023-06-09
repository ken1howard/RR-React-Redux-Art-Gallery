import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    objectId: 2050,
    apiData: {}
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setData: (state, action) => {
            return {...state, apiData : action.payload}
        },
        reset: () => {
            return initialState
        },
        inputId: (state, action) => {
            return { ...state, objectId: action.payload }
        },
        incrementId: (state) => {
            return { ...state, objectId: state.objectId + 1 }
        },
        decrementId: (state) => {
            return { ...state, objectId: state.objectId - 1 }
        }
    }
})

export const { setData, reset, incrementId, decrementId, inputId } = dataSlice.actions

export const fetchData = () => {
    const dataThunk = async (dispatch, getState) => {
        let state = getState()
        const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${state.data.objectId}`)
        const resData = await res.json()
        dispatch(setData(resData))
    }
    return dataThunk
}

export default dataSlice.reducer