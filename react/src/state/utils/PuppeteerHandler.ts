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

  async login(loginUrl, userName, password, userNameSelector, passwordSelector, loginButtonSelecotr) {
    await this.movePageTo(loginUrl)
    await this.page.type(userNameSelector, userName);
    await this.page.type(passwordSelector, password);
    await this.page.click(loginButtonSelecotr);
    // await this.page.waitForNavigation({timeout: 60000, waitUntil: 'load'});
    // await this.sleep(5000)
  }

  async search(searchKeyword, searchKeywordSelector, searchButtonSelector) {
    await this.page.type(searchKeywordSelector, searchKeyword);
    await this.page.click(searchButtonSelector);
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

  async click(selector) {
    try {
      await this.page.click(selector);
    } catch (e) {
      console.warn(e)
    }
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

  async getAttrList(selector, attr) {
    const attrList = await this.page.evaluate(
      `(() => {
        var list = []
        document.querySelectorAll('${selector}').forEach(item => list.push(item.${attr}))
        return list
      })()`
    );
    return attrList
  }

  async getLinkAndTextList(selector) {
    const attrList = await this.page.evaluate(
      `(() => {
        var list = []
        document.querySelectorAll('${selector}').forEach(item => list.push({ url: item.href, text: item.textContent }))
        return list
      })()`
    );
    return attrList
  }

  async showAlert(text) {
    await this.page.evaluate(
      `(() => {
        alert('${text}')
      })()`
    );
  }

}

export default PuppeteerHandler;
