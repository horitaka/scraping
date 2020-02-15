import PuppeteerHandler from './PuppeteerHandler';

class AmazonPageHandler {
  private puppeteer;

  constructor () {
    this.puppeteer = new PuppeteerHandler();
  }

  async launch() {
    await this.puppeteer.launch()
  }

  async getBookInfo(url) {
    // let data = [];

    // const puppeteer = new PuppeteerHandler();
  	// await puppeteer.launch()

    if (!url) {
      return {};
    }
    await this.puppeteer.getPage(url)

    // Amazonの書籍情報
    const title = await this.puppeteer.getText('#ebooksProductTitle')
    console.log(title)

    // #bylineInfo > span > span.a-declarative > a.a-link-normal.contributorNameID
    // #bylineInfo > span > a
    // #bylineInfo > span:nth-child(1) > a
    // #bylineInfo > span > span.a-declarative > a.a-link-normal.contributorNameID
    const author = await this.puppeteer.getText('#bylineInfo > span > a')
    console.log(author)

    // #bookDesc_iframe #iframeContent
    // #bookDesc_iframe #iframeContent
    const description = await this.puppeteer.getHtmlInFrame('#bookDesc_iframe', '#iframeContent')
    const descriptionWithLineBrake = this.puppeteer.replaceLineBrake(description)
    // console.log(descriptionWithLineBrake)

    // #wayfinding-breadcrumbs_feature_div > ul
    // #wayfinding-breadcrumbs_feature_div > ul
    const category = await this.puppeteer.getInnerText('#wayfinding-breadcrumbs_feature_div > ul')
    const categoryWithouLineBreake = this.puppeteer.removeLineBreak(category)
    console.log(categoryWithouLineBreake)

    // #aboutEbooksSection > table > tbody > tr > td:nth-child(1) > span > a
    // #aboutEbooksSection > table > tbody > tr > td:nth-child(1) > span > a
    const page = await this.puppeteer.getText('#aboutEbooksSection > table > tbody > tr > td:nth-child(1) > span > a')
    const pageTrimed = page.trim().replace('ページ', '');
    console.log(pageTrimed)

    // #ebooksImgBlkFront
    // #ebooksImgBlkFront
    const imgLink = await this.puppeteer.getAttr('#ebooksImgBlkFront', 'src')
    console.log(imgLink)

    const data = {
      url: url,
      title: title.trim(),
      author: author,
      description: descriptionWithLineBrake,
      category: categoryWithouLineBreake,
      page: pageTrimed,
      imgLink: imgLink,
    }
    console.log(data)
    return data

  }

  async close() {
    await this.puppeteer.close()
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


}

export default AmazonPageHandler
