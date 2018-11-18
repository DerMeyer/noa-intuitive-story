import React from 'react';
import { Link } from 'react-router-dom';


const oldStyle = {
    container: {
        position: 'relative',
        display: 'grid',
        gridTemplate: '1fr 1fr 1fr 1fr 1fr / 1fr 1fr 3.2fr',
        textDecoration: 'none',
        height: '3vh',
        width: '15vh',
        backgroundColor: 'white',
        border: '1px solid var(--lightColor)',
        borderRadius: '5px'
    },
    headline: {
        position: 'absolute',
        bottom: '10px',
        left: '0',
        display: 'flex',
        justifyContent: 'center',
        width: '15vh',
        borderRadius: '.4vh',
    },
    headlineText: {
        textAlign: 'center',
        fontSize: '16px',
        lineHeight: '1.2',
        whiteSpace: 'nowrap',
        padding: '.4vh 1vw 0 1vw',
        borderRadius: '.4vh',
        margin: '0',
        color: 'rgb(80, 80, 80)',
        backgroundColor: 'white'
    },
    tableImage: {
        position: 'absolute',
        top: '-.6vh',
        left: '-.5vh',
        height: '16vh',
        transform: 'rotate(.001turn)'
    },
    colorContainer: {
        justifySelf: 'center',
        alignSelf: 'center',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '2.9vh',
        width: '2.9vh',
        overflow: 'hidden',
        zIndex: '100'
    },
    color: {
        height: '3.3vh'
    },
    characterContainer: {
        justifySelf: 'center',
        alignSelf: 'end',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        height: '2.6vh',
        width: '8.5vh',
        overflow: 'hidden',
        zIndex: '100'
    },
    character: {
        whiteSpace: 'nowrap',
        fontSize: '16px',
        marginLeft: '.5vh',
        color: 'rgb(100, 100, 100)'
    }
};

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
