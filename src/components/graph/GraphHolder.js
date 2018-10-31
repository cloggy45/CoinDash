import Card from '@material-ui/core/Card/Card';
import CardContent from '@material-ui/core/CardContent/CardContent';
import Typography from '@material-ui/core/Typography/Typography';
import React from 'react';

export const GraphHolder = props => (
    <Card className={props.classes.card}>
        <CardContent>
            <Typography variant={'subheading'}>{props.title}</Typography>
            {props.children}
        </CardContent>
    </Card>
);
