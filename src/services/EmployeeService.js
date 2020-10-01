import axios from 'axios';

export default class EmployeeService {
  constructor() {
    this.baseURL = 'http://localhost:3001';
  }

  all() {
    const url = `${this.baseURL}/employees`;
    return axios.get(url);
  }

  pagination(url) {
    return axios.get(url);
  }

  search(search) {
    const url = `${this.baseURL}/employees`;
    const config = {
      params: { search }
    };

    return axios.get(url, config);
  }

  filter(params) {
    const url = `${this.baseURL}/employees`;
    const config = { params };

    return axios.get(url, config);
  }
}