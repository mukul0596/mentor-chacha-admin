import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import Heading from '../../Components/Heading/Heading';
import { toast } from 'react-toastify';

const TestResponseList = (props) => {
    const [testResponseLists, setTestResponseLists] = useState(null);
    const [testResults, setTestResults] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/admin/testResponse/${props.match.params.instituteId}/${props.match.params.testId}/testResponseList`, {
            credentials: 'include',
            headers:{
                "accepts":"application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            setTestResponseLists(data);
        });

        fetch(`http://localhost:5000/api/admin/testResult/${props.match.params.testId}`, {
            credentials: 'include',
            headers:{
                "accepts":"application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            setTestResults(data);
        });
    }, []);

    const evaluateTest = () => {
        fetch(`http://localhost:5000/api/admin/testResult/${props.match.params.testId}`, {
            method: 'post',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(res => {
            if (res.success) {
                toast.success('Successfully saved topic!', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            } else {
                toast.error('Oops! Somehing went wrong. Try again!', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            }
        }).catch(err => {
            toast.error('Oops! Somehing went wrong. Try again!', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        });
    }

    return (
        <div className='TestResponseList'>
            {
                testResponseLists
                ? <>
                    <table cellSpacing={0}>
                        <thead>
                            <tr>
                                <td>UserId</td>
                                <td>Name</td>
                                <td>Phone</td>
                                <td>Email</td>
                                <td>Class</td>
                                <td>Stream</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                testResponseLists.map(testResponseList => (
                                    <tr key={testResponseList._id}>
                                        <td>{testResponseList._id}</td>
                                        <td>{testResponseList.name}</td>
                                        <td>{testResponseList.phone}</td>
                                        <td>{testResponseList.email}</td>
                                        <td>{testResponseList.class}</td>
                                        <td>{testResponseList.stream}</td>
                                        <td className='Action-Container'>
                                            <Link to={`${props.location.pathname}/${testResponseList._id}`}>
                                                <button className='Normal'>Manage Response</button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                    <div className='Top-Button-Container'>
                        <Button onClick={evaluateTest}>Evaluate Test</Button>
                    </div>
                </>
                : 'Loading...'
            }

            <Heading>Analysis Report</Heading>

            {
                testResults
                ? <>
                    <table cellSpacing={0}>
                        <thead>
                            <tr>
                                <td>UserId</td>
                                <td>Rank</td>
                                <td>Marks</td>
                                <td>Total Marks</td>
                                <td>Percentage</td>
                                <td>Attempted</td>
                                <td>Unattempted</td>
                                <td>Correct</td>
                                <td>Incorrect</td>
                                <td>Accuracy</td>
                                <td>Average</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                testResults.map(testResult => (
                                    <tr key={testResult._id}>
                                        <td>{testResult.userId}</td>
                                        <td>{testResult.rank}</td>
                                        <td>{testResult.marks}</td>
                                        <td>{testResult.totalMarks}</td>
                                        <td>{testResult.percentage.toFixed(2)}</td>
                                        <td>{testResult.attempted}</td>
                                        <td>{testResult.unattempted}</td>
                                        <td>{testResult.correct}</td>
                                        <td>{testResult.incorrect}</td>
                                        <td>{testResult.accuracy}</td>
                                        <td>{testResult.average.toFixed(2)}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </>
                : 'Loading...'
            }
        </div>
    )
}

export default TestResponseList;