import React from 'react';
import { Link } from 'react-router-dom';

const PageInterpreter = props => {
    const { text, html, className, url } = props.element;
    const style = props.focus
        ? { ...props.element.style, backgroundColor: 'rgb(255, 253, 50)' }
        : props.element.style
    const setFocus = props.setFocus;

    if (html === 'div') {
        return (
            <div className={className} style={style} onClick={setFocus}>
                {text}
            </div>
        );
    } else if (html === 'h3') {
        return (
            <h3 className={className} style={style} onClick={setFocus}>
                {text}
            </h3>
        );
    } else if (html === 'p') {
        return (
            <p className={className} style={style} onClick={setFocus}>
                {text}
            </p>
        );
    } else if (html === 'a') {
        return (
            <a className={className} style={style} href={url} target="_blank" rel="noopener noreferrer" onClick={setFocus}>
                {text}
            </a>
        );
    } else if (html === 'span') {
        return (
            <span className={className} style={style} onClick={setFocus}>
                {text}
            </span>
        );
    } else if (html === 'link') {
        return (
            <Link className={className} style={style} to={url} onClick={setFocus}>
                <span>
                    {text}
                </span>
            </Link>
        );
    } else if (html === 'image') {
        return (
            <div className="page-image-container inline-flex" onClick={setFocus}>
                <img
                    className="page-image"
                    src={url}
                    alt="Page"
                />
            </div>
        );
    }else if (html === 'video') {
        return (
            <div className="page-video-container inline-flex" onClick={setFocus}>
                <iframe
                    title="Page Video"
                    className="page-video"
                    src={url}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        );
    }
    return <div />;
};

export default PageInterpreter;
