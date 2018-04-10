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

```
$ npm i -D style-loader css-loader file-loader csv-loader xml-loader
```

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
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      },
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

* multiple files Output
* HtmlWebpackPlugin: generates the HTML file importing the necessary files
* CleanWebpackPlugin: clean the `/dist` folder everytime there is a build

```
$ npm i -D html-webpack-plugin
$ npm i -D clean-webpack-plugin
```

webpack.config.js
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Output Management'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

## Development

### Using source maps

webpack.config.js
```javascript
module.exports = {
  entry: {
    // ...
  },
  devtool: 'inline-source-map',
  plugins: [
    // ...
  ],
  output: {
    // ...
  }
};
```

### Using webpack-dev-server

```
$ npm i -D webpack-dev-server
```

webpack.conf.js
```javascript
module.exports = {
  entry: {
    // ...
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    // ...
  ],
  output: {
    // ...
  }
};
```
