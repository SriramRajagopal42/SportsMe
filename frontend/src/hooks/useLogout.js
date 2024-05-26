import { useAuthContext } from "./useAuthContext"
import { useGroupsContext } from './useGroupsContext'

export const useLogout = () => {

    const {dispatch} = useAuthContext()
    const {dispatch: groups_dispatch} = useGroupsContext()

    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user')

        //dispatch logout action
        dispatch({type: 'LOGOUT'})
        groups_dispatch({type: 'SET_GROUPS', payload: null})
    }

    return {logout}

}