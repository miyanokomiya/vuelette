# Installation

## Direct Download / CDN

https://unpkg.com/vuelette/dist/vuelette 

[unpkg.com](https://unpkg.com) provides NPM-based CDN links. The above link will always point to the latest release on NPM. You can also use a specific version/tag via URLs like https://unpkg.com/vuelette@{{ $version }}/dist/vuelette.js
 
Include vuelette after Vue and it will install itself automatically:

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vuelette/dist/vuelette.js"></script>
```

## NPM

```sh
$ npm install vuelette
```

## Yarn

```sh
$ yarn add vuelette
```

When used with a module system, you must explicitly install the `vuelette` via `Vue.use()`:

```javascript
import Vue from 'vue'
import vuelette from 'vuelette'

Vue.use(vuelette)
```

You don't need to do this when using global script tags.

## Dev Build

You will have to clone directly from GitHub and build `vuelette` yourself if
you want to use the latest dev build.

```sh
$ git clone https://github.com//vuelette.git node_modules/vuelette
$ cd node_modules/vuelette
$ npm install
$ npm run build
```

