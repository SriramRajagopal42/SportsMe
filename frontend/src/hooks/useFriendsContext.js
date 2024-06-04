import { FriendsContext } from '../context/FriendContext'
import { useContext } from "react";

export const useFriendContext = () => {
    const context = useContext(FriendsContext)

    if (!context) {
        throw Error('useFriendContext must be used within a FriendContextProvider')
    }

    return context
}