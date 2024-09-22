"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const RequireAuthentication = (WrappedComponent) => {
   
    
  const WithAuth = (props) => {
    const router = useRouter();

    useEffect(() => {
      // Check if the user is authenticated based on Django's token-based authentication
      const isAuthenticated = checkAuthentication(); 
      router.push('/admin/dashboard');// Implement your authentication check logic

      if (!isAuthenticated) {
        // Redirect to the login page if the user is not authenticated
        router.push('/admin');
      }

    }, [router]);

    // Implement your authentication check logic here
    const checkAuthentication = () => {
      // You can use a library like Axios to make a request to a Django endpoint
      // that verifies the user's authentication status.
      // ...

      // For simplicity, you can return a hardcoded value (true for authenticated, false for not authenticated).
      return true; // Change to false if the user is not authenticated.
    };

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default RequireAuthentication;
