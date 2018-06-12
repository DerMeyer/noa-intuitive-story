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
                top: '0',
                left: '.4vw',
                display: 'grid',
                gridTemplateRows: '1fr 1fr 1fr 1fr 1fr',
                height: '10vw'
            },
            color: {
                width: '3vw'
            }
        }
        return (
            <section className="profile_menu">
                <section style={style.groupBoxContainer} className="group_box">
                    <img style={style.groupBox} src="/images/box_s.png" alt="Group Box" />
                    <section style={style.soulBox} className="soul_box">
                        <img style={style.color} src="/images/color_gul.png" alt="Gul" />
                        <img style={style.color} src="/images/color_grun.png" alt="Grun" />
                        <img style={style.color} src="/images/color_vermel.png" alt="Vermel" />
                        <img style={style.color} src="/images/color_bezrechu.png" alt="Bezrechu" />
                        <img style={style.color} src="/images/color_sagol.png" alt="Sagol" />
                    </section>
                </section>
            </section>
        );
    }
}

const mapStateToProps = state => state;

const ConnectedGroupBox = connect(mapStateToProps)(GroupBox);

export default ConnectedGroupBox;
