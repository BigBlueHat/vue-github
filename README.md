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

# License

[Apache License 2.0](http://apache.org/licenses/LICENSE-2.0)
