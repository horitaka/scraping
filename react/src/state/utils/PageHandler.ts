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

  getTableHeader() {
    return {}
  }
}

export default PageHandler
