/**
 * Takes in a string like waffle/:waffleId/ingredients and an object
 * and will hand back something like waffle/123/ingredients
 *
 * @param {string} searchString The string with placholders
 * @param {Record<string, any>} [keyValuePair={}] A map that has keys that match the placeholders
 * @returns {string}
 */
export const replaceKeyPlaceholders = (
  searchString: string,
  keyValuePair: Record<string, any> = {}
): string => {
  Object.keys(keyValuePair).forEach((key) => {
    searchString = searchString.replace(`:${key}`, keyValuePair[key])
  })
  return searchString
}

/**
 * Takes in an object of queryParams and will loop over them and convert to a query param string
 *
 * @param {Record<string, any>} queryParams An object
 * @returns {string} All of the keys mapped to query param style 'this=something&otherThis=anotherSomething'
 */
export const toQueryParams = (queryParams: Record<string, any>): string => {
  const queryParamString = Object.keys(queryParams)
    .map((param) => `${param}=${queryParams[param].toString()}`)
    .join('&')
  return `?${queryParamString}`
}
