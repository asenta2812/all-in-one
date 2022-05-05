import { ErrorAlert } from '@components/alerts'
import auth from '@feathersjs/authentication-client'
import feathers from '@feathersjs/client'
import rest from '@feathersjs/rest-client'
import axios from 'axios'
import { signOutUserAction } from '@redux/auth'

const backendUrl = process.env.REACT_APP_BACKEND_URL
const restClient = rest(backendUrl)
const feathersClient = feathers()

let store = null
feathersClient.configure(restClient.axios(axios))
feathersClient.configure(feathers.authentication())
feathersClient.configure(
  auth({
    storage: window.localStorage,
    storageKey: 'all-in-one-jwt',
  })
)
feathersClient.reAuthenticate().then(() => {
  // show application page
})

feathersClient.hooks({
  error({ error }) {
    ErrorAlert(error.message)
    if (
      (error.code === 401 || error.code === 403) &&
      window.localStorage.getItem('all-in-one-jwt')
    ) {
      store.dispatch(signOutUserAction())
    }
  },
})
export default feathersClient

export const injectStore = (_store) => {
  store = _store
}
