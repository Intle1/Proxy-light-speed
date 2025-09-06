addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const target = url.searchParams.get('url')
  if (!target) {
    return new Response('Missing url parameter', { status: 400 })
  }
  return fetch(target, {
    headers: request.headers,
    method: request.method
  })
}
