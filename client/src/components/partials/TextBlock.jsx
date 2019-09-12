import React, { Component } from 'react';
import '../../css/textBlock.css';


class TextBlock extends Component {
    render() {
        return (
            <div className="text-block" style={this.props.style}>
                <div className="text-block-headline">
                    {this.props.headline}
                </div>
                <div className="text-block-content">
                    {this.props.text}
                </div>
            </div>
        );
    }
}

export default TextBlock;