import React, { useState, useEffect } from 'react';
import Button from '../../Components/Button/Button';
import Heading from '../../Components/Heading/Heading';
import Input from '../../Components/Input/Input';
import { toast } from 'react-toastify';
import './Recommendation.css';

const Recommendation = (props) => {
    const [recommendation, setRecommendation] = useState(null);
    const [isNewRecommendation, setIsNewRecommendation] = useState(false);

    useEffect(() => {
        if (props.match.params.id === 'new') {
            setRecommendation({
                title: '',
                writter: '',
                publication: '',
                subject: 'Physics',
                for: '',
                description: '',
                image: ''
            });
            return setIsNewRecommendation(true);
        }

        fetch(`http://localhost:5000/api/admin/book/${props.match.params.id}`, {
            credentials: 'include',
            headers:{
                "accepts":"application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            setRecommendation(data);
        });
    }, []);

    const saveRecommendation = (e) => {
        e.preventDefault();
        
        let formData = new FormData();
        for (let key in recommendation) {
            formData.append(key, recommendation[key]);
        }
        console.log(recommendation);

        fetch(isNewRecommendation ? 'http://localhost:5000/api/admin/book' : `http://localhost:5000/api/admin/book/${props.match.params.id}`, {
            method: isNewRecommendation ? 'post' : 'put',
            body: formData,
            credentials: 'include'
        }).then(res => res.json())
        .then(res => {
            if (res.success) {
                props.history.goBack();
                toast.success('Successfully saved recommendation!', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            } else {
                toast.error('Oops! Somehing went wrong. Try again!', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            }
        }).catch(err => {
            toast.error('Oops! Somehing went wrong. Try again!', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        });
    }

    return (
        <div className='Recommendation'>
            <Heading>Create/Edit Recommendation</Heading>
            {
                recommendation
                ? <form onSubmit={saveRecommendation}>
                    {
                        Object.keys(recommendation).map(key => {
                            switch (key) {
                                case 'description':
                                    return (
                                        <Input key={key} type='textarea' label={key} name={key} value={recommendation[key]} onChange={(e) => setRecommendation({...recommendation, [key]: e.target.value})} />
                                    )
                                case 'image':
                                    return (
                                        <Input key={key} type='image' label={key} name={key} value={recommendation[key]} onChange={(e) => setRecommendation({...recommendation, [key]: e.target.files[0]})} />
                                    )
                                case 'subject':
                                    return (
                                        <Input key={key} type='select' label={key} name={key} value={recommendation[key]} onChange={(e) => setRecommendation({...recommendation, [key]: e.target.value})}>
                                            <option value='Physics'>Physics</option>
                                            <option value='Chemistry'>Chemistry</option>
                                            <option value='Maths'>Maths</option>
                                            <option value='Biology'>Biology</option>
                                        </Input>
                                    )
                                default:
                                    return (
                                        <Input key={key} type='text' label={key} name={key} value={recommendation[key]} onChange={(e) => setRecommendation({...recommendation, [key]: e.target.value})} />
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

export default Recommendation;