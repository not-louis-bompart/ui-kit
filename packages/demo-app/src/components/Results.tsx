import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import {engine} from '../Engine';
import {Result, ResultList, ResultListState, searchActions} from '@coveo/headless';

export default class Results extends React.Component {
  private resultList!: ResultList;
  state!: ResultListState;

  componentWillMount() {
    this.resultList = new ResultList(engine);
    this.resultList.subscribe(() => this.updateState());
    engine.dispatch(searchActions.executeSearch());
  }

  updateState() {
    this.setState(this.resultList.state);
  }

  render() {
    return (
      <Grid container spacing={4}>
        {this.state.results.map((result) => (<ResultItem result={result} />))}
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

function ResultItem({result}: {result: Result}) {
  const classes = useStyles();
  return (
    <Grid item key={result.uniqueId} xs={12} sm={6} md={3}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={result.raw.ccimage}
          title={result.title}
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="subtitle1">
            <Link href={result.clickUri}>{result.title}</Link>
          </Typography>
          <Typography>{result.raw.cccategoryl2}</Typography>
          <Typography>${result.raw.ccpriceretail}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
