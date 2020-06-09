import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from './Header';
import Footer from './Footer';
import MainFeaturedPost from './MainFeaturedPost';
import Results from './components/Results';
const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const sections = [
  {title: 'Appliances', url: '#'},
  {title: 'Desktops', url: '#'},
  {title: 'Laptops', url: '#'},
  {title: 'Cell Phones', url: '#'},
  {title: 'Monitors', url: '#'},
  {title: 'TV', url: '#'},
  {title: 'Video Games & Movies', url: '#'},
  {title: 'Cameras', url: '#'},
  {title: 'Printers', url: '#'},
];

const mainFeaturedPost = {
  title: 'Live life on the go with our awesome laptop deals.',
  description:
    'Whether you design, game, or work, we have the right laptop for you. Explore our great offers on laptops, MacBooks and Chromebooks.',
  image:
    'https://merchandising-assets.bestbuy.ca/bltc8653f66842bff7f/blt5864b140f686ab51/5db74580df78486c826de4a4/computing-20191028-feature-laptops-and-macbooks-orientation-m.jpg?width=5760&quality=80',
  imgText: 'main image description',
  linkText: 'Shop deals',
};

export default function Blog() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Tech & Stuff" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={5} className={classes.mainGrid}>
            <Results />
          </Grid>
        </main>
      </Container>
      <Footer title="" description="For demo purposes only" />
    </React.Fragment>
  );
}
