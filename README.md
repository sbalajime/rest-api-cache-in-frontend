This repo contains POC for REST API endpoint caching in frontend.

The below cache logic is present in service-worker.js

```js
self.addEventListener("fetch", event => {
  console.log("event.request.url", event.request.url);
  event.respondWith(
    //check network first. get data from cache only if it fails
    fetch(event.request)
    .then(response => {
      if(event.request.url.startsWith('http')){
        const responseClone = response.clone()
        caches.open('v1').then(function(cache) {
          //set latest API data in cache
          cache.put(event.request,responseClone);
        });
        return response
     }
      
      
    }).catch(() => {
      //Fetch data from cache when network fails
      return caches.match(event.request)
    })
  )
})
```