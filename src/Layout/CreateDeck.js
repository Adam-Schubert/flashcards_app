import React, { useState } from "react";
import {Link, useHistory} from "react-router-dom";
import { createDeck, readDeck } from "../utils/api/index";

function CreateDeck() {
    const history = useHistory();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

// name change handler
    const nameChangeHandler = (event) => {
        setName(event.target.value);
    }

// description change handler
    const descriptionChangeHandler = (event) => {
        setDescription(event.target.value);
    }

// add event handler for submitting the form
// deal with stopping default behavior
// use createDeck and readDeck callback functions from API => index.js 
    const submitFormHandler = async (event) => {
        event.preventDefault();
        const response = await createDeck({name, description});
        await readDeck(response.id);
        history.push(`/`);
    }

// set up breadcrumbs nav and the submit handler for the form
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
                        Create Deck
                    </li>
                </ol>
            </nav>
            <form onSubmit={submitFormHandler}>
                <div >
                    <h2>Create Deck</h2>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name:</label>
                        <input
                        className="form-control"
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Deck Name"
                        onChange={nameChangeHandler}
                        value={name}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description:
                        </label>
                        <textarea
                            className="form-control"
                            id="description"
                            type="text"
                            name="description"
                            placeholder="Brief description of the deck"
                            onChange={descriptionChangeHandler}
                            value={description}
                        />
                    </div>
                </div>
                <div className="mt-2">
                    <Link to="/" className="btn btn-secondary text-white">
                        Cancel
                    </Link>
                    <button type="submit" className="btn btn-primary ml-2">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateDeck;