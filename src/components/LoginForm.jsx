import React from 'react'
import { useNavigate } from 'react-router-dom'

export function LoginForm() {
    const navigate = useNavigate();

    const goToHomePage = () => {
        navigate('workflows')
    }

  return (
    <>
        <div>LoginForm</div>
        <button onClick={goToHomePage}>Login Button</button>
    </>
    
  )
}
