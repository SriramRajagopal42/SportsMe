import { createContext, useReducer } from "react"

export const GroupsContext = createContext()

export const groupsReducer = (state, action) => {
    switch(action.type) {
        case 'SET_GROUPS':
            return {
                groups: action.payload
            }
        case 'CREATE_GROUP':
            return {
                groups: [action.payload, ...state.groups]
            }
        case 'DELETE_GROUP':
            return {
                groups: state.groups.filter((w) => w._id !== action.payload._id)
            }
        case 'UPDATE_GROUP':
            return {
                groups: state.groups.map((w) => {
                    if(w._id === action.payload._id) {
                        return action.payload;
                    }
                    return w;
                })
            }
        default:
            return state
    }
}

export const GroupsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(groupsReducer, {
        groups: null
    })

    return (
        <GroupsContext.Provider value={{...state, dispatch}}>
            {children}
        </GroupsContext.Provider>
    )
}