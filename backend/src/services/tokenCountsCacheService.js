let tokenCountsCache = {};

export const getTokenCountsCache = () => tokenCountsCache;

export const setTokenCount = (key, value) => {
  tokenCountsCache[key] = value;
};

export const getTokenCount = (key) => tokenCountsCache[key];

export const deleteTokenCount = (key) => {
  delete tokenCountsCache[key];
};
