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
