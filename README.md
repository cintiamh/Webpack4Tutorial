# Webpack4Tutorial

Step by step guides.

```
$ npm init -y
$ touch .gitignore
```

* [.gitignore](.gitignore)

```
$ npm i -D webpack webpack-cli
$ touch webpack.config.js
```

package.json
```json
{
  "scripts": {
    "start": "webpack --config webpack.config.js"
  }
}
```

Initial files
```
$ mkdir dist
$ touch dist/index.html
$ mkdir src
$ touch src/index.js
```

The `npx` command (Node>=8.2) runs webpack binary (./node_modules/.bin/webpack).
```
$ npx webpack
```
