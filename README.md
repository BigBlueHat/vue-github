# vue-github

[Vue.js](http://vuejs.org/)-based Github browsing thing.

Very much in-progress....

## Use

```html
<script src="dist/bundle.js"></script>
```

This includes [Vue.js](http://vuejs.org/),
[marked.js](https://github.com/chjj/marked) (for Markdown parsing),
and all of vue-github.

Currently, vue-github exposes one global `VueGithub` for use in inline
`<script></script>`'s as seen in the various HTML example files in this repo.

## Development

vue-github now uses [Browserify](http://browserify.org/). To build your own
`bundle.js` variation, checkout `src/main.js` which does all the initial
`require()`ing.

Then do (assuming you have node.js & npm installed):

```
npm install
npm run dev
```

...and `dist/bundle.js` will have your variation.

## Testing

`npm run test` to run tests in the command line. Or `npm run test-browser` to
generate a `test/test-bundle.js` file to be use with `test/test.html`.

Due to CORS settings at GitHub not likeing `file:///`-based requests, you'll
want to load the test page via localhost.

```
python -m SimpleHTTPServer
```

Then open `http://localhost:8000/test/test.html` should get you the in-browser
tests. Enjoy! and Contribute!!1! :smiley_cat:

# License

[Apache License 2.0](http://apache.org/licenses/LICENSE-2.0)
