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

### Using webpack-dev-middleware

`webpack-dev-middleware` is a wrapper that will emit files processed by webpack to a server.

```
$ npm i -D express webpack-dev-middleware
```

webpack.config.js
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    // ...
  },
  devtool: 'inline-source-map',
  plugins: [
    // ...
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  }
};
```

server.js
```javascript
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

app.listen(3000, function() {
  console.log('Example app listening on port 3000!\n');
});
```

package.json
```javascript
{
  "scripts": {
    "server": "node server.js"
  }
}
```

## Hot Module Replacement (HMR)

### Enabling HMR

webpack.config.js
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Output Management'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

index.js
```javascript
import _ from 'lodash';
import printMe from './print';
import './style.css';
import logo from './download.png';

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  var myIcon = new Image();
  myIcon.src = logo;

  element.appendChild(myIcon);

  btn.innerHTML = 'Click me and check the console';
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());

if (module.hot) {
  module.hot.accept('./print.js', function() {
    console.log('Accepting the updated printMe module!');
    printMe();
  })
}
```

### Via the Node.js API

dev-server.js
```javascript
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./webpack.config.js');
const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost'
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(5000, 'localhost', () => {
  console.log('dev server listening on port 5000');
});
```

## Tree shaking

Dead-code elimination.

### Mark the file as side-effect-free

No side effects => webpack can safely prune unused exports.

package.json
```json
{
  "name": "your-project",
  "sideEffects": false
}
```

You can also list files that might have side-effects:

package.json
```json
{
  "name": "your-project",
  "sideEffects": ["./src/some-side-effectful-file.js"]
}
```

### Minify the output

Use `-p` (production) webpack compilation flag to enable the uglifyjs minification plugin.

webpack.config.js
```javascript
module.exports = {
  entry: // ...,
  output: {
    // ...
  },
  mode: "production"
};
```

## Production
