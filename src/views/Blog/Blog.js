import React, { useState, useEffect } from 'react';
import Button from '../../Components/Button/Button';
import Heading from '../../Components/Heading/Heading';
import Input from '../../Components/Input/Input';
import { toast } from 'react-toastify';
import './Blog.css';

const Blog = (props) => {
    const [blog, setBlog] = useState(null);
    const [isNewBlog, setIsNewBlog] = useState(false);

    useEffect(() => {
        if (props.match.params.id === 'new') {
            setBlog({
                title: '',
                description: ''
            });
            return setIsNewBlog(true);
        }

        fetch(`http://localhost:5000/api/admin/blog/${props.match.params.id}`, {
            credentials: 'include',
            headers:{
                "accepts":"application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            setBlog(data);
        });
    }, []);

    const saveBlog = (e) => {
        e.preventDefault();
        fetch(isNewBlog ? 'http://localhost:5000/api/admin/blog' : `http://localhost:5000/api/admin/blog/${props.match.params.id}`, {
            method: isNewBlog ? 'post' : 'put',
            body: JSON.stringify(blog),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(res => {
            if (res.success) {
                props.history.goBack();
                toast.success('Successfully saved blog!', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            } else {
                toast.error('Oops! Somehing went wrong. Try again!', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            }
        }).catch(err => {
            toast.error('Oops! Somehing went wrong. Try again!', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        });
    }

    return (
        <div className='Blog'>
            <Heading>Create/Edit Blog</Heading>
            {
                blog
                ? <form onSubmit={saveBlog}>
                    {
                        Object.keys(blog).map(key => {
                            switch (key) {
                                case 'description':
                                    return (
                                        <Input key={key} type='editor' label={key} name={key} value={blog[key]} onChange={(e, editor) => setBlog({...blog, [key]: editor.getData()})} />
                                    )
                                default:
                                    return (
                                        <Input key={key} type='text' label={key} name={key} value={blog[key]} onChange={(e) => setBlog({...blog, [key]: e.target.value})} />
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

export default Blog;