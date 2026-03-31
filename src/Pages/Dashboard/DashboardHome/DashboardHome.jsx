import React from 'react';
import useRole from '../../../hooks/useRole';
import Loading from '../../Shared/Loading';
import DashboardAdminHome from './DashboardAdminHome';
import DashboardRiderHome from './DashboardRiderHome';
import DashboardUserHome from './DashboardUserHome';

const DashboardHome = () => {
    const {role, roleLoading} = useRole()

    if (roleLoading) {
        return <Loading />
    }

    if (role === 'admin') {
        return <DashboardAdminHome />
    }

    else if (role === 'rider') {
        return <DashboardRiderHome />
    }

    else{
        return <DashboardUserHome />
    }
};

export default DashboardHome;