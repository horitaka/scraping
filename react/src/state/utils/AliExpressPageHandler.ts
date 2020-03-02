import PuppeteerHandler from './PuppeteerHandler';
// import * as HtmlHandleUtility from './HtmlHandleUtility'

class AliExpressPageHandler {
  private puppeteer;

  constructor () {
    this.puppeteer = new PuppeteerHandler();
  }

  async launch() {
    await this.puppeteer.launch()
    await this.puppeteer.loadCookie('AliExpress')
    // await this.waitUntilProductListPageLoaded();
  }

  async waitUntilProductListPageLoaded() {
    // await this.puppeteer.movePageTo('https://ja.aliexpress.com/');
    // await this.selectJpy()
    await this.puppeteer.waitUntilPageLoaded('https://www.aliexpress.com/category/')
  }

  async getListPageUrls() {
    await this.puppeteer.scrollToBottom()
    const listPageCount = await this.getListPageCount()
    const currentUrl = await this.puppeteer.getUrl()
    let listPageUrls = []
    for(let i=1; i<=listPageCount; i++) {
      listPageUrls.push(currentUrl + '&page=' + i)
    }
    return listPageUrls
  }

  async getListPageCount() {
    let pageCount = await this.puppeteer.getText('#root > div > div > div.main-content > div.right-menu > div > div.list-pagination > div > div.jump-aera > span.total-page')
    pageCount = pageCount.match(/\d+/)[0]
    return pageCount
  }

  async getProductUrlList(listPageUrl) {
    await this.puppeteer.movePageTo(listPageUrl)
    await this.waitUntilProductListPageLoaded();
    await this.selectJpy()
    await this.puppeteer.scrollToBottom()

    const rowCount = await this.puppeteer.getChildElementCount('#root > div > div > div.main-content > div.right-menu > div > div.gallery-wrap.product-list > ul')

    let productUrlList = []
    for (let i=1; i<=rowCount; i++) {
      const columnCount = await this.puppeteer.getChildElementCount(`#root > div > div > div.main-content > div.right-menu > div > div.gallery-wrap.product-list > ul > div:nth-child(${i})`)
      for (let j=1; j<=columnCount; j++) {
        const url = await this.puppeteer.getAttr(`#root > div > div > div.main-content > div.right-menu > div > div.gallery-wrap.product-list > ul > div:nth-child(${i}) > li:nth-child(${j}) > div > div.product-img > div > a`, 'href')
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
    await this.puppeteer.sleep(2000)

    // await this.selectJpy()
    await this.puppeteer.scrollToBottom()
    await this.puppeteer.sleep(2000)

    const title = await this.getTitle()
    // console.log(title)

    const skuInfoList = await this.getSkuInfo()

    const colorList = await this.getColorList()

    const productDescription = await this.getProductDescription()

    const price = await this.getPrice();
    // console.log(description)

    // const category = await this.getCategory()
    // console.log(category)

    const imgLinkList = await this.getImgLink()
    // console.log(imgLink)

    const data = {
      url: url,
      title: title,
      skuInfoList: skuInfoList,
      colorList: colorList,
      productDescription: productDescription,
      price: price,
      imgLinkList: imgLinkList,
    }
    // console.log(data)
    return {
      success: true,
      data: data,
    }

  }

  async close() {
    await this.puppeteer.saveCookie('AliExpress')
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
    let priceText = ''
    priceText = await this.puppeteer.getText('#root > div > div.product-main > div > div.product-info > div.product-price > div > span')
    const price = priceText.replace(/,/g, '').match(/\d+/g).slice(-1)[0]
    return price;
  }

  async getSkuInfo() {
    // #root > div > div.product-main > div > div.product-info > div.product-sku > div
    // #root > div > div.product-main > div > div.product-info > div.product-sku > div > div > ul > li
    // let skuInfoHtml = await this.puppeteer.getHtml('#root > div > div.product-main > div > div.product-info > div.product-sku > div')
    // dislabedの取得
    // document.querySelector('#root > div > div.product-main > div > div.product-info > div.product-sku > div > div:nth-child(1) > ul > li:nth-child(5)').classList.contains('disabled')

    let skuInfoCount = await this.puppeteer.getChildElementCount(`#root > div > div.product-main > div > div.product-info > div.product-sku > div > div > ul`)
    let skuInfoList = []
    for (let i=1; i<=skuInfoCount; i++) {


      const tmpSkuInfo = await this.puppeteer.getText(`#root > div > div.product-main > div > div.product-info > div.product-sku > div > div > ul > li:nth-child(${i}) > div`)
      skuInfoList.push(tmpSkuInfo)
    }

    return [...skuInfoList]
  }

  async getColorList() {
    // #root > div > div.product-main > div > div.product-info > div.product-sku > div > div:nth-child(2) > ul > li:nth-child(1) > div > img
    // #root > div > div.product-main > div > div.product-info > div.product-sku > div > div > ul > li:nth-child(2) > div > img
    // #root > div > div.product-main > div > div.product-info > div.product-sku > div > div > ul > li.sku-property-item.selected > div > img
    // #root > div > div.product-main > div > div.product-info > div.product-sku > div > div > ul > li.sku-property-item.selected
    // #root > div > div.product-main > div > div.product-info > div.product-sku > div > div > ul > li:nth-child(2)
    // #root > div > div.product-main > div > div.product-info > div.product-sku > div > div > div > span

    // #root > div > div.product-main > div > div.product-info > div.product-sku > div > div:nth-child(2) > ul > li:nth-child(1) > div > img
    // #root > div > div.product-main > div > div.product-info > div.product-sku > div > div:nth-child(2) > ul > li:nth-child(2) > div > img
    const colorCount = await this.puppeteer.getChildElementCount(`#root > div > div.product-main > div > div.product-info > div.product-sku > div > div:nth-child(2) > ul`)
    let colorList = []

    for (let i=1; i<=colorCount; i++) {
      await this.puppeteer.click(`#root > div > div.product-main > div > div.product-info > div.product-sku > div > div:nth-child(2) > ul > li:nth-child(${i}) > div > img`)
      const color = await this.puppeteer.getText(`#root > div > div.product-main > div > div.product-info > div.product-sku > div > div:nth-child(2) > div > span`)
      colorList.push(color)
    }

    return [...colorList]
  }

  async getProductDescription() {
    // #product-description
    let productDescription = await this.puppeteer.getHtml('#product-description')
    return productDescription
  }

  async getImgLink() {
    // #root > div > div.product-main > div > div.img-view-wrap > div > div > div.image-view-magnifier-wrap > img

    const colorCount = await this.puppeteer.getChildElementCount(`#root > div > div.product-main > div > div.product-info > div.product-sku > div > div:nth-child(2) > ul`)
    let imgLinkList = []

    for (let i=1; i<=colorCount; i++) {
      await this.puppeteer.click(`#root > div > div.product-main > div > div.product-info > div.product-sku > div > div:nth-child(2) > ul > li:nth-child(${i}) > div > img`)
      const imgLink = await this.puppeteer.getAttr(`#root > div > div.product-main > div > div.img-view-wrap > div > div > div.image-view-magnifier-wrap > img`, 'src')
      imgLinkList.push(imgLink)
    }

    return [...imgLinkList]
  }

  static getCsvHeader() {
    return {
  		url: 'URL',
  		title: '商品名',
  		price: '価格',
      skuInfo0: 'サイズ1',
      skuInfo1: 'サイズ2',
      skuInfo2: 'サイズ3',
      skuInfo3: 'サイズ4',
      skuInfo4: 'サイズ5',
      skuInfo5: 'サイズ6',
      skuInfo6: 'サイズ7',
      skuInfo7: 'サイズ8',
      skuInfo8: 'サイズ9',
      skuInfo9: 'サイズ10',
      color0: '色1',
      color1: '色2',
      color2: '色3',
      color3: '色4',
      color4: '色5',
      color5: '色6',
      color6: '色7',
      color7: '色8',
      color8: '色9',
      color9: '色10',
      imgLink0: '商品画像1',
      imgLink1: '商品画像2',
      imgLink2: '商品画像3',
      imgLink3: '商品画像4',
      imgLink4: '商品画像5',
      imgLink5: '商品画像6',
      imgLink6: '商品画像7',
      imgLink7: '商品画像8',
      imgLink8: '商品画像9',
      imgLink9: '商品画像10',
      productDescription: '商品概要'
  	}
  }

  static convertScrapedData(scrapedData) {
    const convertedScrapedData = scrapedData.map(data => {
      return {
        url: data.url,
        title: data.title,
        skuInfo0: data.skuInfoList[0] || '',
        skuInfo1: data.skuInfoList[1] || '',
        skuInfo2: data.skuInfoList[2] || '',
        skuInfo3: data.skuInfoList[3] || '',
        skuInfo4: data.skuInfoList[4] || '',
        skuInfo5: data.skuInfoList[5] || '',
        skuInfo6: data.skuInfoList[6] || '',
        skuInfo7: data.skuInfoList[7] || '',
        skuInfo8: data.skuInfoList[8] || '',
        skuInfo9: data.skuInfoList[9] || '',
        color0: data.colorList[0] || '',
        color1: data.colorList[1] || '',
        color2: data.colorList[2] || '',
        color3: data.colorList[3] || '',
        color4: data.colorList[4] || '',
        color5: data.colorList[5] || '',
        color6: data.colorList[6] || '',
        color7: data.colorList[7] || '',
        color8: data.colorList[8] || '',
        color9: data.colorList[9] || '',
        imgLink0: data.imgLinkList[0] || '',
        imgLink1: data.imgLinkList[1] || '',
        imgLink2: data.imgLinkList[2] || '',
        imgLink3: data.imgLinkList[3] || '',
        imgLink4: data.imgLinkList[4] || '',
        imgLink5: data.imgLinkList[5] || '',
        imgLink6: data.imgLinkList[6] || '',
        imgLink7: data.imgLinkList[7] || '',
        imgLink8: data.imgLinkList[8] || '',
        imgLink9: data.imgLinkList[9] || '',
        price: data.price,
        productDescription: data.productDescription,
      }
    })

    return convertedScrapedData;
  }

  async selectJpy() {
    // '#switcher-info'
    // '#nav-global > div.ng-item-wrap.ng-item.ng-switcher.active > div > div > div > div.switcher-currency.item.util-clearfix > div > ul > li:nth-child(114) > a'
    const currency = await this.puppeteer.getText('#switcher-info > span.currency')
    if (currency === 'JPY') {
      return
    }

    await this.puppeteer.click('body > div.ui-window.ui-window-normal.ui-window-transition.ui-newuser-layer-dialog > div > div > a') // popup消す
    await this.puppeteer.click('#switcher-info')
    await this.puppeteer.sleep(2000)
    await this.puppeteer.click('#nav-global > div.ng-item-wrap.ng-item.ng-switcher.active > div > div > div > div.switcher-currency.item.util-clearfix > div > span')
    await this.puppeteer.sleep(2000)
    await this.puppeteer.click('#nav-global > div.ng-item-wrap.ng-item.ng-switcher.active > div > div > div > div.switcher-currency.item.util-clearfix > div > ul > li:nth-child(114) > a')
    await this.puppeteer.sleep(2000)
    await this.puppeteer.click('#nav-global > div.ng-item-wrap.ng-item.ng-switcher.active > div > div > div > div.switcher-btn.item.util-clearfix > button')
  }

}

export default AliExpressPageHandler
