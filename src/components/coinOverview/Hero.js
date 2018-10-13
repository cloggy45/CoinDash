import CardContent from '@material-ui/core/CardContent/CardContent';
import React from 'react';
import PropTypes from 'prop-types';

const Hero = props => (
    <CardContent>
        <img src={props.src} alt={props.alt} height={props.height} width={props.width} />
    </CardContent>
);

Hero.propTyes = {
    alt: PropTypes.string,
    src: PropTypes.string,
    classes: PropTypes.object,
    height: PropTypes.number,
    width: PropTypes.number
};

Hero.defaultProps = {
    alt: '',
    src: '',
    height: 100,
    width: 100,
    classes: {},
};

export default Hero;
