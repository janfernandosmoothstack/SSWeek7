"use strict"

import React from 'react';
import {Switch, Route} from 'react-router-dom';

import {Header} from './header.js';
import {Home} from './home.js';
import {BookList} from '../components/BookList';
import {AuthorList} from '../components/AuthorList';
import BookStore from '../stores/bookStore';
import AuthorStore from '../stores/authorStore';


export class App extends React.Component{

    //this data is propagated to all child compnents and they can use them as props
    constructor(props) {
        super(props); //provides all the props to the super class
        
        this.state = {
            book:{
                bookList: [],
                readState:{
                    pending:false,
                    success:false,
                    failure:false
                },
                error: ''
            },

            author:{
                authorList: [],
                readState:{
                    pending:false,
                    success:false,
                    failure:false
                },
                error: ''
            }
        }
    }

    //define the needed components
    //add all your routes to this switch case
    render() {
        return(
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/books' render={(props) => (<BookList {...props} book={this.state.book} />)}/>
                    <Route path='/authors' render={(props) => (<AuthorList {...props} author={this.state.author} />)}/>
                </Switch>
            </div>
        );
    }

    //subscribing to listen to the changes to the store
    //whenever change is detected get the new files
    componentDidMount(){
        BookStore.addChangeListener(this._onBookChange.bind(this));
        AuthorStore.addChangeListener(this._onAuthorChange.bind(this));
    }

    //whatever listener you add, you need to remove it
    //clean up
    componentWillUnmount(){
        BookStore.removeChangeListener(this._onBookChange.bind(this));
        AuthorStore.removeChangeListener(this._onAuthorChange.bind(this));
    }

    //set the state by getting the new info from the bookstore
    _onBookChange(){
        this.setState({book: BookStore.getAllBooks()});
    }

    _onAuthorChange(){
        this.setState({author: AuthorStore.getAllAuthors()});
    }
}