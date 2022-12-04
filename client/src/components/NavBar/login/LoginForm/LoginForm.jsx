import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers, authTokenRouterLog } from '../../../../redux/actions';
import { useHistory } from 'react-router-dom';
import logoSimbolo from '../../../../asset/logoS.png';
import s from './LoginForm.module.css';
// import queryString from 'query-string';



export const LoginForm = ({location}) => {
	// const {code} =queryString.parse(location.search);
	// const [challengesData, setChallengesData] = useState("none");

	// useEffect(() => {
	//   fetch(`http://localhost:3001/home?code=${code}`, {
	// 	method: 'GET',
	// 	headers: {
	// 	  "Content-Type": "application/json",
	// 	  Accept: "application/json",
	// 	}
	//   })
	//   .then(res => res.json())
	//   .then(res => setChallengesData(JSON.stringify(res)))
	// }, [code]);
  

	const { user, isLoading, loginWithRedirect } = useAuth0();
	const allUser = useSelector((state) => state.allUsers);
	const dispatch = useDispatch();
	const [login, setLogin] = useState({
		email: "john@gmail.com",
		password: "m38rmF$"
	})
	const history = useHistory();

	const usuario = user && allUser.find((u) => u.email === user.email);

	useEffect(() => {
		dispatch(getAllUsers());
	}, [dispatch]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	const log= async ()=>{
		// const domain = 'dev-g1jtn0qvoq0x04y4.us.auth0.com';
    	// const audience = 'https://www.PF---Henry---LatamCom.com';
    	// const scope = "read:PF-Henry";
    	// const clientId = "jSKxgpG26EO0rS6t8vN35jzlpMo9gjPL";
    	// const responseType = "code";
    	// const redirectUri = "http://localhost:3000/home";

		// const response = await fetch(
		// 	`https://${domain}/authorize?` + 
		// 	`audience=${audience}&` + 
		// 	`scope=${scope}&` +
		// 	`response_type=${responseType}&` +
		// 	`client_id=${clientId}&` +
		// 	`redirect_uri=${redirectUri}`, {
		// 	  redirect: "manual"
		// 	}
		//   );
		//   window.location.replace(response.url);
	}

	function handleInputChange(e) {
		e.preventDefault();
		setLogin({
			...login,
			[e.target.name]: e.target.value
		})
	}

	function confirmUser(e) {
		e.preventDefault();
		dispatch(authTokenRouterLog({...login}))
		setLogin({email: "", password: ""})
		history.push("/home")
	}

	return (
		<div className={s.back_ground}>
			<h1 className={s.form_title}>LOG IN WITH</h1>
			<div className={s.conten_form}>
				<div className={s.cont}>
					<img src={logoSimbolo} alt='Logo simbolo' height={'40px'} />
					<br />
					<div className={s.from}>
						<label className={s.label}>Enter your email</label>
						<input className={s.input} name="email" type='text' value={login.email} onInput={e => handleInputChange(e)} placeholder=' Email..' />
						<label className={s.label}>Enter your password</label>
						<input
							className={s.input}
							onInput={(e) => handleInputChange(e)}
							type='text'
							name='password'
							value={login.password}
							placeholder=' Password..'
						/>
					</div>
					<br />
					<button className={s.btn} onClick={(e) => confirmUser(e)}>
						Let`s get started
					</button>
					<br />
					<button className={s.btn} onClick={() => history.push('/CreateUser')}>
						Register
					</button>
					<br />
					<hr width='150px' />
					<h5>Or...</h5>
					<button className={s.btnG} onClick={() => log()}>{/*challengesData*/} 
						<img
							src='https://img.icons8.com/fluency/16/null/google-logo.png'
							alt=''
						/>
						<p className={s.p}>Google</p>
					</button>
				</div>
			</div>
		</div>
	);
};