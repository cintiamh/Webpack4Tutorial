# Webpack4Tutorial

Webpack is used to compile JavaScript modules.

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
    "build": "webpack"
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
$ npm run build
```

## Asset management

### Loading CSS

```
$ npm i -D style-loader css-loader
```

webpack.config.js
```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
};
```

```
$ touch src/style.css
```

index.js
```javascript
import './style.css';
```

### Loading images & fonts

```
$ npm i D file-loader
```

webpack.config.js
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  }
};
```

### Loading data

JSON will work by default.
```
$ npm i -D csv-loader xml-loader
```

```javascript
module.exports = {
  module: {
    rules: [
      {
         test: /\.(csv|tsv)$/,
         use: [
           'csv-loader'
         ]
       },
       {
         test: /\.xml$/,
         use: [
           'xml-loader'
         ]
       }
    ]
  }
};
```

## Output management
