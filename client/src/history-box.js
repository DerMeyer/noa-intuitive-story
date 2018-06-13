import React, { Component } from 'react';
import { connect } from 'react-redux';

const style = {
    historyBoxContainer: {
        cursor: 'pointer',
        position: 'absolute',
        top: '50vh',
        left: '190vw'
    },
    historyBox: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '8vw'
    },
    headline: {
        position: 'relative',
        fontSize: '1.3vw',
        fontWeight: '600',
        marginLeft: '1vw',
        color: 'rgb(80, 80, 80)',
        zIndex: '25'
    },
    links: {
        position: 'relative',
        fontSize: '1.1vw',
        color: 'rgb(100, 100, 100)',
        zIndex: '25'
    }
}

class HistoryBox extends Component {
    state = {
        box_1: <div style={style.placeHolder}></div>,
        editingName: false
    }
    render() {
        return (
            <section>
                <section style={style.historyBoxContainer} className="group_box">
                    <p style={style.headline} >1492</p>
                    <ul style={style.links}>
                        <li>Stuff</li>
                        <li>More Stuff</li>
                        <li>You know</li>
                    </ul>
                    <img style={style.historyBox} src="/images/box_s.png" alt="Group Box" />
                </section>
            </section>
        );
    }
}

const mapStateToProps = state => state;

const ConnectedHistoryBox = connect(mapStateToProps)(HistoryBox);

export default ConnectedHistoryBox;
