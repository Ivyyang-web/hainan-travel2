const POINTS={
  "hotel": {
    "name": "汉庭酒店(海口骑楼老街店) · 住宿候选",
    "address": "海口市美兰区海府路7号",
    "hint": "这是海府路7号的已核对候选酒店，不代表本次已预订。海口实际酒店请在住宿设置填写。",
    "source": "https://m.huazhu.com/Hotel/Detail/9011592",
    "phone": "0898-66705666",
    "city": "海口"
  },
  "wh": {
    "name": "武汉天河国际机场",
    "address": "武汉市黄陂区天河街道",
    "hint": "航站楼、值机柜台以航空公司通知为准。",
    "city": "武汉"
  },
  "air": {
    "name": "海口美兰国际机场",
    "address": "海口市美兰区美兰机场",
    "hint": "按实际T1/T2到达指示取行李，跟随“高铁/美兰站”标识。",
    "source": "https://www.mlairport.com/mljc/wap/sylcgt/",
    "city": "海口"
  },
  "meilan": {
    "name": "美兰站",
    "address": "海口美兰国际机场地下高铁站",
    "hint": "铁路美兰站，不是美兰机场航站楼上车点。按高铁标识到进站口。",
    "source": "https://www.mlairport.com/mljc/wap/sylcgt/",
    "city": "海口"
  },
  "east": {
    "name": "海口东站",
    "address": "海口市龙华区龙昆南路海口东站",
    "hint": "选择“海口东站进站口/出站口”，不是位于西海岸的海口站。",
    "city": "海口"
  },
  "shenzhou": {
    "name": "神州站",
    "address": "海南省万宁市神州站",
    "hint": "万宁神州站；先核对车票是否停站，神州站与神州半岛景区不是同一地点。",
    "city": "万宁"
  },
  "old": {
    "name": "骑楼老街",
    "address": "海口市长堤路5-1号骑楼老街游客中心",
    "hint": "以中山路、水巷口、振东街为核心，夜间小吃在同一片区。",
    "source": "https://news.hainan.net/zixun/2026/08/17/4806593.shtml",
    "city": "海口"
  },
  "heng": {
    "name": "恒兴发茶店(骑楼总店)",
    "address": "海口市美兰区振东街86号",
    "hint": "部分资料写86-1号，按骑楼总店和振东街核对，不去十三小店。",
    "source": "https://news.hainan.net/zixun/2026/05/12/4804188.shtml",
    "phone": "13687563205",
    "city": "海口"
  },
  "sanjie": {
    "name": "三姐海南粉(骑楼老街店)",
    "address": "海口市龙华区新华北路67号后楼",
    "hint": "携程资料为新华北路67号，高德有长堤路5-1号条目，地址存在分歧。先电话确认后楼入口；未确认则选恒兴发。",
    "source": "https://you.ctrip.com/food/37/17621185.html",
    "phone": "15208988403",
    "uncertain": true,
    "city": "海口"
  },
  "wu": {
    "name": "吴日彪蒜香猪牛排(水巷口店)",
    "address": "海口市美兰区水巷口46号",
    "hint": "选水巷口店，买炸排骨与鸡翅；到海边前或出发前电话/平台确认收摊时间，若早收就午间买。",
    "source": "https://www.amap.com/place/B0FFLGFHP3",
    "city": "海口"
  },
  "sweet": {
    "name": "公鸡碗清补凉(新华南路店)",
    "address": "海口市龙华区新华南路2-2号",
    "hint": "黎耀阳未确认时的同片区甜品替代；不是强制换店。",
    "source": "https://news.hainan.net/meishi/2026/04/13/4803481.shtml",
    "phone": "13698985492",
    "city": "海口"
  },
  "hcc": {
    "name": "华彩海口湾广场",
    "address": "海口市美兰区碧海大道86号",
    "hint": "海甸岛西南端，结束后沿场内“天空之山”方向步行；请看现场出入口。",
    "source": "https://www.focus.cn/xf/hn-110142514/",
    "city": "海口"
  },
  "shibei": {
    "name": "拾贝公园",
    "address": "海口市美兰区埠北环路6号海熙府东北",
    "hint": "位于新埠岛，不在海口湾步道连续步行段；上下车定位公园可进入的入口。",
    "source": "https://www.amap.com/place/B0I1NUA3WY",
    "city": "海口"
  },
  "sky": {
    "name": "天空之山驿站",
    "address": "海口市美兰区海甸五西路恒大美丽沙滨海区域",
    "hint": "从华彩一侧按标识走到驿站外围；默认看建筑和海边，不承诺室内/屋顶开放。",
    "source": "https://haikou.bendibao.com/tour/zhuantiduanwujie/",
    "city": "海口"
  },
  "cloud": {
    "name": "海口云洞图书馆(主入口)",
    "address": "海口市龙华区世纪广场路1号",
    "hint": "在海湾南岸，和天空之山隔水相望，不能直接沿海步行跨过去；入馆另核预约。",
    "source": "https://news.hainan.net/zixun/2026/08/17/4806593.shtml",
    "city": "海口"
  },
  "wanlv": {
    "name": "万绿园",
    "address": "海口市龙华区滨海大道38号",
    "hint": "进园后先中央草坪，再向东侧/滨海一侧找椰林听涛；网红树无已核实单株坐标。",
    "source": "https://zh.wikipedia.org/zh-cn/万绿园",
    "city": "海口"
  },
  "walk": {
    "name": "万绿园滨海步道",
    "address": "海口市龙华区万绿园滨海一侧",
    "hint": "“健康氧吧步道”不是已核实独立门牌，用万绿园滨海步道作入口，只走约20—30分钟。",
    "approx": true,
    "city": "海口"
  },
  "guanhai": {
    "name": "假日海滩旅游景区-观海台",
    "address": "海口市秀英区滨海大道西秀海滩与假日海滩之间",
    "hint": "选择景区观海台，不是“观海台1号”小区。它在西秀西侧，这段安排往回东行去西秀，再回酒店。",
    "source": "https://you.ctrip.com/sight/haikou37/1830764.html",
    "city": "海口"
  },
  "xixiu": {
    "name": "西秀海滩公园",
    "address": "海口市秀英区滨海大道163号",
    "hint": "不走完滨海大道；按地图查询观海台→西秀的实际步行距离，累了就打车。",
    "source": "https://www.amap.com/place/B038200FE7",
    "city": "海口"
  },
  "vinegar": {
    "name": "琼州·糟粕醋火锅(自在湾店)",
    "address": "海口市龙华区观海路1号",
    "hint": "万绿园结束后同片区午饭，提前确认营业；糟粕醋/香草鸭二选一，主线用地址明确的这一家。",
    "source": "https://www.amap.com/place/B0KRZR6DL0",
    "phone": "0898-65398838",
    "city": "海口"
  },
  "laoyan": {
    "name": "老盐季",
    "address": "尚未确认老街沿线具体分店",
    "hint": "想喝菠萝/百香果水保留，但不为找店去美安总部。地图按骑楼片区找营业店；绕行超过10分钟就留后面。",
    "uncertain": true,
    "city": "海口"
  },
  "li": {
    "name": "黎耀阳财神糖水铺",
    "address": "青年路、吾悦广场有线索，未确认可营业的准确门牌",
    "hint": "不假定在骑楼。先在百度地图确认具体分店；若跨区或无可靠门店，就用老城甜品替代。",
    "uncertain": true,
    "city": "海口"
  },
  "duck": {
    "name": "香草鸭",
    "address": "菜品，尚未锁定当前营业的具体餐馆",
    "hint": "如更想吃香草鸭，可替换12:00糟粕醋时段；选店应在万绿园/自在湾/西海岸，不加一趟市区往返。",
    "uncertain": true,
    "city": "海口"
  },
  "village": {
    "name": "荣山寮村",
    "address": "海口市秀英区荣山寮村",
    "hint": "11月5日西海岸的替换方案：替换观海台与西秀，不再当天加免税城。",
    "city": "海口"
  },
  "cdf": {
    "name": "cdf海口国际免税城",
    "address": "海口市秀英区海色路5号",
    "hint": "海口的cdf在海色路5号，与三亚免税城不同；只替换11月5日下午，购物离岛提货时限以门店规定为准。",
    "city": "海口"
  },
  "hkstay": {
    "name": "海友酒店（海口骑楼老街文明中路店）",
    "address": "海口市美兰区博爱街道文明中路2号",
    "city": "海口",
    "hint": "11月3日入住、11月6日退房，共3晚。注意是文明中路店，不是解放西路9号的另一家骑楼老街店。11月6日06:45出发，仍留60分钟到美兰机场的交通预算。",
    "source": "https://hotels.ctrip.com/hotels/134777036.html",
    "phone": "0898-36653688"
  },
  "wnstay": {
    "name": "睿悦度假酒店（万宁神州半岛店）",
    "address": "万宁市东澳镇神州半岛阿拉莫纳小镇Z1-5栋101号",
    "city": "万宁",
    "hint": "已按你确定的酒店更新，11月1日入住、11月3日退房，共2晚。打车选酒店前台/大堂；15:00前抵达先询问寄存，去石梅湾另留45—60分钟交通预算。",
    "source": "https://hotels.ctrip.com/hotels/124793743.html"
  },
  "syhotel": {
    "name": "三亚国光豪生度假酒店",
    "address": "三亚市天涯区三亚湾路188号",
    "city": "三亚",
    "hint": "按你提供的酒店安排10月29、30、31日共3晚。酒店大堂和滨海出口不是同一入口；打车选酒店大堂。",
    "source": "https://www.amap.com/place/B038300ZLG",
    "userLink": "https://j.map.baidu.com/7f/zxd"
  },
  "systation": {
    "name": "三亚站",
    "address": "三亚市吉阳区育秀路三亚站",
    "city": "三亚",
    "hint": "铁路三亚站，不是凤凰机场站、亚龙湾站；请按票面站名核对上下车。",
    "source": ""
  },
  "sybay": {
    "name": "三亚湾（国光豪生对面海边）",
    "address": "三亚市天涯区三亚湾路188号酒店对面海岸",
    "city": "三亚",
    "hint": "同一段海岸可完成三亚湾看海和椰梦长廊氛围体验，不把两个名字拆成两趟车。过街按酒店指定通道。",
    "source": "",
    "approx": true
  },
  "coconut": {
    "name": "椰梦长廊",
    "address": "三亚市天涯区三亚湾路滨海带",
    "city": "三亚",
    "hint": "线性景观而非单一机位，主线只走酒店对面一段；想拍特定椰林照片需另确认入口。",
    "source": "",
    "approx": true
  },
  "tianya": {
    "name": "天涯小镇",
    "address": "三亚市天涯区马岭社区天涯小镇",
    "city": "三亚",
    "hint": "车停小镇可进车路口，再步行下海边街巷；不要把天涯小镇与收费景区天涯海角混淆。",
    "source": ""
  },
  "haitang": {
    "name": "海棠广场",
    "address": "三亚市海棠区海棠湾海棠广场",
    "city": "三亚",
    "hint": "海棠湾岸线只安排公共广场附近短停，不穿越酒店私人通道；看海不默认下水。",
    "source": ""
  },
  "sycdf": {
    "name": "cdf三亚国际免税城C区",
    "address": "三亚市海棠区海棠北路118号国际免税城C区全球美妆广场",
    "city": "三亚",
    "hint": "10月30日14:00修丽可活动按你提供的信息保留，未独立核实当期公告、店内楼层与入场资格。提前到C区问服务台，别只定位A区总入口。",
    "source": "https://www.cdfg.com.cn/4340/4340.html",
    "phone": "0898-96656"
  },
  "forest": {
    "name": "亚龙湾热带天堂森林公园游客中心",
    "address": "三亚市吉阳区六盘路红霞岭亚龙湾热带天堂森林公园",
    "city": "三亚",
    "hint": "上车点选游客中心/购票入口，不直接导航园内山顶；入园、观光车及单项票分别看当天购票页。",
    "source": "https://www.amap.com/place/B0FFIDDC29"
  },
  "yalong": {
    "name": "亚龙湾公共沙滩",
    "address": "三亚市吉阳区亚龙湾国家旅游度假区公共沙滩入口",
    "city": "三亚",
    "hint": "公共沙滩入口按导航和现场开放选择，不把酒店大堂当公共入口。此处先定位片区，不能冒充某家酒店沙滩门。",
    "source": "https://www.syyalongbay.cn/about.html",
    "approx": true
  },
  "dadong": {
    "name": "大东海旅游区",
    "address": "三亚市吉阳区大东海旅游区海韵路/海花路附近公共入口",
    "city": "三亚",
    "hint": "原清单保留为短停或可删减点；不为再看一片沙滩推迟回酒店。",
    "source": "",
    "approx": true
  },
  "wuzhidock": {
    "name": "蜈支洲岛旅游区游客中心",
    "address": "三亚市海棠区海棠湾后海村蜈支洲岛陆上游客中心",
    "city": "三亚",
    "hint": "陆上码头：先查通航与票面，再排队登船；不要把目的地填成海里的岛中心让打车导航失效。",
    "source": "https://www.wuzhizhou.com/ticket/"
  },
  "wuzhi": {
    "name": "蜈支洲岛",
    "address": "三亚市海棠区蜈支洲岛",
    "city": "三亚",
    "hint": "只用船到达，岛内按官方开放路线走；部分环岛路仅允许观光车，不画成可步行的路线。",
    "source": "https://www.wuzhizhou.com/islandStyle/detail_11662.html",
    "offshore": true
  },
  "shimei": {
    "name": "石梅湾沙滩",
    "address": "万宁市礼纪镇石梅湾旅游度假区公共沙滩",
    "city": "万宁",
    "hint": "石梅湾与石梅湾沙滩合并游玩；从书屋附近已开放公共通道进入，不穿越不开放酒店区域。",
    "source": "",
    "approx": true
  },
  "book": {
    "name": "凤凰九里书屋",
    "address": "万宁市礼纪镇海田路华润石梅湾九里文化海湾",
    "city": "万宁",
    "hint": "主线先到书屋，再从公共通道走海滩；营业和活动以当日为准。",
    "source": "https://www.nationalreading.gov.cn/ydkj/202605/t20260526_991159.html"
  },
  "wnview": {
    "name": "石梅湾观海亭",
    "address": "万宁市礼纪镇石梅湾滨海旅游公路观海亭",
    "city": "万宁",
    "hint": "与海口观海台不是同一个点。先到公路安全停车/落客点，再走台阶；上车请回安全位置。",
    "source": "https://you.ctrip.com/sight/wanning846/145086980.html",
    "approx": true
  },
  "botanic": {
    "name": "兴隆热带植物园",
    "address": "万宁市兴隆镇223国道兴隆热带植物园",
    "city": "万宁",
    "hint": "按“兴隆热带植物园”售检票入口进园，不是热带花园/热带雨林景区。留2小时，与你的生物学兴趣也相合。",
    "source": "https://www.amap.com/place/B076A0LQGP"
  },
  "bali": {
    "name": "巴厘村",
    "address": "万宁市兴隆工业大道1号",
    "city": "万宁",
    "hint": "归侨文化景区，小体量可短逛；如植物园延长，先删这一项，不牺牲下午返程。",
    "source": "https://www.amap.com/place/B076A0030S"
  },
  "xinglong": {
    "name": "兴隆风情街",
    "address": "万宁市兴隆镇温泉大道17号附近",
    "city": "万宁",
    "hint": "中午在兴隆镇解决，咖啡、南洋点心按现场营业选择；不是给某家未核实餐厅背书。",
    "source": ""
  },
  "moon": {
    "name": "万宁兴隆月亮河广场",
    "address": "万宁市明珠路与金日路交叉口西北约200米",
    "city": "万宁",
    "hint": "已找到广场位置，但11月2日赶集/市集未找到可靠公告；只有当天确认有集且顺路才替换巴厘村或午饭后短停。",
    "source": "https://hk.trip.com/travel-guide/attraction/wanning/moon-river-plaza-146102758"
  },
  "ranch": {
    "name": "桥海牧场",
    "address": "万宁市东澳镇神州半岛入口附近桥海牧场",
    "city": "万宁",
    "hint": "牧场是片区入口定位，不保证草地可进入或动物出现。走开放步道，不为拍照闯私人地。",
    "source": "https://news.hainan.net/zixun/2026/07/13/4805767.shtml",
    "approx": true
  },
  "coconutroad": {
    "name": "神州半岛椰林公路",
    "address": "万宁市东澳镇神州半岛沿海椰林道路",
    "city": "万宁",
    "hint": "没有独立门牌；与半岛灯塔路线合并，只在安全步道和可停车处拍照，不停在行车道中央。",
    "source": "",
    "approx": true
  },
  "lighthouse": {
    "name": "神州半岛旅游区-灯塔",
    "address": "万宁市东澳镇神州半岛泰悦居小区旁滨海步道",
    "city": "万宁",
    "hint": "出租车只到许可落客点，最后步行；没有确认当日能否到塔脚，不保证车辆驶入防波堤。",
    "source": "https://www.amap.com/place/B0HDMZSHQR"
  },
  "corona": {
    "name": "科罗娜日落吧",
    "address": "万宁市神州半岛喜来登度假酒店海边沙滩区域",
    "city": "万宁",
    "hint": "也有“科罗纳”写法。以日落吧检索结果和现场通道为准，营业、座位、低消提前问店，不默认是免费公共景点。",
    "source": "https://news.hainan.net/zixun/2026/07/13/4805767.shtml"
  },
  "riyue": {
    "name": "日月湾",
    "address": "万宁市礼纪镇日月湾海门游览区/冲浪片区",
    "city": "万宁",
    "hint": "当天先从海门公共片区开始，午后再决定是否去人工岛一侧；两片之间需另留交通时间。",
    "source": "",
    "approx": true
  },
  "haimen": {
    "name": "海门椰坊",
    "address": "万宁市礼纪镇日月湾海门游览区附近",
    "city": "万宁",
    "hint": "用户收藏名已保留，但当前门店/机位精确位置尚未独立核实。先在日月湾片区搜索，不能拿这个近似位置当店门。",
    "source": "",
    "uncertain": true
  },
  "church": {
    "name": "日月湾融创教堂",
    "address": "万宁市礼纪镇日月湾融创人工岛滨海教堂区域",
    "city": "万宁",
    "hint": "外观打卡点：进入人工岛通行与拍摄区域以当日为准，未核实能否入内；不从海门一路步行硬走过去。",
    "source": "",
    "approx": true
  },
  "wanna": {
    "name": "WANNA WAVE音乐餐酒吧(万宁日月湾店)",
    "address": "万宁市礼纪镇日月湾国家冲浪训练基地1幢1001号（资料线索）",
    "city": "万宁",
    "hint": "地址来自商户目录，营业及午间是否供应正餐需电话/地图确认。放午饭或下午茶，不安排返程日晚间演出。",
    "source": "https://www.sgpabj.com/bendi/wanning/meishi/jiuba/1.html",
    "uncertain": true
  },
  "summer": {
    "name": "夏日冲浪店（收藏名称）",
    "address": "万宁市日月湾冲浪片区，具体门店待确认",
    "city": "万宁",
    "hint": "“夏日冲浪店”也可能指节目/拍摄地，不等于确认营业的店铺。预约前核对店名、教练和课程；不默认已订课。",
    "source": "",
    "uncertain": true
  }
};
