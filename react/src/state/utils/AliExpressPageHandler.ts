import PuppeteerHandler from './PuppeteerHandler';
import * as HtmlHandleUtility from './HtmlHandleUtility'

class AliExpressPageHandler {
  private puppeteer;

  constructor () {
    this.puppeteer = new PuppeteerHandler();
  }

  async launch() {
    await this.puppeteer.launch()
  }

  // Amazonの書籍情報
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

    const title = await this.getTitle()
    // console.log(title)

    const price = await this.getPrice();
    // console.log(description)

    // const category = await this.getCategory()
    // console.log(category)

    const imgLink = await this.getImgLink()
    // console.log(imgLink)

    const data = {
      url: url,
      title: title,
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
