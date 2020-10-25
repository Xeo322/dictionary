import React, {useContext, useState} from "react"
import Modal from './Modal'
import {Context} from "../Context"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'

export default function WordsItem({definition, title, word, pronunciation, draggable}) {
    console.log(pronunciation)
    let [modal, setModal] = useState(false)
    const {rememberedHandler, dragStartHandler, dragOverHandler, dropHandler} = useContext(Context)

    const modalHandler = () => {
        setModal(modal = !modal)
    }

    return (
        <>
            <li
                draggable={draggable}
                onDragStart={(e) => dragStartHandler(e, word)}
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropHandler(e, word)}
            >
                <button onClick={() => modalHandler()}><p>{title}</p></button>
                <p className='word__definition'>{definition}</p>
                <button onClick={e => rememberedHandler({word, pronunciation, title, e})}>
                    <FontAwesomeIcon className='remembered__btn' icon={faStar}/>
                </button>
            </li>
            {modal && <Modal func={modalHandler} word={word} pronunciation={pronunciation}/>}
        </>

    )
}