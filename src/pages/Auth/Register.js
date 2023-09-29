import { Link, Navigate } from 'react-router-dom'
import Frame from '../../components/Frame/Frame'
import './Auth.css'

export default function Register({auth}) {


    const register = (e) => {
        e.preventDefault()
        const name = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        try {
            auth.submit_register(name,email,password)
        } catch(e) {
            alert(e.message)
        }
    }

 

    return <form onSubmit={register}>
                <input name="name" type ="text" placeholder='Enter Full name'/>
                <input name="email" type ="email" placeholder='Enter email address'/>
                <input name="password" type ="password" placeholder='Enter password'/>

                <button type='submit'>Register</button>
            </form>
}