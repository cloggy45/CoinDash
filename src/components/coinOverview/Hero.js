import CardContent from "@material-ui/core/CardContent/CardContent";
import Avatar from "@material-ui/core/Avatar/Avatar";
import React from "react";
import PropTypes from 'prop-types';

const Hero = props => (
    <CardContent>
        <Avatar
            alt={props.alt}
            src={props.src}
            className={props.classes}
        />
    </CardContent>
);

Hero.propTyes = {
    alt: PropTypes.string,
    src: PropTypes.string,
    classes: PropTypes.object
};

Hero.defaultProps = {
    alt: "",
    src: "",
    classes: {}
};

export default Hero;