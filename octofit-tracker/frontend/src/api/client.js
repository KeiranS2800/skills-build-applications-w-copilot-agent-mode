const getBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
};

export const getApiUrl = (resource) => `${getBaseUrl()}/api/${resource}/`;

export const normalizeCollection = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    if (Array.isArray(payload.data)) {
      return payload.data;
    }

    if (Array.isArray(payload.results)) {
      return payload.results;
    }

    if (Array.isArray(payload.items)) {
      return payload.items;
    }
  }

  return [];
};

export const fetchCollection = async (resource) => {
  const response = await fetch(getApiUrl(resource));
  if (!response.ok) {
    throw new Error(`Unable to load ${resource}`);
  }

  const payload = await response.json();
  return normalizeCollection(payload);
};
