import React, { useState } from 'react';
import styled from 'styled-components'

// import * as testurl from '../../test/testurl'

const Scraper = (props) => {
  const { isFetching, resultListByScraping, progress, onRunScrapingClick, onSaveButtonClick } = props;

  const [urlList, setUrl] = useState(new Array(5).fill(''))
  // const [urlList, setUrl] = useState(testurl.testUrl1)
  // const [isError, setIsError] = useState(new Array(10).fill(false))

  const handleSubmit = async(event) =>  {
    event.preventDefault();
    onRunScrapingClick(urlList)
  }

  const handleChange = (event, index) => {
    const url = event.target.value.trim();
    const isValid = validateUrl(url);

    // let tmpIsError = [...isError]
    // tmpIsError[index] = !isValid
    // setIsError(tmpIsError)

    let tmpUrlList = [...urlList]
    tmpUrlList[index] = url
    setUrl(tmpUrlList)
  }

  const handleSaveButtonClick = () => {
    onSaveButtonClick()
  }

  // Amazon専用
  const validateUrl = (url) => {
    const regExp = /^https:\/\/www.amazon.co.jp.*/;
    const isValid = regExp.test(url)
    return isValid;
  }

  // const scrapedList = (
  //   <List>
  //     {
  //       data.map(item => (
  //         <ListItem key={item.title}>
  //           <MessageListItemTitle>{item.title}</MessageListItemTitle>
  //           <br></br>
  //           <MessageListItemContents>{item.author}</MessageListItemContents>
  //           <br></br>
  //           <MessageListItemContents>{item.description}</MessageListItemContents>
  //         </ListItem>
  //       ))
  //     }
  //   </List>
  // )

  const resultMessage = (
    <MessageList>
      {
        resultListByScraping.map((item, index) => {
          if (item.success) {
            const title = item.data.title || 'データを取得できませんでした'
            const author = item.data.author || 'データを取得できませんでした'
            return <MessageListItemContents key={index}>{title}<br/>{author}</MessageListItemContents>
          } else {
            const message = `${item.statusCode}: ${item.message}`
            return <MessageListItemContents key={index}>{message}</MessageListItemContents>
          }
        })
      }
    </MessageList>
  )

  // const resultMessageRenderer = (
  //   <List>
  //   {
  //     resultMessage.map((message, index) => (
  //       <MessageListItemContents key={index}>{message}<br/></MessageListItemContents>
  //     ))
  //   }
  //   </List>
  // )

  // const loadingMessage = <div>データ取得中...</div>
  const progressMessage = progress.total === 0
    ? ''
    : isFetching
      ? <div>{`データ取得中(${progress.finished}/${progress.total})`}</div>
      : <div>データ取得完了</div>


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
