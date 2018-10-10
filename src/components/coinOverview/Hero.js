import CardContent from '@material-ui/core/CardContent/CardContent';
import React from 'react';
import PropTypes from 'prop-types';

const Hero = props => (
    <CardContent>
        <img src={props.src} alt={props.alt} height={100} width={100} />
    </CardContent>
);

Hero.propTyes = {
    alt: PropTypes.string,
    src: PropTypes.string,
    classes: PropTypes.object,
};

Hero.defaultProps = {
    alt: '',
    src: '',
    classes: {},
};

export default Hero;
