import React, { useState, useEffect } from 'react';
import Button from '../../Components/Button/Button';
import Heading from '../../Components/Heading/Heading';
import { toast } from 'react-toastify';
import './TestPaper.css';

const TestPaper = (props) => {
    const [testPaper, setTestPaper] = useState(null);
    const [isNewTestPaper, setIsNewTestPaper] = useState(false);

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
            else {
                setTestPaper({
                    testId: props.match.params.testId,
                    questions: [],
                    remarks: ''
                });

                setIsNewTestPaper(true);
            }
        });
    }, []);

    const saveTestPaper = () => {
        fetch(isNewTestPaper ? 'http://localhost:5000/api/admin/testPaper' : `http://localhost:5000/api/admin/testPaper/${testPaper._id}`, {
            method: isNewTestPaper ? 'post' : 'put',
            body: JSON.stringify(testPaper),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(res => {
            if (res.success) {
                props.history.goBack();
                toast.success('Successfully saved test paper!', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            } else {
                toast.error('Oops! Somehing went wrong. Try again!', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            }
        }).catch(err => {
            toast.error('Oops! Somehing went wrong. Try again!', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        });
    }

    const addNewQuestion = () => {
        let questions = testPaper.questions;
        questions.push({
            question: '',
            type: 'MCQ',
            subject: 'Physics',
            topic: '',
            difficulty: 'Easy',
            marks: '',
            negativeMarks: '',
            options: [],
            answer: []
        })
        setTestPaper({...testPaper, questions});
    }

    const questionChangeHandler = (e, i) => {
        let questions = testPaper.questions;
        questions[i][e.target.name] = e.target.value;
        setTestPaper({...testPaper, questions});
    }

    const addNewOption = (i) => {
        let questions = testPaper.questions;
        questions[i].options.push(`option ${questions[i].options.length + 1}`);
        setTestPaper({...testPaper, questions});
    }

    const optionChangeHandler = (e, i, j) => {
        let questions = testPaper.questions;
        questions[i].options[j] = e.target.value;
        setTestPaper({...testPaper, questions});
    }

    const answerChangeHandler = (e, i) => {
        let questions = testPaper.questions;
        questions[i].answer[0] = e.target.value;
        setTestPaper({...testPaper, questions});
    }

    const checkboxChangeHandler = (e, i) => {
        let questions = testPaper.questions;
        if (e.target.checked)
            questions[i].answer.push(e.target.value);
        else
            questions[i].answer.splice(questions[i].answer.indexOf(Number(e.target.value)), 1);
        setTestPaper({...testPaper, questions});
    }

    return (
        <div className='Test-Paper'>
            <Heading>Test Paper</Heading>
            {
                testPaper
                ? <div className='Question-Container'>
                    <div className='Top-Button-Container' style={{marginTop: 0}}>
                        <Button onClick={addNewQuestion}>+ Add Question</Button>
                    </div>
                    {
                        testPaper.questions.map((question, i) => (
                            <div className='Question-Card' key={i}>
                                <div className='Title'>Question {i + 1}</div>
                                
                                <textarea placeholder='Question goes here...' name='question' value={question.question} onChange={(e) => questionChangeHandler(e, i)} />

                                <div className='Row'>
                                    <div className='Field-Wrapper'>
                                        <label htmlFor='type'>Type: </label>
                                        <select name='type' id='type' value={question.type} onChange={(e) => questionChangeHandler(e, i)}>
                                            <option value='MCQ'>MCQ</option>
                                            <option value='MultipleMCQ'>Multiple MCQ</option>
                                            <option value='NumericalValue'>Numerical Value</option>
                                        </select>
                                    </div>
                                    <div className='Field-Wrapper'>
                                        <label htmlFor='subject'>Subject: </label>
                                        <select name='subject' id='subject' value={question.subject} onChange={(e) => questionChangeHandler(e, i)}>
                                            <option value='Physics'>Physics</option>
                                            <option value='Chemistry'>Chemistry</option>
                                            <option value='Maths'>Maths</option>
                                            <option value='Biology'>Biology</option>
                                        </select>
                                    </div>
                                    <div className='Field-Wrapper'>
                                        <label htmlFor='topic'>Topic: </label>
                                        <input type='text' name='topic' id='topic' value={question.topic} onChange={(e) => questionChangeHandler(e, i)} />
                                    </div>
                                    <div className='Field-Wrapper'>
                                        <label htmlFor='difficulty'>Difficulty: </label>
                                        <select name='difficulty' id='difficulty' value={question.difficulty} onChange={(e) => questionChangeHandler(e, i)}>
                                            <option value='Easy'>Easy</option>
                                            <option value='Medium'>Medium</option>
                                            <option value='Hard'>Hard</option>
                                        </select>
                                    </div>
                                    <div className='Field-Wrapper'>
                                        <label htmlFor='marks'>Marks: </label>
                                        <input className='Small' type='number' name='marks' id='marks' value={question.marks} onChange={(e) => questionChangeHandler(e, i)} />
                                    </div>
                                    <div className='Field-Wrapper'>
                                        <label htmlFor='negativeMarks'>Negative Marks: </label>
                                        <input className='Small' type='number' name='negativeMarks' id='negativeMarks' value={question.negativeMarks} onChange={(e) => questionChangeHandler(e, i)} />
                                    </div>
                                </div>
                                {
                                    (question.type !== 'NumericalValue')
                                    ? <div className='Options-Container'>
                                            <div className='Row' style={{marginBottom: '8px'}}>
                                                <label>Options: </label>
                                                <button onClick={() => addNewOption(i)}>+ Add Option</button>
                                            </div>
                                        {
                                            question.options.map((option, j) => (
                                                <div key={option}>
                                                    <input type='checkbox' defaultChecked={question.answer.includes(j)} value={j} onChange={(e) => checkboxChangeHandler(e, i)} />
                                                    <input type='text' value={option} onChange={(e) => optionChangeHandler(e, i, j)} autoFocus={true} />
                                                </div>
                                            ))
                                        }
                                    </div>
                                    : 
                                    <div className='Field-Wrapper'>
                                        <label htmlFor='answer'>Answer: </label>
                                        <input type='number' name='answer' id='answer' value={question.answer[0]} onChange={(e) => answerChangeHandler(e, i)} />
                                    </div>
                                }                                    
                            </div>
                        ))
                    }

                    <div className='Question-Card'>
                        <div className='Field-Wrapper'>
                            <label htmlFor='remarks' className='Blue'>Remarks: </label>
                            <textarea name='remarks' id='remarks' placeholder='(If any)' value={testPaper.remarks} onChange={(e) => setTestPaper({...testPaper, remarks: e.target.value})} />
                        </div>
                    </div>

                    <div className='Button-Wrapper'>
                        <Button onClick={saveTestPaper}>Save</Button>
                        <Button type='button' color='secondary' onClick={() => props.history.goBack()}>Cancel</Button>
                    </div>
                </div>
                : 'Loading...'
            }
        </div>
    )
}

export default TestPaper;