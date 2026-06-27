import { NextRequest, NextResponse } from "next/server"

const QUIZ_PROMPT = `你是一个水晶五行匹配助手。根据用户的塔罗占卜结果，生成 3 个引导式问题，帮用户找到最适合他们的五行补能水晶。

返回 JSON 格式，不要其他任何文字：

{
  "questions": [
    {
      "question": "问题文本（关联牌面结果，2行以内）",
      "options": [
        { "label": "选项A（短句，10字内）", "wuxing": "木" },
        { "label": "选项B（短句，10字内）", "wuxing": "火" },
        { "label": "选项C（短句，10字内）", "wuxing": "金" },
        { "label": "选项D（短句，10字内）", "wuxing": "水" }
      ]
    },
    { "question": "...", "options": [...] },
    { "question": "...", "options": [...] }
  ]
}

规则：
- 3 个问题分别围绕：当前感受、内在需求、期望改变
- 每个问题给出 4 个选项，每个选项对应不同的五行（木/火/土/金/水）
- 问题要关联用户翻出的牌和问题背景，不要泛泛而问
- 选项要具体、可感知，不要抽象
- 用 {language} 语言写

卡牌背景：
{cardContext}

用户问题：{userQuestion}`

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { cards, question, language = "zh-CN" } = body

    // Build card context
    const cardContext = cards
      .map((c: any) => `${c.positionLabel}：${c.cardName}（${c.orientation}位），元素${c.element || "未知"}`)
      .join("\n")

    // Try DeepSeek, fallback to template
    let quizData: any = null
    const dsKey = process.env.DEEPSEEK_API_KEY
    const dsUrl = process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com/v1"

    if (dsKey) {
      try {
        const prompt = QUIZ_PROMPT
          .replace("{language}", language === "zh-CN" || language === "zh-TW" ? "中文" : "the user's language (pt/es/en)")
          .replace("{cardContext}", cardContext)
          .replace("{userQuestion}", question || "今日运势")

        const resp = await fetch(`${dsUrl}/chat/completions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${dsKey}`,
          },
          body: JSON.stringify({
            model: "deepseek-chat",
            messages: [
              { role: "system", content: "你是一个精确的 JSON 生成器。只返回合法 JSON，不要 markdown、不要解释。" },
              { role: "user", content: prompt },
            ],
            temperature: 0.8,
            max_tokens: 1500,
          }),
        })

        if (resp.ok) {
          const data = await resp.json()
          const text = data.choices?.[0]?.message?.content || ""
          // Extract JSON from possible markdown wrapper
          const jsonMatch = text.match(/\{[\s\S]*\}/)
          if (jsonMatch) {
            quizData = JSON.parse(jsonMatch[0])
          }
        }
      } catch (e) {
        console.warn("DeepSeek quiz generation failed, using template:", e)
      }
    }

    // Fallback template
    if (!quizData || !quizData.questions || quizData.questions.length < 3) {
      const cardSummary = cards.map((c: any) => c.cardName).join("、")
      quizData = {
        questions: [
          {
            question: `翻开了${cardSummary}——这三张牌映照了你当下的状态。最近你更多感受到哪种？`,
            options: [
              { label: "卡住了，做什么都提不起劲", wuxing: "水" },
              { label: "脑子里想法很多，身体跟不上", wuxing: "火" },
              { label: "注意力很散，总被各种事打断", wuxing: "金" },
              { label: "整个人被掏空了，需要充电", wuxing: "土" },
            ],
          },
          {
            question: "现在你最需要的是...",
            options: [
              { label: "成长的感觉——看到自己在往前", wuxing: "木" },
              { label: "一点勇气——这一步就是迈不出去", wuxing: "火" },
              { label: "头脑清醒——从一团乱麻里找到线头", wuxing: "金" },
              { label: "站住脚跟——别让任何事再动摇我了", wuxing: "土" },
            ],
          },
          {
            question: "如果有一条手串戴在手上，你希望它...",
            options: [
              { label: "让我感觉每天在向上生长", wuxing: "木" },
              { label: "给我敢做自己的底气", wuxing: "火" },
              { label: "让我的杂念安静下来", wuxing: "金" },
              { label: "帮我挡住那些不该我承受的", wuxing: "水" },
            ],
          },
        ],
      }
    }

    return NextResponse.json(quizData)
  } catch (error) {
    console.error("Crystal quiz API error:", error)
    return NextResponse.json({ error: "Failed to generate quiz" }, { status: 500 })
  }
}
