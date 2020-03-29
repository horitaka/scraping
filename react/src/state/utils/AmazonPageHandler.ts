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

  async getDetailPageUrlList(productListPageUrl) {
    await this.puppeteer.movePageTo(productListPageUrl)

    const selector = '#search > div.s-desktop-width-max.s-desktop-content.sg-row > div.sg-col-20-of-24.sg-col-28-of-32.sg-col-16-of-20.sg-col.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(5) > div:nth-child(1)  h2 > a'
    const detailPageUrlList = await this.puppeteer.getAttrList(selector, 'href')
    return detailPageUrlList
  }

  // async getProductPageUrlList(productListPageUrl) {
  //   // #search > div.s-desktop-width-max.s-desktop-content.sg-row > div.sg-col-20-of-24.sg-col-28-of-32.sg-col-16-of-20.sg-col.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(6) > div.s-result-list.s-search-results.sg-row > div:nth-child(${i}) > div > span > div > div > div > div > div:nth-child(2) > div.sg-col-4-of-12.sg-col-8-of-16.sg-col-16-of-24.sg-col-12-of-20.sg-col-24-of-32.sg-col.sg-col-28-of-36.sg-col-20-of-28 > div > div:nth-child(1) > div > div > div:nth-child(1) > h2 > a
  //
  //   // #search > div.s-desktop-width-max.s-desktop-content.sg-row > div.sg-col-20-of-24.sg-col-28-of-32.sg-col-16-of-20.sg-col.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(6) > div.s-result-list.s-search-results.sg-row > div:nth-child(${i}) > div > span > div > div > div:nth-child(2) > div.sg-col-4-of-12.sg-col-8-of-16.sg-col-16-of-24.sg-col-12-of-20.sg-col-24-of-32.sg-col.sg-col-28-of-36.sg-col-20-of-28 > div > div:nth-child(1) > div > div > div:nth-child(1) > h2 > a
  //
  //   let productPageUrlList = []
  //
  //   const result = await this.puppeteer.movePageTo(productListPageUrl)
  //   const productCount = await this.puppeteer.getChildElementCount('#search > div.s-desktop-width-max.s-desktop-content.sg-row > div.sg-col-20-of-24.sg-col-28-of-32.sg-col-16-of-20.sg-col.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(6) > div.s-result-list.s-search-results.sg-row')
  //
  //   // for (let i=1; i <= productCount; i++) {
  //   for (let i=1; i < 10; i++) {
  //     let productPageUrl = ''
  //     productPageUrl = await this.puppeteer.getAttr(`#search > div.s-desktop-width-max.s-desktop-content.sg-row > div.sg-col-20-of-24.sg-col-28-of-32.sg-col-16-of-20.sg-col.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(6) > div.s-result-list.s-search-results.sg-row > div:nth-child(${i}) > div > span > div > div > div > div > div:nth-child(2) > div.sg-col-4-of-12.sg-col-8-of-16.sg-col-16-of-24.sg-col-12-of-20.sg-col-24-of-32.sg-col.sg-col-28-of-36.sg-col-20-of-28 > div > div:nth-child(1) > div > div > div:nth-child(1) > h2 > a`, 'href')
  //     console.log(productPageUrl)
  //     if (productPageUrl === '') {
  //       productPageUrl = await this.puppeteer.getAttr(`#search > div.s-desktop-width-max.s-desktop-content.sg-row > div.sg-col-20-of-24.sg-col-28-of-32.sg-col-16-of-20.sg-col.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(6) > div.s-result-list.s-search-results.sg-row > div:nth-child(${i}) > div > span > div > div > div:nth-child(2) > div.sg-col-4-of-12.sg-col-8-of-16.sg-col-16-of-24.sg-col-12-of-20.sg-col-24-of-32.sg-col.sg-col-28-of-36.sg-col-20-of-28 > div > div:nth-child(1) > div > div > div:nth-child(1) > h2 > a`, 'href')
  //     }
  //     console.log(productPageUrl)
  //     productPageUrlList.push(productPageUrl)
  //   }
  //
  //   return productPageUrlList
  // }

  // https://www.amazon.co.jp/gp/bestsellers/hobby/2189356051/ref=zg_bs_nav_hb_1_hb
  // https://www.amazon.co.jp/b/?node=2189356051&ref_=Oct_CateC_2277721051_0&pf_rd_p=686636f6-ae01-516f-9e09-5b2b8728b02e&pf_rd_s=merchandised-search-4&pf_rd_t=101&pf_rd_i=2277721051&pf_rd_m=AN1VRQENFRJN5&pf_rd_r=KA3V16T2DRHKE3P4YYVW&pf_rd_r=KA3V16T2DRHKE3P4YYVW&pf_rd_p=686636f6-ae01-516f-9e09-5b2b8728b02e
  async getProductPageUrlList2(productListPageUrl) {
    // document.querySelector('#zg-ordered-list > li:nth-child(4) > span > div > span > a').href
    // document.querySelector('#result_2 > div > div.a-row.a-spacing-base > div > div > a').href

    let productPageUrlList = []

    const result = await this.puppeteer.movePageTo(productListPageUrl)
    const productCount = await this.puppeteer.getChildElementCount('#mainResults')

    // for (let i=1; i <= productCount; i++) {
    for (let i=0; i < 10; i++) {
      let productPageUrl = ''
      productPageUrl = await this.puppeteer.getAttr(`#result_${i} > div > div.a-row.a-spacing-base > div > div > a`, 'href')
      if (productPageUrl) {
        productPageUrlList.push(productPageUrl)
      }
    }

    return productPageUrlList
  }

  async getShopListPageUrl(detailPageUrl) {
    await this.puppeteer.movePageTo(detailPageUrl)
    let shopListPageUrl = '';
    shopListPageUrl = await this.puppeteer.getAttr('#olp-new > span > a', 'href')
    return shopListPageUrl
  }

  // Amazonのホビーページ
  async getHobbyInfo(url) {
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

    const category = await this.getCategory()
    const title = await this.getTitle()
    const author = await this.getAuthor()
    const asin = await this.getAsin()

    await this.puppeteer.movePageTo('https://www.amazon.co.jp/gp/offer-listing/B0835963K4/ref=dp_olp_new?ie=UTF8&condition=new')
    await this.puppeteer.sleep(1000)
    await this.puppeteer.scrollToBottom()

    const data = {
      url: url,
      category: category,
      title: title,
      author: author,
      asin: asin,
    }
    return {
      success: true,
      data: data,
    }

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
      if (productDetailsText.indexOf('ASIN') != -1) {
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
  		url: 'URL',
  		title: 'タイトル',
  		author: '著者',
  		description: '説明文',
  		category: 'カテゴリ',
  		page: 'ページ数',
  		imgLink: '商品画像',
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

export default AmazonPageHandler
