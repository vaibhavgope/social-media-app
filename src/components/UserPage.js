import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import config from '../config/config'
import { Paper, TextField, Button } from '@material-ui/core'
import Logout from './Logout';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: '50px',
    },
    '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
    },
    posts: {
        display: 'block',
        position: 'relative',
        left: 20,
        textAlign: 'left'
    },
    paper: {
        margin: 10,
        padding: 10,
        textAlign: 'left'
    },
    element: {
        marginBottom: '20px'
    },
    button: {
        margin: '20px'
    },
    logout: {
        position: 'absolute',
        top: 70,
        right: 20,
    },
    status: {
        color: 'rgba(0, 0, 0, 0.75)',
        '&:hover': {
            color: 'rgba(0,0,0,0.95)',
            cursor: 'pointer'
        }
    }
}));

const UserPage = (props) => {
    const classes = useStyles();
    const [data, setData] = useState({})
    const [displayForm, setDisplayForm] = useState(false)
    const [postText, setPostText] = useState('')
    const [statusForm, setStatusForm] = useState(false)
    const [status, setStatus] = useState('')

    useEffect(() => {
        axios.get(`${config.endpoint}/user/${props.match.params.username}`)
            .then(resp => setData(resp.data))
            .catch(err => console.log(err))
    }, [props.match.params.username])

    const createPost = (e) => {
        axios.post(`${config.endpoint}/posts/create`, { username: props.match.params.username, text: postText })
            .then(resp => console.log('resp = ', resp))
            .catch(err => console.log(err))
    }
    const addStatus = () => {
        axios.post(`${config.endpoint}/profile/${data._id}/edit`, {
            text: status
        }).catch(err => console.log(err))
        console.log('user data =', data);
    }
    return (
        <div className={classes.root}>
            <div className={classes.logout}><Logout /></div>
            <img src={data.image} alt="profile pic" />
            <h1>{data.name}</h1>
            <span className={classes.element}>
                About Me: {<span className={classes.status} onClick={() => setStatusForm(true)}>{data.about || <span>Click here to add your status!</span>}</span>}
                <form className={classes.form} noValidate autoComplete="off" style={{ display: statusForm ? 'block' : 'none' }} onSubmit={addStatus}>
                    <TextField required id="standard-basic" label="Status" value={status} onChange={(e) => setStatus(e.target.value)} />
                    <Button type='submit' variant="contained" color="primary">
                        Update Status
                    </Button>
                </form>
            </span>
            <div className={classes.button}>
                <Button variant="contained" color="primary" onClick={() => setDisplayForm(true)}>
                    Create Post
                </Button>
            </div>
            <div>
                <form className={classes.form} noValidate autoComplete="off" style={{ display: displayForm ? 'block' : 'none' }} onSubmit={createPost}>
                    <TextField required id="standard-basic" label="Post" value={postText} onChange={(e) => setPostText(e.target.value)} />
                    <Button type='submit' variant="contained" color="primary">
                        Add Post
                    </Button>
                </form>
                <div className={classes.posts}>
                    {data.posts && data.posts.length > 0 ?
                        <p>Posts:</p> : <p>Please add some posts!</p>
                    }
                </div>
                {data.posts && data.posts.map(post => {
                    return <Paper className={classes.paper} elevation={3}> {post}</Paper>
                })}
            </div>
        </div>
    )
}

export default withRouter(UserPage)
