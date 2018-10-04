import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import React from "react";
import PropTypes from 'prop-types';

const Title = props => (
    <CardContent>
        <Typography variant={props.variant} component={props.headerType}>
            {props.title}
        </Typography>
    </CardContent>
);

Title.propTypes = {
    variant: PropTypes.string,
    headerType: PropTypes.string,
    title: PropTypes.string
};

Title.defaultProps = {
    variant: "",
    headerType: "",
    title: ""
};

export default Title;