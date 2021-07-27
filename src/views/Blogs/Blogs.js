import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import './Blogs.css';

const Blogs = (props) => {
    const [blogs, setBlogs] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/admin/blog/titles', {
            credentials: 'include',
            headers:{
                "accepts":"application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            setBlogs(data);
        });
    }, []);

    const deleteBlog = (id, index) => {
        const isSure = window.confirm('Are you sure, you want to delete this blog?');

        if (isSure) {
            fetch(`http://localhost:5000/api/admin/blog/${id}`, {
                method: 'delete',
                credentials: 'include',
                headers:{
                    "accepts":"application/json"
                }
            })
            .then(res => res.json())
            .then(data => {
                const newBlogs = [...blogs];
                newBlogs.splice(index, 1);
                setBlogs(newBlogs);
            }); 
        }
    }

    return (
        <div className='Blogs'>
            <div className='Top-Button-Container'>
                <Link to={`${props.location.pathname}/new`}>
                    <Button>+ New Blog</Button>
                </Link>
            </div>
            {
                blogs
                ? <table cellSpacing={0}>
                    <thead>
                        <tr>
                            <td>Title</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            blogs.map((blog, index) => (
                                <tr key={blog._id}>
                                    <td>{blog.title}</td>
                                    <td className='Action-Container'>
                                        <Link to={`${props.location.pathname}/${blog._id}`}>
                                            <button className='Normal'>Edit</button>
                                        </Link>
                                        <button className='Danger' onClick={() => deleteBlog(blog._id, index)}>Delete</button>
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

export default Blogs;