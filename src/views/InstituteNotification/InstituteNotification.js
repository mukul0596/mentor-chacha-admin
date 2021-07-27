import React, { useState, useEffect } from 'react';
import Button from '../../Components/Button/Button';
import Heading from '../../Components/Heading/Heading';
import Input from '../../Components/Input/Input';
import { toast } from 'react-toastify';
import './InstituteNotification.css';

const InstituteNotification = (props) => {
    const [notification, setNotification] = useState(null);
    const [isNewNotification, setIsNewNotification] = useState(false);

    useEffect(() => {
        if (props.match.params.id === 'new') {
            setNotification({
                title: '',
                description: ''
            });
            return setIsNewNotification(true);
        }

        fetch(`http://localhost:5000/api/admin/notification/${props.match.params.id}`, {
            credentials: 'include',
            headers:{
                "accepts":"application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            setNotification(data);
        });
    }, []);

    const saveNotification = (e) => {
        e.preventDefault();
        fetch(isNewNotification ? 'http://localhost:5000/api/admin/notification' : `http://localhost:5000/api/admin/notification/${props.match.params.id}`, {
            method: isNewNotification ? 'post' : 'put',
            body: JSON.stringify({...notification, instituteId: props.match.params.instituteId}),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(res => {
            if (res.success) {
                props.history.goBack();
                toast.success('Successfully saved notification!', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            } else {
                toast.error('Oops! Somehing went wrong. Try again!', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            }
        }).catch(err => {
            toast.error('Oops! Somehing went wrong. Try again!', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        });
    }

    return (
        <div className='Notification'>
            <Heading>Create/Edit Notification</Heading>
            {
                notification
                ? <form onSubmit={saveNotification}>
                    {
                        Object.keys(notification).map(key => {
                            switch (key) {
                                case 'description':
                                    return (
                                        <Input key={key} type='editor' label={key} name={key} value={notification[key]} onChange={(e, editor) => setNotification({...notification, [key]: editor.getData()})} />
                                    )
                                default:
                                    return (
                                        <Input key={key} type='text' label={key} name={key} value={notification[key]} onChange={(e) => setNotification({...notification, [key]: e.target.value})} />
                                    )
                            }
                        })
                    }
                    <div className='Button-Wrapper'>
                        <Button type='submit'>Save</Button>
                        <Button type='button' color='secondary' onClick={() => props.history.goBack()}>Cancel</Button>
                    </div>
                </form>
                : 'Loading...'
            }
        </div>
    )
}

export default InstituteNotification;