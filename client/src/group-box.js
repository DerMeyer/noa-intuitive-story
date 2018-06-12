import React, { Component } from 'react';
import { connect } from 'react-redux';

class GroupBox extends Component {
    render() {
        const style = {
            groupBoxContainer: {
                position: 'absolute',
                top: '8vh',
                left: '50vw'
            },
            groupBox: {
                width: '15vw'
            },
            soulBox: {
                position: 'absolute',
                top: '.5vw',
                left: '.6vw',
                display: 'grid',
                gridTemplateRows: '1fr 1fr 1fr 1fr 1fr',
                height: '14vw',
                width: '2.6vw'
            },
            colorContainer: {
                justifySelf: 'center',
                alignSelf: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '2.8vw',
                overflow: 'hidden'
            },
            color: {
                width: '3.2vw'
            }
        }
        return (
            <section className="profile_menu">
                <section style={style.groupBoxContainer} className="group_box">
                    <img style={style.groupBox} src="/images/box_s.png" alt="Group Box" />
                    <section style={style.soulBox} className="soul_box">
                        <div style={style.colorContainer} className="color_container">
                            <img style={style.color} src="/images/color_gul.png" alt="Gul" />
                        </div>
                        <div style={style.colorContainer} className="color_container">
                            <img style={style.color} src="/images/color_grun.png" alt="Grun" />
                        </div>
                        <div style={style.colorContainer} className="color_container">
                            <img style={style.color} src="/images/color_vermel.png" alt="Vermel" />
                        </div>
                        <div style={style.colorContainer} className="color_container">
                            <img style={style.color} src="/images/color_bezrechu.png" alt="Bezrechu" />
                        </div>
                        <div style={style.colorContainer} className="color_container">
                            <img style={style.color} src="/images/color_sagol.png" alt="Sagol" />
                        </div>
                    </section>
                </section>
            </section>
        );
    }
}

const mapStateToProps = state => state;

const ConnectedGroupBox = connect(mapStateToProps)(GroupBox);

export default ConnectedGroupBox;
