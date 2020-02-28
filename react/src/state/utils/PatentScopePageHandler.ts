import PuppeteerHandler from './PuppeteerHandler';
import * as HtmlHandleUtility from './HtmlHandleUtility'

class PatentScopePageHandler {
  private puppeteer;

  constructor () {
    this.puppeteer = new PuppeteerHandler();
  }

  async launch() {
    await this.puppeteer.launch()
    await this.puppeteer.movePageTo('https://patentscope2.wipo.int/search/en/advancedSearch.jsf')
    await this.puppeteer.waitUntilPageLoaded('https://patentscope2.wipo.int/search/en/result.jsf')
    await this.puppeteer.sleep(1000)
  }

  async getProductPageUrlList(productListPageUrl) {
    console.log(productListPageUrl)
    // #resultListForm\\:resultTable\\:${i}\\:patentResult > div.ps-patent-result--first-row > div.ps-patent-result--title > a
    // #resultListForm\:resultTable\:0\:patentResult > div.ps-patent-result--first-row > div.ps-patent-result--title > a
    let productPageUrlList = []

    // const result = await this.puppeteer.movePageTo(productListPageUrl)
    const productCount = 10
    await this.puppeteer.sleep(1000)

    for (let i=0; i <= productCount; i++) {
      let productPageUrl = ''
      productPageUrl = await this.puppeteer.getAttr(`#resultListForm\\\\\:resultTable\\\\\:${i}\\\\\:patentResult > div.ps-patent-result--first-row > div.ps-patent-result--title > a`, 'href')
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

    // const pageNum = await this.getPageNum()
    // console.log(pageNum)

    const imgLink = await this.getImgLink()
    // console.log(imgLink)

    const data = {
      url: url,
      title: title,
      author: author,
      description: description,
      category: category,
      // page: pageNum,
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
    title = await this.puppeteer.getText(`#detailMainForm\\\\\:pctBiblio\\\\\:j_idt1206 > span.ps-field--value.ps-biblio-field--value > span > ul > li > span`)
    return title
  }

  async getAuthor() {
    // #bylineInfo > span > a
    // #bylineInfo > span:nth-child(1) > a
    // #bylineInfo > span > span.a-declarative > a.a-link-normal.contributorNameID
    let author = ''
    author = await this.puppeteer.getText(`#detailMainForm\\\\\:pctBiblio\\\\\:j_idt1230 > span.ps-field--value.ps-biblio-field--value > span > ul > li > span`)
    return author
  }

  async getCategory() {
    // #wayfinding-breadcrumbs_feature_div > ul
    let category = ''
    category = await this.puppeteer.getText(`#detailMainForm\\\\\:pctBiblio\\\\\:detailPCTtableWO`)
    return category
  }

  async getDescription() {
    // #bookDesc_iframe #iframeContent
    // #productDescription > p:nth-child(2)
    // #productDescription > p:nth-child(19)
    let description = ''
    description = await this.puppeteer.getText(`#detailMainForm\\\\\:pctBiblio\\\\\:detailPCTtablePubDate`)
    return description;
  }

  async getImgLink() {
    // #ebooksImgBlkFront
    // #imgBlkFront
    let imgLink = ''
    imgLink = await this.puppeteer.getText(`#detailMainForm\\\\\:pctBiblio\\\\\:j_idt1254 > span.ps-field--value.ps-biblio-field--value > span > ul > li:nth-child(1) > span`)
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
  		title: 'Applicants',
  		author: 'Inventors',
  		description: 'Publication Date',
  		category: 'Publication Number',
  		// page: 'ページ数',
  		imgLink: 'Agents',
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

export default PatentScopePageHandler
