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
    const options = {
      executablePath: executablePathUnpacked,
      headless: false
    }
    this.browser = await this.puppeteer.launch(options);
    this.page = await this.browser.newPage();
    await this.page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36")
    await this.page.setViewport({
      width: 1200,
      height: 800,
      deviceScaleFactor: 1,
    });

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

  async waitUntilPageLoaded(url) {
    await new Promise((resolve) => {
      this.page.on('load', () => {
        console.log('load');
        const currentUrl = this.page.url()
        console.log(currentUrl)
        if(currentUrl.startsWith(url)) {
          this.page.removeAllListeners('load')
          resolve()
        }
      });
    })
  }

  // Todo
  async login() {
    await this.page.type('#fm-login-id', 'horita629@gmail.com');
    await this.page.type('#fm-login-password', 'noritake');
    this.page.click('#login-form > div.fm-btn > button');
    await this.page.waitForNavigation({timeout: 60000, waitUntil: 'domcontentloaded'});

  }

  async scrollByWindowHeight() {
    await this.page.evaluate(`(() => {
      var height = document.documentElement.clientHeight;
      window.scrollBy(0, height);
    })()`);
  }

  async scrollToBottom() {
    const {documentHeight, windowHeight} = await this.page.evaluate(`(() => {
      var documentHeight = document.documentElement.scrollHeight;
      var windowHeight = document.documentElement.clientHeight;
      return {documentHeight, windowHeight}
    })()`);
    const pageCount = Math.ceil(documentHeight / windowHeight);

    for (let i=0; i<pageCount; i++) {
      await this.scrollByWindowHeight();
      await this.sleep(1000)
    }
  }

  async sleep(msec) {
    await new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, msec)
    })
  }
  // Todo
  // async getNodeList(selector) {
  //   // const selector2 = '#root'
  //   try {
  //     const rowCount = await this.getChildElementCount('#root > div > div > div.main-content > div.right-menu > div > div.gallery-wrap.product-list > ul')
  //     console.log(rowCount)
  //
  //     let productUrlList = []
  //     for (let i=1; i<=1; i++) {
  //       const columnCount = await this.getChildElementCount(`#root > div > div > div.main-content > div.right-menu > div > div.gallery-wrap.product-list > ul > div:nth-child(${i})`)
  //       console.log(columnCount)
  //       for (let j=1; j<=columnCount; j++) {
  //         const url = await this.getAttr(`#root > div > div > div.main-content > div.right-menu > div > div.gallery-wrap.product-list > ul > div:nth-child(${i}) > li:nth-child(${j}) > div > div.product-img > div > a`, 'href')
  //         console.log(url)
  //         productUrlList.push(url)
  //       }
  //     }
  //
  //     return productUrlList
  //   } catch (e) {
  //     console.warn(e)
  //     return ''
  //   }
  // }

  async getChildElementCount(selector) {
    const count = await this.page.evaluate(`(() => (document.querySelector('${selector}').childElementCount))()`);
    return count
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
