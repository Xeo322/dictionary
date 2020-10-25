import React, {useState, useEffect} from 'react'
import Header from './components/Header'
import Search from "./components/Search"
import WordsList from "./components/WordsList"
import RememberedList from "./components/RememberedList"
import ErrorModal from './components/ErrorModal'
import {Loader} from './components/Loader'
import {Context} from './Context'
import {Switch, Route, useLocation} from "react-router-dom";
import './styles/main.scss'


function App() {

    const getData = () => {                                                                 //Этот метод нужен именно здесь, чтобы использовать его в
        if (sessionStorage.getItem('I HATE THIS DATA') !== null) {                      //remembered.useState()
            const remembered = JSON.parse(sessionStorage.getItem('I HATE THIS DATA'))   //Название ключа стоит не просто так, я несколько часов
            return remembered                                                               //пытался решить проблемы рекурсии в useEffect
        } else {                                                                            //Пожалуйста, не бейте =(
            return []
        }
    }

    let [words, setWords] = useState({})
    let [remembered, setRemembered] = useState(getData())
    let [modal, setModal] = useState(false)
    let [card, setCard] = useState()
    let [load, setLoad] = useState(false)
    let [search, setSearch] = useState('')
    let location = useLocation()


    useEffect(() => {
        sessionStorage.setItem('I HATE THIS DATA', JSON.stringify(remembered))
    }, [remembered])


    const rememberedHandler = ({word, pronunciation, title}) => {
        if (remembered.some(el => el.definition === word.definition)) {
            setRemembered(remembered.filter(el => el.definition !== word.definition))
        } else {
            setRemembered(remembered.concat([{
                id: Date.now().toString(),
                title,
                definition: word.definition,
                pronunciation,
                partOfSpeech: word.partOfSpeech,
                synonyms: word.synonyms,
                typeOf: word.typeOf,
                usageOf: word.usageOf
            }]))
        }
    }

    const dragStartHandler = (e, word) => {
        setCard(word.id)
    }

    const dragOverHandler = (e) => {
        e.preventDefault()
    }


    const dropHandler = (e, word) => {
        e.preventDefault()
        setRemembered(remembered.map(el => {
            if (el.id === word.id) {
                return {...el, id: card}
            }
            if (el.id === card) {
                return {...el, id: word.id}
            }
            return el
        }))
    }

    const sortRemembered = (a, b) => {
        if (a.id > b.id) {
            return 1
        } else {
            return -1
        }
    }


    const modalHandler = () => {
        setModal(modal = !modal)
    }

    const inputHandler = (state) => {
        setLoad(true)
        if (location.pathname === '/') {
            fetch(`https://rapidapi.p.rapidapi.com/words/${state}/`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
                    "x-rapidapi-key": "f8acd4db25msh37be1a6f448c1a5p161601jsn60b2321797ed"
                }
            })
                .then(res => {
                    setLoad(false)
                    if (res.status === 404) {
                        modalHandler()
                    } else {
                        res.json()
                            .then(res => {
                                setWords({
                                    word: res.word,
                                    description: res.pronunciation,
                                    result: res.results

                                })
                            })
                    }
                })
        } else {
            setLoad(false)
            setSearch(state)
        }
    }

    return (
        <Context.Provider value={{
            rememberedHandler, dragStartHandler, dragOverHandler, dropHandler, modal, modalHandler, setWords,setSearch
        }}>
            <div>
                <Header/>
                <div className='container'>
                    <Search inputHandler={inputHandler}/>
                    <Switch>
                        <Route exact path={'/'}>
                            {load ? <Loader/> : <WordsList words={words}/>}
                        </Route>
                        <Route path={'/remembered'}>
                            {load ? <Loader/> : <RememberedList
                                remembered={search.length > 0 ? remembered.filter(el => el.title === search) : remembered}
                                sort={sortRemembered}/>}

                        </Route>
                    </Switch>
                </div>
                {modal && <ErrorModal func={modalHandler}/>}
            </div>
        </Context.Provider>
    )
}

export default App;
