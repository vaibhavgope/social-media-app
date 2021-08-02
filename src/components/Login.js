import React from 'react';

import { GoogleLogin } from 'react-google-login';
import refreshToken from '../utils/refreshToken';
import axios from 'axios'
import { withRouter } from 'react-router-dom';
import config from '../config/config'

const Login = (props) => {
    const onSuccess = async (res) => {
        console.log('[Login Success] currentUser:', res.profileObj)
        try {
            axios.post(`${config.endpoint}/register`, res.profileObj)
                .then(resp => {
                    if (resp.data.email) {
                        props.history.push(`/user/${resp.data.email.split('@')[0]}`)
                    }
                    else throw Object.assign(
                        new Error("Email doesn't exist"),
                        { code: 404 }
                    )
                }
                )
                .catch(err => console.log(err))
        } catch (err) {
            alert('failed to register')
        }
        refreshToken(res)
    }

    const onFailure = (res) => {
        console.log('[Login failed] res:', res);
    }

    return (
        <>
            <GoogleLogin
                clientId={config.clientId}
                buttonText={props.buttonText}
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{ marginTop: '100px' }}
                isSignedIn={true}
            />
        </>
    )
}

export default withRouter(Login);