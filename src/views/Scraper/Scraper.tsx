import React, { useState } from 'react';
// import { Remote } from 'electron';

import PuppeteerHandler from '../../state/utils/PuppeteerHandler';



const Scraper = (props) => {
  const { data, onPageFetchClick, onSaveButtonClick } = props;

  // const [url, setUrl] = useState('http://www.example.com')
  const [url, setUrl] = useState('https://www.amazon.co.jp/%E3%83%A1%E3%83%A2%E3%81%AE%E9%AD%94%E5%8A%9B-Magic-Memos-NewsPicks-Book-ebook/dp/B07L67XZSS/ref=tmm_kin_swatch_0?_encoding=UTF8&qid=1581397348&sr=8-1')

  const handleSubmit = async(event) =>  {
    event.preventDefault();
    onPageFetchClick(url)
  }

  const handleChange = (event) => {
    setUrl(event.target.value)
  }

  const handleSaveButtonClick = () => {
    onSaveButtonClick()
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
        {
          data.map(item => (
            <div>
              <li key={item.title}>{item.title}</li>
              <li key={item.author}>{item.author}</li>
              <li key={item.description}>{item.description}</li>  
            </div>
          ))
        }
      </ul>
    </div>
  );

};

export default Scraper
