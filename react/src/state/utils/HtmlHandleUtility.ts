export const removeTag = (text, tag) => {
  let tagRemovedText = ''
  const bracketIndex = tag.indexOf('<')

  const openTag = tag
  const regExpOpenTag = new RegExp(openTag, 'g');
  tagRemovedText = text.replace(regExpOpenTag, '')

  const endTag = tag.slice(0, bracketIndex+1) + '/' + tag.slice(bracketIndex+1)
  const regExpEndTag = new RegExp(endTag, 'g');
  tagRemovedText = tagRemovedText.replace(regExpEndTag, '')

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
