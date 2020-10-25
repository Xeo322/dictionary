import React from "react";
import WordsItem from "./WordsItem";

export default function WordsList({words}) {
    return (
        <div>
            <ul>
                {words.word ? <h1>{words.word}</h1> : <h1>Try to find some word</h1>}
                {words.result && words.result.map((word, index) => {
                    return <WordsItem
                        dragble={true}
                        key={index}
                        pronunciation={words.description.all}
                        definition={word.definition}
                        title={words.word}
                        word={word}
                        draggable={false}
                    />
                })}
            </ul>
        </div>
    )
}