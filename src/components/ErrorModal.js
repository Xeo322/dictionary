import React from "react"

export default function Modal({func}) {
    return (
        <>
            <div className='modal'>
                <div className='modal__error'>
                    <button onClick={() => func()}>&#8251;</button>
                    <h1>ERROR 404</h1>
                    <h5>Sorry, we can't find this word</h5>
                </div>
            </div>
        </>
    )
}