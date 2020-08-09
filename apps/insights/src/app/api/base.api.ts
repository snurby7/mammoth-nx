import { default as Axios } from 'axios'

export class BaseApi {
  protected axios = Axios

  protected formatUrl(url: string, keyValuePair: Record<string, any> = {}): string {
    Object.keys(keyValuePair).forEach((key) => {
      url = url.replace(`:${key}`, keyValuePair[key])
    })
    return url
  }
}
