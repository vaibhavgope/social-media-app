import React from 'react'
import { GoogleLogout } from 'react-google-login';
import { withRouter } from 'react-router-dom';
import config from '../config/config';

const Logout = (props) => {
    const onSuccess = () => {
        props.history.push('/')
    }
    return (
        <>
            <GoogleLogout
                clientId={config.clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            />
        </>
    )
}

export default withRouter(Logout)