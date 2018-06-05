import React, { Component } from "react";

const frame = {
    justifySelf: 'center',
    alignSelf: 'center'
}

const user = {
    width: '5vh'
}

class ProfileMenu extends Component {
    render() {
        return (
            <section style={frame}>
                <img src="https://use.fontawesome.com/releases/v5.0.13/svgs/regular/user.svg" alt="User" style={user}/>
            </section>
        );
    }
}

export default ProfileMenu;
