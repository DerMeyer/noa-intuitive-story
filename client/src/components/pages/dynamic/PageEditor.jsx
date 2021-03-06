import React, { Component } from 'react'
import { connect } from 'react-redux';

import PageInterpreter from './PageInterpreter';
import PageElementCreator from './PageElementCreator';

import { deleteMessage, savePage, getPages } from '../../../js/actions';

class PageEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focus: 0,
            path: Array.isArray(this.props.page.page_path)
                ? [ ...this.props.page.page_path ]
                : [],
            pageContent: Array.isArray(this.props.page.page_content)
                ? [ ...this.props.page.page_content ]
                : []
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.message !== this.props.message && this.props.message === 'Page saved.') {
            this.props.dispatch(getPages());
            this.timeoutID = window.setTimeout(() => {
                this.props.dispatch(deleteMessage());
            }, 4000);
        }
    }

    componentWillUnmount() {
        if (this.timeoutID) {
            window.clearTimeout(this.timeoutID);
        }
        this.props.dispatch(deleteMessage());
    }

    savePage = () => {
        const { path, pageContent } = this.state;
        const page = {
            path,
            pageContent
        };
        this.props.dispatch(savePage(page));
    };

    createPageElement = () => {
        return {
            key: window.btoa(Math.random()),
            text: 'New Page Element.',
            html: 'headline',
            className: '',
            style: {},
            url: ''
        };
    };

    addPageElement = () => {
        this.setState(({ pageContent }) => ({
            focus: pageContent.length,
            pageContent: [
                ...pageContent,
                this.createPageElement()
            ]
        }));
    };

    addPageElementBefore = contentIndex => {
        this.setState(state => {
            const pageContent = [ ...state.pageContent ];
            pageContent.splice(contentIndex, 0, this.createPageElement());
            return {
                pageContent
            };
        });
    };

    setPageElement = (content, contentIndex) => {
        this.setState(({ pageContent }) => ({
            pageContent: pageContent.map((element, index) =>
                 index === contentIndex
                    ? content
                    : element
            )
        }));
    };

    deletePageElement = contentIndex => {
        this.setState(({ pageContent }) => ({
            pageContent: pageContent.filter((element, index) => {
                if (index === contentIndex) {
                    this.latestDelete = {
                        index,
                        element
                    };
                }
                return index !== contentIndex;
            })
        }));
    };

    unDeletePageElement = () => {
        if (!this.latestDelete) {
            return;
        }
        this.setState(state => {
            const pageContent = [ ...state.pageContent ];
            pageContent.splice(this.latestDelete.index, 0, this.latestDelete.element);
            this.latestDelete = null;
            return {
                pageContent
            };
        });
    };

    setFocus = focus => {
        this.setState({
            focus
        });
    };

    render() {
        const { focus, path, pageContent } = this.state;
        const pageEditorContent = pageContent.map((element, index) => ({
            ...element,
            focus: focus === index,
            setFocus: () => this.setFocus(index)
        }));

        return (
            <div className="page-container" style={this.props.style || {}}>
                <div className="page-container__message">
                    {this.props.message}
                </div>
                {pageContent.length > 0 && (
                    <PageElementCreator
                        path={path}
                        content={pageContent[focus]}
                        addPageElementBefore={content => this.addPageElementBefore(focus)}
                        setPageElement={content => this.setPageElement(content, focus)}
                        deletePageElement={content => this.deletePageElement(focus)}
                        unDeletePageElement={this.unDeletePageElement}
                        savePage={this.savePage}
                    />
                )}
                {PageInterpreter.getJSX(pageEditorContent)}
                <button onClick={this.addPageElement}>
                    +
                </button>
            </div>
        );
    }
}

const mapStateToProps = ({ message }) => ({ message });
const ConnectedPageEditor = connect(mapStateToProps)(PageEditor);

export default ConnectedPageEditor;
