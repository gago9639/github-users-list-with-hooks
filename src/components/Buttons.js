import React from 'react';

export default function Button (props) {
    let style = {classList: '', text: ''}
    switch (props.action) {
        case 'SEE_MORE' :
            style = {classList: 'btn-success', text: 'See moore'};
            break;

        case 'DELETE' :
            style = {classList: 'btn-danger', text: 'Delete'};
            break;

        case 'EDIT' :
            style = {classList: 'btn-warning', text: 'Edit'};
            break;

        case 'CANCEL' :
            style = {classList: 'btn-dark', text: 'Cancel'};
            break;

        case 'SAVE' :
            style = {classList: 'btn-success', text: 'Save'};
            break;
    }

    return <button
                type="button"
                className={`btn btn-action btn-success ${style.classList}`} 
                title={style.text} 
                onClick={props.onClick}>
            {style.text}</button>;
}