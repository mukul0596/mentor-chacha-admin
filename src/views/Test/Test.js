import React, { useState, useEffect } from 'react';
import Button from '../../Components/Button/Button';
import Heading from '../../Components/Heading/Heading';
import Input from '../../Components/Input/Input';
import { toast } from 'react-toastify';
import './Test.css';

const Test = (props) => {
    const [test, setTest] = useState(null);
    const [isNewTest, setIsNewTest] = useState(false);

    useEffect(() => {
        if (props.match.params.id === 'new') {
            setTest({
                title: '',
                for: 'PCM',
                class: '11',
                pattern: 'JEE Mains',
                subjects: [],
                date: ''
            });
            return setIsNewTest(true);
        }

        fetch(`http://localhost:5000/api/admin/test/${props.match.params.id}`, {
            credentials: 'include',
            headers:{
                "accepts":"application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            data.date = data.date.substr(0, 10);
            setTest(data);
        });
    }, []);

    const saveTest = (e) => {
        e.preventDefault();
        fetch(isNewTest ? 'http://localhost:5000/api/admin/test' : `http://localhost:5000/api/admin/test/${props.match.params.id}`, {
            method: isNewTest ? 'post' : 'put',
            body: JSON.stringify({...test, instituteId: props.match.params.instituteId}),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(res => {
            if (res.success) {
                props.history.goBack();
                toast.success('Successfully saved test!', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            } else {
                toast.error('Oops! Somehing went wrong. Try again!', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            }
        }).catch(err => {
            toast.error('Oops! Somehing went wrong. Try again!', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        });
    }

    return (
        <div className='Test'>
            <Heading>Create/Edit Test</Heading>
            {
                test
                ? <form onSubmit={saveTest}>
                    {
                        Object.keys(test).map(key => {
                            switch (key) {
                                case 'date':
                                    return (
                                        <Input key={key} type='date' label={key} name={key} value={test[key]} onChange={(e) => setTest({...test, [key]: e.target.value})} />
                                    )
                                case 'for':
                                    return (
                                        <Input key={key} type='select' label={key} name={key} value={test[key]} onChange={(e) => setTest({...test, [key]: e.target.value})}>
                                            <option value='PCM'>PCM</option>
                                            <option value='PCB'>PCB</option>
                                        </Input>
                                    )
                                case 'class':
                                    return (
                                        <Input key={key} type='select' label={key} name={key} value={test[key]} onChange={(e) => setTest({...test, [key]: e.target.value})}>
                                            <option value='11'>11</option>
                                            <option value='12'>12</option>
                                            <option value='13'>13</option>
                                        </Input>
                                    )
                                case 'pattern':
                                    return (
                                        <Input key={key} type='select' label={key} name={key} value={test[key]} onChange={(e) => setTest({...test, [key]: e.target.value})}>
                                            <option value='JEE Mains'>JEE Mains</option>
                                            <option value='JEE Advanced'>JEE Advanced</option>
                                            <option value='NEET'>NEET</option>
                                            <option value='Board'>Board</option>
                                        </Input>
                                    )
                                case 'subjects':
                                    return (
                                        <Input key={key} type='multipleSelect' label={key} name={key} value={test[key]} onChange={(e) => setTest({...test, [key]: [...e.target.options].filter(option => option.selected).map(option => option.value)})}>
                                            <option value='Physics'>Physics</option>
                                            <option value='Chemistry'>Chemistry</option>
                                            <option value='Maths'>Maths</option>
                                            <option value='Biology'>Biology</option>
                                        </Input>
                                    )
                                default:
                                    return (
                                        <Input key={key} type='text' label={key} name={key} value={test[key]} onChange={(e) => setTest({...test, [key]: e.target.value})} />
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

export default Test;