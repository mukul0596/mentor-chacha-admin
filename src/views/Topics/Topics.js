import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import './Topics.css';

const Topics = (props) => {
    const [topics, setTopics] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/admin/topic', {
            credentials: 'include',
            headers:{
                "accepts":"application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            setTopics(data);
        });
    }, []);

    const deleteTopic = (id, index) => {
        const isSure = window.confirm('Are you sure, you want to delete this topic?');

        if (isSure) {
            fetch(`http://localhost:5000/api/admin/topic/${id}`, {
                method: 'delete',
                credentials: 'include',
                headers:{
                    "accepts":"application/json"
                }
            })
            .then(res => res.json())
            .then(data => {
                const newTopics = [...topics];
                newTopics.splice(index, 1);
                setTopics(newTopics);
            }); 
        }
    }

    return (
        <div className='Topics'>
            <div className='Top-Button-Container'>
                <Link to={`${props.location.pathname}/new`}>
                    <Button>+ New Topic</Button>
                </Link>
            </div>
            {
                topics
                ? <table cellSpacing={0}>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Subject</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            topics.map((topic, index) => (
                                <tr key={topic._id}>
                                    <td>{topic.name}</td>
                                    <td>{topic.subject}</td>
                                    <td className='Action-Container'>
                                        <Link to={`${props.location.pathname}/${topic._id}`}>
                                            <button className='Normal'>Edit</button>
                                        </Link>
                                        <button className='Danger' onClick={() => deleteTopic(topic._id, index)}>Delete</button>
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

export default Topics;