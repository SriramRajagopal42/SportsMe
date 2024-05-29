/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react"
import { useGroupsContext } from "../hooks/useGroupsContext"
import { useAuthContext } from "../hooks/useAuthContext"

const GroupForm = () => {
    const {dispatch} = useGroupsContext()
    const {user} = useAuthContext()

    const [sport, setSport] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [place, setPlace] = useState("")
    const [groupSize, setGroupSize] = useState("")
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError("You must be logged in")
            return
        }

        const group = {sport, date, time, place, group_size: groupSize}

        const response = await fetch('http://localhost:4000/api/groups', {
            method: "POST",
            body: JSON.stringify(group),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.empty_fields)
        }

        if (response.ok) {
            setSport('')
            setPlace('')
            setDate('')
            setTime('')
            setGroupSize('')
            setError(null)
            setEmptyFields([])
            console.log("new group added", json)
            dispatch({type: 'CREATE_GROUP', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Group</h3>

            <label>Sport:</label>
            <input 
                type="text"
                onChange={(e) => setSport(e.target.value)}
                value={sport}
                className={emptyFields.includes('sport') ? 'error' : ''}
            />

            <label>Place:</label>
            <input 
                type="text"
                onChange={(e) => setPlace(e.target.value)}
                value={place}
                className={emptyFields.includes('place') ? 'error' : ''}
            />

            <label>Date:</label>
            <input 
                type="text"
                onChange={(e) => setDate(e.target.value)}
                value={date}
                className={emptyFields.includes('date') ? 'error' : ''}
            />

            <label>Time:</label>
            <input 
                type="text"
                onChange={(e) => setTime(e.target.value)}
                value={time}
                className={emptyFields.includes('time') ? 'error' : ''}
            />

            <label>Group Size:</label>
            <input 
                type="number"
                onChange={(e) => setGroupSize(e.target.value)}
                value={groupSize}
                className={emptyFields.includes('group size') ? 'error' : ''}
            />

            <button>Add Group</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default GroupForm