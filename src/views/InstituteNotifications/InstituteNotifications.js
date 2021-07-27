import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../Components/Button/Button';

const InstituteNotifications = (props) => {
    const [notifications, setNotifications] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/admin/notification/${props.match.params.instituteId}/titles`, {
            credentials: 'include',
            headers:{
                "accepts":"application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            setNotifications(data);
        });
    }, []);

    const deleteNotification = (id, index) => {
        const isSure = window.confirm('Are you sure, you want to delete this notification?');

        if (isSure) {
            fetch(`http://localhost:5000/api/admin/notification/${id}`, {
                method: 'delete',
                credentials: 'include',
                headers:{
                    "accepts":"application/json"
                }
            })
            .then(res => res.json())
            .then(data => {
                const newNotifications = [...notifications];
                newNotifications.splice(index, 1);
                setNotifications(newNotifications);
            }); 
        }
    }

    return (
        <div className='Notifications'>
            <div className='Top-Button-Container'>
                <Link to={`${props.location.pathname}/new`}>
                    <Button>+ New Notification</Button>
                </Link>
            </div>
            {
                notifications
                ? <table cellSpacing={0}>
                    <thead>
                        <tr>
                            <td>Title</td>
                            <td>Created At</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            notifications.map((notification, index) => (
                                <tr key={notification._id}>
                                    <td>{notification.title}</td>
                                    <td>{notification.createdAt}</td>
                                    <td className='Action-Container'>
                                        <Link to={`${props.location.pathname}/${notification._id}`}>
                                            <button className='Normal'>Edit</button>
                                        </Link>
                                        <button className='Danger' onClick={() => deleteNotification(notification._id, index)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                : 'Loading...'
            }
        </div>
    )
}

export default InstituteNotifications;