import http from 'k6/http'
import { check } from 'k6';
import { Rate } from 'k6/metrics';

const { param_url } = require('./00-param.js') ;
export let errorRate = new Rate('errors');

export const options = {
    vus: 5,
    iterations: 10,
    thresholds: {
        'errors': ['rate<0.15'],
    }
  };
  

export default function () {
    let res = http.get('https://run.mocky.io/v3/c4be3e1d-c873-46a7-9769-d068eed141e5')

    const checkerror = check(res, {
        'is response status is 200 :': (r) => r.status === 200,
        'verify homepage text': (r) => r.body.includes('success'),
        'and response body is not zero:' : (r) => r.body.length == 41,
    })
    errorRate.add(!checkerror)
}