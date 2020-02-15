import PuppeteerHandler from './PuppeteerHandler';

class AmazonPageHandler {

  async getBookInfo(urlList) {
    let data = [];

    const puppeteer = new PuppeteerHandler();
  	await puppeteer.launch()

    for (let url of urlList) {
      if (!url) {
        break;
      }
      await puppeteer.getPage(url)

      // Amazonの書籍情報
      const title = await puppeteer.getText('#ebooksProductTitle')
      console.log(title)

      // #bylineInfo > span > span.a-declarative > a.a-link-normal.contributorNameID
      // #bylineInfo > span > a
      // #bylineInfo > span:nth-child(1) > a
      // #bylineInfo > span > span.a-declarative > a.a-link-normal.contributorNameID
      const author = await puppeteer.getText('#bylineInfo > span > a')
      console.log(author)

      // #bookDesc_iframe #iframeContent
      // #bookDesc_iframe #iframeContent
      const description = await puppeteer.getHtmlInFrame('#bookDesc_iframe', '#iframeContent')
      const descriptionWithLineBrake = puppeteer.replaceLineBrake(description)
      console.log(descriptionWithLineBrake)

      // #wayfinding-breadcrumbs_feature_div > ul
      // #wayfinding-breadcrumbs_feature_div > ul
      const category = await puppeteer.getInnerText('#wayfinding-breadcrumbs_feature_div > ul')
      const categoryWithouLineBreake = puppeteer.removeLineBreak(category)
      console.log(categoryWithouLineBreake)

      // #aboutEbooksSection > table > tbody > tr > td:nth-child(1) > span > a
      // #aboutEbooksSection > table > tbody > tr > td:nth-child(1) > span > a
      const page = await puppeteer.getText('#aboutEbooksSection > table > tbody > tr > td:nth-child(1) > span > a')
      const pageTrimed = page.trim().replace('ページ', '');
      console.log(pageTrimed)

      // #ebooksImgBlkFront
      // #ebooksImgBlkFront
      const imgLink = await puppeteer.getAttr('#ebooksImgBlkFront', 'src')
      console.log(imgLink)

      data.push({
        url: url,
        title: title.trim(),
        author: author,
        description: descriptionWithLineBrake,
        category: categoryWithouLineBreake,
        page: pageTrimed,
        imgLink: imgLink,
      })
      console.log(data)
    }

  	await puppeteer.close();

    return data
  }


}

export default AmazonPageHandler
