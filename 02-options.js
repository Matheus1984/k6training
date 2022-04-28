import http from 'k6/http'
const { param_url } = require('./00-param.js') ;

export const options = {
    vus: 5,
    iterations: 10,
  };
  

export default function () {
    http.get(param_url)
}