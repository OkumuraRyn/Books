import axios from 'axios'

// ⚠️ 请在这里填入你的 DeepSeek API Key
const DEEPSEEK_API_KEY = 'YOUR_API_KEY_HERE'
const API_URL = '/api/deepseek/v1/chat/completions'

export async function callDeepSeek(text, type) {
  if (!DEEPSEEK_API_KEY || DEEPSEEK_API_KEY === 'YOUR_API_KEY_HERE') {
    return '请先在 src/services/aiService.js 中配置 DeepSeek API Key'
  }
  
  let systemPrompt = '你是专业的英语学习助手。'
  let userPrompt = ''
  if (type === 'word') {
    userPrompt = `解释单词"${text}"的含义，给出音标、中文释义和例句。`
  } else {
    userPrompt = `将以下英文句子翻译成中文：\n${text}`
  }
  
  const response = await axios.post(API_URL, {
    model: 'deepseek-chat',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    temperature: 0.7
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
    }
  })
  
  return response.data.choices[0].message.content
}
