require('isomorphic-unfetch');
const path = require('path');
const { renderToString } = require('./hydrate');
const express = require('express');

const template = `
<!DOCTYPE html>
<html dir="ltr" lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0">
  <title>Stencil Component Starter</title>
  <link rel="stylesheet" href="/build/stencil-ui.css">
  <script type="module" src="/build/stencil-ui.esm.js"></script>
  <script nomodule src="/build/stencil-ui.js"></script>

</head>
<body>
  <div class="coveo-search-interface">
    <search-box search-as-you-type="false"></search-box>
    <result-list></result-list>
  </div>
</body>
</html>

`

const options = { prettyHtml: true };
// renderToString(template, options).then(ssr => console.log(ssr.html))
const app = express();

app.use('/build', express.static(path.join(__dirname, 'dist/stencil-ui')))
app.get('/ssr', function (req, res) {
  renderToString(template, options)
  .then(ssr => res.send(ssr.html));
})

app.get('/', function (req, res) {
  return res.send(template);
})
 
app.listen(3000)