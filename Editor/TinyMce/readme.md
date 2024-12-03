# tinyify

a browserify plugin that runs various optimizations, so you don't have to install them all manually.

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]

[npm-image]: https://img.shields.io/npm/v/tinyify.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/tinyify
[travis-image]: https://img.shields.io/travis/browserify/tinyify.svg?style=flat-square
[travis-url]: https://travis-ci.org/browserify/tinyify
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard

```bash
npm install --save-dev tinyify

browserify -p tinyify app.js
```

## Included

 - [unassertify][] - Remove `assert()` calls
 - [@browserify/envify][] - Replace environment variables—by default, replaces `NODE_ENV` with `"production"`
 - [@browserify/uglifyify][] - Remove dead code from modules
 - [common-shakeify][] - Remove unused exports from modules
 - [browser-pack-flat][] - Output a "flat" bundle, with all modules in a single scope
 - [bundle-collapser][] - When using the `--no-flat` option, bundle-collapser replaces file paths in `require()` calls with short module IDs
 - [minify-stream][] - Uglify the final bundle

[browser-pack-flat][] and [bundle-collapser][] are both not used if the `--full-paths` option is passed to Browserify.
This way you can still get all of tinyify's other optimizations when building for [disc][].

## Options

Options can be provided on the command line using subarg syntax, or in a separate options object using the browserify API.

### `env: {}`

Supply custom environment variables for [@browserify/envify][].

```js
b.plugin('tinyify', {
  env: {
    PUBLIC_PATH: 'https://mywebsite.surge.sh/'
  }
})
```

This option is only available in the API.
On the CLI, you can define environment variables beforehand instead:

```bash
PUBLIC_PATH=https://mywebsite.surge.sh browserify app.js -p tinyify
```

### `--no-flat`, `flat: false`

Disable [browser-pack-flat][].
This enables [bundle-collapser][] instead which will still shrink the output bundle a bit by replacing file paths with short module IDs.

```bash
browserify app.js -p [ tinyify --no-flat ]
```

```js
b.plugin('tinyify', { flat: false })
```

## More options?

If you need further customisation, I recommend installing the tools separately instead:

```bash
npm install --save-dev unassertify @browserify/envify @browserify/uglifyify common-shakeify browser-pack-flat terser
browserify entry.js \
  -g unassertify \
  -g @browserify/envify \
  -g @browserify/uglifyify \
  -p common-shakeify \
  -p browser-pack-flat/plugin \
| terser -cm \
> output.js
```

Or with the Node API:

```js
browserify('entry.js')
    .transform('unassertify', { global: true })
    .transform('@browserify/envify', { global: true })
    .transform('@browserify/uglifyify', { global: true })
    .plugin('common-shakeify')
    .plugin('browser-pack-flat/plugin')
    .bundle()
    .pipe(require('minify-stream')({ sourceMap: false }))
    .pipe(fs.createWriteStream('./output.js'))
```

Alternatively you can fork this repo and publish it on npm under a scope with your modifications.

## License

[Apache-2.0](./LICENSE.md)

[unassertify]: https://github.com/unassert-js/unassertify
[@browserify/envify]: https://github.com/browserify/envify
[@browserify/uglifyify]: https://github.com/browserify/uglifyify
[common-shakeify]: https://github.com/browserify/common-shakeify
[browser-pack-flat]: https://github.com/goto-bus-stop/browser-pack-flat
[bundle-collapser]: https://github.com/substack/bundle-collapser
[minify-stream]: https://github.com/goto-bus-stop/minify-stream
[browser-pack]: https://github.com/browserify/browser-pack
[disc]: https://github.com/hughsk/disc


# TinyMCE documentation

This project maintains the documentation for TinyMCE at
[https://www.tiny.cloud/docs](https://www.tiny.cloud/docs). If you have any
modifications you wish to contribute, fork this project, make the changes
and submit a pull request. You will need to sign the contributor’s license
agreement, which will be emailed to you upon creating the pull request.

This project is built using [Antora](https://antora.org/).

## Contributing to the TinyMCE Documentation

If you would like to contribute to the TinyMCE project please read the TinyMCE Documentation Contributor’s Guide at either:

- [TinyMCE Documentation - Contributor's Guide](https://www.tiny.cloud/docs/configure/contributing-docs/).
- [GitHub - How to contribute to TinyMCE’s documentation](https://github.com/tinymce/tinymce-docs/blob/release/docs-6/CONTRIBUTING.md#how-to-contribute-to-tinymces-documentation).

## Working on TinyMCE documentation

### Compiling or building the documentation

The following procedure assists with building (or compiling) the documentation locally. Tiny recommends testing and reviewing changes locally prior to submitting a pull request.

#### Installing Prerequisites

##### Linux users

You need the following programs installed on your computer:

#### First time set up

Once you have installed any missing prerequisites, in a terminal or on a command prompt:

1. Clone the git repository:
    ```
    git clone git@github.com:tinymce/tinymce-docs.git
    ```

2. Change directory into the cloned git repository:
    ```
    cd tinymce-docs
    ```

3. Run yarn install
    ```
    yarn install
    ```

#### Run the development version of the documentation

To create a development version of the documentation, run:

```
yarn build
yarn serve
```


To view the documentation; in a web browser, navigate to [http://127.0.0.1:4000](http://127.0.0.1:4000).

> **Note**: The development version of the documentation will update automatically when you save changes locally.

The `yarn build` step will download the latest TinyMCE package and generate new API reference content from source code. To change the version of TinyMCE API, open the `-scripts/api-reference.sh` file and edit the API_VERSION to the TinyMCE version you would like to generate API docs for.  Alternatively, to build using a local version of TinyMCE, `yarn build-local ../path/to/local/TinyMCE`.

> **Note**: The development server does not need to be stopped prior to running the `yarn build` command, antora should pick up the new changes generated by the build step.

#### TinyMCE API documentation

The TinyMCE API documentation is maintained within the [TinyMCE project repository](https://github.com/tinymce/tinymce) and compiled for the documentation site using [MoxieDoc](https://github.com/tinymce/moxiedoc).

To update the published API documentation:

1. Change the version in `.api-version`.
2. Run `yarn build`.
3. Commit the changes.

Running `yarn build` downloads the TinyMCE package specified in `.api-version` and generates new API reference content from source.

**Note:** The API documentation should never be edited manually.

##### Prerequisites

- [Node.js](https://nodejs.org/en/).


### Live Demos

New live demos can be added to the [modules/ROOT/examples/live-demos directory](modules/ROOT/examples/live-demos). It then can be referenced in your doc with the following code:

```
  liveDemo::{sub-directory-name}[]
```

#### Overriding the tinymce URL in live demos

All live demos usually get their `tinymce.min.js` URL from the `tinymce_live_demo_url` setting in the `antora.yml` file.
However, there are some instances where you wish to override this, e.g.

 - You want to push/deploy a branch for a new feature that's only on the 'dev' channel.
 - You want to run the site locally, but test out the live demos in a different channel.

To help with this, there are two mechanisms for overriding the `tinymce.min.js` URL.

 1. Change the URL for all live demos by setting the `tinymce_live_demo_url` attribute in `antora-playbook-dev.yml`. For example:
    ```
      asciidoc
        attributes:
          tinymce_live_demo_url: URL_to_script_file
    ```

 2. Change the URL for an individual live demo by setting `script_url_override` attribute in the live demo markup. For example:
    ```
      liveDemo::{sub-directory-name}[script_url_override='URL_to_script_file']
    ```

    - This is useful if you want to deploy the develop branch for a feature only in the 'dev' channel.
    - This only overrides the URL for one live demo.
    - Don't use this in more than one live demo on a page.
    - Don't use this long-term - when the feature is fully rolled-out, use the standard channel.
