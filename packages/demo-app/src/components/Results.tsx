import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

export default class Results extends React.Component {
  render() {
    return (
      <Grid container spacing={4}>
        <ResultItem />
        <ResultItem />
        <ResultItem />
        <ResultItem />
        <ResultItem />
        <ResultItem />
      </Grid>
    );
  }
}

const useStyles = makeStyles(() => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    margin: 20,
  },
  cardContent: {
    flexGrow: 1,
  },
}));

function ResultItem() {
  const classes = useStyles();
  return (
    <Grid item key={'card'} xs={12} sm={6} md={3}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
          title="Title"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="subtitle1">
            <Link href="#">Title</Link>
          </Typography>
          <Typography>Category</Typography>
          <Typography>$999.99</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
