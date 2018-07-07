import React from 'react';
import { Link } from 'react-router-dom';

const group = props => {
    const style = {
        container: {
            position: 'absolute',
            top: `${props.top}vh`,
            left: `${props.left}px`,
            display: 'grid',
            gridTemplate: '1fr 1fr 1fr 1fr 1fr / 1fr 1fr 3.2fr',
            textDecoration: 'none',
            height: '15vh',
            width: '15vh',
            transform: 'translatex(-50%)'
        },
        headline: {
            position: 'absolute',
            bottom: '15vh',
            left: '0',
            textAlign: 'center',
            fontSize: '1.3vw',
            width: '15vh',
            paddingTop: '.4vh',
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
        arrow: {
            position: 'absolute',
            top: '15vh',
            left: '7.5vh',
            height: `${26 - props.top}vh`,
            width: '.2vh',
            backgroundColor: 'rgb(120, 120, 120)'
        },
        colorContainer: {
            justifySelf: 'center',
            alignSelf: 'center',
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
        aliasContainer: {
            justifySelf: 'center',
            alignSelf: 'end',
            display: 'flex',
            alignItems: 'center',
            height: '2.6vh',
            width: '8.5vh',
            overflow: 'hidden',
            zIndex: '100'
        },
        alias: {
            whiteSpace: 'nowrap',
            fontSize: '2vh',
            marginLeft: '.5vh',
            color: 'rgb(100, 100, 100)'
        }
    };
    return (
        <Link to={`/group/${props.id}`} style={style.container} onClick={event => event.stopPropagation()}>
            <p style={style.headline} >{`${props.name} ${props.time_period}`}</p>
            <img style={style.tableImage} src="/images/box_s.png" alt="Group Box" />
            <div style={style.arrow}></div>
            <div style={style.colorContainer}>
                <img style={style.color} src="/images/color_gul.png" alt="Gul" />
            </div>
            {props.gul
            ? <div style={style.colorContainer}>
                <img style={style.color} src={`/images/color_${props.gul.soul}.png`} alt={`${props.gul.soul}`} />
            </div>
            : <div></div>}
            {props.gul
            ? <div style={style.aliasContainer}>
                <p style={style.alias}>{props.gul.alias}</p>
            </div>
            : <div></div>}
            <div style={style.colorContainer}>
                <img style={style.color} src="/images/color_grun.png" alt="Grun" />
            </div>
            {props.grun
            ? <div style={style.colorContainer}>
                <img style={style.color} src={`/images/color_${props.grun.soul}.png`} alt={`${props.grun.soul}`} />
            </div>
            : <div></div>}
            {props.grun
            ? <div style={style.aliasContainer}>
                <p style={style.alias}>{props.grun.alias}</p>
            </div>
            : <div></div>}
            <div style={style.colorContainer}>
                <img style={style.color} src="/images/color_vermel.png" alt="Vermel" />
            </div>
            {props.vermel
            ? <div style={style.colorContainer}>
                <img style={style.color} src={`/images/color_${props.vermel.soul}.png`} alt={`${props.vermel.soul}`} />
            </div>
            : <div></div>}
            {props.vermel
            ? <div style={style.aliasContainer}>
                <p style={style.alias}>{props.vermel.alias}</p>
            </div>
            : <div></div>}
            <div style={style.colorContainer}>
                <img style={style.color} src="/images/color_bezrechu.png" alt="Bezrechu" />
            </div>
            {props.bezrechu
            ? <div style={style.colorContainer}>
                <img style={style.color} src={`/images/color_${props.bezrechu.soul}.png`} alt={`${props.bezrechu.soul}`} />
            </div>
            : <div></div>}
            {props.bezrechu
            ? <div style={style.aliasContainer}>
                <p style={style.alias}>{props.bezrechu.alias}</p>
            </div>
            : <div></div>}
            <div style={style.colorContainer}>
                <img style={style.color} src="/images/color_sagol.png" alt="Sagol" />
            </div>
            {props.sagol
            ? <div style={style.colorContainer}>
                <img style={style.color} src={`/images/color_${props.sagol.soul}.png`} alt={`${props.sagol.soul}`} />
            </div>
            : <div></div>}
            {props.sagol
            ? <div style={style.aliasContainer}>
                <p style={style.alias}>{props.sagol.alias}</p>
            </div>
            : <div></div>}
        </Link>
    )
};

export default group;
