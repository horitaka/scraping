import React, { useState } from 'react';
import styled from 'styled-components'

const Scraper = (props) => {
  const { isFetching, resultListByScraping, progress, setListPageUrls, setDetailPageUrls, onRunScrapingClick, onSaveButtonClick } = props;

  const [urlList, setUrl] = useState(new Array(1).fill(''))
  // const [urlList, setUrl] = useState(testurl.testUrl1)
  // const [isError, setIsError] = useState(new Array(10).fill(false))

  const handleSubmit = async(event) =>  {
    event.preventDefault();
    const validUrls = urlList.filter(url => url !== '')
    setListPageUrls(validUrls)
    // setDetailPageUrls(validUrls)
    onRunScrapingClick()
  }

  const handleChange = (event, index) => {
    const url = event.target.value.trim();
    // const isValid = validateUrl(url);

    let tmpUrlList = [...urlList]
    tmpUrlList[index] = url
    setUrl(tmpUrlList)
  }

  const handleSaveButtonClick = () => {
    onSaveButtonClick()
  }

  const resultMessage = (
    <MessageList>
      {
        resultListByScraping.map((item, index) => {
          if (item.success) {
            const title = item.data.title || 'データを取得できませんでした'
            const author = item.data.author || 'データを取得できませんでした'
            return <MessageListItemContents key={index}>{title}</MessageListItemContents>
          } else {
            const message = `${item.statusCode}: ${item.message}`
            return <MessageListItemContents key={index}>{message}</MessageListItemContents>
          }
        })
      }
    </MessageList>
  )

  const progressMessage = !isFetching
    ? progress.listPageFinished === 0
      ? ''
      : <div>データ取得完了</div>
    : <div>{`データ取得中-${progress.listPageFinished+1}ページ-${progress.detailPageFinished}`}</div>

  return (
    <MainContainer>
      <UrlForm
        onSubmit={handleSubmit}
      >
      {
        urlList.map((url,index) => {
          return (
              <UrlFormInput
                type="text"
                placeholder="URLを入力"
                value={url}
                onChange={(event) => handleChange(event, index)}
                key={index}
              />
          )
        })
      }
        <UrlFormButton>データ取得</UrlFormButton>
      </UrlForm>

      <DataSaveContainer>
        <DataSaveButton onClick={handleSaveButtonClick}>データ保存</DataSaveButton>
      </DataSaveContainer>

      <MessageContainer>
        {progressMessage}
        <br/>
        {resultMessage}
      </MessageContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  flex: 1 1 600px;
  max-width: 600px;
  min-width: 450px;
`

const UrlForm = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  margin-top: 20px;
  margin-bottom: 20px;
`

const UrlFormInput = styled.input`
  // flex: 1 1 80%;
  margin-bottom:20px;
  width: 100%
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

const UrlFormButton = styled.button`
  // flex: 0 1 20%;
  width: 20%
  height: auto;
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

const DataSaveContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-botton: 100px;
`

const DataSaveButton = styled.button`
  flex: 0 1 100%;

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

const MessageContainer = styled.div`
  margin-top: 20px;
`

const MessageList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
`

// const ListItem = styled.li`
//   flex 1 1 auto;
//   width: 100%;
// `

// const MessageListItemTitle = styled.div`
//   font-weight: bold;
// `

const MessageListItemContents = styled.div`
  margin-top: 20px;
`

// const UrlInputErrorMessage = styled.div`
//   font-size: 1rem;
// `

export default Scraper
