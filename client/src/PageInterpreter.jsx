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
            : <h3>This page is under construction and will soon be ready for you.</h3>;
    }

    elementToJSX(element) {
        const { key, text, html, newLine, className, url, autoplay, focus, setFocus = () => {} } = element;
        const style = focus ? { ...element.style, backgroundColor: 'rgb(255, 253, 50)' }
                            : element.style

        if (html === 'div') {
            return (
                <div key={key} className={className} style={style} onClick={setFocus}>
                    {text}
                </div>
            );
        } else if (html === 'h3') {
            return (
                <h3 key={key} className={className} style={style} onClick={setFocus}>
                    {text}
                </h3>
            );
        } else if (html === 'p') {
            return (
                <p key={key} className={className} style={style} onClick={setFocus}>
                    {text}
                </p>
            );
        } else if (html === 'a') {
            return (
                <a key={key} className={className} style={style} href={url} target="_blank" rel="noopener noreferrer" onClick={setFocus}>
                    {text}
                </a>
            );
        } else if (html === 'span') {
            return (
                <span key={key} className={className} style={style} onClick={setFocus}>
                    {text}
                </span>
            );
        } else if (html === 'link') {
            return (
                <Link key={key} className={className} style={style} to={url} onClick={setFocus}>
                    <span>
                        {text}
                    </span>
                </Link>
            );
        } else if (html === 'image') {
            return (
                <div key={key} className="page-image-container inline-flex" onClick={setFocus}>
                    <img
                        className="page-image"
                        src={url}
                        alt="Page"
                    />
                </div>
            );
        } else if (html === 'video') {
            const regex = /(.*)(v=)(.*)/;
            const videoID = regex.exec(url)[3];
            const embedUrl = `https://www.youtube.com/embed/${videoID}${autoplay && '?&autoplay=1'}`;
            return (
                <div key={key} className="page-video-container inline-flex" onClick={setFocus}>
                    <iframe
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
        return <div />;
    }
}

export default new PageInterpreter();
