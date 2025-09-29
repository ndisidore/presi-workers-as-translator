export interface Env {
  ASSETS: Fetcher;
  BASE_PATH: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const basePath = env.BASE_PATH;

    // Handle base path root - serve index.html
    if (url.pathname === basePath || url.pathname === basePath + '/') {
      return env.ASSETS.fetch(new URL('/index.html', request.url));
    }

    // For requests under the base path, try to serve the asset
    if (url.pathname.startsWith(basePath)) {
      // Remove base path from the request to match asset structure
      const assetPath = url.pathname.substring(basePath.length);
      const assetUrl = new URL(assetPath || '/index.html', request.url);
      const assetResponse = await env.ASSETS.fetch(assetUrl);

      // If asset exists, return it
      if (assetResponse.status !== 404) {
        return assetResponse;
      }

      // For SPA routing, return index.html for non-asset requests
      if (!assetPath.includes('.')) {
        return env.ASSETS.fetch(new URL('/index.html', request.url));
      }
    }

    // Return 404 for requests outside base path or missing assets
    return new Response('Not found', { status: 404 });
  },
};