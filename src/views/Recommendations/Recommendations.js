import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import './Recommendations.css';

const Recommendations = (props) => {
    const [recommendations, setRecommendations] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/admin/book', {
            credentials: 'include',
            headers:{
                "accepts":"application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            setRecommendations(data);
        });
    }, []);

    const deleteRecommendation = (id, index) => {
        const isSure = window.confirm('Are you sure, you want to delete this Recommendation?');

        if (isSure) {
            fetch(`http://localhost:5000/api/admin/book/${id}`, {
                method: 'delete',
                credentials: 'include',
                headers:{
                    "accepts":"application/json"
                }
            })
            .then(res => res.json())
            .then(data => {
                const newRecommendations = [...recommendations];
                newRecommendations.splice(index, 1);
                setRecommendations(newRecommendations);
            }); 
        }
    }

    return (
        <div className='Recommendations'>
            <div className='Top-Button-Container'>
                <Link to={`${props.location.pathname}/new`}>
                    <Button>+ New Book</Button>
                </Link>
            </div>
            {
                recommendations
                ? <table cellSpacing={0}>
                    <thead>
                        <tr>
                            <td>Title</td>
                            <td>Subject</td>
                            <td>Writter</td>
                            <td>Publication</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            recommendations.map((recommendation, index) => (
                                <tr key={recommendation._id}>
                                    <td>{recommendation.title}</td>
                                    <td>{recommendation.subject}</td>
                                    <td>{recommendation.writter}</td>
                                    <td>{recommendation.publication}</td>
                                    <td className='Action-Container'>
                                        <Link to={`${props.location.pathname}/${recommendation._id}`}>
                                            <button className='Normal'>Edit</button>
                                        </Link>
                                        <button className='Danger' onClick={() => deleteRecommendation(recommendation._id, index)}>Delete</button>
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

export default Recommendations;