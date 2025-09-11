export interface Env {
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    
    // Handle root path - serve index.html
    if (url.pathname === '/') {
      return env.ASSETS.fetch(new URL('/index.html', request.url));
    }
    
    // Try to serve the requested asset
    const assetResponse = await env.ASSETS.fetch(request);
    
    // If asset exists, return it
    if (assetResponse.status !== 404) {
      return assetResponse;
    }
    
    // For SPA routing, return index.html for non-asset requests
    if (!url.pathname.includes('.')) {
      return env.ASSETS.fetch(new URL('/index.html', request.url));
    }
    
    // Return 404 for missing assets
    return new Response('Not found', { status: 404 });
  },
};