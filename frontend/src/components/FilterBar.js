import { useState, useRef } from "react"
import { useGroupsContext } from "../hooks/useGroupsContext"
import { useAuthContext } from "../hooks/useAuthContext"

const FilterBar = ({type}) => {
    const {dispatch} = useGroupsContext()
    const {user} = useAuthContext()
    const contentRef = useRef()


    const [open, setOpen] = useState(false)
    const [sport, setSport] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [place, setPlace] = useState("")
    const [groupSize, setGroupSize] = useState("")
    const [error, setError] = useState(null)

    const toggle = () => {
        setOpen(!open)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError("You must be logged in")
            return
        }

        let group = {}
        if (sport) {
            group = {...group, sport}
        }
        if (date) {
            group = {...group, date}
        }
        if (time) {
            group = {...group, time}
        }
        if (place) {
            group = {...group, place}
        }
        if (groupSize) {
            group = {...group, group_size: groupSize}
        }

        let addition = ''

        if (type === "groups_list") {
            addition = '/inverse_user'
        } else {
            group = {...group, member_ids: user.id}
        }

        const response = await fetch('http://localhost:4000/api/groups/filtered' + addition, {
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
        }

        if (response.ok) {
            setSport('')
            setPlace('')
            setDate('')
            setTime('')
            setGroupSize('')
            setError(null)
            dispatch({type: 'SET_GROUPS', payload: json})
        }
    }

    return (
        <div>
            <button onClick={toggle} className="filter">Filter</button>
            <div className="content-parent"
            ref={contentRef} style={open ? { height: contentRef.current.scrollHeight +
            "px" } : { height: "0px" }}>
                <div className="content">
                    <form className="create" onSubmit={handleSubmit}>
                        <h3>Filter Options</h3>

                        <label>Sport:</label>
                        <input 
                            type="text"
                            onChange={(e) => setSport(e.target.value)}
                            value={sport}
                        />

                        <label>Place:</label>
                        <input 
                            type="text"
                            onChange={(e) => setPlace(e.target.value)}
                            value={place}
                        />

                        <label>Date:</label>
                        <input 
                            type="text"
                            onChange={(e) => setDate(e.target.value)}
                            value={date}
                        />

                        <label>Time:</label>
                        <input 
                            type="text"
                            onChange={(e) => setTime(e.target.value)}
                            value={time}
                        />

                        <label>Group Size:</label>
                        <input 
                            type="number"
                            onChange={(e) => setGroupSize(e.target.value)}
                            value={groupSize}
                        />

                        <button>Filter</button>
                        {error && <div className="error">{error}</div>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default FilterBar