import {useState} from 'react'
import {useLogin} from '../hooks/useLogin'

const Login = () => {
    const [emailOrUsername, setEmailOrUsername] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async(e) => {
        e.preventDefault()
        await login(emailOrUsername, password)
    }

    return (
        <form className='login' onSubmit={handleSubmit}>
            <h3>Log in</h3>

            <label>Email or Username: </label>
            <input 
                type = "text"
                onChange={(e) => setEmailOrUsername(e.target.value)}
                value = {emailOrUsername}
            />

            <label>Password: </label>
            <input 
                type = "password"
                onChange={(e) => setPassword(e.target.value)}
                value = {password}
            />

            <button disabled={isLoading}>Log in</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default Login