# React (Framework for JavaScript) - TicTacToe game:

In order to learn react I will follow [this tutorial](https://reactjs.org/tutorial/tutorial.html) from the oficial website of React.

## How to install Node js: 

update ``apt`` - apt is a command-line utility for installing, updating, removing, and otherwise managing deb packages on Ubuntu, Debian, and related Linux distributions.
```
sudo apt update
```
Install Node js:
```
sudo apt install nodejs
```
Check that the install was successful by querying node for its version number:
```
node -v
```

If the package in the repositories suits your needs, this is all you need to do to get set up with Node.js. In most cases, you’ll also want to also install npm, the Node.js package manager. You can do this by installing the npm package with apt:
```
sudo apt install npm
```
Info: https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04

## Create a React App - To make the TicTacToe game:

[Create React App](https://github.com/facebook/create-react-app) is a comfortable environment for learning React, and is the best way to start building a new single-page application in React.

It sets up your development environment so that you can use the latest JavaScript features, provides a nice developer experience, and optimizes your app for production. **You’ll need to have Node >= 14.0.0 and npm >= 5.6** on your machine. 

1- To create a project for the TicTacToe game, run:

```
npx create-react-app my-app
cd my-app
cd src

# If you're using a Mac or Linux:
rm -f *

# Or, if you're on Windows:
del *

# Then, switch back to the project folder
cd ..
```
> **Note:** ``npx`` on the first line is not a typo — it’s a **package runner tool** that comes with npm 5.2+.

2- Add a file named index.css in the src/ folder with [this](https://codepen.io/gaearon/pen/oWWQNa?editors=0100) CSS code.

3- Add a file named index.js in the src/ folder with [this](https://codepen.io/gaearon/pen/oWWQNa?editors=0010) JS code.

4- Add these three lines to the top of index.js in the src/ folder:

```
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
```

Create React App **doesn’t handle backend logic or databases**; it just creates a ``frontend`` build pipeline, so you can use it with **any backend you want**. Under the hood, it uses [Babel](https://babeljs.io/) and [webpack](https://webpack.js.org/), but you don’t need to know anything about them.

When you’re ready to deploy to production, running npm run build will create an optimized build of your app in the build folder. You can learn more about Create React App [from its README](https://github.com/facebook/create-react-app#create-react-app--) and the [User Guide](https://create-react-app.dev/).

## What Is React?

React is a declarative, efficient, and flexible ``JavaScript library`` for building user **interfaces**. It lets you compose complex UIs from small and isolated pieces of code called **“components”**.

React es una biblioteca Javascript de código abierto diseñada para crear interfaces de usuario con el objetivo de facilitar el desarrollo de aplicaciones en una sola página. Es mantenido por Facebook y la comunidad de software libre. En el proyecto hay más de mil desarrolladores libres.
--> [Wikipedia info](https://es.wikipedia.org/wiki/React)

More info: [W3schools](https://www.w3schools.com/whatis/whatis_react.asp)

[Glossary info about React](https://reactjs.org/docs/glossary.html)

## React --> SPA (Single Page Application):

A single-page application is an application that loads a single HTML page and all the necessary assets (such as JavaScript and CSS) required for the application to run. Any interactions with the page or subsequent pages do not require a round trip to the server which means the page is not reloaded.

Though you may build a single-page application in React, it is not a requirement. React can also be used for enhancing small parts of existing websites with additional interactivity. Code written in React can coexist peacefully with markup rendered on the server by something like PHP, or with other client-side libraries. In fact, this is exactly how React is being used at Facebook.

## Package Managers (npm - yarn):

Package managers are tools that allow you to manage dependencies in your project. ``npm`` and ``Yarn`` are two package managers commonly used in React applications. Both of them are clients for the same npm package registry.

The major difference between NPM and Yarn comes in terms of security performance. While NPM installs packages sequentially, Yarn performs parallel installation resulting in better speed and performance. NPM has tried to fix vulnerabilities, but still, Yarn is considered more secure than NPM. 
Info from [here](https://www.knowledgehut.com/blog/web-development/yarn-vs-npm)

## JSX:

JSX is a syntax extension to JavaScript. It is similar to a template language, but it has full power of JavaScript. JSX gets compiled to React.createElement() calls which return plain JavaScript objects called “React elements”. To get a basic introduction to JSX see the docs here and find a more in-depth tutorial on JSX here.
It was created by Facebook.

React DOM uses camelCase property naming convention instead of HTML attribute names. For example, tabindex becomes tabIndex in JSX. The attribute class is also written as className since class is a reserved word in JavaScript.

¿Por qué JSX?

En lugar de separar artificialmente tecnologías poniendo el maquetado y la lógica en archivos separados, React separa intereses con unidades ligeramente acopladas llamadas “componentes” que contienen ambas. Volveremos a los componentes en otra sección, pero si aún no te sientes cómodo maquetando en JS, esta charla podría convencerte de lo contrario.

React no requiere usar JSX, pero la mayoría de la gente lo encuentra útil como ayuda visual cuando trabajan con interfaz de usuario dentro del código Javascript. Esto también permite que React muestre mensajes de error o advertencia más útiles.

[Muy buena info introductoria de JSX](https://es.reactjs.org/docs/introducing-jsx.html)

More info about JSX:
- https://thoughtworks-es.medium.com/qu%C3%A9-demonios-es-jsx-txt-f5841e51f664

En cierta manera, JSX es similar al motor de plantillas (templates) **Jinja** hecho para Python (lo usamos en Holberton).

JSX is a syntactic extension to JavaScript that contains these tags and was designed by the React team to enable inline HTML-like markup in JavaScript components. These are similar to the Python Jinja templating engine.
[Info from here](https://blog.logrocket.com/python-developers-guide-react/#:~:text=JSX%20is%20a%20syntactic%20extension,the%20Python%20Jinja%20templating%20engine.)

## Elements:

React ``elements`` are **the building blocks of React applications**. One might confuse elements with a more widely known concept of “components”. An element describes what you want to see on the screen. React elements are immutable.

```
const element = <h1>Hello, world</h1>;
```
Typically, elements are not used directly, but get returned from components.

## Components (are similar to functions):

React components are small, reusable pieces of code that return a React element to be rendered to the page. The simplest version of React component is a plain JavaScript function that returns a React element:

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
Components can also be ``ES6 classes``:

```
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
Components can be broken down into distinct pieces of functionality and used within other components. Components can return other components, arrays, strings and numbers. A good rule of thumb is that if a part of your UI is used several times (Button, Panel, Avatar), or is complex enough on its own (App, FeedStory, Comment), it is a good candidate to be a reusable component. Component names should also always start with a capital letter (<Wrapper/> not <wrapper/>). See this documentation for more information on rendering components.

## props:

props are inputs to a React component. They are data passed down from a parent component to a child component.
Remember that props are readonly. They should not be modified in any way
If you need to modify some value in response to user input or a network response, use state instead.

## state:

A component needs state when some **data associated with it changes over time**. For example, a ``Checkbox`` component might need **isChecked** in its state, and a NewsFeed component might want to keep track of fetchedPosts in its state.

The **most important difference between ``state`` and ``props``** is that **props** are passed from a parent component, but **state** is managed by the component itself. A component cannot change its props, but it can change its state.

For each particular piece of changing data, there should be just one component that “owns” it in its state. Don’t try to synchronize states of two different components. Instead, lift it up to their closest shared ancestor, and pass it down as props to both of them.

## Events:

Handling events with React elements has some syntactic differences:

* React event handlers are named using camelCase, rather than lowercase.
* With JSX you pass a function as the event handler, rather than a string.

## Extra information:

Para cambiar el titulo y el icono de la aplicacion ir a: public/index.html
