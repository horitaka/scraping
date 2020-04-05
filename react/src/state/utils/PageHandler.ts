import PuppeteerHandler from './PuppeteerHandler';

class PageHandler {
  protected puppeteer;

  constructor () {
    this.puppeteer = new PuppeteerHandler();
  }

  async launch() {
    await this.puppeteer.launch()
  }

  async close() {
    await this.puppeteer.close()
  }

  async login(loginUrl='', userId='', password='') {

  }

  async search(searchKeyword='') {

  }

  getTableHeader() {
    return {}
  }
}

export default PageHandler
