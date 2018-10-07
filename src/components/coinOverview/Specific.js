import CardContent from '@material-ui/core/CardContent/CardContent';
import Typography from '@material-ui/core/Typography/Typography';
import React from 'react';
import PropTypes from 'prop-types';

const Specific = props => (
    <CardContent>
        <Typography variant={props.variant} component={props.headerType}>
            {props.content}
        </Typography>
    </CardContent>
);

Specific.propTypes = {
    variant: PropTypes.string,
    headerType: PropTypes.string,
    title: PropTypes.string,
};

Specific.defaultProps = {
    variant: 'display4',
    headerType: 'h2',
    title: '',
};

export default Specific;
