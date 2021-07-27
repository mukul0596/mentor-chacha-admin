import React, { useState, useEffect } from 'react';
import Button from '../../Components/Button/Button';
import Heading from '../../Components/Heading/Heading';
import { toast } from 'react-toastify';
import './TestResponse.css';

const TestResponse = (props) => {
    const [testPaper, setTestPaper] = useState(null);
    const [testResponse, setTestResponse] = useState(null);
    const [isNewTestResponse, setIsNewTestResponse] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5000/api/admin/testPaper/${props.match.params.testId}`, {
            credentials: 'include',
            headers:{
                "accepts":"application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            if (Object.keys(data).length)
                setTestPaper(data);
            else
                setTestPaper({
                    testId: props.match.params.testId,
                    questions: []
                });
        });
        
        fetch(`http://localhost:5000/api/admin/testResponse/${props.match.params.testId}/${props.match.params.userId}`, {
            credentials: 'include',
            headers:{
                "accepts":"application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            if (Object.keys(data).length)
                setTestResponse(data);
            else {
                setTestResponse({
                    testId: props.match.params.testId,
                    userId: props.match.params.userId,
                    response: []
                });

                setIsNewTestResponse(true);
            }
        });
    }, []);

    const saveTestResponse = () => {
        fetch(isNewTestResponse ? 'http://localhost:5000/api/admin/testResponse' : `http://localhost:5000/api/admin/testResponse/${testResponse._id}`, {
            method: isNewTestResponse ? 'post' : 'put',
            body: JSON.stringify(testResponse),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(res => {
            if (res.success) {
                props.history.goBack();
                toast.success('Successfully saved test response!', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            } else {
                toast.error('Oops! Somehing went wrong. Try again!', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            }
        }).catch(err => {
            toast.error('Oops! Somehing went wrong. Try again!', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        });
    }

    const getResponse = (questionId, type, i) => {
        const reqResp = testResponse.response.find((response => response.questionId === questionId));
        switch (type) {
            case 'NumericalValue':
                return reqResp ? reqResp.answer[0] : '';

            case 'MCQ':
            case 'MultipleMCQ':
                return reqResp ? reqResp.answer.includes(i): false;

            default:
                break;
        }
    }

    const numAnsChangeHandler = (e, questionId) => {
        const newResp = {...testResponse};
        const reqResp = newResp.response.find((response => response.questionId === questionId));
        if (reqResp)
            reqResp.answer[0] = e.target.value;
        else
            newResp.response.push({
                questionId,
                answer: [e.target.value]
            });

        setTestResponse(newResp);
    }

    const mcqAnsChangeHandler = (e, questionId, i) => {
        const newResp = {...testResponse};
        let reqResp = newResp.response.find((response => response.questionId === questionId));

        if (!reqResp) {
            newResp.response.push({
                questionId,
                answer: []
            });

            reqResp = newResp.response.find((response => response.questionId === questionId));
        }

        if (e.target.checked)
            reqResp.answer.push(i);
        else
            reqResp.answer.splice(reqResp.answer.indexOf(Number(i)), 1);

        setTestResponse(newResp);
    }

    const questions = {};

    if (testPaper && testResponse) {
        testPaper.questions.map(question => {
            if (questions[question.subject])
                questions[question.subject].push(
                    <div className='Question-Card' key={question._id}>
                        <div className='Title'>Question {questions[question.subject].length + 1}</div>
                        <div className='Question'>{question.question}</div>
                        {
                            question.type === 'NumericalValue'
                            ? <input type='text' value={getResponse(question._id, question.type)} onChange={(e) => numAnsChangeHandler(e, question._id)} />
                            : question.type === 'MCQ'
                            ? question.options.map((option, i) => (
                                <div key={option} className='Row'>
                                    <input type='radio' name={question._id} id={option} checked={getResponse(question._id, question.type, i)} onChange={(e) => mcqAnsChangeHandler(e, question._id, i)} />
                                    <label htmlFor={option}>{option}</label>
                                </div>
                            ))
                            : question.options.map((option, i) => (
                                <div key={option} className='Row'>
                                    <input type='checkbox' name={option} id={option} checked={getResponse(question._id, question.type, i)} onChange={(e) => mcqAnsChangeHandler(e, question._id, i)} />
                                    <label htmlFor={option}>{option}</label>
                                </div>
                            ))
                        }
                    </div>
                )
            else
                questions[question.subject] = [
                    <div className='Question-Card' key={question._id}>
                        <div className='Title'>Question {1}</div>
                        <div className='Question'>{question.question}</div>
                        {
                            question.type === 'NumericalValue'
                            ? <input type='text' value={getResponse(question._id, question.type)} onChange={(e) => numAnsChangeHandler(e, question._id)} />
                            : question.type === 'MCQ'
                            ? question.options.map((option, i) => (
                                <div key={option} className='Row'>
                                    <input type='radio' name={question._id} id={option} checked={getResponse(question._id, question.type, i)} onChange={(e) => mcqAnsChangeHandler(e, question._id, i)} />
                                    <label htmlFor={option}>{option}</label>
                                </div>
                            ))
                            : question.options.map((option, i) => (
                                <div key={option} className='Row'>
                                    <input type='checkbox' name={option} id={option} checked={getResponse(question._id, question.type, i)} onChange={(e) => mcqAnsChangeHandler(e, question._id, i)} />
                                    <label htmlFor={option}>{option}</label>
                                </div>
                            ))
                        }
                    </div>
                ]
            return null;
        })
    }

    return (
        <div className='Test-Response'>
            <Heading>Test Response</Heading>
            {
                testPaper && testResponse
                ? <div className='Question-Container'>
                    {
                        Object.keys(questions).map(subject => (
                            <div key={subject}>
                                <div className='Subject'>{subject}</div>
                                {
                                    questions[subject]
                                }
                            </div>
                        ))
                    }

                    <div className='Question-Card'>
                        <div className='Field-Wrapper'>
                            <label htmlFor='remarks' className='Blue'>Remarks: </label>
                            <textarea name='remarks' id='remarks' placeholder='(If any)' value={testResponse.remarks} onChange={(e) => setTestResponse({...testResponse, remarks: e.target.value})} />
                        </div>
                    </div>

                    <div className='Button-Wrapper'>
                        <Button onClick={saveTestResponse}>Save</Button>
                        <Button type='button' color='secondary' onClick={() => props.history.goBack()}>Cancel</Button>
                    </div>
                </div>
                : 'Loading...'
            }
        </div>
    )
}

export default TestResponse;