import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'

//player example
//0: {name: "Mags", creator: true, score: 0}

//initial state
const initialState = {
    allPlayers: [],
    player: {},
    playerOne: '',
    playerTwo: '',
    playerOneScore: 0,
    playerTwoScore: 0,
    room: '',
    gameState: '',
    curPlayer: {},
    images: [],
    guesses: [],
    card: {},
    cardIdx: 1,
    correctGuess: false,
    guessInfo: {},
}

//action types
const GOT_MY_PLAYER = 'GOT_MY_PLAYER'
const GOT_NEW_PLAYER = 'GOT_NEW_PLAYER'
const GOT_PLAYER_ONE = 'GOT_MY_PLAYER'
const GOT_PLAYER_TWO = 'GOT_PLAYER_TWO'
const GOT_ROOM = 'GOT_ROOM'
const GOT_GAME_STATE = 'GOT_GAME_STATE'
const GOT_NEXT_PLAYER = 'GOT_NEXT_PLAYER'
const GOT_GUESS = 'GOT_GUESS'
const GOT_CARD = 'GOT_CARD'
const GOT_CORRECT_GUESS = 'GOT_CORRECT_GUESS'
const GOT_SCORES = 'GOT_SCORES'
const UPDATE_SCORE = 'UPDATE_SCORE'
const GET_ALL_PLAYERS = 'GET_ALL_PLAYERS'

//action creators
export const gotNewPlayer = (player) => ({type: GOT_NEW_PLAYER, player})
export const gotPlayer = (player) => ({type: GOT_MY_PLAYER, player})
export const gotPlayerOne = (player) => ({type: GOT_PLAYER_ONE, player})
export const gotPlayerTwo = (player) => ({type: GOT_PLAYER_TWO, player})
export const gotRoom = (room) => ({type: GOT_ROOM, room})
export const gotGameState = (gameState, allPlayers) => ({type: GOT_GAME_STATE, gameState, allPlayers})
export const gotNextPlayer = (player, cardIdx) => ({type: GOT_NEXT_PLAYER, player, cardIdx})
export const gotGuess = (guess) => ({type: GOT_GUESS, guess})
export const gotCard = (card) => ({type: GOT_CARD, card})
export const gotCorrectGuess = (guess) => ({type: GOT_CORRECT_GUESS, guess})
export const gotScores = (players) => ({type: GOT_SCORES, players})
export const updateScore = (score) => ({type: UPDATE_SCORE, score})
export const getAllPlayers = (allPlayers) => ({type: GET_ALL_PLAYERS, allPlayers})

// thunk creators
export const getCard = (idx) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/api/card/${idx}`)
            dispatch(gotCard(res.data))
        } catch (err) {console.error(err)}
    }
}

//reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GOT_NEW_PLAYER:
            return {...state, playerTwo: action.player.name, allPlayers: [...state.allPlayers, action.player]}
        case GOT_MY_PLAYER:
            return {...state, player: action.player, allPlayers: [...state.allPlayers, action.player]}
        case GOT_PLAYER_ONE:
            return {...state, playerOne: action.player.name, allPlayers: [...state.allPlayers, action.player]}
        case GOT_PLAYER_TWO:
            return {...state, playerTwo: action.player.name, allPlayers: [...state.allPlayers, action.player]}
        case GOT_ROOM:
            return {...state, room: action.room}
        case GOT_GAME_STATE:
            return {...state, gameState: action.gameState, allPlayers: action.allPlayers}
        case GOT_NEXT_PLAYER:
            return {...state, curPlayer: action.player, cardIdx: action.cardIdx, images: [], guesses: [], card: {}, correctGuess: false, guessInfo: {}, badImage: false}
        case GOT_GUESS:
            return {...state, guesses: [...state.guesses, action.guess]}
        case GOT_CARD:
            return {...state, card: action.card}
        case GOT_CORRECT_GUESS:
            return {...state, correctGuess: true, guessInfo: action.guess}
        case GOT_SCORES:
            return {...state, allPlayers: action.players}
        case UPDATE_SCORE:
            return {...state, playerOneScore: action.score}
        case GET_ALL_PLAYERS:
            return {...state, allPlayers: action.allPlayers}
        default:
            return state;
    }
}

export default createStore(
    reducer,
    applyMiddleware(
        thunkMiddleware.withExtraArgument({axios})
    )
)
