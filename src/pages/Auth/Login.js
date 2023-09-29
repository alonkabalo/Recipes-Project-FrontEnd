import { useEffect, useState } from 'react'
import Frame from '../../components/Frame/Frame'
import './Auth.css'
import { Link, Navigate } from 'react-router-dom'
export default function Login({auth}) {

    const login = (e) => {
        e.preventDefault()
        const email = e.target[0].value
        const password = e.target[1].value
        try {
            auth.submit_login(email,password)
        } catch(e) {
            alert(e.message)
        }
    }

   
    return   <form onSubmit={login}>
                <input name="email" type ="email" placeholder='Enter email address'/>
                <input name="password" type ="password" placeholder='Enter password'/>
                <button type='submit'>Login</button>
            </form>
}