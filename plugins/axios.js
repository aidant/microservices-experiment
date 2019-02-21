// const axios = require('axios')
const axios = { create: (_) => _ }

const instance = axios.create({

})

instance.interceptors.response.use((response) => response.data)

register({ name: 'axios', version: '1.0.0' }, instance)

// register(require('axios/package.json'), require('axios'))