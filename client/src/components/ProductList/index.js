import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
// replaces useStoreContext
import { useSelector, useDispatch } from 'react-redux';
// components
import ProductItem from '../ProductItem';
// utils
import { idbPromise } from '../../utils/helpers';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { UPDATE_PRODUCTS } from '../../utils/actions';
// import { useStoreContext } from '../../utils/GlobalState';
// assets
import spinner from '../../assets/spinner.gif';


function ProductList() {
	// const [state, dispatch] = useStoreContext();
	const dispatch = useDispatch();
	const state = useSelector((state) => state);

	const { currentCategory } = state;

	const { loading, data } = useQuery(QUERY_PRODUCTS);

	useEffect(() => {
		// if there's data to be stored
		if (data) {
			// let's store it in the global state object
			dispatch({
				type: UPDATE_PRODUCTS,
				products: data.products
			});

			// bet let's also take each product and save it to IndexedDB using the helper function
			data.products.forEach((product) => {
				idbPromise('products', 'put', product);
			});
			// else if to check if `loading` is undefined in `use`Query()` Hook
		} else if (!loading) {
			// since we're offline, get all of the data from the `products` store
			idbPromise('products', 'get').then((products) => {
				// use retrieved data to set global state for offline browsing
				dispatch({
					type: UPDATE_PRODUCTS,
					products: products
				});
			});
		}
	}, [data, loading, dispatch]);

	function filterProducts() {
		if (!currentCategory) {
			return state.products;
		}
		return state.products.filter(product => product.category._id === currentCategory);
	}

	

	return (
		<div className="my-2">
			<h2>Our Products:</h2>
			{state.products.length ? (
				<div className="flex-row">
					{filterProducts().map((product) => (
						<ProductItem
							key={product._id}
							_id={product._id}
							image={product.image}
							name={product.name}
							price={product.price}
							quantity={product.quantity}
						/>
					))}
				</div>
			) : (
				<h3>You haven't added any products yet!</h3>
			)}
			{loading ? <img src={spinner} alt="loading" /> : null}
		</div>
	);
}

export default ProductList;
