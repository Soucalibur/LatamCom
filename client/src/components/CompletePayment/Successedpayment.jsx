import React from 'react';
import { useEffect } from 'react';
import s from './SuccessedPayment.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { createPurchase, getPurchaseDetail } from '../../redux/actions';
import Counter from './Counter';

const purchaseStruct = (purchase) => {
	let pStruct = {
		products: purchase.data.purchase_units.map((p) => {
			return p.reference_id;
		}),
		totalPrice: JSON.parse(localStorage.getItem('total')),
		idUser: '1',
	};

	return pStruct;
};

const SuccessedPayment = (req) => {
	const search = req.location.search;
	const dispatch = useDispatch();
	const purchased = useSelector((state) => state.purchase);
	const created = useSelector((state) => state.createdPurchase);
	console.log(window.location.origin);
	useEffect(() => {
		dispatch(getPurchaseDetail(search)).catch(() => {
			return (
				<div className={s.container}>
					<div className={s.card}>
						<div className={s.topcard}>
							<img
								src='https://img.icons8.com/color/300/000000/cancel--v1.png'
								alt='error'
								className={s.img}
							/>
						</div>
						<div className={s.buttoncard}>
							<p>An error interrupted the transaction, please try later.</p>
						</div>
					</div>
				</div>
			);
		});
	}, [created, dispatch, search]);

	const handleClick = (e) => {
		e.preventDefault();
		dispatch(createPurchase(purchaseStruct(purchased)));
		console.log(created);
		localStorage.removeItem('cart');
	};
	console.log(purchased);

	return (
		<div className={s.container}>
			<div className={s.card}>
				<div className={s.topcard}>
					{!purchased ? (
						<iframe
							title=' '
							src='https://giphy.com/embed/NEmoHeRrWFvdO4sNaY'
							width='150px'
							height='150px'
							frameBorder='0'
							class='giphy-embed'
							allowFullScreen></iframe>
					) : (
						<img
							src='https://img.icons8.com/office/350/000000/checked--v1.png'
							alt='success'
							className={s.img}
						/>
					)}
				</div>
				<div className={s.buttoncard}>
					{purchased ? (
						<span className={s.messagge}>
							Your purchase was successfully complete!
							{created.hasOwnProperty('id')
								? (window.location.href = `${window.location.origin}/home`)
								: ''}
						</span>
					) : (
						<div className={s.messagge}>
							<span>Verifiying purchase process...</span>
							<Counter />
						</div>
					)}
				</div>
				{purchased ? (
					<button className={s.homebtn} onClick={(e) => handleClick(e)}>
						Return to Home
					</button>
				) : (
					<></>
				)}
			</div>

			<div>
				<a target='_blank' href='https://icons8.com/icon/21068/comprobado'rel='noreferrer'></a>
			</div>
		</div>
	);
};
export default SuccessedPayment;