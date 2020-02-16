// import { Remote } from 'electron';

declare global {
  interface Window {
    require: any;
    electron: any;
  }
}

class PuppeteerHandler {
  private puppeteer;
  private browser;
  private page;

  constructor() {
    // const remote: Remote = window.require('electron').remote;
    // this.puppeteer = window.require('electron').remote.require('puppeteer');
    this.puppeteer = window.electron.remote.require('puppeteer');
    this.browser = null;
    this.page = null;
  }


  async launch() {
    const executablePath = await this.puppeteer.executablePath()
    const executablePathUnpacked = executablePath.replace('app.asar', 'app.asar.unpacked')
    this.browser = await this.puppeteer.launch({executablePath: executablePathUnpacked});
    this.page = await this.browser.newPage();
  }

  async close() {
    await this.browser.close()
  }

  async movePageTo(url) {
    try {
      const response = await this.page.goto(url);

      return {
        success: response.ok(),
        statusCode: response.status(),
        message: response.statusText(),
      };
    } catch (e) {
      console.warn(e)
      return {
        success: false,
        statusCode: 'Unknown',
        message: e.message,
      };
    }
  }

  async getFrame(selector) {
    try {
      const elementHandler = await this.page.$(selector);
      const frame = await elementHandler.contentFrame();
      return frame
    } catch (e) {
      console.warn(e)
      return ''
    }
  }

  async getInnerText(selector) {
    try {
      const innerText = await this.page.evaluate(`(() => (document.querySelector('${selector}').innerText))()`);
      return innerText
    } catch (e) {
      console.warn(e)
      return ''
    }
  }

  async getHtml(selector) {
    try {
      const html = await this.page.evaluate(`(() => (document.querySelector('${selector}').innerHTML))()`);
      return html
    } catch (e) {
      console.warn(e)
      return ''
    }
  }

  async getHtmlInFrame(selectorFrame, selectorHtml) {
    try {
      const frame = await this.getFrame(selectorFrame)
      const html = await frame.evaluate(`(() => (document.querySelector('${selectorHtml}').innerHTML))()`);
      return html;
    } catch (e) {
      console.warn(e)
      return ''
    }
  }

  async getText(selector) {
    try {
      const text = await this.page.evaluate(`(() => (document.querySelector('${selector}').textContent))()`);
      return text.trim()
    } catch(e) {
      console.warn(e)
      return ''
    }
  }

  async getTextInFrame(selectorFrame, selectorText) {
    try {
      const frame = await this.getFrame(selectorFrame)
      const text = await frame.evaluate(`(() => (document.querySelector('${selectorText}').textContent))()`);
      return text;
    } catch (e) {
      console.warn(e)
      return ''
    }
  }

  async getAttr(selector, attr) {
    try {
      const value = await this.page.evaluate(`(() => (document.querySelector('${selector}').${attr}))()`);
      return value
    } catch (e) {
      console.warn(e)
      return ''
    }
  }

}

export default PuppeteerHandler;
