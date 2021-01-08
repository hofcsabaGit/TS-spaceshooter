### Splash Shooter

test project for a games company (6 Hrs)



Versions:
- [Typescript](https://www.typescriptlang.org/) 2.9.2
- [Webpack](https://webpack.js.org/) 3.10.0
- [PixiJS](http://www.pixijs.com/) 4.8.1


### Prerequisites

Install Node & NPM from [here](https://www.npmjs.com/get-npm) or using [NVM](https://github.com/creationix/nvm)



### Installing

Install NPM dependencies by running.

```
npm install
```
 


## Initial Steps

- Test it by running and browsing to [localhost:9000](http://localhost:9000/) 

```
npm run build && npm run serve
```



## NPM scripts

- clean - [removes](https://github.com/isaacs/rimraf) dev, dist and doc dirs
- build - compiles and copy all the assets to dev dir
- build:release - compiles and [uglifies](https://github.com/webpack-contrib/uglifyjs-webpack-plugin) to dist dir
- rebuild:all - cleans and rebuilds dev, dist and doc. 
- serve - serves (0.0.0.0:9000) dev dir with Hot Module Replacement enabled through [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
- serve:release - serves (0.0.0.0:9999) dist dir through [http-server](https://github.com/indexzero/http-server) to test production bundle
- test - does nothing right now
- doc - generate app doc with [typedoc](http://typedoc.org/)
- start - runs build & serve




### boilerplate used

https://github.com/dacaher/pixijs-ts-boilerplate
