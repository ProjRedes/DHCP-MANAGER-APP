import api from './api';

export async function createHost(hostData) {
  return api.post('/Host', hostData);
}
