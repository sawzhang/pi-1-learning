# Pi 1.0 学习实验室

从 [Earendil 的 Pi 1.0 发布文章](https://earendil.com/posts/pi-1-0/) 出发，学习如何理解 agent harness、扩展工具，以及长期任务运行时。中文笔记与练习，附一个真正使用 Pi 扩展 API 的示例。

学习基线：`@earendil-works/pi-coding-agent@1.0.0`，上游 tag `v1.0.0`，commit `a13d35a742c6ef8462812a28fbe1d8c8b7431c32`。核对日期：2026-10-10。这里的学习项目版本为 `0.1.0`。

## 开始

需要 Node.js ≥ 22.19.0。仓库自带精确版本依赖和 lockfile。

```bash
npm ci --ignore-scripts
npm run verify
npm run lessons
npm run lessons -- 03
npm run pi:version
npm start
```

进入 Pi 后，按官方方式使用 `/login` 配置自己的模型访问，再运行 `/learn` 或 `/learn 03`。CLI 学习目录及测试不需要模型凭据。`npm start` 显式加载本仓库扩展；若 Pi 提示项目信任，请阅读项目文件后按界面操作。

向 Pi 输入：

```text
用 tool_search 搜索 learning_lesson，读取课程 03，解释 deferred 工具与 direct 工具的区别。
```

接着输入：

```text
读取 examples/lesson-summary.js，使用 codemode 原样执行它，展示摘要，并解释为什么只返回标题。
```

## 项目导航

| 内容 | 入口 |
| --- | --- |
| 发布文章要点 | [文章笔记](docs/01-release.md) |
| 八个阶段的任务与验收 | [学习路线](docs/02-roadmap.md) |
| 可执行扩展与 Codemode 实验 | [实验说明](docs/03-labs.md) |
| 源码阅读与进阶方向 | [源码地图](docs/04-source-map.md) |
| 学习记录模板 | [学习日志](docs/05-journal.md) |
| 官方文档与版本依据 | [资料来源](docs/sources.md) |

扩展 `extensions/learning.ts` 提供 `/learn` 命令和 `learning_lesson` 延迟工具。数据来自 `src/lessons.ts`，同时供终端目录使用。它只读取内置课程，不写磁盘，不调用模型。`examples/lesson-summary.js` 是运行在 Pi Codemode 中的脚本，需要 Pi 提供的 `tools` 与 `text`。

## 验证边界

`npm run verify` 检查 TypeScript 类型、Pi 实际扩展加载、工具结果 schema、非法课程编号，以及摘要脚本在部分调用失败时的行为。扩展加载测试使用锁定版本的内部 loader；升级 Pi 时需要核对这个接口。脚本测试使用 Node VM 注入工具进行逻辑验证；VM 不是 Pi 的 QuickJS 运行时，也不是安全隔离方案。真实模型、MCP 服务、缓存计费、路由和 Durable 恢复实验需要按路线自行完成，并在日志中保存证据。

模型访问可能产生费用。凭据使用个人配置或环境变量；本仓库不保存认证文件、会话记录或实验输出。MIT 许可证仅适用于本仓库原创内容，上游代码与文档遵循各自许可证。
