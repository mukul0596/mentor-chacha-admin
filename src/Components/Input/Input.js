import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './Input.css';

const Input = (props) => {

    let input;

    switch (props.type) {
        case 'text':
            input = <input type='text' placeholder={props.placeholder} name={props.name} id={props.name} value={props.value} onChange={props.onChange} />
            break;

        case 'number':
            input = <input type='number' placeholder={props.placeholder} name={props.name} id={props.name} value={props.value} onChange={props.onChange} />
            break;
    
        case 'textarea':
            input = <textarea placeholder={props.placeholder} name={props.name} id={props.name} value={props.value} onChange={props.onChange} />
            break;

        case 'select':
            input = <select name={props.name} id={props.name} value={props.value} onChange={props.onChange}>
                {props.children}
            </select>
            break;

        case 'multipleSelect':
            input = <select name={props.name} id={props.name} value={props.value} onChange={props.onChange} multiple={true}>
                {props.children}
            </select>
            break;

        case 'date':
            input = <input type='date' name={props.name} id={props.name} value={props.value} onChange={props.onChange} />
            break;
    
        case 'image':
            input = <div className='Img-Wrapper'>
                {
                    props.value
                    ? <img src={`http://localhost:5000/${props.value}`} alt='BOOK' />
                    : null
                }
                <input type='file' name={props.name} id={props.name} onChange={props.onChange} />
            </div>
            break;
    
        case 'editor':
            input = <CKEditor
                editor={ ClassicEditor }
                data={props.value}
                onChange={props.onChange}
            />
            break;
    
        default:
            break;
    }

    return (
        <div className='Input'>
            {
                props.label
                ? <label htmlFor={props.name}>{props.label}:</label>
                : null
            }
            {input}
        </div>
    )
}

export default Input;