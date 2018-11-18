import React, { Component } from 'react';

class About extends Component {
    componentDidMount() {
        window.scroll(0, 0);
    }

    render() {
        return (
            <section className="page_container">
                <h3 className="try-this-thing">
                    Any Questions? Please let me know.
                </h3>
            </section>
        )
    }
}

export default About;
