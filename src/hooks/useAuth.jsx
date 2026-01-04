import React, { use } from 'react';
import { AUthContext } from '../Context/AuthContext';

const useAuth = () => {
    const authInfo = use(AUthContext)
    return authInfo
};

export default useAuth;