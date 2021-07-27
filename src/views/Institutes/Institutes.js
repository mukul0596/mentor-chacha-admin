import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import './Institutes.css';

const Institutes = (props) => {
    const [institutes, setInstitutes] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/admin/institute', {
            credentials: 'include',
            headers:{
                "accepts":"application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            setInstitutes(data);
        });
    }, []);

    const deleteInstitute = (id, index) => {
        const isSure = window.confirm('Are you sure, you want to delete this Institute?');

        if (isSure) {
            fetch(`http://localhost:5000/api/admin/institute/${id}`, {
                method: 'delete',
                credentials: 'include',
                headers:{
                    "accepts":"application/json"
                }
            })
            .then(res => res.json())
            .then(data => {
                const newInstitutes = [...institutes];
                newInstitutes.splice(index, 1);
                setInstitutes(newInstitutes);
            }); 
        }
    }

    return (
        <div className='Institute'>
            <div className='Top-Button-Container'>
                <Link to={`${props.location.pathname}/new/edit`}>
                    <Button>+ New Institute</Button>
                </Link>
            </div>
            {
                institutes
                ? <table cellSpacing={0}>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Phone</td>
                            <td>Email</td>
                            <td>City</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            institutes.map((institute, index) => (
                                <tr key={institute._id}>
                                    <td>{institute.name}</td>
                                    <td>{institute.phone}</td>
                                    <td>{institute.email}</td>
                                    <td>{institute.city}</td>
                                    <td className='Action-Container'>
                                        <Link to={`${props.location.pathname}/${institute._id}/student`}>
                                            <button className='Normal'>Manage</button>
                                        </Link>
                                        <Link to={`${props.location.pathname}/${institute._id}`}>
                                            <button className='Normal'>Edit</button>
                                        </Link>
                                        <button className='Danger' onClick={() => deleteInstitute(institute._id, index)}>Delete</button>
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

export default Institutes;