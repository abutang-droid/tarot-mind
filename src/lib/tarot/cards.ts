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
  symbol: string // SVG symbol key for card face design
}

export const ALL_CARDS: TarotCardData[] = [
  // ── 大阿卡纳 22 张 ──
  { id: 0, name: "愚者", nameEn: "The Fool", arcana: "major", number: 0, element: "风", wuxing: "木", keywords: ["新的开始", "冒险", "自由"], meaningUp: "新的旅程正在召唤你，勇敢迈出第一步，信任生命的安排。", meaningDown: "是否在逃避某个重要的决定？小心鲁莽行事带来的后果。", symbol: "fool" },
  { id: 1, name: "魔术师", nameEn: "The Magician", arcana: "major", number: 1, element: "风", wuxing: "木", keywords: ["创造力", "自信", "行动力"], meaningUp: "你拥有完成目标所需的一切资源，现在就去行动。", meaningDown: "才能被浪费或方向不对，需要重新审视你的策略。", symbol: "magician" },
  { id: 2, name: "女祭司", nameEn: "The High Priestess", arcana: "major", number: 2, element: "水", wuxing: "水", keywords: ["直觉", "潜意识", "内在智慧"], meaningUp: "静下来倾听内心的声音，答案已经在你的潜意识里。", meaningDown: "忽略了直觉信号，或过度沉浸在幻想中。", symbol: "highpriestess" },
  { id: 3, name: "女皇", nameEn: "The Empress", arcana: "major", number: 3, element: "土", wuxing: "土", keywords: ["丰收", "滋养", "丰盛"], meaningUp: "这是一个收获和成长的时期，享受生命的丰盛与美好。", meaningDown: "过度依赖他人，或在创造力上遇到阻碍。", symbol: "empress" },
  { id: 4, name: "皇帝", nameEn: "The Emperor", arcana: "major", number: 4, element: "火", wuxing: "火", keywords: ["权威", "稳定", "秩序"], meaningUp: "建立结构和规则，用理性和纪律来管理你的生活。", meaningDown: "过于固执或滥用权力，需要更多的灵活性。", symbol: "emperor" },
  { id: 5, name: "教皇", nameEn: "The Hierophant", arcana: "major", number: 5, element: "土", wuxing: "土", keywords: ["传统", "教导", "精神指引"], meaningUp: "寻求导师或传统智慧的指引，遵循已被验证的道路。", meaningDown: "挑战权威或旧有规则，寻找属于自己的信仰。", symbol: "hierophant" },
  { id: 6, name: "恋人", nameEn: "The Lovers", arcana: "major", number: 6, element: "风", wuxing: "木", keywords: ["选择", "爱情", "和谐"], meaningUp: "一段重要的关系或选择摆在面前，跟随你的真心。", meaningDown: "关系中的不平衡或价值观冲突需要面对。", symbol: "lovers" },
  { id: 7, name: "战车", nameEn: "The Chariot", arcana: "major", number: 7, element: "水", wuxing: "水", keywords: ["胜利", "意志力", "征服"], meaningUp: "靠决心和自律克服障碍，胜利在望。", meaningDown: "方向混乱或缺乏自律，需要停下来重新定位。", symbol: "chariot" },
  { id: 8, name: "力量", nameEn: "Strength", arcana: "major", number: 8, element: "火", wuxing: "火", keywords: ["勇气", "内在力量", "温柔"], meaningUp: "真正的力量来自内心的温柔与耐心，而非蛮力。", meaningDown: "自我怀疑或内在的恐惧正在消耗你的能量。", symbol: "strength" },
  { id: 9, name: "隐士", nameEn: "The Hermit", arcana: "major", number: 9, element: "土", wuxing: "土", keywords: ["内省", "寻找真相", "独处"], meaningUp: "独处是必要的，向内探索才能找到真正的答案。", meaningDown: "过度孤立或拒绝接受他人的帮助。", symbol: "hermit" },
  { id: 10, name: "命运之轮", nameEn: "Wheel of Fortune", arcana: "major", number: 10, element: "火", wuxing: "火", keywords: ["变化", "循环", "机遇"], meaningUp: "命运的转折点到来，好运正在向你靠近。", meaningDown: "不顺的周期，但记住变化是唯一的不变。", symbol: "wheel" },
  { id: 11, name: "正义", nameEn: "Justice", arcana: "major", number: 11, element: "风", wuxing: "木", keywords: ["公平", "真相", "因果"], meaningUp: "你的选择将带来相应的结果，公正会得到伸张。", meaningDown: "不公正或逃避责任，需要诚实地面对自己。", symbol: "justice" },
  { id: 12, name: "倒吊人", nameEn: "The Hanged Man", arcana: "major", number: 12, element: "水", wuxing: "水", keywords: ["牺牲", "新视角", "暂停"], meaningUp: "换一个角度看问题，当下的暂停是为了更好的前进。", meaningDown: "陷入停滞或做无谓的牺牲，需要打破僵局。", symbol: "hangedman" },
  { id: 13, name: "死神", nameEn: "Death", arcana: "major", number: 13, element: "水", wuxing: "水", keywords: ["结束", "转变", "重生"], meaningUp: "旧的篇章必须结束，新的开始才能到来。放下。", meaningDown: "抗拒改变，执着于已经结束的事物。", symbol: "death" },
  { id: 14, name: "节制", nameEn: "Temperance", arcana: "major", number: 14, element: "火", wuxing: "火", keywords: ["平衡", "调和", "耐心"], meaningUp: "保持平衡和耐心，找到适度的节奏。", meaningDown: "极端失衡或缺乏耐心，需要找回和谐。", symbol: "temperance" },
  { id: 15, name: "恶魔", nameEn: "The Devil", arcana: "major", number: 15, element: "土", wuxing: "土", keywords: ["束缚", "执念", "物质"], meaningUp: "觉察那些限制你的执念和习惯，你有能力挣脱。", meaningDown: "正在摆脱不健康的关系或依赖，重获自由。", symbol: "devil" },
  { id: 16, name: "高塔", nameEn: "The Tower", arcana: "major", number: 16, element: "火", wuxing: "火", keywords: ["崩塌", "觉醒", "剧变"], meaningUp: "突如其来的变化打破了旧有结构，但这是必要的重建。", meaningDown: "抗拒不可避免的改变，或灾难已经过去。", symbol: "tower" },
  { id: 17, name: "星星", nameEn: "The Star", arcana: "major", number: 17, element: "风", wuxing: "木", keywords: ["希望", "灵感", "平静"], meaningUp: "希望的光芒在闪烁，保持信念，一切都会好起来的。", meaningDown: "失去信心或方向感，重新连接内在的希望。", symbol: "star" },
  { id: 18, name: "月亮", nameEn: "The Moon", arcana: "major", number: 18, element: "水", wuxing: "水", keywords: ["幻觉", "恐惧", "潜意识"], meaningUp: "事情并非表面那样，小心幻觉和未知的恐惧。", meaningDown: "正在走出困惑，真相逐渐显露。", symbol: "moon" },
  { id: 19, name: "太阳", nameEn: "The Sun", arcana: "major", number: 19, element: "火", wuxing: "火", keywords: ["喜悦", "成功", "活力"], meaningUp: "阳光灿烂的日子，成功和喜悦围绕着你。", meaningDown: "快乐被暂时遮蔽，但光明就在不远处。", symbol: "sun" },
  { id: 20, name: "审判", nameEn: "Judgement", arcana: "major", number: 20, element: "火", wuxing: "火", keywords: ["觉醒", "重生", "召唤"], meaningUp: "过去的一切有了答案，新的阶段正在开启。", meaningDown: "自我批判或拒绝面对内心的召唤。", symbol: "judgement" },
  { id: 21, name: "世界", nameEn: "The World", arcana: "major", number: 21, element: "土", wuxing: "土", keywords: ["完成", "圆满", "达成"], meaningUp: "一个周期圆满完成，你达到了新的高度。", meaningDown: "离完成还差最后一步，不要放弃。", symbol: "world" },
  // ── 权杖 14 张 ──
  { id: 22, name: "权杖Ace", nameEn: "Ace of Wands", arcana: "minor", suit: "wands", number: 1, element: "火", wuxing: "火", keywords: ["新开始", "灵感", "创造火花"], meaningUp: "一个充满激情的新机会正在萌芽，抓住它。", meaningDown: "创意受阻或缺乏动力，需要重新点燃热情。", symbol: "wands_ace" },
  { id: 23, name: "权杖二", nameEn: "Two of Wands", arcana: "minor", suit: "wands", number: 2, element: "火", wuxing: "火", keywords: ["规划", "未来", "选择"], meaningUp: "站在选择的十字路口，大胆规划你的未来。", meaningDown: "恐惧未知而不敢行动，或计划过于宏大不切实际。", symbol: "wands_2" },
  { id: 24, name: "权杖三", nameEn: "Three of Wands", arcana: "minor", suit: "wands", number: 3, element: "火", wuxing: "火", keywords: ["远见", "探索", "扩张"], meaningUp: "你的努力开始扩展，前方的路比想象中更广阔。", meaningDown: "进展缓慢或需要调整计划方向。", symbol: "wands_3" },
  { id: 25, name: "权杖四", nameEn: "Four of Wands", arcana: "minor", suit: "wands", number: 4, element: "火", wuxing: "火", keywords: ["庆祝", "稳定", "归属"], meaningUp: "值得庆祝的时刻，家庭或团队带来温暖和归属感。", meaningDown: "小冲突打破了和谐，需要修复关系。", symbol: "wands_4" },
  { id: 26, name: "权杖五", nameEn: "Five of Wands", arcana: "minor", suit: "wands", number: 5, element: "火", wuxing: "火", keywords: ["竞争", "冲突", "挑战"], meaningUp: "激烈的竞争或意见分歧，需要用建设性的方式解决。", meaningDown: "避免冲突或已找到和平解决方案。", symbol: "wands_5" },
  { id: 27, name: "权杖六", nameEn: "Six of Wands", arcana: "minor", suit: "wands", number: 6, element: "火", wuxing: "火", keywords: ["胜利", "认可", "赞誉"], meaningUp: "你的努力得到了认可，享受属于你的高光时刻。", meaningDown: "缺乏认可或成功之后的自满需要警惕。", symbol: "wands_6" },
  { id: 28, name: "权杖七", nameEn: "Seven of Wands", arcana: "minor", suit: "wands", number: 7, element: "火", wuxing: "火", keywords: ["防守", "坚持", "勇气"], meaningUp: "面对挑战不要退缩，捍卫你的立场和信念。", meaningDown: "力不从心或感到不堪重负，需要寻求支援。", symbol: "wands_7" },
  { id: 29, name: "权杖八", nameEn: "Eight of Wands", arcana: "minor", suit: "wands", number: 8, element: "火", wuxing: "火", keywords: ["速度", "进展", "消息"], meaningUp: "事情正在快速推进，好消息即将到来。", meaningDown: "进度延迟或沟通不畅，需要耐心等待。", symbol: "wands_8" },
  { id: 30, name: "权杖九", nameEn: "Nine of Wands", arcana: "minor", suit: "wands", number: 9, element: "火", wuxing: "火", keywords: ["韧性", "坚持", "最后冲刺"], meaningUp: "曙光就在眼前，再坚持一下就能到达终点。", meaningDown: "精疲力竭或失去动力，需要休息充电。", symbol: "wands_9" },
  { id: 31, name: "权杖十", nameEn: "Ten of Wands", arcana: "minor", suit: "wands", number: 10, element: "火", wuxing: "火", keywords: ["压力", "负担", "过度"], meaningUp: "承担了太多责任，是时候放下一些了。", meaningDown: "学会放手或委派任务，不要做独行侠。", symbol: "wands_10" },
  { id: 32, name: "权杖侍从", nameEn: "Page of Wands", arcana: "minor", suit: "wands", element: "火", wuxing: "火", keywords: ["热情", "探索", "冒险精神"], meaningUp: "带着好奇心和热情去探索新领域，机会就在眼前。", meaningDown: "冲动行事或缺乏方向感，需要更多的计划。", symbol: "wands_page" },
  { id: 33, name: "权杖骑士", nameEn: "Knight of Wands", arcana: "minor", suit: "wands", element: "火", wuxing: "火", keywords: ["行动", "冒险", "魅力"], meaningUp: "充满活力地向前冲，你的热情会感染周围的人。", meaningDown: "鲁莽冲动或虎头蛇尾，需要更多的耐心和坚持。", symbol: "wands_knight" },
  { id: 34, name: "权杖王后", nameEn: "Queen of Wands", arcana: "minor", suit: "wands", element: "火", wuxing: "火", keywords: ["自信", "热情", "领导力"], meaningUp: "用你的热情和魅力去感染和激励他人，你天生是领导者。", meaningDown: "自我中心或嫉妒心作祟，需要更多的包容。", symbol: "wands_queen" },
  { id: 35, name: "权杖国王", nameEn: "King of Wands", arcana: "minor", suit: "wands", element: "火", wuxing: "火", keywords: ["远见", "领导", "创业"], meaningUp: "你是一个有远见的领导者，用你的热情去实现宏大的目标。", meaningDown: "独断专行或傲慢自大，需要倾听他人的意见。", symbol: "wands_king" },
  // ── 圣杯 14 张 ──
  { id: 36, name: "圣杯Ace", nameEn: "Ace of Cups", arcana: "minor", suit: "cups", number: 1, element: "水", wuxing: "水", keywords: ["爱", "情感", "新关系"], meaningUp: "爱的新芽正在绽放，敞开心扉去感受吧。", meaningDown: "情感压抑或爱意无法流动，需要疏通情绪。", symbol: "cups_ace" },
  { id: 37, name: "圣杯二", nameEn: "Two of Cups", arcana: "minor", suit: "cups", number: 2, element: "水", wuxing: "水", keywords: ["联结", "伴侣", "和谐"], meaningUp: "两颗心灵的美好相遇，一段充满爱与理解的关系。", meaningDown: "关系中出现裂痕，需要重建沟通和信任。", symbol: "cups_2" },
  { id: 38, name: "圣杯三", nameEn: "Three of Cups", arcana: "minor", suit: "cups", number: 3, element: "水", wuxing: "水", keywords: ["庆祝", "友谊", "喜悦"], meaningUp: "与挚友共庆，生命中充满了值得感恩的美好时刻。", meaningDown: "社交圈中的八卦或过度放纵，需要节制。", symbol: "cups_3" },
  { id: 39, name: "圣杯四", nameEn: "Four of Cups", arcana: "minor", suit: "cups", number: 4, element: "水", wuxing: "水", keywords: ["冥想", "重新评估", "冷漠"], meaningUp: "暂时退出，重新审视你真正想要的是什么。", meaningDown: "从冷漠中走出，重新对生活敞开心扉。", symbol: "cups_4" },
  { id: 40, name: "圣杯五", nameEn: "Five of Cups", arcana: "minor", suit: "cups", number: 5, element: "水", wuxing: "水", keywords: ["失落", "悲伤", "遗憾"], meaningUp: "允许自己悲伤，但别忘了还有未打翻的杯子。", meaningDown: "从过去的伤痛中走出，接受并向前看。", symbol: "cups_5" },
  { id: 41, name: "圣杯六", nameEn: "Six of Cups", arcana: "minor", suit: "cups", number: 6, element: "水", wuxing: "水", keywords: ["怀旧", "童年", "纯真"], meaningUp: "美好的回忆带来温暖，或来自过去的人重新出现。", meaningDown: "活在过去的美好中，需要面对当下的现实。", symbol: "cups_6" },
  { id: 42, name: "圣杯七", nameEn: "Seven of Cups", arcana: "minor", suit: "cups", number: 7, element: "水", wuxing: "水", keywords: ["幻想", "选择", "迷惑"], meaningUp: "面对众多选择，需要分辨哪些是真实的机会，哪些是幻觉。", meaningDown: "从幻想中清醒，做出务实的选择。", symbol: "cups_7" },
  { id: 43, name: "圣杯八", nameEn: "Eight of Cups", arcana: "minor", suit: "cups", number: 8, element: "水", wuxing: "水", keywords: ["离开", "寻求更多", "放弃"], meaningUp: "是时候离开那些不再滋养你的事物，去寻找更深的意义。", meaningDown: "害怕放弃或正在重新考虑是否要离开。", symbol: "cups_8" },
  { id: 44, name: "圣杯九", nameEn: "Nine of Cups", arcana: "minor", suit: "cups", number: 9, element: "水", wuxing: "水", keywords: ["满足", "愿望成真", "幸福"], meaningUp: "你的愿望即将实现，享受这份来之不易的满足感。", meaningDown: "物质满足但内心空虚，需要寻找更深层的幸福。", symbol: "cups_9" },
  { id: 45, name: "圣杯十", nameEn: "Ten of Cups", arcana: "minor", suit: "cups", number: 10, element: "水", wuxing: "水", keywords: ["圆满", "家庭幸福", "和谐"], meaningUp: "家庭和关系达到圆满的状态，这是真正的幸福。", meaningDown: "家庭不和谐或理想与现实的落差，需要努力修复。", symbol: "cups_10" },
  { id: 46, name: "圣杯侍从", nameEn: "Page of Cups", arcana: "minor", suit: "cups", element: "水", wuxing: "水", keywords: ["直觉", "创意", "情感信息"], meaningUp: "一个充满创意和直觉的灵魂，带来意外的情感惊喜。", meaningDown: "情感不成熟或过于敏感，需要更多的情绪管理。", symbol: "cups_page" },
  { id: 47, name: "圣杯骑士", nameEn: "Knight of Cups", arcana: "minor", suit: "cups", element: "水", wuxing: "水", keywords: ["浪漫", "魅力", "理想主义"], meaningUp: "带着浪漫和理想追求你的梦想，用心去感受。", meaningDown: "过于理想化或情绪化，需要更多的实际行动。", symbol: "cups_knight" },
  { id: 48, name: "圣杯王后", nameEn: "Queen of Cups", arcana: "minor", suit: "cups", element: "水", wuxing: "水", keywords: ["同理心", "直觉", "情感智慧"], meaningUp: "用你的同理心和情感智慧去理解和帮助他人。", meaningDown: "情绪化或过度依赖他人的认可，需要建立情感边界。", symbol: "cups_queen" },
  { id: 49, name: "圣杯国王", nameEn: "King of Cups", arcana: "minor", suit: "cups", element: "水", wuxing: "水", keywords: ["情感成熟", "智慧", "平衡"], meaningUp: "用成熟的情感智慧来处理复杂的关系和情况。", meaningDown: "情感操控或压抑情绪，需要更真实地表达自己。", symbol: "cups_king" },
  // ── 宝剑 14 张 ──
  { id: 50, name: "宝剑Ace", nameEn: "Ace of Swords", arcana: "minor", suit: "swords", number: 1, element: "风", wuxing: "木", keywords: ["真相", "清晰", "突破"], meaningUp: "用清晰的思维切穿迷雾，真相和突破就在眼前。", meaningDown: "思维混乱或用语言伤害他人，需要更谨慎地表达。", symbol: "swords_ace" },
  { id: 51, name: "宝剑二", nameEn: "Two of Swords", arcana: "minor", suit: "swords", number: 2, element: "风", wuxing: "木", keywords: ["僵局", "回避", "选择困难"], meaningUp: "面对艰难的选择，你需要摘下眼罩，看清真相。", meaningDown: "开始面对你一直回避的问题，做出决定。", symbol: "swords_2" },
  { id: 52, name: "宝剑三", nameEn: "Three of Swords", arcana: "minor", suit: "swords", number: 3, element: "风", wuxing: "木", keywords: ["心碎", "悲伤", "失去"], meaningUp: "心痛是真实的，允许自己哀悼，然后慢慢愈合。", meaningDown: "从心碎中走出，伤口正在愈合，痛苦在减轻。", symbol: "swords_3" },
  { id: 53, name: "宝剑四", nameEn: "Four of Swords", arcana: "minor", suit: "swords", number: 4, element: "风", wuxing: "木", keywords: ["休息", "恢复", "沉思"], meaningUp: "你需要休息和恢复，暂时退出战场是明智之举。", meaningDown: "休息已经足够，是时候重新行动了。", symbol: "swords_4" },
  { id: 54, name: "宝剑五", nameEn: "Five of Swords", arcana: "minor", suit: "swords", number: 5, element: "风", wuxing: "木", keywords: ["冲突", "失败", "背叛"], meaningUp: "即使赢了，也要思考这场胜利的代价是否值得。", meaningDown: "从冲突中走出，学会放下自我，寻求和解。", symbol: "swords_5" },
  { id: 55, name: "宝剑六", nameEn: "Six of Swords", arcana: "minor", suit: "swords", number: 6, element: "风", wuxing: "木", keywords: ["过渡", "离开", "前行"], meaningUp: "离开困境，向着更平静的水域前行，未来会更好。", meaningDown: "抗拒改变或无法离开困境，需要勇气迈出第一步。", symbol: "swords_6" },
  { id: 56, name: "宝剑七", nameEn: "Seven of Swords", arcana: "minor", suit: "swords", number: 7, element: "风", wuxing: "木", keywords: ["欺骗", "策略", "逃避"], meaningUp: "小心周围的欺骗，或审视自己是否在逃避责任。", meaningDown: "欺骗被揭穿，或终于决定诚实面对。", symbol: "swords_7" },
  { id: 57, name: "宝剑八", nameEn: "Eight of Swords", arcana: "minor", suit: "swords", number: 8, element: "风", wuxing: "木", keywords: ["束缚", "受害者心态", "自我限制"], meaningUp: "你比你想象的更自由，那些束缚大多来自你自己的恐惧。", meaningDown: "开始挣脱内心的束缚，重新找回自由。", symbol: "swords_8" },
  { id: 58, name: "宝剑九", nameEn: "Nine of Swords", arcana: "minor", suit: "swords", number: 9, element: "风", wuxing: "木", keywords: ["焦虑", "噩梦", "绝望"], meaningUp: "焦虑和恐惧往往比现实更可怕，寻求支持和帮助。", meaningDown: "最坏的时期已经过去，焦虑正在减轻。", symbol: "swords_9" },
  { id: 59, name: "宝剑十", nameEn: "Ten of Swords", arcana: "minor", suit: "swords", number: 10, element: "风", wuxing: "木", keywords: ["终结", "背叛", "失败"], meaningUp: "这是一个痛苦的结局，但也是新开始的必要前提。", meaningDown: "从最低谷中重新站起，只能往上走了。", symbol: "swords_10" },
  { id: 60, name: "宝剑侍从", nameEn: "Page of Swords", arcana: "minor", suit: "swords", element: "风", wuxing: "木", keywords: ["好奇", "警觉", "直言"], meaningUp: "保持警觉和好奇，用敏锐的思维去探索真相。", meaningDown: "言语鲁莽或好管闲事，需要三思而后言。", symbol: "swords_page" },
  { id: 61, name: "宝剑骑士", nameEn: "Knight of Swords", arcana: "minor", suit: "swords", element: "风", wuxing: "木", keywords: ["行动", "果断", "冲动"], meaningUp: "果断行动，用你的智慧和速度去实现目标。", meaningDown: "冲动鲁莽或言辞伤人，需要更多的考虑和耐心。", symbol: "swords_knight" },
  { id: 62, name: "宝剑王后", nameEn: "Queen of Swords", arcana: "minor", suit: "swords", element: "风", wuxing: "木", keywords: ["独立", "智慧", "直接"], meaningUp: "用清晰的思维和直接的方式处理事情，不被情绪左右。", meaningDown: "过于冷漠或刻薄，需要在理性中加入一些温情。", symbol: "swords_queen" },
  { id: 63, name: "宝剑国王", nameEn: "King of Swords", arcana: "minor", suit: "swords", element: "风", wuxing: "木", keywords: ["权威", "智慧", "公正"], meaningUp: "用你的智慧和公正来做出决定，成为他人的指引。", meaningDown: "独断或用权威来压制他人，需要更多的包容。", symbol: "swords_king" },
  // ── 星币 14 张 ──
  { id: 64, name: "星币Ace", nameEn: "Ace of Pentacles", arcana: "minor", suit: "pentacles", number: 1, element: "土", wuxing: "土", keywords: ["物质新开始", "机遇", "繁荣"], meaningUp: "一个新的物质机遇正在到来，为繁荣和稳定奠定基础。", meaningDown: "错失了物质机遇，或过于执着于金钱。", symbol: "pentacles_ace" },
  { id: 65, name: "星币二", nameEn: "Two of Pentacles", arcana: "minor", suit: "pentacles", number: 2, element: "土", wuxing: "土", keywords: ["平衡", "适应", "灵活"], meaningUp: "在多个事务之间保持平衡，灵活应对变化。", meaningDown: "失去平衡或过度承担，需要重新分配精力。", symbol: "pentacles_2" },
  { id: 66, name: "星币三", nameEn: "Three of Pentacles", arcana: "minor", suit: "pentacles", number: 3, element: "土", wuxing: "土", keywords: ["团队合作", "技能", "学习"], meaningUp: "团队合作和精益求精是成功的关键，你的技能得到认可。", meaningDown: "缺乏团队精神或技能不足，需要更多的学习和合作。", symbol: "pentacles_3" },
  { id: 67, name: "星币四", nameEn: "Four of Pentacles", arcana: "minor", suit: "pentacles", number: 4, element: "土", wuxing: "土", keywords: ["保守", "稳定", "控制"], meaningUp: "保护你的资源是明智的，但不要因此错过了成长的机会。", meaningDown: "过于吝啬或控制欲强，需要学会放手和分享。", symbol: "pentacles_4" },
  { id: 68, name: "星币五", nameEn: "Five of Pentacles", arcana: "minor", suit: "pentacles", number: 5, element: "土", wuxing: "土", keywords: ["贫困", "失去", "困难"], meaningUp: "即使在最困难的时候，帮助就在附近，不要放弃。", meaningDown: "从困境中走出，物质和精神上的恢复正在发生。", symbol: "pentacles_5" },
  { id: 69, name: "星币六", nameEn: "Six of Pentacles", arcana: "minor", suit: "pentacles", number: 6, element: "土", wuxing: "土", keywords: ["给予", "接受", "慷慨"], meaningUp: "慷慨地给予和接受，财富的流动带来更多的丰盛。", meaningDown: "不平等的给予关系，或附加条件的帮助。", symbol: "pentacles_6" },
  { id: 70, name: "星币七", nameEn: "Seven of Pentacles", arcana: "minor", suit: "pentacles", number: 7, element: "土", wuxing: "土", keywords: ["耐心", "评估", "长期投资"], meaningUp: "你的努力正在结出果实，耐心等待，长期投资终有回报。", meaningDown: "对进展感到不满，需要重新评估你的策略。", symbol: "pentacles_7" },
  { id: 71, name: "星币八", nameEn: "Eight of Pentacles", arcana: "minor", suit: "pentacles", number: 8, element: "土", wuxing: "土", keywords: ["勤奋", "技艺", "专注"], meaningUp: "专注于磨练你的技能，勤奋和精益求精会带来成功。", meaningDown: "过于专注于细节而忽略了大局，或工作过度。", symbol: "pentacles_8" },
  { id: 72, name: "星币九", nameEn: "Nine of Pentacles", arcana: "minor", suit: "pentacles", number: 9, element: "土", wuxing: "土", keywords: ["独立", "富足", "自给自足"], meaningUp: "你已经建立了自己的物质基础，享受这份独立和富足。", meaningDown: "过于孤立或物质上的成功掩盖了情感的空虚。", symbol: "pentacles_9" },
  { id: 73, name: "星币十", nameEn: "Ten of Pentacles", arcana: "minor", suit: "pentacles", number: 10, element: "土", wuxing: "土", keywords: ["财富", "家族", "传承"], meaningUp: "物质上的圆满和家族的繁荣，这是长期努力的结晶。", meaningDown: "家族矛盾或财富带来的问题，需要重新审视价值观。", symbol: "pentacles_10" },
  { id: 74, name: "星币侍从", nameEn: "Page of Pentacles", arcana: "minor", suit: "pentacles", element: "土", wuxing: "土", keywords: ["学习", "实践", "新技能"], meaningUp: "带着专注和好奇去学习新技能，踏实的努力会有回报。", meaningDown: "缺乏专注或不切实际，需要更多的实际行动。", symbol: "pentacles_page" },
  { id: 75, name: "星币骑士", nameEn: "Knight of Pentacles", arcana: "minor", suit: "pentacles", element: "土", wuxing: "土", keywords: ["勤奋", "可靠", "方法论"], meaningUp: "用踏实和可靠的方式去实现目标，一步一个脚印。", meaningDown: "过于保守或固执，需要更多的灵活性和创新。", symbol: "pentacles_knight" },
  { id: 76, name: "星币王后", nameEn: "Queen of Pentacles", arcana: "minor", suit: "pentacles", element: "土", wuxing: "土", keywords: ["实际", "滋养", "富足"], meaningUp: "用实际和滋养的方式去照顾自己和他人，创造丰盛的生活。", meaningDown: "过于物质化或忽略了精神层面的需求。", symbol: "pentacles_queen" },
  { id: 77, name: "星币国王", nameEn: "King of Pentacles", arcana: "minor", suit: "pentacles", element: "土", wuxing: "土", keywords: ["财富", "商业", "稳定"], meaningUp: "你是一个务实的领导者，用你的智慧和资源创造稳定的繁荣。", meaningDown: "过于物质化或用金钱来控制他人，需要更多的精神追求。", symbol: "pentacles_king" },
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

export function getCardById(id: number): TarotCardData | undefined {
  return ALL_CARDS.find(c => c.id === id)
}
