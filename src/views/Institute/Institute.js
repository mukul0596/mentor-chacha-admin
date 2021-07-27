import React, { useState, useEffect } from 'react';
import Button from '../../Components/Button/Button';
import Heading from '../../Components/Heading/Heading';
import Input from '../../Components/Input/Input';
import { toast } from 'react-toastify';
import './Institute.css';

const Institute = (props) => {
    const [institute, setInstitute] = useState(null);
    const [isNewInstitute, setIsNewInstitute] = useState(false);

    useEffect(() => {
        if (props.match.params.id === 'new') {
            setInstitute({
                name: '',
                phone: '',
                email: '',
                city: ''
            });
            return setIsNewInstitute(true);
        }

        fetch(`http://localhost:5000/api/admin/institute/${props.match.params.id}`, {
            credentials: 'include',
            headers:{
                "accepts":"application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            setInstitute(data);
        });
    }, []);

    const saveInstitute = (e) => {
        e.preventDefault();
        fetch(isNewInstitute ? 'http://localhost:5000/api/admin/institute' : `http://localhost:5000/api/admin/institute/${props.match.params.id}`, {
            method: isNewInstitute ? 'post' : 'put',
            body: JSON.stringify(institute),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(res => {
            if (res.success) {
                props.history.goBack();
                toast.success('Successfully saved institute!', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            } else {
                toast.error('Oops! Somehing went wrong. Try again!', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            }
        }).catch(err => {
            toast.error('Oops! Somehing went wrong. Try again!', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        });
    }

    return (
        <div className='Institute'>
            <Heading>Create/Edit Institute</Heading>
            {
                institute
                ? <form onSubmit={saveInstitute}>
                    {
                        Object.keys(institute).map(key => {
                            switch (key) {
                                case 'phone':
                                    return (
                                        <Input key={key} type='number' label={key} name={key} value={institute[key]} onChange={(e) => setInstitute({...institute, [key]: e.target.value})} />
                                    )
                                default:
                                    return (
                                        <Input key={key} type='text' label={key} name={key} value={institute[key]} onChange={(e) => setInstitute({...institute, [key]: e.target.value})} />
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

export default Institute;