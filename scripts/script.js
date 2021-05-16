// script.js

import { router, gotoPage } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

//Service worker registration ^

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
  if (e.state == null) {
    setState("");
  } else {
    let state = e.state.page
    gotoPage(state)
  }
});
// click setting button
document.querySelector("header img").onclick = e => {
  setState("settings");
}

document.querySelector("header h1").onclick = e => {
  setState("");
}

