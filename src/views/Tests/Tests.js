import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../Components/Button/Button';

const Tests = (props) => {
    const [tests, setTests] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/admin/test`, {
            credentials: 'include',
            headers:{
                "accepts":"application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            setTests(data);
        });
    }, []);

    const deleteTest = (id, index) => {
        const isSure = window.confirm('Are you sure, you want to delete this test?');

        if (isSure) {
            fetch(`http://localhost:5000/api/admin/test/${id}`, {
                method: 'delete',
                credentials: 'include',
                headers:{
                    "accepts":"application/json"
                }
            })
            .then(res => res.json())
            .then(data => {
                const newTests = [...tests];
                newTests.splice(index, 1);
                setTests(newTests);
            }); 
        }
    }

    return (
        <div className='Test'>
            <div className='Top-Button-Container'>
                <Link to={`${props.location.pathname}/new`}>
                    <Button>+ New Test</Button>
                </Link>
            </div>
            {
                tests
                ? <table cellSpacing={0}>
                    <thead>
                        <tr>
                            <td>Title</td>
                            <td>For</td>
                            <td>Class</td>
                            <td>Pattern</td>
                            <td>Subjects</td>
                            <td>Date</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tests.map((test, index) => (
                                <tr key={test._id}>
                                    <td>{test.title}</td>
                                    <td>{test.for}</td>
                                    <td>{test.class}</td>
                                    <td>{test.pattern}</td>
                                    <td>{test.subjects.join(', ')}</td>
                                    <td>{test.date}</td>
                                    <td className='Action-Container'>
                                        <Link to={`${props.location.pathname}/${test._id}`}>
                                            <button className='Normal'>Edit</button>
                                        </Link>
                                        <Link to={`${props.location.pathname}/${test._id}/testPaper`}>
                                            <button className='Normal'>Test Paper</button>
                                        </Link>
                                        <Link to={`${props.location.pathname}/${test._id}/testResponse`}>
                                            <button className='Normal'>Response</button>
                                        </Link>
                                        <button className='Danger' onClick={() => deleteTest(test._id, index)}>Delete</button>
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

export default Tests;