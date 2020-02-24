import PuppeteerHandler from './PuppeteerHandler';
// import * as HtmlHandleUtility from './HtmlHandleUtility'

class AliExpressPageHandler {
  private puppeteer;

  constructor () {
    this.puppeteer = new PuppeteerHandler();
  }

  async launch() {
    await this.puppeteer.launch()
    await this.waitUntilProductListPageLoaded();
  }

  async waitUntilProductListPageLoaded() {
    await this.puppeteer.movePageTo('https://ja.aliexpress.com/');
    // await this.puppeteer.waitUntilPageLoaded('https://www.aliexpress.com/category/')
  }

  async getProductUrlList() {
    const rowCount = await this.puppeteer.getChildElementCount('#root > div > div > div.main-content > div.right-menu > div > div.gallery-wrap.product-list > ul')
    console.log(rowCount)

    let productUrlList = []
    for (let i=1; i<=1; i++) {
      const columnCount = await this.puppeteer.getChildElementCount(`#root > div > div > div.main-content > div.right-menu > div > div.gallery-wrap.product-list > ul > div:nth-child(${i})`)
      console.log(columnCount)
      for (let j=1; j<=columnCount; j++) {
        const url = await this.puppeteer.getAttr(`#root > div > div > div.main-content > div.right-menu > div > div.gallery-wrap.product-list > ul > div:nth-child(${i}) > li:nth-child(${j}) > div > div.product-img > div > a`, 'href')
        console.log(url)
        productUrlList.push(url)
      }
    }

    return productUrlList
  }

  // AliExpressの商品情報
  async getProductInfo(url) {
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

    await this.puppeteer.scrollToBottom()
    await this.puppeteer.sleep(2000)

    const title = await this.getTitle()
    // console.log(title)

    const skuInfo = await this.getSkuInfo()

    const productDescription = await this.getProductDescription()

    const price = await this.getPrice();
    // console.log(description)

    // const category = await this.getCategory()
    // console.log(category)

    const imgLink = await this.getImgLink()
    // console.log(imgLink)

    const data = {
      url: url,
      title: title,
      skuInfo: skuInfo,
      productDescription: productDescription,
      price: price,
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
    // #root > div > div.product-main > div > div.product-info > div.product-title
    // #productTitle
    let title = ''
    title = await this.puppeteer.getText('#root > div > div.product-main > div > div.product-info > div.product-title')
    return title
  }

  async getPrice() {
    // #root > div > div.product-main > div > div.product-info > div.product-price > div > span
    let price = ''
    price = await this.puppeteer.getText('#root > div > div.product-main > div > div.product-info > div.product-price > div > span')
    return price;
  }

  async getSkuInfo() {
    // #root > div > div.product-main > div > div.product-info > div.product-sku > div
    let skuInfoHtml = await this.puppeteer.getHtml('#root > div > div.product-main > div > div.product-info > div.product-sku > div')
    return skuInfoHtml
  }

  async getProductDescription() {
    // #product-description
    let productDescription = await this.puppeteer.getHtml('#product-description')
    return productDescription
  }

  async getImgLink() {
    // #root > div > div.product-main > div > div.product-info > div.product-sku > div > div:nth-child(1) > ul > li:nth-child(1) > div > img
    let imgLink = ''
    imgLink = await this.puppeteer.getAttr('#root > div > div.product-main > div > div.product-info > div.product-sku > div > div:nth-child(1) > ul > li:nth-child(1) > div > img', 'src')
    return imgLink
  }

  static getCsvHeader() {
    return {
  		url: 'URL',
  		title: '商品名',
  		price: '価格',
  		imgLink: '商品画像',
  	}
  }

}

export default AliExpressPageHandler
