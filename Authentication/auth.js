"use client";

import React, { createContext, useState, useCallback, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { message } from 'antd';
import axios from 'axios';



const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const router                      = useRouter();
	const [loading, setLoading]       = useState(true);
	const [useloading, setUseloading] = useState(false);
	const [apiURL, setAPIURL]           = useState(process.env.NEXT_PUBLIC_IS_DEVELOPMENT === 'True' ? 'http://127.0.0.1:8000' : 'https://api.famousbusiness.in')


	const [apiUrl, setAPIUrl] =  useState(
		process.env.NEXT_PUBLIC_IS_DEVELOPMENT === 'True' ? 'http://127.0.0.1:8000/api' : 'https://api.famousbusiness.in/api'
	);


	const [authTokens, setAuthTokens] = useState(() => {
		if (typeof window !== 'undefined') {
			// Check if running on the client-side
			return localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null ;
		}
		return null;
	});

    
	const [user, setUser] = useState(() => {
		if (typeof window !== 'undefined') {
			// Check if running on the client-side
			// return localStorage.getItem('accessToken') ? jwtDecode(localStorage.getItem('accessToken')) : null ;
		}

		return null
	});
    
    
	const [userdata, setUserData] = useState(() => {
		if (typeof window !== 'undefined') {
			return localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null;
		}
		return null;
	});
    
	
    
	///// ChecK user is Authenticated or not
	const isAuthenticated = async (token)=> {
		try {
			if (token) {
				const response = await axios.post(`${apiURL}/api/token/verify/`, { token: token });
	
				if (response.status === 200) {
					return true; // Authentication successful
				}
			}
	
			return false; // Token is invalid or verification failed
		} catch (error) {
			if (error.response?.status === 401) {
				return false; // Token verification failed
			}
	
			message.error('Error occurred during authentication.');
			return false; // Return false on other errors
		}
	};


    

	const registerUser = async (values) => {
		try {
			setUseloading(true);
			const response = await fetch(`${apiUrl}/register/`, {
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
			// console.error('Error during registration:', error);
			// Handle network error or other errors
			message.error('An error occurred. Please try again later.');
		}
	};



	const registerClientUser = async (values) => {
		try {
			setUseloading(true);

			const response = await fetch(`${apiUrl}/client-register/`, {
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

			const response = await fetch(`${apiUrl}/login/`, {
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

				// Cookies.set('accessToken', data.token.access);
				localStorage.setItem('accessToken', data.token.access)

				setUser(jwtDecode(data.token.access));

				// Cookies.set('authTokens', JSON.stringify(data.token), { expires: 15 });
				localStorage.setItem('authTokens', JSON.stringify(data.token))

				if (pathname) {
					window.location.reload()
					return; // Redirect to the specified pathname if provided
				} else {
					router.push('/'); // Replace '/default-route' with your desired default route
					window.location.reload()
				}

			} else if (response.status === 400 || response.status === 401) {
				// Display a message for invalid credentials
				alert('Login failed. Please check your credentials.');

			} else {
				// Handle other errors gracefully
				alert('An error occurred during login.');

			}
		} catch (error) {
			// console.error('Error during login:', error);
			alert('An error occurred during login.');
		}
	};



	const logoutUser = useCallback(async () => {
		try {
			const authToken = localStorage.getItem('authTokens') 
			const parsedToken = authToken ? JSON.parse(authToken) : {}; 
			const refreshToken = parsedToken.refresh;
			
			const response = await fetch(`${apiUrl}/logout/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
				},
				body: JSON.stringify({ "refresh_token": refreshToken })
			});

			if (response.ok) {
				// console.log('logged out')
				localStorage.removeItem("userData");
				localStorage.removeItem("accessToken");
				localStorage.removeItem("authTokens");

				setAuthTokens(null);
				setUser(null);
				setUserData(null)
				const res = await response.json();

				message.success(res.msg)
				router.push('/')

				window.location.reload()

			} else {
				console.error('Error logging out:', response);
			}
		} catch (error) {
			console.error('Error logging out:', error);

		} finally {
			localStorage.getItem("accessToken") ? localStorage.removeItem("accessToken") : null;
			localStorage.getItem("authTokens")  ? localStorage.removeItem('authTokens') : null;
			window.location.reload()
		}

	}, [setAuthTokens, setUser, authTokens, router]);



	 // Refresh Token
	// const updateToken = useCallback(async () => {

	// 	try {
	// 		const response = await fetch(`${apiUrl}/token/refresh/`, {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			},
	// 			body: JSON.stringify({ 'refresh': authTokens?.refresh }),
	// 		});

	// 		const data = await response.json();

	// 		if (response.status === 200) {
	// 			setAuthTokens(data)

	// 			// Cookies.set('accessToken', data.access);
	// 			localStorage.setItem('accessToken', data.access)

	// 			setUser(jwtDecode(data.access))

	// 			// Cookies.set('authTokens', JSON.stringify(data), { expires: 14 })
	// 			localStorage.setItem('authTokens', JSON.stringify(data))

	// 		} else {
	// 			logoutUser();
	// 		}

	// 		// if (loading) {
	// 		// 	setLoading(false);
	// 		// }

	// 	} catch (e) {
	// 		console.error(e);
	// 	}

	// // }, [authTokens, loading, setUser, logoutUser]);
	// }, [authTokens, setUser, logoutUser]);


	// useEffect(() => {
	// 	if (loading) {
	// 		updateToken();
	// 	}
	// 	// console.log('useEffect run');

	// 	const nineteen = 1000 * 60 * 60 * 3;

	// 	const interval = setInterval(() => { 
	// 		// console.log('Token refresh');
	// 		if (authTokens) {
	// 			updateToken();
	// 		}
	// 	}, nineteen);

	// 	return () => clearInterval(interval);
	// }, [authTokens, loading, updateToken]);



	return (
		<AuthContext.Provider value={{ user, userdata, authTokens, useloading, loginUser, registerClientUser, logoutUser, registerUser, isAuthenticated }}>
			{/* {loading ? null : children} */}
			{children}
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

