"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import BookActions from '../actions/bookActions';
import { UpdateBkBtn, DeleteBkBtn, CreateBkBtn } from './crudButtons';

//list your books
export class BookList extends React.Component{

    //where each row of data is baked
    //function given to map as an argument
    createBookRow(book){
        console.log(book);
        return (
            <tr key={book.bookId}>
                <td> {book.bookId} </td>
                <td> {book.title} </td>
                <td> {book.authId} </td>
                <td> {book.pubId} </td>
                <td>
                    <UpdateBkBtn
                        bookId = {book.bookId} 
                        title = {book.title} 
                        authId = {book.authId} 
                        pubId = {book.pubId}
                    />
                    <DeleteBkBtn/>
                </td>
            </tr>
        );
    }

    componentDidMount(){
        BookActions.readBooks();
    }

    render() {

        let content = '';
        
        //for the spinner when loading the book list
        if(this.props.book.readState.pending){
            content = (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div> 
                </div>
            );
        }
        
        //if successful display the books
        if(this.props.book.readState.success){
            content = 
                (<table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Author ID</th>
                            <th>Publisher ID</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.book.bookList.map(this.createBookRow, this)}
                    </tbody>    
                </table>)
        }
        //map receives a function as an argument

        //if failure then send an error message
        if(this.props.book.readState.failure){
            content = 
            (
                <div className="alert alert-danger" role="alert">
                    Error while loading books!
                </div>
            )
        }

        return(
            <div>
                <h2 style={{marginLeft:"5px"}}>Books</h2>
                <h5><CreateBkBtn/></h5>
                {content}
            </div>
        );
    }
}

//for developers
//by looking at this file these are the props needed for this file to render
//everytime you add a prop add it here and say if it is required or not
BookList.propTypes = {
    book: PropTypes.object.isRequired
};



