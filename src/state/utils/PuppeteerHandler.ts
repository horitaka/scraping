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
    console.log('constructor')
    // const remote: Remote = window.require('electron').remote;
    // this.puppeteer = window.require('electron').remote.require('puppeteer');
    this.puppeteer = window.electron.remote.require('puppeteer');
    this.browser = null;
    this.page = null;
  }


  async launch() {
    this.browser = await this.puppeteer.launch();
  }

  async close() {
    await this.browser.close()
  }

  async getPage(url) {
    this.page = await this.browser.newPage();
    await this.page.goto(url);
  }

  async getFrame(selector) {
    const elementHandler = await this.page.$(selector);
    const frame = await elementHandler.contentFrame();
    return frame
  }

  async getHtml(selector) {
    const html = await this.page.evaluate(`(() => (document.querySelector('${selector}').innerHTML))()`);
    return html
  }

  async getHtmlInFrame(selectorFrame, selectorHtml) {
    const frame = await this.getFrame(selectorFrame)
    const html = await frame.evaluate(`(() => (document.querySelector('${selectorHtml}').innerHTML))()`);
    return html;
  }

  async getText(selector) {
    const text = await this.page.evaluate(`(() => (document.querySelector('${selector}').textContent))()`);
    return text
  }

  async getTextInFrame(selectorFrame, selectorText) {
    const frame = await this.getFrame(selectorFrame)
    const text = await frame.evaluate(`(() => (document.querySelector('${selectorText}').textContent))()`);
    return text;
  }

  replaceLineBrake(str) {
    const replacedStr = str.replace(/<br>/g, '\n')
    return replacedStr
  }
}

export default PuppeteerHandler;
