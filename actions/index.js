export const ADD_DECK = "ADD_DECK"
export const RECEIVE_DECKS = "RECEIVE_DECKS"
export const ADD_QUESTION = "ADD_QUESTION"
export const DELETE_DECK = "DELETE_DECK"

export function addDeck (newDeck) {
    return {
        type: ADD_DECK,
        newDeck
    }
}

export function deleteReduxDeck( key){
    debugger
    return {
        type: DELETE_DECK,
        key
    }
}

export function receiveDecks ( decks ) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

export function addQuestion( newQuiz ) {
    debugger;
    return {
        type: ADD_QUESTION,
        title: newQuiz.title,
        question: newQuiz.question,
        answer: newQuiz.answer
    }
}

