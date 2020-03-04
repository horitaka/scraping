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


  async launch(domain) {
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

    // const cookie = window.localStorage.getItem(domain)
    // console.log(cookie)
    // if (!cookie) {
    //   await page.setCookie(cookie)
    // }
  }

  async close(domain) {
    // const newCookie = await page.cookies(domain)
    // console.log(newCookie)
    // localStorage.setItme(domain, newCookie[0])
    await this.browser.close()
  }

  async loadCookie(siteName) {
    const cookies = JSON.parse(window.localStorage.getItem(siteName))
    if (cookies) {
      await this.page.setCookie(...cookies)
    }
  }

  async saveCookie(siteName, cookie) {
    const cookies = await this.page.cookies()
    if (cookies) {
      window.localStorage.setItem(siteName, JSON.stringify(cookies))
    }
  }

  async reload() {
    try {
      await this.page.reload()
    } catch(e) {
      console.warn(e)
    }
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

  async getUrl() {
    return this.page.url()
  }

  // Todo
  async login() {
    await this.page.type('#Auth-email', 'horita629@gmail.com');
    await this.page.type('#Auth-pass', 'noritake');
    await this.page.click('#Auth-email-login');
    // await this.page.waitForNavigation({timeout: 60000, waitUntil: 'load'});
    await this.sleep(5000)
  }

  async scrollByWindowHeight() {
    await this.page.evaluate(`(() => {
      var height = document.documentElement.clientHeight;
      window.scrollBy(0, height);
    })()`);
  }

  async scrollToBottom() {
    let documentHeight = 1;
    let windowHeight = 0;
    let positionY = 0;

    while (positionY < documentHeight - windowHeight) {
      await this.scrollByWindowHeight();
      await this.page.waitFor(1000);
      const result = await this.page.evaluate(`(() => {
        var documentHeight = document.documentElement.scrollHeight;
        var windowHeight = document.documentElement.clientHeight;
        var positionY = document.documentElement.scrollTop
        return {documentHeight, windowHeight, positionY}
      })()`);
      documentHeight = result.documentHeight
      windowHeight = result.windowHeight
      positionY = result.positionY
      console.log(result)
    }
    // const pageCount = Math.ceil(documentHeight / windowHeight);
    //
    // for (let i=0; i<pageCount; i++) {
    //   await this.scrollByWindowHeight();
    //   await this.page.waitFor(1000)
    // }
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

  async click(selector) {
    try {
      await this.page.click(selector);
    } catch (e) {
      console.warn(e)
    }
  }

  async test() {
    const selector1 = '#root > div > div.product-main > div > div.product-info > div.product-sku > div > div > ul > li'
    const node1 = await this.page.evaluate(`(() => (document.querySelectorAll('${selector1}')))()`);
    console.log(node1)

    const selector2 = '#root > div > div.product-main > div > div.product-info > div.product-sku > div > div > ul'
    const node2 = await this.page.evaluate(`(() => (document.querySelector('${selector2}')))()`);
    console.log(node2)

    const selector3 = '#root > div > div.product-main > div > div.product-info > div.product-sku > div > div > ul'
    const count = await this.getChildElementCount(selector3)
    console.log(count)

  }

  async getChildElementCount(selector) {
    let count
    try {
      count = await this.page.evaluate(`(() => (document.querySelector('${selector}').childElementCount))()`);
    } catch(e) {
      console.warn(e)
    }
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
