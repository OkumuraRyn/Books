/**
 * 将文本分词，保留连字符单词作为一个整体
 * 例如 "state-of-the-art" 会作为一个 token 返回
 */
export function tokenizeWithHyphens(text) {
  const regex = /[\w]+(?:-[\w]+)*/g
  return text.match(regex) || []
}
