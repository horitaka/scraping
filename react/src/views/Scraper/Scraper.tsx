import React, { useState } from 'react';
import styled from 'styled-components'

const Scraper = (props) => {
  const { isFetching, data, progress, onRunScrapingClick, onSaveButtonClick } = props;

  const [urlList, setUrl] = useState(new Array(5).fill(''))
  const [isError, setIsError] = useState(new Array(5).fill(false))

  const errorMessage = 'AmazonのURLを入力してください'

  const handleSubmit = async(event) =>  {
    event.preventDefault();
    onRunScrapingClick(urlList)
  }

  const handleChange = (event, index) => {
    const url = event.target.value.trim();
    const isValid = validateUrl(url);

    let tmpIsError = [...isError]
    tmpIsError[index] = !isValid
    setIsError(tmpIsError)
    console.log(isError)

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
  //           <ListItemTitle>{item.title}</ListItemTitle>
  //           <br></br>
  //           <ListItemContents>{item.author}</ListItemContents>
  //           <br></br>
  //           <ListItemContents>{item.description}</ListItemContents>
  //         </ListItem>
  //       ))
  //     }
  //   </List>
  // )

  const resultMessageRenderer = (
    <List>
      {
        data.map(item => (
          <ListItemContents key={item.title}>{item.title}<br/>{item.author}</ListItemContents>
        ))
      }
    </List>
  )

  // const resultMessageRenderer = (
  //   <List>
  //   {
  //     resultMessage.map((message, index) => (
  //       <ListItemContents key={index}>{message}<br/></ListItemContents>
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
      <MainForm
        onSubmit={handleSubmit}
      >
      {
        urlList.map((url,index) => {
          return (
              <MainFormInput
                type="text"
                placeholder="URLを入力"
                value={url}
                onChange={(event) => handleChange(event, index)}
                key={index}
              />
          )
        })
      }
        <MainFormButton>データ取得</MainFormButton>
      </MainForm>

      <MainSaveContainer>
        <MainSaveButton onClick={handleSaveButtonClick}>データ保存</MainSaveButton>
      </MainSaveContainer>

      <ListContainer>
        {progressMessage}
        <br/>
        {resultMessageRenderer}
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
  flex-direction: column;
  flex: 1 1 100%;
  margin-top: 20px;
  margin-bottom: 20px;
`

const MainFormInput = styled.input`
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

const MainFormButton = styled.button`
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

const MainSaveContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-botton: 100px;
`

const MainSaveButton = styled.button`
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
  margin-top: 20px;
`

const UrlInputErrorMessage = styled.div`
  font-size: 1rem;
`

export default Scraper
