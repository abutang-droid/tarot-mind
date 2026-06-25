export interface TarotCardData {
  id: number
  name: string
  nameEn: string
  arcana: "major" | "minor"
  suit?: "wands" | "cups" | "swords" | "pentacles"
  number?: number
  element: string
  wuxing: string
  keywords: string[]
  meaningUp: string
  meaningDown: string
}

export const ALL_CARDS: TarotCardData[] = [
  { id: 0, name: "愚者", nameEn: "The Fool", arcana: "major", number: 0, element: "风", wuxing: "木", keywords: ["新的开始", "冒险", "自由"], meaningUp: "新的旅程正在召唤你，勇敢迈出第一步，信任生命的安排。", meaningDown: "是否在逃避某个重要的决定？小心鲁莽行事带来的后果。" },
  { id: 1, name: "魔术师", nameEn: "The Magician", arcana: "major", number: 1, element: "风", wuxing: "木", keywords: ["创造力", "自信", "行动力"], meaningUp: "你拥有完成目标所需的一切资源，现在就去行动。", meaningDown: "才能被浪费或方向不对，需要重新审视你的策略。" },
  { id: 2, name: "女祭司", nameEn: "The High Priestess", arcana: "major", number: 2, element: "水", wuxing: "水", keywords: ["直觉", "潜意识", "内在智慧"], meaningUp: "静下来倾听内心的声音，答案已经在你的潜意识里。", meaningDown: "忽略了直觉信号，或过度沉浸在幻想中。" },
  { id: 3, name: "女皇", nameEn: "The Empress", arcana: "major", number: 3, element: "土", wuxing: "土", keywords: ["丰收", "滋养", "丰盛"], meaningUp: "这是一个收获和成长的时期，享受生命的丰盛与美好。", meaningDown: "过度依赖他人，或在创造力上遇到阻碍。" },
  { id: 4, name: "皇帝", nameEn: "The Emperor", arcana: "major", number: 4, element: "火", wuxing: "火", keywords: ["权威", "稳定", "秩序"], meaningUp: "建立结构和规则，用理性和纪律来管理你的生活。", meaningDown: "过于固执或滥用权力，需要更多的灵活性。" },
  { id: 5, name: "教皇", nameEn: "The Hierophant", arcana: "major", number: 5, element: "土", wuxing: "土", keywords: ["传统", "教导", "精神指引"], meaningUp: "寻求导师或传统智慧的指引，遵循已被验证的道路。", meaningDown: "挑战权威或旧有规则，寻找属于自己的信仰。" },
  { id: 6, name: "恋人", nameEn: "The Lovers", arcana: "major", number: 6, element: "风", wuxing: "木", keywords: ["选择", "爱情", "和谐"], meaningUp: "一段重要的关系或选择摆在面前，跟随你的真心。", meaningDown: "关系中的不平衡或价值观冲突需要面对。" },
  { id: 7, name: "战车", nameEn: "The Chariot", arcana: "major", number: 7, element: "水", wuxing: "水", keywords: ["胜利", "意志力", "征服"], meaningUp: "靠决心和自律克服障碍，胜利在望。", meaningDown: "方向混乱或缺乏自律，需要停下来重新定位。" },
  { id: 8, name: "力量", nameEn: "Strength", arcana: "major", number: 8, element: "火", wuxing: "火", keywords: ["勇气", "内在力量", "温柔"], meaningUp: "真正的力量来自内心的温柔与耐心，而非蛮力。", meaningDown: "自我怀疑或内在的恐惧正在消耗你的能量。" },
  { id: 9, name: "隐士", nameEn: "The Hermit", arcana: "major", number: 9, element: "土", wuxing: "土", keywords: ["内省", "寻找真相", "独处"], meaningUp: "独处是必要的，向内探索才能找到真正的答案。", meaningDown: "过度孤立或拒绝接受他人的帮助。" },
  { id: 10, name: "命运之轮", nameEn: "Wheel of Fortune", arcana: "major", number: 10, element: "火", wuxing: "火", keywords: ["变化", "循环", "机遇"], meaningUp: "命运的转折点到来，好运正在向你靠近。", meaningDown: "不顺的周期，但记住变化是唯一的不变。" },
  { id: 11, name: "正义", nameEn: "Justice", arcana: "major", number: 11, element: "风", wuxing: "木", keywords: ["公平", "真相", "因果"], meaningUp: "你的选择将带来相应的结果，公正会得到伸张。", meaningDown: "不公正或逃避责任，需要诚实地面对自己。" },
  { id: 12, name: "倒吊人", nameEn: "The Hanged Man", arcana: "major", number: 12, element: "水", wuxing: "水", keywords: ["牺牲", "新视角", "暂停"], meaningUp: "换一个角度看问题，当下的暂停是为了更好的前进。", meaningDown: "陷入停滞或做无谓的牺牲，需要打破僵局。" },
  { id: 13, name: "死神", nameEn: "Death", arcana: "major", number: 13, element: "水", wuxing: "水", keywords: ["结束", "转变", "重生"], meaningUp: "旧的篇章必须结束，新的开始才能到来。放下。", meaningDown: "抗拒改变，执着于已经结束的事物。" },
  { id: 14, name: "节制", nameEn: "Temperance", arcana: "major", number: 14, element: "火", wuxing: "火", keywords: ["平衡", "调和", "耐心"], meaningUp: "保持平衡和耐心，找到适度的节奏。", meaningDown: "极端失衡或缺乏耐心，需要找回和谐。" },
  { id: 15, name: "恶魔", nameEn: "The Devil", arcana: "major", number: 15, element: "土", wuxing: "土", keywords: ["束缚", "执念", "物质"], meaningUp: "觉察那些限制你的执念和习惯，你有能力挣脱。", meaningDown: "正在摆脱不健康的关系或依赖，重获自由。" },
  { id: 16, name: "高塔", nameEn: "The Tower", arcana: "major", number: 16, element: "火", wuxing: "火", keywords: ["崩塌", "觉醒", "剧变"], meaningUp: "突如其来的变化打破了旧有结构，但这是必要的重建。", meaningDown: "抗拒不可避免的改变，或灾难已经过去。" },
  { id: 17, name: "星星", nameEn: "The Star", arcana: "major", number: 17, element: "风", wuxing: "木", keywords: ["希望", "灵感", "平静"], meaningUp: "希望的光芒在闪烁，保持信念，一切都会好起来的。", meaningDown: "失去信心或方向感，重新连接内在的希望。" },
  { id: 18, name: "月亮", nameEn: "The Moon", arcana: "major", number: 18, element: "水", wuxing: "水", keywords: ["幻觉", "恐惧", "潜意识"], meaningUp: "事情并非表面那样，小心幻觉和未知的恐惧。", meaningDown: "正在走出困惑，真相逐渐显露。" },
  { id: 19, name: "太阳", nameEn: "The Sun", arcana: "major", number: 19, element: "火", wuxing: "火", keywords: ["喜悦", "成功", "活力"], meaningUp: "阳光灿烂的日子，成功和喜悦围绕着你。", meaningDown: "快乐被暂时遮蔽，但光明就在不远处。" },
  { id: 20, name: "审判", nameEn: "Judgement", arcana: "major", number: 20, element: "火", wuxing: "火", keywords: ["觉醒", "重生", "召唤"], meaningUp: "过去的一切有了答案，新的阶段正在开启。", meaningDown: "自我批判或拒绝面对内心的召唤。" },
  { id: 21, name: "世界", nameEn: "The World", arcana: "major", number: 21, element: "土", wuxing: "土", keywords: ["完成", "圆满", "达成"], meaningUp: "一个周期圆满完成，你达到了新的高度。", meaningDown: "离完成还差最后一步，不要放弃。" },
  { id: 22, name: "权杖Ace", nameEn: "Ace of Wands", arcana: "minor", suit: "wands", number: 1, element: "火", wuxing: "火", keywords: ["新开始", "灵感", "创造火花"], meaningUp: "一个充满激情的新机会正在萌芽，抓住它。", meaningDown: "创意受阻或缺乏动力，需要重新点燃热情。" },
  { id: 23, name: "权杖二", nameEn: "Two of Wands", arcana: "minor", suit: "wands", number: 2, element: "火", wuxing: "火", keywords: ["规划", "未来", "选择"], meaningUp: "站在选择的十字路口，大胆规划你的未来。", meaningDown: "恐惧未知而不敢行动，或计划过于宏大不切实际。" },
  { id: 24, name: "权杖三", nameEn: "Three of Wands", arcana: "minor", suit: "wands", number: 3, element: "火", wuxing: "火", keywords: ["远见", "探索", "扩张"], meaningUp: "你的努力开始扩展，前方的路比想象中更广阔。", meaningDown: "进展缓慢或需要调整计划方向。" },
  { id: 25, name: "权杖四", nameEn: "Four of Wands", arcana: "minor", suit: "wands", number: 4, element: "火", wuxing: "火", keywords: ["庆祝", "稳定", "归属"], meaningUp: "值得庆祝的时刻，家庭或团队带来温暖和归属感。", meaningDown: "小冲突打破了和谐，需要修复关系。" },
  { id: 26, name: "权杖五", nameEn: "Five of Wands", arcana: "minor", suit: "wands", number: 5, element: "火", wuxing: "火", keywords: ["竞争", "冲突", "挑战"], meaningUp: "激烈的竞争或意见分歧，需要用建设性的方式解决。", meaningDown: "避免冲突或已找到和平解决方案。" },
  { id: 27, name: "权杖六", nameEn: "Six of Wands", arcana: "minor", suit: "wands", number: 6, element: "火", wuxing: "火", keywords: ["胜利", "认可", "赞誉"], meaningUp: "你的努力得到了认可，享受属于你的高光时刻。", meaningDown: "缺乏认可或成功之后的自满需要警惕。" },
  { id: 28, name: "权杖七", nameEn: "Seven of Wands", arcana: "minor", suit: "wands", number: 7, element: "火", wuxing: "火", keywords: ["防守", "坚持", "勇气"], meaningUp: "面对挑战不要退缩，捍卫你的立场和信念。", meaningDown: "力不从心或感到不堪重负，需要寻求支援。" },
  { id: 29, name: "权杖八", nameEn: "Eight of Wands", arcana: "minor", suit: "wands", number: 8, element: "火", wuxing: "火", keywords: ["速度", "进展", "消息"], meaningUp: "事情正在快速推进，好消息即将到来。", meaningDown: "进度延迟或沟通不畅，需要耐心等待。" },
  { id: 30, name: "权杖九", nameEn: "Nine of Wands", arcana: "minor", suit: "wands", number: 9, element: "火", wuxing: "火", keywords: ["韧性", "坚持", "最后冲刺"], meaningUp: "曙光就在眼前，再坚持一下就能到达终点。", meaningDown: "精疲力竭或失去动力，需要休息充电。" },
  { id: 31, name: "权杖十", nameEn: "Ten of Wands", arcana: "minor", suit: "wands", number: 10, element: "火", wuxing: "火", keywords: ["压力", "负担", "过度"], meaningUp: "承担了太多责任，是时候放下一些了。", meaningDown: "学会放手或委派任务，不要做独行侠。" },
  { id: 32, name: "圣杯Ace", nameEn: "Ace of Cups", arcana: "minor", suit: "cups", number: 1, element: "水", wuxing: "水", keywords: ["爱", "情感", "新关系"], meaningUp: "爱的新芽正在绽放，敞开心扉去感受吧。", meaningDown: "情感压抑或爱意无法流动，需要疏通情绪。" },
]

export function getCardByName(name: string): TarotCardData | undefined {
  return ALL_CARDS.find(c => c.name === name)
}

export function getCardsBySuit(suit: string): TarotCardData[] {
  return ALL_CARDS.filter(c => c.suit === suit)
}

export function getMajorArcana(): TarotCardData[] {
  return ALL_CARDS.filter(c => c.arcana === "major")
}
