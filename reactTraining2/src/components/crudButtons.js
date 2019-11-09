"use strict"

import React from 'react';
import Modal from 'react-bootstrap/Modal';

const btnStyle = {
    marginRight: "10px",
    borderRadius: "7px"
}

const createStyle= {
    marginLeft: "5px",
    borderRadius: "7px",
    textAlign: "center"
}

export const UpdateBkBtn = (props) => {

    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <React.Fragment>
            <button 
                className="btn-primary" 
                style={btnStyle} 
                onClick={
                    handleShow
            }>
                    Update
            </button>

            <Modal show={show} onHide={handleClose} centered>
                
                <Modal.Header closeButton>
                    <Modal.Title>Update Book</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <div className="form-group">
                        <label htmlFor="bookId">Book ID:</label>
                        <input name="bookId" defaultValue={props.bookId} type="text" className="form-control" disabled required></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input name="title" type="text" className="form-control"></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="authId">Author ID:</label>
                        <input name="authId" type="text" className="form-control"></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="pubId">Publisher ID:</label>
                        <input name="pubId" type="text" className="form-control"></input>
                    </div>

                </Modal.Body>

                <Modal.Footer>
                    <button className="btn-danger" style={btnStyle} onClick={handleClose}>Close</button>
                    <button className="btn-success" style={btnStyle} onClick={handleClose}>Save changes</button>
                </Modal.Footer>

            </Modal>

        </React.Fragment>
    );
}

export const DeleteBkBtn = () => {
    return (
        <button className="btn-danger" style={btnStyle}>Delete</button>
    );
}

export const CreateBkBtn = () => {
    return (
        <button className="btn-info" style={createStyle}>+ Book</button>
    );
}