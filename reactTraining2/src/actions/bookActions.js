import Dispatcher from '../dispatcher/appDispatcher'; //flux module
import axios from 'axios' //making asynch calls

//define methods within the object
const BooksActions = {
    readBooks: function(){
        Dispatcher.dispatch({
            actionType: 'read_books_started' //action for spinner
        });
        axios.get(`http://localhost:3000/book`) //returns a promise
        .then(res => { //if successful
            Dispatcher.dispatch({
                actionType: 'read_books_successful', //action for displaying data
                data:  res.data
            });
        })
        .catch( (error) => { //if failure
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'read_books_failure' //action to display error message
            });
        });
    }
}

module.exports = BooksActions;