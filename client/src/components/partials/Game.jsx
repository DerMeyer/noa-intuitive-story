import React from 'react';
import { Link } from 'react-router-dom';

const style = {
    link: {
        textDecoration: 'none',
        color: 'var(--mediumColor)'
    },
    container: {
        backgroundColor: 'white'
    },
    name: {
        fontWeight: '700',
        whiteSpace: 'nowrap',
        margin: '0'
    }
};


const Game = props => {
    return (
        <Link to={`/group/${props.id}`} style={style.link} onClick={event => event.stopPropagation()}>
            <div style={style.container}>
                <p style={style.name} >{`${props.name.toUpperCase()}, ${props.time_period}`}</p>
            </div>
        </Link>
    )
};

export default Game;
