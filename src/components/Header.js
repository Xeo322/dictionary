import React, {useContext} from "react";
import {NavLink, useLocation} from 'react-router-dom'
import {Context} from "../Context"

export default function Header() {
    const {setWords, setSearch} = useContext(Context)
    let location = useLocation()

    const linkHandler = () => {
        if (location.pathname === '/') {
            setWords({})
        }
        if (location.pathname === '/remembered'){
            setSearch('')
        }
    }

    return (
        <header>
            <h1>Dictionary</h1>
            <div className='header__link'>
                <NavLink to="/" onClick={() => linkHandler()}>All</NavLink>
                <NavLink to="/remembered" onClick={() => linkHandler()}>Remembered</NavLink>
            </div>
        </header>
    )
}