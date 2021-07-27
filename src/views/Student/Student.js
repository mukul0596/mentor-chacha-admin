import React, { useState, useEffect } from 'react';
import Button from '../../Components/Button/Button';
import Heading from '../../Components/Heading/Heading';
import Input from '../../Components/Input/Input';
import { toast } from 'react-toastify';
import './Student.css';

const Student = (props) => {
    const [student, setStudent] = useState(null);
    const [isNewStudent, setIsNewStudent] = useState(false);

    useEffect(() => {
        if (props.match.params.id === 'new') {
            setStudent({
                name: '',
                phone: '',
                email: '',
                class: '',
                age: '',
                gender: 'Male',
                category: 'General'
            });
            return setIsNewStudent(true);
        }

        fetch(`http://localhost:5000/api/admin/student/${props.match.params.id}`, {
            credentials: 'include',
            headers:{
                "accepts":"application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            setStudent(data);
        });
    }, []);

    const saveStudent = (e) => {
        e.preventDefault();
        fetch(isNewStudent ? 'http://localhost:5000/api/admin/student' : `http://localhost:5000/api/admin/student/${props.match.params.id}`, {
            method: isNewStudent ? 'post' : 'put',
            body: JSON.stringify({...student, instituteId: props.match.params.instituteId}),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(res => {
            if (res.success) {
                props.history.goBack();
                toast.success('Successfully saved student!', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            } else {
                toast.error('Oops! Somehing went wrong. Try again!', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            }
        }).catch(err => {
            toast.error('Oops! Somehing went wrong. Try again!', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        });
    }

    return (
        <div className='Student'>
            <Heading>Create/Edit Student</Heading>
            {
                student
                ? <form onSubmit={saveStudent}>
                    {
                        Object.keys(student).map(key => {
                            switch (key) {
                                case 'phone':
                                case 'class':
                                case 'age':
                                    return (
                                        <Input key={key} type='number' label={key} name={key} value={student[key]} onChange={(e) => setStudent({...student, [key]: e.target.value})} />
                                    )
                                case 'stream':
                                    return (
                                        <Input key={key} type='select' label={key} name={key} value={student[key]} onChange={(e) => setStudent({...student, [key]: e.target.value})}>
                                            <option value='PCM'>PCM</option>
                                            <option value='PCB'>PCB</option>
                                        </Input>
                                    )
                                case 'gender':
                                    return (
                                        <Input key={key} type='select' label={key} name={key} value={student[key]} onChange={(e) => setStudent({...student, [key]: e.target.value})}>
                                            <option value='Male'>Male</option>
                                            <option value='Female'>Female</option>
                                        </Input>
                                    )
                                case 'category':
                                    return (
                                        <Input key={key} type='select' label={key} name={key} value={student[key]} onChange={(e) => setStudent({...student, [key]: e.target.value})}>
                                            <option value='General'>General</option>
                                            <option value='OBC'>OBC</option>
                                            <option value='SC'>SC</option>
                                            <option value='ST'>ST</option>
                                        </Input>
                                    )
                                default:
                                    return (
                                        <Input key={key} type='text' label={key} name={key} value={student[key]} onChange={(e) => setStudent({...student, [key]: e.target.value})} />
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

export default Student;