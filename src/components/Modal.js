import React from 'react'

export default function Modal({func, word,pronunciation}) {
    return (
        <>
            <div className='modal'>
                <div className='modal__info'>
                    <button onClick={() => func()}>&#8251;</button>
                    <h1>{word.title}</h1>
                    <div>
                        <h4>Definition:</h4>
                        <p>'{word.definition}'</p>
                    </div>
                    <div>
                        <h4>Pronunciation: </h4>
                        <p> '{pronunciation}'</p>
                    </div>
                    <div>
                        <h4>Part of speech:</h4>
                        <p>'{word.partOfSpeech}'</p>
                    </div>
                </div>
            </div>
        </>
    )
}