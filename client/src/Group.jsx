import React from 'react';
import { Link } from 'react-router-dom';

const Group = props => {
    const style = {
        link: {
            textDecoration: 'none',
            color: 'var(--mediumColor)'
        },
        container: {
            transform: 'translateY(60px)',
            padding: '0 20px',
            backgroundColor: 'white',
            border: '1px solid var(--lightColor)',
            borderRadius: '5px'
        },
        name: {
            whiteSpace: 'nowrap'
        }
    };

    return (
        <Link to={`/group/${props.id}`} style={style.link} onClick={event => event.stopPropagation()}>
            <div style={style.container}>
                <p style={style.name} >{`${props.name} ${props.time_period}`}</p>
            </div>
        </Link>
    )
};

export default Group;
