import React, {useState} from 'react'

export default function Search(props) {

    const[state,setState] = useState( '')

    const submitHandler = (e) => {
        e.preventDefault()
        props.inputHandler(state)
        setState('')
    }


    return (
        <form className='search' onSubmit={e => submitHandler(e)}>
            <input
                type="text"
                value={state}
                onChange={e => setState( e.target.value)}
            />
            <button type={"submit"}><p>Search</p></button>
        </form>
    )
}