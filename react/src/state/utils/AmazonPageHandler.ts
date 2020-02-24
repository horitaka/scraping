import PuppeteerHandler from './PuppeteerHandler';
import * as HtmlHandleUtility from './HtmlHandleUtility'

class AmazonPageHandler {
  private puppeteer;

  constructor () {
    this.puppeteer = new PuppeteerHandler();
  }

  async launch() {
    await this.puppeteer.launch()
  }

  async getProductPageUrlList(productListPageUrl) {
    // #search > div.s-desktop-width-max.s-desktop-content.sg-row > div.sg-col-20-of-24.sg-col-28-of-32.sg-col-16-of-20.sg-col.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(6) > div.s-result-list.s-search-results.sg-row > div:nth-child(${i}) > div > span > div > div > div > div > div:nth-child(2) > div.sg-col-4-of-12.sg-col-8-of-16.sg-col-16-of-24.sg-col-12-of-20.sg-col-24-of-32.sg-col.sg-col-28-of-36.sg-col-20-of-28 > div > div:nth-child(1) > div > div > div:nth-child(1) > h2 > a

    // #search > div.s-desktop-width-max.s-desktop-content.sg-row > div.sg-col-20-of-24.sg-col-28-of-32.sg-col-16-of-20.sg-col.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(6) > div.s-result-list.s-search-results.sg-row > div:nth-child(${i}) > div > span > div > div > div:nth-child(2) > div.sg-col-4-of-12.sg-col-8-of-16.sg-col-16-of-24.sg-col-12-of-20.sg-col-24-of-32.sg-col.sg-col-28-of-36.sg-col-20-of-28 > div > div:nth-child(1) > div > div > div:nth-child(1) > h2 > a

    let productPageUrlList = []

    const result = await this.puppeteer.movePageTo(productListPageUrl)
    const productCount = await this.puppeteer.getChildElementCount('#search > div.s-desktop-width-max.s-desktop-content.sg-row > div.sg-col-20-of-24.sg-col-28-of-32.sg-col-16-of-20.sg-col.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(6) > div.s-result-list.s-search-results.sg-row')
    console.log(productCount)

    // for (let i=1; i <= productCount; i++) {
    for (let i=1; i < 10; i++) {
      let productPageUrl = ''
      productPageUrl = await this.puppeteer.getAttr(`#search > div.s-desktop-width-max.s-desktop-content.sg-row > div.sg-col-20-of-24.sg-col-28-of-32.sg-col-16-of-20.sg-col.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(6) > div.s-result-list.s-search-results.sg-row > div:nth-child(${i}) > div > span > div > div > div > div > div:nth-child(2) > div.sg-col-4-of-12.sg-col-8-of-16.sg-col-16-of-24.sg-col-12-of-20.sg-col-24-of-32.sg-col.sg-col-28-of-36.sg-col-20-of-28 > div > div:nth-child(1) > div > div > div:nth-child(1) > h2 > a`, 'href')
      console.log(productPageUrl)
      if (productPageUrl === '') {
        productPageUrl = await this.puppeteer.getAttr(`#search > div.s-desktop-width-max.s-desktop-content.sg-row > div.sg-col-20-of-24.sg-col-28-of-32.sg-col-16-of-20.sg-col.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(6) > div.s-result-list.s-search-results.sg-row > div:nth-child(${i}) > div > span > div > div > div:nth-child(2) > div.sg-col-4-of-12.sg-col-8-of-16.sg-col-16-of-24.sg-col-12-of-20.sg-col-24-of-32.sg-col.sg-col-28-of-36.sg-col-20-of-28 > div > div:nth-child(1) > div > div > div:nth-child(1) > h2 > a`, 'href')
      }
      console.log(productPageUrl)
      productPageUrlList.push(productPageUrl)
    }

    return productPageUrlList
  }

  // Amazonの書籍情報
  async getBookInfo(url) {
    if (!url) {
      return {
        data: {},
        success: false,
        statusCode: 'Unknown',
        message: 'URLが入力されていません'
      };
    }

    const result = await this.puppeteer.movePageTo(url)
    if (!result.success) {
      return {
        ...result,
        data: {
          url: url
        },
      };
    }

    const title = await this.getTitle()
    // console.log(title)

    let author = await this.getAuthor()
    // console.log(author)

    const description = await this.getDescription();
    // console.log(description)

    const category = await this.getCategory()
    // console.log(category)

    const pageNum = await this.getPageNum()
    // console.log(pageNum)

    const imgLink = await this.getImgLink()
    // console.log(imgLink)

    const data = {
      url: url,
      title: title,
      author: author,
      description: description,
      category: category,
      page: pageNum,
      imgLink: imgLink,
    }
    console.log(data)
    return {
      success: true,
      data: data,
    }

  }

  async close() {
    await this.puppeteer.close()
  }


  async getTitle() {
    // #ebooksProductTitle
    // #productTitle
    let title = ''
    title = await this.puppeteer.getText('#ebooksProductTitle')
    if (title === '') {
      title = await this.puppeteer.getText('#productTitle')
    }
    return title
  }

  async getAuthor() {
    // #bylineInfo > span > a
    // #bylineInfo > span:nth-child(1) > a
    // #bylineInfo > span > span.a-declarative > a.a-link-normal.contributorNameID
    let author = ''
    author = await this.puppeteer.getText('#bylineInfo > span > a')
    if (author === '') {
      author = await this.puppeteer.getText('#bylineInfo > span > span.a-declarative > a.a-link-normal.contributorNameID')
    }
    return author
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

  static getCsvHeader() {
    return {
  		url: 'URL',
  		title: 'タイトル',
  		author: '著者',
  		description: '説明文',
  		category: 'カテゴリ',
  		page: 'ページ数',
  		imgLink: '商品画像',
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

export default AmazonPageHandler
