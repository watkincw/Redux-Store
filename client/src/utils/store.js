// // New file to create and export the Redux store we want to
// // use instead of React's useContext
import { createStore } from 'redux';
import reducer from './reducers';

// exporting... ... ...
export default createStore(reducer);