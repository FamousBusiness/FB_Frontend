"use client";
import React, { createContext, useState, useCallback, useContext, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { message } from 'antd';


const ServerMmode = process.env.NEXT_IS_DEVELOPMENT;
let apiURL = '';


if (ServerMmode === 'True') {
    apiURL = 'http://127.0.0.1:8000'
} else {
    apiURL = 'https://api.famousbusiness.in'
};



const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const router = useRouter();

	const [authTokens, setAuthTokens] = useState(() => {
		if (typeof window !== 'undefined') {
			// Check if running on the client-side
			return Cookies.get('authTokens') ? JSON.parse(Cookies.get('authTokens')) : null;
		}
		return null;
	});


	const [user, setUser] = useState(() => {
		if (typeof window !== 'undefined') {
			// Check if running on the client-side
			return Cookies.get('accessToken') ? jwt_decode(Cookies.get('accessToken')) : null;
		}
		return null
	});

	const [userdata, setUserData] = useState(() => {
		if (typeof window !== 'undefined') {
			return localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null;
		}
		return null;
	});

	const [loading, setLoading] = useState(true);
	const [useloading, setUseloading] = useState(false);

	// const isAuthenticated = useCallback(async () => {
	// 	try {
	// 		const response = await fetch('http://api.famousbusiness.in/api/isauthenticated/', {
	// 			method: 'GET',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 				'Authorization': `Bearer ${Cookies.get('accessToken')}`
	// 			},
	// 		});
	// 		const data = await response.json();
	// 		return data.isAuthenticated === "True";
	// 	} catch (error) {
	// 		console.error('Error checking authentication:', error);
	// 		return false;
	// 	}
	// }, []);


	const registerUser = async (values) => {
		try {
			setUseloading(true);
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			});

			setUseloading(false);

			const data = await response.json();

			if (response.status === 201) {
				if (data.msg) {
					// Display success message and redirect to login page
					message.success(data.msg);
					router.push('/login');
				} else {
					// Handle other cases where there's no 'msg' property
					console.error('Unexpected response:', data);
					message.error('Registration failed. Please try again.');
				}
			} else {
				// Handle error response status codes
				if (data.mobile_number && data.mobile_number[0].length > 0) {
					// Display warning for mobile_number related errors
					message.warning(data.mobile_number[0]);
				} else {
					// Display a generic error message for other cases
					console.error('Registration failed:', data);
					message.error('Registration failed. Please try again.');
				}
			}
		} catch (error) {
			console.error('Error during registration:', error);
			// Handle network error or other errors
			message.error('An error occurred. Please try again later.');
		}
	};


	const registerClientUser = async (values) => {
		try {
			setUseloading(true);

			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/client-register/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			});

			setUseloading(false);

			const data = await response.json();

			if (response.status === 201) {
				if (data.msg) {
					// Display success message and redirect to login page
					message.success(data.msg);
					router.push('/login');
				} else {
					// Handle other cases where there's no 'msg' property
					console.error('Unexpected response:', data);
					message.error('Registration failed. Please try again.');
				}
			} else {
				// Handle error response status codes
				if (data.mobile_number && data.mobile_number[0].length > 0) {
					// Display warning for mobile_number related errors
					message.warning(data.mobile_number[0]);
				} else {
					// Display a generic error message for other cases
					console.error('Registration failed:', data);
					message.error('Registration failed. Please try again.');
				}
			}
		} catch (error) {
			console.error('Error during registration:', error);
			// Handle network error or other errors
			message.error('An error occurred. Please try again later.');
		}
	};

	const loginUser = async (values, pathname) => {
		try {
			setUseloading(true);

			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			});

			const data = await response.json();
			setUseloading(false);

			if (response.ok) {
				// Successful login
				message.success(data.msg);

				setAuthTokens(data.token);
				setUserData({
					name: data.user_name,
					business: data.business_id,
					number: data.mobile_number,
					plan: data.plan_status
				});
				localStorage.setItem('userData', JSON.stringify({
					name: data.user_name,
					business: data.business_id,
					number: data.mobile_number,
					plan: data.plan_status
				}));
				Cookies.set('accessToken', data.token.access);
				setUser(jwt_decode(data.token.access));
				Cookies.set('authTokens', JSON.stringify(data.token), { expires: 15 });
				if (pathname) {
					return; // Redirect to the specified pathname if provided
				} else {
					router.push('/'); // Replace '/default-route' with your desired default route
				}
			} else if (response.status === 400 || response.status === 401) {
				// Display a message for invalid credentials
				alert('Login failed. Please check your credentials.');

			} else {
				// Handle other errors gracefully
				alert('An error occurred during login.');

			}
		} catch (error) {
			console.error('Error during login:', error);
			alert('An error occurred during login.');

		}
	};



	const logoutUser = useCallback(async () => {
		try {
			const refreshToken = authTokens?.refresh; // replace with your method of obtaining the refresh token
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${Cookies.get('accessToken')}`
				},
				body: JSON.stringify({ "refresh_token": refreshToken })
			});
			if (response.ok) {
				// Logout successful on the server, clear local stat
				Cookies.remove('accessToken');
				Cookies.remove('authTokens');
				localStorage.removeItem("userData");
				setAuthTokens(null);
				setUser(null);
				setUserData(null)
				const res = await response.json();
				message.success(res.msg)
				router.push('/')
			} else {
				console.error('Error logging out:', response.statusText);
			}
		} catch (error) {

			console.error('Error logging out:', error);
		}
	}, [setAuthTokens, setUser, authTokens, router]);

	const updateToken = useCallback(async () => {

		// console.log('updatetoken function running');
		
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token/refresh/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ 'refresh': authTokens?.refresh }),
			});
			const data = await response.json();

			if (response.status === 200) {
				setAuthTokens(data)
				Cookies.set('accessToken', data.access);
				setUser(jwt_decode(data.access))
				Cookies.set('authTokens', JSON.stringify(data), { expires: 14 })
			} else {
				logoutUser();
			}

			if (loading) {
				setLoading(false);
			}
		} catch (e) {
			console.error(e);
		}

	}, [authTokens, loading, setUser, logoutUser]);


	useEffect(() => {
		if (loading) {
			updateToken();
		}
		// console.log('useEffect run');

		const nineteen = 1000 * 60 * 60 * 3;

		const interval = setInterval(() => {
			// console.log('Token refresh');
			if (authTokens) {
				updateToken();
			}
		}, nineteen);

		return () => clearInterval(interval);
	}, [authTokens, loading, updateToken]);

	// useEffect(() => {
	// 	if (!isAuthenticated) {
	// 		// Logout successful on the server, clear local stat
	// 		Cookies.remove('accessToken');
	// 		Cookies.remove('authTokens');
	// 		localStorage.removeItem("userData");
	// 		setAuthTokens(null);
	// 		setUser(null);
	// 		setUserData(null)
	// 	}
	// }, [isAuthenticated])

	return (
		<AuthContext.Provider value={{ user, userdata, authTokens, useloading, loginUser, registerClientUser, logoutUser, registerUser }}>
			{loading ? null : children}
		</AuthContext.Provider>
	);
};

const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within a CartProvider');
	}
	return context;
};

export { AuthProvider, useAuth };








