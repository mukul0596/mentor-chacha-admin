import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../Components/Button/Button';

const Students = (props) => {
    const [students, setStudents] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/admin/student/all/${props.match.params.instituteId}`, {
            credentials: 'include',
            headers:{
                "accepts":"application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            setStudents(data);
        });
    }, []);

    const deleteStudent = (id, index) => {
        const isSure = window.confirm('Are you sure, you want to delete this student?');

        if (isSure) {
            fetch(`http://localhost:5000/api/admin/student/${id}`, {
                method: 'delete',
                credentials: 'include',
                headers:{
                    "accepts":"application/json"
                }
            })
            .then(res => res.json())
            .then(data => {
                const newStudents = [...students];
                newStudents.splice(index, 1);
                setStudents(newStudents);
            }); 
        }
    }

    return (
        <div className='Student'>
            <div className='Top-Button-Container'>
                <Link to={`${props.location.pathname}/new`}>
                    <Button>+ New Student</Button>
                </Link>
            </div>
            {
                students
                ? <table cellSpacing={0}>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Phone</td>
                            <td>Email</td>
                            <td>Class</td>
                            <td>Stream</td>
                            <td>Age</td>
                            <td>Gender</td>
                            <td>Category</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students.map((student, index) => (
                                <tr key={student._id}>
                                    <td>{student.name}</td>
                                    <td>{student.phone}</td>
                                    <td>{student.email}</td>
                                    <td>{student.class}</td>
                                    <td>{student.stream}</td>
                                    <td>{student.age}</td>
                                    <td>{student.gender}</td>
                                    <td>{student.category}</td>
                                    <td className='Action-Container'>
                                        <Link to={`${props.location.pathname}/${student._id}`}>
                                            <button className='Normal'>Edit</button>
                                        </Link>
                                        <button className='Danger' onClick={() => deleteStudent(student._id, index)}>Delete</button>
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

export default Students;