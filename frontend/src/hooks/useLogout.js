import { useAuthContext } from "./useAuthContext"
import { useWorkoutsContext } from './useWorkoutsContext'

export const useLogout = () => {

    const {dispatch} = useAuthContext()
    const {dispatch: workouts_dispatch} = useWorkoutsContext()

    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user')

        //dispatch logout action
        dispatch({type: 'LOGOUT'})
        workouts_dispatch({type: 'SET_WORKOUTS', payload: null})
    }

    return {logout}

}