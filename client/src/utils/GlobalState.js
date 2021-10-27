// FILE CAN BE DELETED
// KEPT FOR FUTURE REFERENCE/LEARNING REASONS


// import React, { createContext, useContext } from 'react';
// import { useProductReducer } from './reducers';


// const StoreContext = createContext();
// const { Provider } = StoreContext;


// const StoreProvider = ({ value = [], ...props }) => {
//     const [state, dispatch] = useProductReducer({
//         products: [],
//         cart: [],
//         cartOpen: false,
//         categories: [],
//         currentCategory: ''
//     });

//     // user this to confirm it works
//     console.log(state);
//     return <Provider value={ [state, dispatch] } { ...props } />;
// };

// const useStoreContext = () => {
//     return useContext(StoreContext);
// };


// // exporting... ... ...
// export { StoreProvider, useStoreContext };