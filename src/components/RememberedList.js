import React from "react";
import WordsItem from "./WordsItem";

export  default  function RememberedList({remembered, sort}) {
    console.log(remembered)


    return (
        <div>
            <ul>
                <h1>Remembered</h1>
                {remembered && remembered.sort(sort).map((word, index) => {
                    return <WordsItem
                        key={index}
                        pronunciation={word.pronunciation}
                        definition={word.definition}
                        title={word.title}
                        word={word}
                        draggable={true}
                    />
                })}
            </ul>
        </div>
    )
}