import axios from 'axios'

// ⚠️ 填入你的 DeepSeek API Key（注意：这是公开暴露的，仅适合个人使用）
const DEEPSEEK_API_KEY = 'YOUR_DEEPSEEK_API_KEY'
const API_URL = 'https://api.deepseek.com/v1/chat/completions'

export async function callDeepSeek(text, type) {
  if (!DEEPSEEK_API_KEY || DEEPSEEK_API_KEY === 'YOUR_DEEPSEEK_API_KEY') {
    return '⚠️ 请在 src/services/aiService.js 中配置 DeepSeek API Key'
  }
  
  const systemPrompt = '你是专业的英语学习助手。'
  const userPrompt = type === 'word'
    ? `解释单词"${text}"的含义，给出音标、中文释义和例句。`
    : `将以下英文句子翻译成中文：\n${text}`
  
  try {
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
  } catch (error) {
    console.error('AI 请求失败:', error)
    return `请求失败: ${error.message}`
  }
}
