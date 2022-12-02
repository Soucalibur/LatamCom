// /* eslint-disable no-lone-blocks */
// import React, { useState, useRef, useEffect } from 'react';
// import usericon from '../../../asset/usericon.png';
// import { useSelector } from 'react-redux';
// import { UserName } from '../login/userName';
// // import { Popover, Transition } from "@headlessui/react";
// import './LoginBar.module.css';
// const LoginRegister = () => {
// 	// const dispatch = useDispatch();
// 	const user = useSelector((state) => state.user);
// 	const [open, setOpen] = useState(false);
// 	let menuRef = useRef();





// 	useEffect(() => {
// 		let handler = (e) => {
// 			if (!menuRef.current.contains(e.target)) {
// 				setOpen(false);
// 			}
// 		};

// 		document.addEventListener('mousedown', handler);

// 		return () => {
// 			document.removeEventListener('mousedown', handler);
// 		};
// 	});

// 	return (
// 		<>
// 			<div className='conten_menu' ref={menuRef}>
// 				<div
// 					className='menu'
// 					onClick={() => {
// 						setOpen(!open);
// 					}}>
// 					<img className='imgagen' src={usericon} alt='' height='25px' />
// 					<UserName />

// 					{isAuthenticated ? (
// 						<>
// 							<div className={`dropdown_menu${open ? `active` : `inactive`}`}>
// 								{solutions.map((item) => (
// 									<ul key={item.name} onClick={item.href}>
// 										<DropdownItem className='text' text={item.name} />
// 									</ul>
// 								))}
// 							</div>
// 						</>
// 					) : (
// 						<p onClick={() => loginWithRedirect()}>Login</p>
// 					)}
// 				</div>
// 			</div>
// 		</>
// 	);
// };

// function DropdownItem(props) {
// 	return (
// 		<li className='li'>
// 			<a href={' '}>{props.text}</a>
// 		</li>
// 	);
// }

import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import {
	dropdown_wrapper,
	dropdown_activator,
	dropdown_item_list,
	active,
	item_list,
} from './LoginBar.module.css';

function LoginRegister({ items = [], dropdownTitle }) {
	const history = useHistory();
	const { logout } = useAuth0();

	const userConfig = () => {
		history.push('/profile');
	};

	const Logout = () => {
		Swal.fire({
			title: 'Sure about loging out?',
			icon: 'warning',
			showCancelButton: true,
			cancelButtonColor: '#d33',
			confirmButtonColor: '#3085d6',
			confirmButtonText: 'Log out!',
		}).then((result) => {
			if (result.isConfirmed) {
				logout();
				history.push('/home');
				Swal.fire('Log out succesfully!', '', 'success');
			} else {
				history.push('/home');
				Swal.fire('Log out canceled!', '', 'warning');
			}
		});
	};


	const activatorRef = useRef(null);
	const dropdownListRef = useRef(null);
	const [isOpen, setIsOpen] = useState(false);

	const clickHandler = () => {
		setIsOpen(!isOpen);
	};

	const keyHandler = (event) => {
		if (event.key === 'Escape' && isOpen) {
			setIsOpen(false);
		}
	};

	const clickOutsideHandler = (event) => {
		if (dropdownListRef.current) {
			if (
				dropdownListRef.current.contains(event.target) ||
				activatorRef.current.contains(event.target)
			) {
				return;
			}

			setIsOpen(false);
		}
	};

	useEffect(() => {
		if (isOpen) {
			dropdownListRef.current.querySelector('a').focus();
			document.addEventListener('mousedown', clickOutsideHandler);
		} else {
			document.addEventListener('mousedown', clickOutsideHandler);
		}
	}, [isOpen]);

	return (
		<div className={dropdown_wrapper} onKeyUp={keyHandler}>
			<button
				className={dropdown_activator}
				aria-haspopup='true'
				aria-controls={dropdownTitle}
				onClick={clickHandler}
				ref={activatorRef}>
				{dropdownTitle}{' '}
				{isOpen ? (
					<svg
						height='24'
						fill='rgb(70,70,70)'
						viewBox='0 0 24 24'
						width='24'
						xmlns='http://www.w3.org/2000/svg'>
						<path d='m0 0h24v24h-24z' fill='none' />
						<path d='m7.41 15.41 4.59-4.58 4.59 4.58 1.41-1.41-6-6-6 6z' />
					</svg>
				) : (
					<svg
						height='24'
						fill='rgb(70,70,70)'
						viewBox='0 0 24 24'
						width='24'
						xmlns='http://www.w3.org/2000/svg'>
						<path d='m0 0h24v24h-24z' fill='none' />
						<path d='m7.41 8.59 4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z' />
					</svg>
				)}
			</button>
			<ul
				ref={dropdownListRef}
				className={`${dropdown_item_list} ${isOpen ? active : ''} `}>
				{items.map((item, index) => {
					return (
						<li className={item_list} key={index}>
							<a onClick={e => item.anchor == "Configuration" ? userConfig(e) : Logout(e)}>{item.anchor}</a>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default LoginRegister;
