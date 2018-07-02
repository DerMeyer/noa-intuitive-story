import React, { Component } from 'react';
import { connect } from 'react-redux';

const style = {
    groupBoxContainer: {
        cursor: 'pointer',
        position: 'absolute',
        top: '13vh',
        left: '195vw'
    },
    headline: {
        position: 'absolute',
        bottom: '6.9vw',
        left: '.2vw',
        textAlign: 'center',
        fontSize: '1.3vw',
        fontWeight: '600',
        width: '7.5vw',
        paddingTop: '.2vw',
        borderRadius: '.2vw',
        color: 'rgb(80, 80, 80)',
        backgroundColor: 'white'
    },
    groupBox: {
        width: '8vw'
    },
    soulBox: {
        position: 'absolute',
        top: '.35vw',
        left: '.2vw',
        display: 'grid',
        gridTemplateRows: '1fr 1fr 1fr 1fr 1fr',
        height: '7.4vw',
        width: '1.6vw'
    },
    roleBox: {
        position: 'absolute',
        top: '.35vw',
        left: '1.7vw',
        display: 'grid',
        gridTemplateRows: '1fr 1fr 1fr 1fr 1fr',
        height: '7.4vw',
        width: '1.6vw'
    },
    nameBox: {
        position: 'absolute',
        top: '.5vw',
        left: '3.4vw',
        display: 'grid',
        gridTemplateRows: '1fr 1fr 1fr 1fr 1fr',
        height: '7.4vw',
        width: '4.3vw'
    },
    colorContainer: {
        justifySelf: 'center',
        alignSelf: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '1.5vw',
        maxWidth: '4.3vw',
        overflow: 'hidden'
    },
    color: {
        width: '1.8vw'
    },
    placeHolder: {
        height: '1.7vw',
        width: '1.7vw'
    },
    name: {
        whiteSpace: 'nowrap',
        fontSize: '1.1vw',
        width: '4.5vw',
        color: 'rgb(100, 100, 100)'
    }
}

const roleColorBoxes = [
    <img style={style.color} src="/images/color_gul.png" alt="Gul" />,
    <img style={style.color} src="/images/color_grun.png" alt="Grun" />,
    <img style={style.color} src="/images/color_vermel.png" alt="Vermel" />,
    <img style={style.color} src="/images/color_bezrechu.png" alt="Bezrechu" />,
    <img style={style.color} src="/images/color_sagol.png" alt="Sagol" />,
    <div style={style.placeHolder}></div>
]

class Group extends Component {
    state = {
        box_1: <div style={style.placeHolder}></div>,
        editingName: false
    }
    toggleRoleColorCount = 0;
    toggleRoleColor = box => {
        console.log('hi', box);
        if (this.toggleRoleColorCount >= 5) {
            this.toggleRoleColorCount = 0;
        } else {
            this.toggleRoleColorCount++;
        }
        this.setState({
            box_1: roleColorBoxes[this.toggleRoleColorCount]
        });
    }
    name_1 = 'Marta'
    userInput = {}
    getName = event => {
        this.userInput[event.target.name] = event.target.value;
        console.log(this.userInput);
    }
    editName = () => {
        this.setState({
            editingName: true
        });
    }
    setName = event => {
        if (event.keyCode === 13) {
            this.name_1 = this.userInput.name_1;
            this.setState({
                editingName: false
            });
        }
    }
    render() {
        return (
            <section>
                <section style={style.groupBoxContainer} className="group_box">
                    <p style={style.headline} >Florence 1592</p>
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
                    <section style={style.roleBox} className="soul_box">
                        <div style={style.colorContainer} className="color_container">
                            <div onClick={this.toggleRoleColor}>{this.state.box_1}</div>
                        </div>
                        <div style={style.colorContainer} className="color_container">
                            <img style={style.color} src="/images/color_vermel.png" alt="Vermel" />
                        </div>
                        <div style={style.colorContainer} className="color_container">
                            <img style={style.color} src="/images/color_grun.png" alt="Grun" />
                        </div>
                        <div style={style.colorContainer} className="color_container">
                            <img style={style.color} src="/images/color_sagol.png" alt="Sagol" />
                        </div>
                        <div style={style.colorContainer} className="color_container">
                            <img style={style.color} src="/images/color_bezrechu.png" alt="Bezrechu" />
                        </div>
                    </section>
                    <section style={style.nameBox} className="soul_box">
                        <div style={style.colorContainer} className="color_container">
                            {this.state.editingName ? <input style={style.name} name="name_1" type="text" onChange={this.getName} onKeyDown={this.setName} /> : <p style={style.name} onClick={this.editName} >{this.name_1}</p>}
                        </div>
                        <div style={style.colorContainer} className="color_container">
                            <p style={style.name} >Anna</p>
                        </div>
                        <div style={style.colorContainer} className="color_container">
                            <p style={style.name} >Karla</p>
                        </div>
                        <div style={style.colorContainer} className="color_container">
                            <p style={style.name} >Mario</p>
                        </div>
                        <div style={style.colorContainer} className="color_container">
                            <p style={style.name} >Josef</p>
                        </div>
                    </section>
                </section>
            </section>
        );
    }
}

const mapStateToProps = state => state;

const ConnectedGroup = connect(mapStateToProps)(Group);

export default ConnectedGroup;
