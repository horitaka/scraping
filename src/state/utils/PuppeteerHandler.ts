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
    this.page = await this.browser.newPage();
  }

  async close() {
    await this.browser.close()
  }

  async getPage(url) {
    await this.page.goto(url);
  }

  async getFrame(selector) {
    const elementHandler = await this.page.$(selector);
    const frame = await elementHandler.contentFrame();
    return frame
  }

  async getInnerText(selector) {
    // const elements = await this.page.evaluate(`(() => (document.querySelectorAll('${selector}')))()`);
    // console.log(elements)
    // const texts = elements.map(element => element.textContent.trim())
    // return texts

    // const elements = await this.page.evaluate(`(() => (document.querySelectorAll('#wayfinding-breadcrumbs_feature_div > ul > li')))()`);
    // const array = Array.from(elements)

    // const array = Array.prototype.slice.call(elements);
    // console.log(Array.isArray(array))
    // console.log(array.length)

    // elements.forEach(function (elem) {
    //   elem.style.backgroundColor = '#f00';
    //   console.log(elem)
    // });

    const innerText = await this.page.evaluate(`(() => (document.querySelector('${selector}').innerText))()`);
    return innerText
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
    return text.trim()
  }

  async getTextInFrame(selectorFrame, selectorText) {
    const frame = await this.getFrame(selectorFrame)
    const text = await frame.evaluate(`(() => (document.querySelector('${selectorText}').textContent))()`);
    return text;
  }

  async getAttr(selector, attr) {
    const value = await this.page.evaluate(`(() => (document.querySelector('${selector}').${attr}))()`);
    return value
  }


  replaceLineBrake(str) {
    const replacedStr = str.replace(/<br>/g, '\n')
    return replacedStr
  }

  removeLineBreak(str) {
    const replacedStr = str.replace(/\n/g, '')
    return replacedStr
  }
}

export default PuppeteerHandler;
