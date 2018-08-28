import React from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends React.Component {
    state = {
        hasError: false,
        error: null,
        errorInfo: null
    };

    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: true,
            error,
            errorInfo
        });
    };
    render() {
        const { hasError, error, errorInfo} = this.state;
        const { render, children } = this.props;
        return hasError ? render(error, errorInfo) : children;
    }
};

ErrorBoundary.propTypes = {
    children : PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ]).isRequired,
    render: PropTypes.func.isRequired
};

ErrorBoundary.defaultProps = {
    children : {},
    render: () => {}
};