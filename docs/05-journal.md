# 学习日志

状态：基础项目、DeepSeek 真实模型工具实验已完成；MCP、模型路由、缓存预热与 Durable 进阶实验待完成。

复制下面模板，为每个阶段追加记录：

```text
日期 / 课程编号：
Pi 版本 / Node 版本：
本次要验证的假设：
执行命令与配置（去除凭据）：
观察结果 / 输出文件：
我的解释：
仍未验证的部分：
下一次实验：
```

## 项目初始化验证

- 2026-10-10：本地 `npm run verify` 通过，2 个测试全部通过。
- `npm run pi:version` 输出 `1.0.0`；`npm run lessons -- 03` 正常展示课程。
- 测试通过 Pi 1.0 的真实 loader 加载扩展，确认命令和工具注册；同时检查输出 schema、非法编号与部分调用失败的处理。
- GitHub Actions 已验证 Node 22.19.0 下的依赖安装、类型检查、测试与 Pi 版本。

## DeepSeek 真实实验（2026-10-10）

- 使用 Pi 1.0.0 与 `deepseek-flash`，Key 保存在仓库之外的个人 Pi 配置中。
- 首次实验发现 `--tools codemode,tool_search` 白名单会排除课程工具，工具搜索未命中。
- 改用 `.pi/settings.json` 的 `defaultTools` 增量配置后，搜索成功加载 `learning_lesson`。
- Pi 的实际 Codemode 运行时并发读取 03、04、06，三个嵌套调用状态均为 `ok`，返回预期编号和标题。
- 原始 JSONL 留在本地 `artifacts/deepseek-smoke.jsonl`，不上传到仓库。
- 本次验证不覆盖 MCP、虚拟模型、Anthropic 缓存预热或 Durable 恢复。
