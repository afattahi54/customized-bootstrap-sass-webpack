# Customized Bootstrap and fontawsome SASS with webpack

This is a tutorial for setting up a sample project with bootstrap 4,  webpack 4 and fontawsome free 5 all with customizable sass. There will be two pages a `login` and a `welcome` pages with some customized colors.

To keep it simple no modern javascript library or framework. So this sample *can not* be used in real project and need many tweaks.

```bash
git clone https://github.com/afattahi54/customized-bootstrap-sass-webpack.git
```

## Project Structure

Open `package.json`. The `dependencies` are four packages which will be needed during development. The `devDependencies` are lot, Don't worry these are all required for customization.

```js
  "dependencies": {
    "@fortawesome/fontawesome-free": "^5.3.1",
    "bootstrap": "^4.1.3",
    "jquery": "^3.3.1",
    "popper.js": "^1.14.4"
  },
```

Again in `package.json` there are two `scripts`.
1.`build` Create final pages in `dist` folder by calling `webpack`.
2.`start` runs a small web server named `webpack-dev-server` which cache files in memory and watch changes during development.

Open `webpack.config.js` this is hurt of the webpack. This file is picked up automatically by webpack. In the webpack world, the files are come in (`entry`), the webpack  `process` them with `modules` base on rules and `output` them. Each module and plugin can be configured in many ways. The `entry` has the list of our pages the `HtmlWebpackPlugin` helps webpack to build two html for us. ( In modern SPA development one page entry is enough)

Have a look at `login.js` and `welcome.js` here.

Open `login.html`. This is a bootstrap sample for login page but no `css`, `js`, `svg` ... included!

Let's see `login.js`. There are lots of `imports` there.

```js
//Import styles
import "./login.css";
import "./assets/scss/project.scss";

//Import image if page needs them
import bootstrapIcon from "./assets/images/bootstrap-solid.svg";

document.getElementById('bootIcon').src = bootstrapIcon;
```

Even `sass` and `pictures` are imported. This is what webpack do. We just define what we want webpack *bundled* it for us. We could want any thing, any thing that webpack understands or at least there is a `loader` for it. Webpack could do even more, for example if it is `scss` file webpack `process` it by using  `sass-loader`, `style-loader`,... and make final `css`.

Have you noticed this line `document.getElementById('bootIcon').src = bootstrapIcon`. The `index.js` is responsible for setting images in `login.html`. The hard hard work is done by webpack so we can import images by `import bootstrapIcon from "./assets/images/bootstrap-solid.svg";`

In this configuration the webpack loads images ( see: `test: /\.(png|jpg|gif|svg)$/` in `webpack.config.js`) Convert images to base64 strings if they are 8kb and change its name. You can *deal* with images any way you want, but not a good idea to access them directly in your html.

```js
{
    test: /\.(png|jpg|gif|svg)$/,
    loader: "url-loader",
    options: {
        limit: 8000, // Convert images < 8kb to base64 strings
        name: "img/[name].[ext]"
    }
},
```

## Let's play to see the webpack power

```bash
cd customized-bootstrap-sass-webpack
npm install
npm run start
```

Open your browser at <http://127.0.0.1:8080/login.html> or <http://127.0.0.1:8080/welcome.html>. I have made some color changes and will let you know how this is done.

Open `assets\scss\custom-bootstrap.scss` all the bootstrap variables can be changed here and the `webpack-dev-server` detect changes compile `scss` to `css` and inject it to `html` ( for better performance generate files will be saved in memory so the `dist` folder is empty now). To see all bootstrap variables go to `scss/_variables.scss`. Change `$body-bg` in `custom-bootstrap.scss` to see immediate changes. A complete guide at <https://getbootstrap.com/docs/4.1/getting-started/theming/>

Open the `assets\scss\custom-fontawsome.scss`.you can customize font awsome here:

```js
//customize webfont. The complete list at: fontawesome-free\scss\_variables.scss
$fa-font-path: '~@fortawesome/fontawesome-free/webfonts';
$fa-border-color:  #f00;

@import '~@fortawesome/fontawesome-free/scss/fontawesome';
@import '~@fortawesome/fontawesome-free/scss/solid';
@import '~@fortawesome/fontawesome-free/scss/regular';
@import '~@fortawesome/fontawesome-free/scss/brands';
```

Open the `welcome.js` here we have `import 'bootstrap';` this page uses navigation and we need bootstrap `js` files too.

## Build the site

To have the final pages run:

```bash
npm run build
```

Open the `dist` the `html`s are there. There is no `css` as the `css` is bundled in `js` files. The fonts are loaded directly.
