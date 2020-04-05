import PuppeteerHandler from './PuppeteerHandler';
import * as HtmlHandleUtility from './HtmlHandleUtility'

class TestPage {
  private puppeteer;

  constructor () {
    this.puppeteer = new PuppeteerHandler();
  }

  async launch() {
    await this.puppeteer.launch()
  }

  async login(loginUrl, userName, password) {
    const userNameSelector = '#login_user_name'
    const passwordSelector = '#login_password'
    const loginButtonSelecotr = '#wrapper > div > div > div > div.col-lg-6.col-md-6.col-sm-7 > form > div:nth-child(5) > div > button'

    await this.puppeteer.login(loginUrl, userName, password, userNameSelector, passwordSelector, loginButtonSelecotr)
  }

  async search(serchKeyword) {
    const searchKeywordSelector = '#navbar-collapsee > form > div.search-field > input'
    const searchButtonSelector = '#navbar-collapsee > form > button'
    await this.puppeteer.search(serchKeyword, searchKeywordSelector, searchButtonSelector)
  }

  // スクレイピング
  async getInfo() {
    await this.puppeteer.scrollByWindowHeight()
    await this.puppeteer.sleep(1000)
    await this.puppeteer.scrollByWindowHeight()
    await this.puppeteer.sleep(1000)
    await this.puppeteer.scrollByWindowHeight()
    await this.puppeteer.sleep(1000)
  }

  async close() {
    await this.puppeteer.close()
  }


  async getTitle() {
    // #ebooksProductTitle
    // #productTitle
    // #title
    let title = ''
    title = await this.puppeteer.getText('#ebooksProductTitle')
    if (title === '') {
      title = await this.puppeteer.getText('#productTitle')
    }
    if (title === '') {
      title = await this.puppeteer.getText('#title')
    }
    return title
  }

  async getAuthor() {
    // #bylineInfo > span > a
    // #bylineInfo > span:nth-child(1) > a
    // #bylineInfo > span > span.a-declarative > a.a-link-normal.contributorNameID
    // #bylineInfo

    let author = ''
    author = await this.puppeteer.getText('#bylineInfo > span > a')
    if (author === '') {
      author = await this.puppeteer.getText('#bylineInfo > span > span.a-declarative > a.a-link-normal.contributorNameID')
    }
    if (author === '') {
      author = await this.puppeteer.getText('#bylineInfo')
    }
    return author
  }

  async getAsin() {
    // #detail_bullets_id > table > tbody > tr > td > div > ul
    // #detail_bullets_id > table > tbody > tr > td > div > ul > li:nth-child(4)
    const productDetailsCounts = await this.puppeteer.getChildElementCount('#detail_bullets_id > table > tbody > tr > td > div > ul')
    let asin = ''
    for (let i=1; i<=productDetailsCounts; i++) {
      const productDetailsText = await this.puppeteer.getText(`#detail_bullets_id > table > tbody > tr > td > div > ul > li:nth-child(${i})`)
      if (productDetailsText.indexOf('ASIN') !== -1) {
        asin = productDetailsText.replace(/ASIN:/g, '').trim()
        return asin
      }
    }
    return ''
  }

  async getCategory() {
    // #wayfinding-breadcrumbs_feature_div > ul
    let category = ''
    category = await this.puppeteer.getInnerText('#wayfinding-breadcrumbs_feature_div > ul')
    category = HtmlHandleUtility.removeLineBreak(category)
    return category
  }

  async getDescription() {
    // #bookDesc_iframe #iframeContent
    // #productDescription > p:nth-child(2)
    // #productDescription > p:nth-child(19)
    let description = ''
    description = await this.puppeteer.getHtmlInFrame('#bookDesc_iframe', '#iframeContent')
    description = HtmlHandleUtility.replaceLineBrake(description)
    if (description === '') {
      description = await this.puppeteer.getHtml('#productDescription > p:nth-child(2)')
      description = HtmlHandleUtility.replaceLineBrake(description)
    }
    if (description === '') {
      description = await this.puppeteer.getHtml('#productDescription > p:nth-child(19)')
      description = HtmlHandleUtility.replaceLineBrake(description)
    }

    description = HtmlHandleUtility.removeTag(description, '<b>')

    return description;
  }

  async getImgLink() {
    // #ebooksImgBlkFront
    // #imgBlkFront
    let imgLink = ''
    imgLink = await this.puppeteer.getAttr('#ebooksImgBlkFront', 'src')
    if (imgLink === '') {
      imgLink = await this.puppeteer.getAttr('#imgBlkFront', 'src')
    }
    return imgLink
  }

  async getPageNum() {
    // #aboutEbooksSection > table > tbody > tr > td:nth-child(1) > span > a
    // #detail_bullets_id > table > tbody > tr > td > div > ul > li:nth-child(1)
    let pageNum: string = ''
    pageNum = await this.puppeteer.getText('#aboutEbooksSection > table > tbody > tr > td:nth-child(1) > span > a')
    // pageNum = pageNum.replace('ページ', '');
    pageNum = this.extractNumber(pageNum)
    if (pageNum === '') {
      pageNum = await this.puppeteer.getText('#detail_bullets_id > table > tbody > tr > td > div > ul > li:nth-child(1)')
      // pageNum = pageNum.replace('単行本: ', '');
      // pageNum = pageNum.replace('ページ', '');
      pageNum = this.extractNumber(pageNum)
    }
    return pageNum
  }

  static getTableHeader() {
    return {
  		title: 'タイトル',
  		description: '説明文',
  		date: '日付',
  		imgLink: '画像',
  	}
  }

  static getCsvHeader2() {
    return {
      url: 'URL',
      category: 'カテゴリ',
      title: '商品名',
      author: 'メーカー名',
      asin: 'ASIN',
    }
  }

  extractNumber(text) {
    const number = text.match(/\d+/g);
    if (number) {
      return number[0]
    } else {
      return ''
    }
  }

}

export default TestPage
