import React from "react";
import { Link } from "react-router-dom";
// replaces useStoreContext
import { useSelector, useDispatch } from 'react-redux';
// utils
import { pluralize } from "../../utils/helpers";
import { idbPromise } from '../../utils/helpers';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
// import { useStoreContext } from '../../utils/GlobalState';



function ProductItem(item) {
	const {
		image,
		name,
		_id,
		price,
		quantity
	} = item;

	// const [state, dispatch] = useStoreContext();
	const dispatch = useDispatch();
	const state = useSelector((state) => state);

	const { cart } = state;

	const addToCart = () => {
		// find the cart item with the matching id
		const itemInCart = cart.find((cartItem) => cartItem._id === _id);

		// if there was a match, call the UPDATE with a new purchase quantity
		if (itemInCart) {
			dispatch({
				type: UPDATE_CART_QUANTITY,
				_id: _id,
				purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
			});
			idbPromise('cart', 'put', {
				...itemInCart,
				purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
			});
		} else {
			dispatch({
				type: ADD_TO_CART,
				product: { ...item, purchaseQuantity: 1 }
			});
			idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
		}
	};


	return (
		<div className="card px-1 py-1">
			<Link to={`/products/${_id}`}>
				<img
					alt={name}
					src={`/images/${image}`}
				/>
				<p>{name}</p>
			</Link>
			<div>
				<div>{quantity} {pluralize("item", quantity)} in stock</div>
				<span>${price}</span>
			</div>
			<button onClick={ addToCart }>Add to cart</button>
		</div>
	);
}

export default ProductItem;
