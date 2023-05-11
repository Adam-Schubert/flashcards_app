import React, { useState, useEffect} from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";

function Study() {
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
    const history = useHistory();
    const {deckId} = useParams();
    const [cardIndexNumber, setCardIndexNumber] = useState(0);
    const [cardFrontSide, setCardFrontSide] = useState(true);
    const [cardsLength, setCardsLength] = useState(0);

// load the deck to be studied
    useEffect(() => {
        async function loadDeck() {
            const response = await readDeck(deckId);
             setDeck(response);
             setCards(response.cards);
             setCardsLength(response.cards.length);
        }
        loadDeck();
    }, [deckId])

// flip button handler
    const flipButtonHandler = (event) => {
        if (cardFrontSide === true) {
            setCardFrontSide(false);
        } else {
            setCardFrontSide(true);
        }
    }
      
// next button handler
    const nextButtonHandler = (event) => {
        setCardIndexNumber(cardIndexNumber + 1);
        console.log(cardsLength, cardIndexNumber);

     
        if (cardIndexNumber === cardsLength - 1) {
            if (
                window.confirm("Restart cards? Click 'cancel' to return to the home page.")
            ) {
                setCardIndexNumber(0);
                setCardFrontSide(true);   
            } else {
                history.push("/");
            }
        }
        else {
        setCardIndexNumber(cardIndexNumber + 1);
        setCardFrontSide(true);
    }
}

// get the breadcrumbs navigation set for not enough cards in deck and Add Card button
    if (cardsLength <= 2) {
        return (
            <div>
                <nav aria-label="breadcrumb">
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
                        <li className="breadcrumb-item active" aria-current="page">
                            Study
                        </li>
                    </ol>    
                </nav>
                <h1>Study: {deck.name}</h1>
                <h3>Not enough cards.</h3>
                <p>You need at least 3 cards to study. There are {cardsLength} cards in this deck.</p>
                <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary ml-2 float-left">
                    {" "}Add Cards
                </Link>
            </div>
        )
    }

// get the breadcrumbs navigation set for flipping through cards
    return (
        <div>
            <div>
                <nav aria-label="breadcrumb">
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
                        <li className="breadcrumb-item active" aria-current="page">
                            Study
                        </li>
                    </ol>    
                </nav>
            </div>
            <div>
                <h1>Study: {deck.name}</h1>
            </div>
            <div className="card float-center d-grid gap-2 d-md-block mt-2 mb-4">
                <div className="card-body">
                    <h2>Card {cardIndexNumber+1} of {cardsLength}</h2>
                    <div>
                        {cardFrontSide ? <p>{cards[cardIndexNumber]?.front}</p> : <p>{cards[cardIndexNumber]?.back}</p>}
                    </div>
                    <button className="btn btn-secondary" type="button" onClick={flipButtonHandler}>Flip</button>
                    {cardFrontSide ? <p></p> : <button className="btn btn-primary ml-2" type="button" onClick={nextButtonHandler}>Next</button>}
                </div>
            </div>
        </div>
    )
}
export default Study;