import React, {useEffect, useState} from "react"

function FormForCard({type, inputChangeHandler, submitFormHandler, cancelButtonHandler, card}) {
// set up the form
    return (
        <form onSubmit={submitFormHandler}>
            <div>
                <div className="mb-3">
                    <label htmlFor="front" className="form-label">Front</label>
                        <textarea
                            className="form-control"
                            id="front"
                            type="text"
                            name="front"
                            value={card.front}
                            onChange={inputChangeHandler}
                        />
                </div>
                <div className="mb-3">
                    <label htmlFor="back" className="form-label">Back</label>
                        <textarea
                            className="form-control"
                            id="back"
                            type="text"
                            name="back"
                            value={card.back}
                            onChange={inputChangeHandler}
                        />
                </div>
            </div>
            <div className="mt-2">
                {type === 'edit' ? (
                    <>
                        <button className="btn btn-secondary text-white" type="button" onClick={cancelButtonHandler}>Cancel</button>
                        <button className="btn btn-primary ml-2 text-white" type="submit">Save</button>
                    </>
                ) : (
                    <>
                        <button className="btn btn-secondary text-white" type="button" onClick={cancelButtonHandler}>Done</button>
                        <button className="btn btn-primary ml-2 text-white" type="submit">Submit</button>
                    </>
                )}
            </div>
        </form>
    ) 
}
export default FormForCard;