import React, { useState, useEffect } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { readCard, readDeck, updateCard } from "../utils/api/index"
import FormForCard from "./FormForCard"

function EditCard() {
    const history = useHistory();
    const [card, setCard] = useState({});
    const [deck, setDeck] = useState({});
    const {deckId, cardId} = useParams();

// load deck w/ card to be updated
    useEffect(() => {
        async function loadDeck() {
            const response = await readDeck(deckId)
            setDeck(response);
            // console.log(response)
        }
        loadDeck();
    }, [deckId])

// load and read card to be updated
    useEffect(() => {
        async function loadCard() {
            const response = await readCard(cardId);
            setCard(response);
            // console.log('set card', response)
        }
        loadCard();
    }, [cardId, setCard])

// cancel button handler
    const cancelButtonHandler = () => {
        history.push(`/decks/${deckId}`);
    }

// submit button handler
    const submitButtonHandler = async (event) => {
        event.preventDefault();
        await updateCard({...card});
        history.push(`/decks/${deckId}`);
    }

    const inputChangeHandler = (event) => {
        setCard({
            ...card,
            [event.target.name]: event.target.value
        });
    } 

// set up breadcrumb nav and display form that's prefilled with data
    return (
        <div>
            <nav className="aria-lable breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deck.id}`}>
                            {deck.name}
                        </Link>
                    </li>
                    <li className="breadcrumb-item">
                        Edit Card {cardId}
                    </li>
                </ol>
            </nav>
            <h2>Edit Card</h2>
            <FormForCard
                inputChangeHandler={inputChangeHandler}
                submitFormHandler={submitButtonHandler}
                cancelButtonHandler={cancelButtonHandler}
                card={card}
                type="edit"
            />
        </div>
    )
}

export default EditCard;