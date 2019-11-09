import Dispatcher from '../dispatcher/appDispatcher';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

//_ means private and cannot be mutated outside of the class
let _bookStore = {
    book:{
        bookList: [],
        //need to keep track of the state
        readState:{
            pending:false,
            success:false,
            failure:false
        },
        error: ''
    }
};

//EventEmitter is from node.js programming
//Listens for events
class BookStoreClass extends EventEmitter{

     //if you want to listen to changes been made add a listener
    addChangeListener(cb){
        //this is whatever event is provided by the EventEmitter
        this.on(CHANGE_EVENT, cb);
    }
   
    removeChangeListener(cb){
        this.removeListener(CHANGE_EVENT, cb);
    }

    //whenever the store has data it has to notify that there was a change
    emitChange(){
        this.emit(CHANGE_EVENT);
    }

    getAllBooks(){
        return _bookStore.book;
    }

    //resets the state
    resetReadState(){
        _bookStore.book.readState = {
            pending:false,
            success:false,
            failure:false
          }
    }
}

//create an instance of the class
//use const so the reference doesn't change
//you can change properties of the class
const BookStore = new BookStoreClass();

//registers the store to run this logic everywhere
Dispatcher.register( (action) => {

    //necessary to pass the action type when passing an action
    switch (action.actionType){
        //if action returns successful
        case 'read_books_successful': 
            BookStore.resetReadState(); //reset state to start something new
            _bookStore.book.bookList = action.data; //get data from ajax call
            _bookStore.book.readState.success = true; //getting data was successful
            BookStore.emitChange(); //fetch new data and show on page becasue it is listening
            break;
        //if action returns failure
        case 'read_books_failure':
            BookStore.resetReadState();
            _bookStore.book.readState.failure = true;
            BookStore.emitChange();
            break;
        case 'read_books_started':
            BookStore.resetReadState();
            _bookStore.book.readState.pending = true;
            BookStore.emitChange();
            break;
        default:
            return;
    }
} );

export default BookStore;