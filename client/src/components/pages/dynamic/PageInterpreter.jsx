import React from 'react';
import { Link } from 'react-router-dom';

class PageInterpreter {
    constructor() {
        this.compiledPageContent = [];
        this.newParagraph = null;
    }

    getJSX(pageContent) {
        return pageContent.length > 0
            ? pageContent.map(element => this.elementToJSX(element))
            : (
                <Link
                    style={{ color: 'var(--lightColor)', textDecoration: 'none' }}
                    to={'/'}
                >
                    <h3>
                        The Intuitive Story
                    </h3>
                </Link>
            );
    }

    elementToJSX(element) {
        const {
            key, text, html, className, url, focus, setFocus = () => {
            }
        } = element;
        const style = focus ? { ...element.style, backgroundColor: '#ffff02' }
            : element.style;

        if (html === 'div') {
            return (
                <div key={key} className={className} style={style} onClick={setFocus}>
                    {text}
                </div>
            );
        } else if (html === 'headline') {
            return (
                <h3 key={key} className={className} style={style} onClick={setFocus}>
                    {text}
                </h3>
            );
        } else if (html === 'text') {
            return (
                <p key={key} className={className} style={style} onClick={setFocus}>
                    {text}
                </p>
            );
        } else if (html === 'link outside') {
            return (
                <a
                    key={key}
                    className={className}
                    style={{ ...style, textDecoration: 'none' }}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={event => {
                        element.setFocus && event.preventDefault();
                        setFocus();
                    }}
                >
                    {text}
                </a>
            );
        } else if (html === 'highlight') {
            return (
                <span key={key} className={className} style={style} onClick={setFocus}>
                    {text}
                </span>
            );
        } else if (html === 'link inside') {
            const routerUrl = '/' + url.split(', ').map(route => route.split(' ').map(word => word.toLowerCase()).join('_')).join('/');
            return (
                <Link
                    key={key}
                    className={className}
                    style={{ ...style, textDecoration: 'none' }}
                    to={element.setFocus ? window.location.pathname : routerUrl}
                    onClick={event => {
                        element.setFoucs && event.preventDefault();
                        setFocus();
                    }}
                >
                    <span>
                        {text}
                    </span>
                </Link>
            );
        } else if (html === 'image') {
            return (
                <div key={key} className="page-image-container inline-flex" style={style} onClick={setFocus}>
                    <img
                        className="page-image"
                        src={url}
                        alt="Page"
                    />
                </div>
            );
        } else if (html === 'video') {
            const regex = /(.*)(v=)(.*)/;
            const parsedUrl = regex.exec(url) || [];
            const videoID = parsedUrl[3];
            const embedUrl = `https://www.youtube.com/embed/${videoID}`;
            return (
                <div key={key} className="page-video-container inline-flex" style={style} onClick={setFocus}>
                    <iframe
                        style={element.setFocus ? { transform: 'scale(.8)' } : {}}
                        title="Page Video"
                        className="page-video"
                        src={embedUrl}
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            );
        }
        return <div/>;
    }
}

export default new PageInterpreter();