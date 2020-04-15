import { response } from './store.ts';

export class HeadlessResultList {
  public get results() {
    // return store.response.results;
    return response;
  }
}