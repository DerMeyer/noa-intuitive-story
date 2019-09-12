import React, { Component } from 'react';
import { SoulNames } from '../../js/enums';

class GroupDisplayBox extends Component {
    render() {
        console.log('PROPS:', this.props[SoulNames.REBEL]);
        return (
            <div>
                {Object.keys(this.props).map(propKey => <h1>{propKey}</h1>)}
            </div>
        );
    }
}

export default GroupDisplayBox;