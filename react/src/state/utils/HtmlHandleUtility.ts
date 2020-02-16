export const removeTag = (text, tag) => {
  let tagRemovedText = ''
  const bracketIndex = tag.indexOf('<')

  const openTag = tag
  const endTag = tag.slice(0, bracketIndex+1) + '/' + tag.slice(bracketIndex+1)
  console.log(endTag)
  tagRemovedText = text.replace(openTag, '')
  tagRemovedText = tagRemovedText.replace(endTag, '')

  return tagRemovedText
}


export const replaceLineBrake = (str) => {
  const replacedStr = str.replace(/<br>/g, '\n')
  return replacedStr
}

export const removeLineBreak = (str) => {
  const replacedStr = str.replace(/\n/g, '')
  return replacedStr
}
