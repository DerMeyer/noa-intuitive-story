import React, { Component } from 'react';
import { connect } from 'react-redux';

const style = {
    historyBoxContainer: {
        cursor: 'pointer',
        position: 'absolute',
        top: '54vh',
        left: '190vw'
    },
    historyBox: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '8vw'
    },
    a: {
        textDecoration: 'none'
    },
    headline: {
        position: 'relative',
        fontSize: '1vw',
        textAlign: 'center',
        color: 'rgb(80, 80, 80)'
    },
    span: {
        fontSize: '1.3vw'
    }
}

class History extends Component {
    state = {
        box_1: <div style={style.placeHolder}></div>,
        editingName: false
    }
    render() {
        return (
            <section>
                <section style={style.historyBoxContainer} className="group_box">
                    <a style={style.a} href="https://de.wikipedia.org/wiki/Isaac_Newton" target="_blank" rel="noopener noreferrer"><p style={style.headline} ><span style={style.span}>Newton</span><br/>1643 - 1727<br/>England</p></a>
                </section>
            </section>
        );
    }
}

const mapStateToProps = state => state;

const ConnectedHistory = connect(mapStateToProps)(History);

export default ConnectedHistory;
