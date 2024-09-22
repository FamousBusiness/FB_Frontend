
import React from 'react';

import Plan from './components/Plan';

function Page() {

    // useEffect(() => {
    //     if (!user) {
    //         router.push('/login');
    //     }
    // }, [user, router]);

    // if (user) {
    //     return <Gold />;
    // }

    // You might want to render a loader or something else
    // while checking the authentication status
    // return <Loading/>;
    return (
        <div className=' min-h-screen sm:p-10 sm:bg-stone-200 relative  overflow-hidden'>
            <Plan />
        </div>
    )
}

export default Page;
