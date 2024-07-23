import { Api } from '@/types/api/Api'

let api: Api<unknown>

export const ApiBaseUrl =
  process.env.NODE_ENV !== 'development'
    ? // here pass credentialProps
      'tbd'
    : 'http://localhost:3000'

function getApiInstance(authCookie?: string): Api<unknown> {
  if (!api) {
    api = new Api({
      baseUrl: ApiBaseUrl,
      baseApiParams: {
        headers: {
          'Content-Type': 'application/json',
          Cookie: `Auth=${authCookie ?? ''}`,
        },
        credentials: 'include',
      },
    })
  }
  return api
}

const getAuthHeader = () => {
  return {
    headers: { authorization: 'Bearer ' + localStorage.getItem('token') },
  }
}

export { getApiInstance, getAuthHeader }
