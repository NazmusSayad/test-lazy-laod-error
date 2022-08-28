# Minimal React Boilerplate

Checkout [demo](https://react-setup.vercel.app) site.

## Features

- 5x  lighter than `create-react-app`
- Hot module replacement during local development
- SEO optimized (never forget to edit `src/index.html`)
- SASS support
- CSS module supports
- Babel && PostCSS installed

---

## Requirements

- [Node.js](https://nodejs.org/) v16+
- Optionally [VS Code](https://code.visualstudio.com/)
- Optionally [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)  and [Reactime](https://chrome.google.com/webstore/detail/reactime/cgibknllccemdnfhfpmjhffpjfeidjga?hl=en) browser extensions

## Getting Started

[Generate](https://github.com/NazmusSayad/react-redux-minimal-boilerplate/generate) a new project from this template and clone it.

```
$ git clone https://github.com/NazmusSayad/react-redux-minimal-boilerplate
$ cd react-redux-minimal-boilerplate
```

##  Install & Start

- Initialize your project with some details
`$ npm init`

- Install dependencies and save the versions
`$ npm install --save`

- Remove `<InitialApp />` from **[src/App.jsx](/src/App.jsx)** and write your own code. [Don't forget to delete **[src/#InitialApp](/src/#InitialApp)** folder (:]

- Launches the app in development mode on [`http://localhost:80`](http://localhost:80)
`$ npm start` 

- Compiles and bundles the app for deployment
`$ npm run build`

---

## Configuring

- For basic configurations [webpack.common.js](/webpack.common.js)

   ```
  const CONFIG = {
     build: __dirname + '/build',
     publicDir: __dirname + '/public',
     mainJS: __dirname + '/src/index.js',
     template: __dirname + '/src/index.html',
     publicPath: '/',
     assestPath: 'static',
     cssRegex: /\.(c|sc|sa)ss$/i,
     cssModuleRegex: /\.module\.\w+$/i,
  }
   ```
   
   
- Change assest types from [webpack.common.js](/webpack.common.js)

   ```
   loaders: [
      {
         test: /\.(png|jp?g|gif|webp|webm|mp3|mp4)$/i,
         type: 'asset/resource',
      }
   ]
   ```
   
- To change CSS module regex first remove comment from `makeCssRules` constant functions [webpack.common.js](/webpack.common.js)

   ```
    modules: {
      // auto: CONFIG.cssModuleRegex,
      localIdentName: '[local]-[hash:base64:8]',
    }
   ```


- Configure development server from [webpack.dev.js](/webpack.dev.js)

   ```
   devServer: {
      host: 'localhost',
      port: 80,
      hot: true,
      compress: false,
      historyApiFallback: true,
      
      client: {
         logging: 'none',
         overlay: false,
         progress: false,
      },
   }
  ```

- Read from [Webpack Docs](https://webpack.js.org/configuration) if you want more customization.

---

## How to Update

- `npm update --save`  --- Update Node.js modules (dependencies)


<br/>

---

<sup>Made with ♥ by [Nazmus Sayad](https://github.com/NazmusSayad).
