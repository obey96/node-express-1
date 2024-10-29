### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
  callbacks
  promises
  async/await

- What is a Promise?
  promise is an object representing the eventual result or failure of an
  asynchronous operation.

- What are the differences between an async function and a regular function?
  An async function in javascript differs from a regular function in how it handles asynchronous operations.
  Async functions simplify asynchronous workflows, making code that involves asynchronous operations cleaner, more readable, and easier to manage.

- What is the difference between Node.js and Express.js?
    node is a JS runtime for executing code server-side, providing low-level tools for file handling, network communication, and asynchronous operations. It does not have built-in features for routing or middleware.

    express is a web framework built on top of node, offering a simplified API for creating web servers. It provides routing, middleware support, and an organized structure for building web
    applications and APIs efficiently.

- What is the error-first callback pattern?
  The error-first callback pattern is a common design pattern used in Node and other asynchronous JS environments. It is a way of structuring callbacks so that errors are handled as the first argument in a callback function.

- What is middleware?
  refers to functions that sit bewtween an incoming request and the final request handle in a web application. These functions have access to the request object, response object, and can modify or terminate the request-response cycle.

- What does the `next` function do?
  the function in middleware is used to pass control from one middleware function to the next in the request-response cycle. Without it the request

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```

-Requesting using await one after the other leads to slower execution.
-No mechanism to handle API request failures
-Usernames are hard-coded, making the function less reusable