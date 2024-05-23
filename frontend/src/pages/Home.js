import {useEffect,} from 'react'
import {useWorkoutsContext} from '../hooks/useWorkoutsContext'

//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {

    const {workouts, dispatch} = useWorkoutsContext()

    useEffect(() => {
        const fetch_workouts = async() => {
            const response = await fetch('http://localhost:4000/api/workouts')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }

        fetch_workouts()
    }, [dispatch])

    return (
        <div className="home">
            <div className='workouts'>
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home