import React from 'react';

const Loading = () => (
    <div style={{
        position: 'fixed',
        left: '50%',
        top: '50%',
        transfrom: 'translate(-50%, -50%)',
        zIndex: '1000'
    }}>
        Loading...
    </div>
);

export default Loading;
