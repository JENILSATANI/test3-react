import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';

function Logout() {
    let history = useHistory()
    useEffect(()=>{
        localStorage.clear()
        history.push('/')
    },[])
  return (
    <div></div>
  )
}

export default Logout