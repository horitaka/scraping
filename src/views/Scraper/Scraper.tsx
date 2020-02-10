import React, { useState } from 'react';
import { Remote } from 'electron';

import PuppeteerHandler from '../../state/utils/PuppeteerHandler';


const Scraper = () => {
  const [url, setUrl] = useState('http://www.example.com')
  const [data, setData] = useState([])

  const handleSubmit = async(event) =>  {
    event.preventDefault();

    const puppeteer = new PuppeteerHandler();
    await puppeteer.launch();

    await puppeteer.getPage(url)

    const title = await puppeteer.getText('h1')

    puppeteer.close()
    console.log(title)
    setData([title])
  }

  const handleChange = (event) => {
    setUrl(event.target.value)
  }

  const handleSaveButtonClick = () => {

    const fs = window.require('electron').remote.require('fs');
    const stringify = window.require('electron').remote.require('csv-stringify/lib/sync');

    const testData = [
      {title: 'titleAAA', content: 'contentAAA'},
      {title: 'titleBBB', content: 'contentBBB'},
    ]
    const csvData = stringify(testData, {header: true})
    console.log(csvData)

    const a = document.createElement('a');
    a.href = 'data:text/plain,' + encodeURIComponent(csvData);
    a.download = 'test.csv';

    a.click();
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="URLを入力"
          value={url}
          onChange={handleChange}
        />
        <button>データ取得</button>
      </form>

      <button onClick={handleSaveButtonClick}>データ保存</button>

      <ul>
        {data.map(item => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );

};

export default Scraper
