/**
 * get current time in format: YYYY-MM-DD-HH-mm-ss
 * @param timestamp - Timestamp
 * @param lang - Language
 * @param dateOptions - Date options
 * @returns - Date string
 */
export function timeTransformer(timestamp = new Date(), lang = 'cn', dateOptions = {}) {
  return new Date(timestamp).toLocaleString(lang, dateOptions).replaceAll(/(\/|\:|)/g, '').replace(/\s/, '-')
}
