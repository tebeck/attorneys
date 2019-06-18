import SuperAgent from 'superagent'

export const url_backend = SuperAgent.get(process.env.REACT_APP_URL_BACKEND).url;