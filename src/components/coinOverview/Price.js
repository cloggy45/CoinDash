import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import React from "react";
import PropTypes from 'prop-types';

const Price = props => (
    <CardContent>
        <Typography variant="display1" component="h2">
            {props.amount}
        </Typography>
    </CardContent>
);

Price.propTypes = {
    amount: PropTypes.number
};

Price.defaultProps = {
    amount: 100
};

export default Price;