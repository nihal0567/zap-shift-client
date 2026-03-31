import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Rider from "../Pages/Rider/Rider";
import SendParcel from "../Pages/SendParcel/SendParcel";
import Loading from "../Pages/Shared/Loading";
import DashboardLayout from "../Layout/DashboardLayout";
import MyParcel from "../Pages/Dashboard/MyParcel/MyParcel";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../Pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../Pages/Dashboard/Payment/PaymentHistory";
import ApproveRiders from "../Pages/Rider/ApproveRiders";
import UsersManagement from "../Pages/Dashboard/UserManagement/UsersManagement";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../Pages/Dashboard/AssignRiders/AssignRiders";
import AssignedDeliveries from "../Pages/Dashboard/AssignedDeliveries/AssignedDeliveries";
import RiderRoute from "./RiderRoute";
import CompletedDeliveries from "../Pages/Dashboard/CompletedDeliveries/CompletedDeliveries";
import ParcelTrack from "../Pages/ParcelTrack/ParcelTrack";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'rider',
                element: <PrivateRoute><Rider></Rider> </PrivateRoute>,
                loader:()=> fetch('/serviceCenters.json').then(res=> res.json()),
                hydrateFallbackElement: <Loading/>
            },
            {
                path: 'send-parcel',
                element: <PrivateRoute><SendParcel/></PrivateRoute>,
                loader:()=> fetch('/serviceCenters.json').then(res=> res.json()),
                hydrateFallbackElement: <Loading/>
            },
            {
                path: 'coverage',
                Component: Coverage,
                loader:()=> fetch('/serviceCenters.json').then(res=> res.json())
            },
            {
                path: 'parcel-track/:trackingId',
                Component: ParcelTrack
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                index: true,
                Component: DashboardHome
            },
            {
                path: 'my-parcels',
                Component: MyParcel
            },
            {
                path: 'payment/:parcelId',
                Component: Payment
            },
            {
                path: 'payment-history',
                Component: PaymentHistory
            },
            {
                path: 'payment-success',
                Component: PaymentSuccess
            },
            {
                path: 'payment-cancelled',
                Component: PaymentCancelled
            },
            //rider only routes
            {
                path: 'assigned-deliveries',
                element: <RiderRoute><AssignedDeliveries/></RiderRoute>
            },
            {
                path: 'completed-deliveries',
                element: <RiderRoute><CompletedDeliveries/></RiderRoute>
            },
            //admin only routes
            {
                path: 'approve-riders',
                element: <AdminRoute><ApproveRiders/></AdminRoute>
            },
            {
                path: 'users-management',
                element: <AdminRoute><UsersManagement/></AdminRoute>
            },
            {
                path: 'assign-riders',
                element: <AdminRoute><AssignRiders/></AdminRoute>
            }
        ]
    }
])