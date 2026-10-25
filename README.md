# 海南慢游 · hainan-travel2

GitHub 保存代码，Cloudflare Pages 自动发布。为两位同行者准备的2026年10月29日—11月6日海南手册。

包括：下一项行程和倒计时、海南路线示意图、9天具体时间表、三城酒店、逐段百度地图导航、实景相册、天气入口、自动昼夜主题；另有按昵称区分的物品清单、备忘录、提醒、三餐、记账及照片日记。

**仓库不是已经上线的网址。完成以下发布与数据库配置后，才拥有新的可访问网站和跨手机同步记录。**

## 第一步：用 Cloudflare 发布

1. 注册或登录 https://dash.cloudflare.com/ 。
2. 进入 **Workers & Pages**，选择创建应用，切换到 **Pages**，选择连接 Git / 导入现有 Git 仓库。
3. 授权 GitHub，选择 `Ivyyang-web/hainan-travel2`。
4. 设置：

| 项目 | 填写内容 |
| --- | --- |
| 项目名 | `hainan-travel2`（名称被占用可换） |
| 生产分支 | `main` |
| Framework preset | `None` |
| Build command | `npm run build` |
| Build output directory | `public` |
| Root directory | 留空，使用仓库根目录 |
| 环境变量 | `NODE_VERSION` = `24` |

5. 点击保存并部署。使用 Cloudflare 成功后实际返回的 `https://…pages.dev` 地址，不预先假定名字一定可用。

注意创建的是 **Pages 项目**，不要把 `npm run build` 填到 Worker 的 Deploy command。Pages Functions 在仓库根目录 `functions/` 中，Cloudflare 构建时自动打包；不能只上传 `public/`，否则记录接口不会生效。

第一次部署完成可以浏览攻略；个人记录还需下面的数据库。

## 第二步：开通数据同步（D1）

1. Cloudflare 控制台 → **Storage & databases / 存储与数据库 → D1 SQL Database → Create database**，名称可用 `hainan-travel2-db`。
2. 打开该数据库的 Console / 控制台，将本仓库 `schema.sql` 的全部内容复制并执行。如界面只接受单条语句，就按每个分号分段执行。
3. 回到 Pages 项目 → **Settings → Bindings → Add → D1 database**。
4. 变量名必须为 **`DB`**，数据库选择刚创建的 `hainan-travel2-db`。绑定生产环境；若还需要预览部署的数据，也单独配置预览环境。
5. 保存后重新部署最新提交，使新绑定生效。
6. 打开新网站的 `/api/health`：返回 `ready: true` 才代表绑定和表结构就绪。
7. 两台手机分别打开同一个新网址；输入同一昵称可核对同步，平时各用不同昵称区分自己的东西。

网站不会在数据库未配置时伪造保存成功。

## 照片与免费额度

默认把照片存入同一个 D1 数据库，无需先开通 R2。每篇最多6张，单张压缩后上限512KB；默认整库最多500张照片，达到上限需先整理旧照片。仅相片上限约250MiB，给文本和索引留有空间；这不是对所有账号和用量永久免费或永久可用的承诺。

Cloudflare 的免费 D1 单库上限与每日读写额度由平台政策决定。当前文档标明 Free 单库最大500MB；请在开通时确认自己的套餐和用量。不要为了继续上传自行开启付费服务而不核对账单。

如以后需要大量原图，可选绑定 R2，变量名 `BUCKET`，记录接口会自动使用它；开通条件和计费需另行确认。本版上传仍保持512KB限制。

## 百度地图

地点和逐段导航链接直接打开百度地图，不需要 AK。内嵌交互地图需在百度开放平台申请浏览器端AK、启用JavaScript API，并把实际发布域名填入 Referer 白名单。例如域名为 `your-project.pages.dev` 时填 `your-project.pages.dev`，不带 `https://`。

通过网站“地图设置”输入 AK，仅当前会话使用，不写入仓库或数据库。不要提交服务端SK、Cloudflare API Token或GitHub Token。

## 行程与住宿

- 三亚：国光豪生度假酒店，三亚湾路188号，10月29日入住、11月1日退房，3晚。
- 万宁：睿悦度假酒店（万宁神州半岛店），东澳镇神州半岛阿拉莫纳小镇Z1-5栋101号，11月1日入住、11月3日退房，2晚。
- 海口：海友酒店（海口骑楼老街文明中路店），美兰区博爱街道文明中路2号，11月3日入住、11月6日退房，3晚。

航班和13:21美兰高铁保留用户提供信息，待核实项仍明确标注；长途交通时间是行程预算，以实际票面、实时导航与开放信息为准。天气每次打开或手动刷新查询来源，不假造未覆盖日期的预报。提醒只在打开页面时检查，关闭网页不推送。

## 自动昼夜和更新

自动配色按北京时间06:00—18:00日间、其他时间夜间；导航栏可循环切换自动、日间、夜间。顶部下一项倒计时根据北京时间和当前选用的行程方案计算，点击跳至对应日期。

修改代码并推送到 `main` 后，Cloudflare Git 集成会自动部署。生产网址通常保持不变，但更新需要等待构建成功，各设备刷新后再看到新版本。

## 昵称、数据与旧站

不使用密码；同一个昵称对应同一份记录，知道昵称的人可以查看和修改。它是同行者之间的简便分组，不是隐私认证系统。

原 `chatgpt.site` 网站仍保留。此仓库只含程序和表结构，**未导出原站数据库或个人照片**，发布后也不会自动出现原来填过的记录。需要迁移旧记录时另行导出、导入；不要把真实账本、照片或数据库备份上传到公开仓库。

费用只由支出账本合计，三餐记录不自动生成消费，避免重复计算；所有金额按人民币“分”存储。

## 文件结构

- `public/`：网页、样式、路线、天气和图片。
- `functions/api/`：Cloudflare Pages Functions入口。
- `lib/`：记录、照片日记与D1照片存储逻辑。
- `schema.sql`：首次初始化数据表，使用 `IF NOT EXISTS`，不会清空原表。
- `tests/`：接口、倒计时和9天排程检查。

## 本地检查

Node.js 24，无需 npm 依赖：

```sh
npm test
npm run build
```

已测试昵称记录区分、跨昵称修改拒绝、金额精确合计、D1二进制照片读写/替换/删除、无数据库时不伪造成功、倒计时边界、九天主线与备选排程不重叠。主页进行过浏览器预览；尚未做真实 Cloudflare 生产环境与两台手机端到端验收。

迁移托管不等于保证中国境内所有网络都可访问；上线后请用你们实际手机和运营商网络测试。

## 照片授权和官方资料

景观图片来源、作者及CC BY-SA许可见 `public/scenes/credits.json` 和网页中的图片来源说明。对应许可用于这些照片。

- Pages Git连接：https://developers.cloudflare.com/pages/get-started/git-integration/
- Functions绑定：https://developers.cloudflare.com/pages/functions/bindings/
- D1限制：https://developers.cloudflare.com/d1/platform/limits/
