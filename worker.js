addEventListener('fetch', event => {
  event.respondWith(proxy(event.request))
})

async function proxy(request) {
  const url = new URL(request.url)
  const target = url.searchParams.get('url')
  if (!target) return new Response('Missing url', { status: 400 })
  return fetch(target)
}
