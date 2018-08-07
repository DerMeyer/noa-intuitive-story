import React from 'react';
import { Link } from 'react-router-dom';

const group = props => {
    const style = {
        container: {
            position: 'relative',
            display: 'grid',
            gridTemplate: '1fr 1fr 1fr 1fr 1fr / 1fr 1fr 3.2fr',
            textDecoration: 'none',
            height: '15vh',
            width: '15vh'
        },
        headline: {
            position: 'absolute',
            bottom: '16vh',
            left: '0',
            display: 'flex',
            justifyContent: 'center',
            width: '15vh',
            borderRadius: '.4vh',
            backgroundColor: 'white'
        },
        headlineText: {
            textAlign: 'center',
            fontSize: '1.3vw',
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
            fontSize: '2vh',
            marginLeft: '.5vh',
            color: 'rgb(100, 100, 100)'
        }
    };
    return (
        <Link to={`/group/${props.id}`} style={style.container} onClick={event => event.stopPropagation()}>
            <div style={style.headline}>
                <p style={style.headlineText} >{`${props.name} ${props.time_period}`}</p>
            </div>
            <img style={style.tableImage} src="/images/box_s.png" alt="Group Box" />
            <div style={style.colorContainer}>
                <img style={style.color} src="/images/color_gul.png" alt="Gul" />
            </div>
            <div style={style.colorContainer}>
                {props.gul_role && <img style={style.color} src={`/images/color_${props.gul_role}.png`} alt={`${props.gul_role}`} />}
            </div>
            <div style={style.characterContainer}>
                <p style={style.character}>{props.gul_character}</p>
            </div>
            <div style={style.colorContainer}>
                <img style={style.color} src="/images/color_grun.png" alt="Grun" />
            </div>
            <div style={style.colorContainer}>
                {props.grun_role && <img style={style.color} src={`/images/color_${props.grun_role}.png`} alt={`${props.grun_role}`} />}
            </div>
            <div style={style.characterContainer}>
                <p style={style.character}>{props.grun_character}</p>
            </div>
            <div style={style.colorContainer}>
                <img style={style.color} src="/images/color_vermel.png" alt="Vermel" />
            </div>
            <div style={style.colorContainer}>
                {props.vermel_role && <img style={style.color} src={`/images/color_${props.vermel_role}.png`} alt={`${props.vermel_role}`} />}
            </div>
            <div style={style.characterContainer}>
                <p style={style.character}>{props.vermel_character}</p>
            </div>
            <div style={style.colorContainer}>
                <img style={style.color} src="/images/color_bezrechu.png" alt="Bezrechu" />
            </div>
            <div style={style.colorContainer}>
                {props.bezrechu_role && <img style={style.color} src={`/images/color_${props.bezrechu_role}.png`} alt={`${props.bezrechu_role}`} />}
            </div>
            <div style={style.characterContainer}>
                <p style={style.character}>{props.bezrechu_character}</p>
            </div>
            <div style={style.colorContainer}>
                <img style={style.color} src="/images/color_sagol.png" alt="Sagol" />
            </div>
            <div style={style.colorContainer}>
                {props.sagol_role && <img style={style.color} src={`/images/color_${props.sagol_role}.png`} alt={`${props.sagol_role}`} />}
            </div>
            <div style={style.characterContainer}>
                <p style={style.character}>{props.sagol_character}</p>
            </div>
        </Link>
    )
};

export default group;
