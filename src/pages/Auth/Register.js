import { Link, Navigate } from 'react-router-dom'
import Frame from '../../components/Frame/Frame'
import './Auth.css'

export default function Register({ auth }) {


    const register = (e) => {
        e.preventDefault()
        const name = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        const checked = e.target[3].checked
        try {
            auth.submit_register(name, email, checked ? 'business' : 'normal', password)
        } catch (e) {
            alert(e.message)
        }
    }



    return <form onSubmit={register}>
        <input name="name" type="text" placeholder='Enter Full name' />
        <input name="email" type="email" placeholder='Enter email address' />
        <input name="password" type="password" placeholder='Enter password' />
        <div style={{ marginInline: 'auto' }}>
            <label>Register as business</label>
            <input name="business" type="checkbox" />
        </div>
        <button type='submit'>Register</button>
    </form>
}