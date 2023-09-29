import { useCallback, useState } from "react";
import Frame from "../../components/Frame/Frame";
import Login from "./Login";
import Register from "./Register";



export default function Auth( {auth }) {

    const [currentSwitchState,setCurrentSwitchState] = useState(1) // 1 = login,2 = Register
    

    const Footer = useCallback(() => {
        if(currentSwitchState === 1) {
            return <> Not a member? <b onClick={() => setCurrentSwitchState(2)}>Sign up now</b></>
         }
        return <> Already a member? <b onClick={() => setCurrentSwitchState(1)} >Sign in now</b></>
    },[currentSwitchState])


    const Header = useCallback(() => {
        if(currentSwitchState === 1) {
            return <h1>Login Form</h1>
        }
        return <h1>Signup Form</h1>
    })
    
    return <Frame>
            <div className="form-container" >
                <Header/>
                <div className="switch">
                 <div 
                  onClick={() => setCurrentSwitchState(1)}
                  className={currentSwitchState === 1 ? 'switch_selected' : ''}>
                    Login
                 </div>
                 <div
                   onClick={() => setCurrentSwitchState(2)}
                   className={currentSwitchState === 2 ? 'switch_selected' : ''}>
                    SignUp
                 </div>
                </div>

                {currentSwitchState === 1 ? <Login auth={auth}/> : <Register auth={auth}/>}

                 <span className="not-member">
                    <Footer/>
                 </span>
            </div>
    </Frame>
}