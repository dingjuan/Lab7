// script.js

import { router, gotoPage } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach((entry, id) => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
        newPost.onclick = e => {
          setState("entry" + id);
        }
      });
    });
});

window.addEventListener('popstate', (e) => {
  let state = e.state.page
  gotoPage(state)
});
// click setting button
document.querySelector("header img").onclick = e => {
  setState("settings");
}

document.querySelector("header h1").onclick = e => {
  setState("");
}

