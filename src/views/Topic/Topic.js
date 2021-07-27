import React, { useState, useEffect } from 'react';
import Button from '../../Components/Button/Button';
import Heading from '../../Components/Heading/Heading';
import Input from '../../Components/Input/Input';
import { toast } from 'react-toastify';
import './Topic.css';

const Topic = (props) => {
    const [topic, setTopic] = useState(null);
    const [isNewTopic, setIsNewTopic] = useState(false);

    useEffect(() => {
        if (props.match.params.id === 'new') {
            setTopic({
                name: '',
                subject: 'Physics'
            });
            return setIsNewTopic(true);
        }

        fetch(`http://localhost:5000/api/admin/topic/${props.match.params.id}`, {
            credentials: 'include',
            headers:{
                "accepts":"application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            setTopic(data);
        });
    }, []);

    const saveTopic = (e) => {
        e.preventDefault();
        fetch(isNewTopic ? 'http://localhost:5000/api/admin/topic' : `http://localhost:5000/api/admin/topic/${props.match.params.id}`, {
            method: isNewTopic ? 'post' : 'put',
            body: JSON.stringify(topic),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(res => {
            if (res.success) {
                props.history.goBack();
                toast.success('Successfully saved topic!', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            } else {
                toast.error('Oops! Somehing went wrong. Try again!', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            }
        }).catch(err => {
            toast.error('Oops! Somehing went wrong. Try again!', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        });
    }

    return (
        <div className='Topic'>
            <Heading>Create/Edit Topic</Heading>
            {
                topic
                ? <form onSubmit={saveTopic}>
                    <Input type='text' label={'Name'} name={'name'} value={topic.name} onChange={(e) => setTopic({...topic, name: e.target.value})} />
                    <Input type='select' label='Subject' name='subject' value={topic.subject} onChange={(e) => setTopic({...topic, subject: e.target.value})}>
                        <option value='Physics'>Physics</option>
                        <option value='Chemistry'>Chemistry</option>
                        <option value='Maths'>Maths</option>
                        <option value='Biology'>Biology</option>
                    </Input>
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

export default Topic;