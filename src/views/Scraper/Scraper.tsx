import React, { useState } from 'react';
import styled from 'styled-components'

import PuppeteerHandler from '../../state/utils/PuppeteerHandler';



const Scraper = (props) => {
  const { isFetching, data, onPageFetchClick, onSaveButtonClick } = props;

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

  const scrapedList = (
    <List>
      {
        data.map(item => (
          <ListItem key={item.title}>
            <ListItemTitle>{item.title}</ListItemTitle>
            <br></br>
            <ListItemContents>{item.author}</ListItemContents>
            <br></br>
            <ListItemContents>{item.description}</ListItemContents>
          </ListItem>
        ))
      }
    </List>
  )


  const loadingMessage = <div>データ取得中...</div>

  return (
    <MainContainer>
      <MainForm
        onSubmit={handleSubmit}
      >
        <MainFormInput
          type="text"
          placeholder="URLを入力"
          value={url}
          onChange={handleChange}
        />
        <MainFormButton>データ取得</MainFormButton>
      </MainForm>

      <MainSaveContainer>
        <MainSaveButton onClick={handleSaveButtonClick}>データ保存</MainSaveButton>
      </MainSaveContainer>

      <ListContainer>
        {isFetching ? loadingMessage : scrapedList}
      </ListContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  flex: 1 1 600px;
  max-width: 600px;
  min-width: 450px;
`

const MainForm = styled.form`
  display: flex;
  flex: 1 1 100%;
  margin-top: 20px;
  margin-bottom: 20px;
`

const MainFormInput = styled.input`
  flex: 1 1 80%;
	height: auto;
	font-size: 1rem;
	color: black;
	border: solid 1px #f3f4f7;
	border-radius: 5px;
	padding: 5px;
  :focus {
  	border-radius: 5px;
  	border: solid 1px #3d9bfb;
  	outline: none;
  }
`

const MainFormButton = styled.button`
  flex: 0 1 20%;

  padding: 5px;
  background-color: #03A9F4;
  border-radius: 3px;
  outline: none;
  border: none;

  :active {
    background: #64B5F6;
    outline: none;
  }
  font-size: 1rem;
  color: white;
`

const MainSaveContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-botton: 20px;
`

const MainSaveButton = styled.button`
  flex: 0 1 20%;

  padding: 5px;
  background-color: #03A9F4;
  border-radius: 3px;
  outline: none;
  border: none;

  :active {
    background: #64B5F6;
    outline: none;
  }
  font-size: 1rem;
  color: white;
`

const ListContainer = styled.div`

`

const List = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
`

const ListItem = styled.li`
  flex 1 1 auto;
  width: 100%;
`

const ListItemTitle = styled.div`
  font-weight: bold;
`

const ListItemContents = styled.div`
  margin-left: 20px;
`


export default Scraper
