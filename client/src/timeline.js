import React, { Component } from "react";
import "./timeline.css";

class Timeline extends Component {
    render() {
        return (
            <section className="timeline_frame">
                <img src="/images/timeline.jpg" alt="Timeline" id="timeline"/>
            </section>
        );
    }
}

export default Timeline;

// <section id="scroll_container" ref={elem => this.elem = elem} onScroll={() => console.log(this.elem.scrollTop)}>
//     <section className="scroll_sled">
//         <section className="timeline_container">
//             <section id="timeline_sled">
//                 <img src="/images/timeline.jpg" alt="Timeline" id="timeline"/>
//             </section>
//         </section>
//     </section>
// </section>
