import store from './store';

export class HeadlessResultList {
  public get results() {
    return store.response.results;
  }
}