# DeepSeek 实验

Pi 1.0 支持 DeepSeek 原生 provider，可以在 `/login deepseek` 中填写个人 Key，或通过 `DEEPSEEK_API_KEY` 环境变量提供。不要把真实 Key 写进项目文件。[Pi provider 文档](https://github.com/earendil-works/pi/blob/v1.0.0/packages/coding-agent/docs/providers.md)

```bash
npm exec -- pi --list-models deepseek
npm start -- --provider deepseek --model deepseek-flash
```

这里的 `deepseek-flash` 已于 2026-10-10 实际调用成功；后续以自己的模型目录为准。[DeepSeek 官方接口文档](https://api-docs.deepseek.com/)

## 复现实验

以下命令信任本仓库的配置和扩展，关闭个人扩展发现和其他上下文资源，不保存 Pi 会话。仅在阅读本仓库代码后使用 `--approve`。

```bash
mkdir -p artifacts
npm exec -- pi --approve \
  --provider deepseek --model deepseek-flash --thinking off \
  --no-session --no-context-files --no-skills --no-prompt-templates \
  --no-extensions --extension builtin:codemode --extension builtin:tool-search \
  --extension ./extensions/learning.ts --mode json --print \
  '先用 tool_search 搜索 learning_lesson，再用 codemode 通过 Promise.allSettled 并发调用 tools.learning_lesson 读取编号 03、04、06；只用 text 输出编号和标题的数组。完成后用中文简短报告结果，不调用其他工具。' \
  > artifacts/deepseek-smoke.jsonl
```

预期：搜索加载一个课程工具，Codemode 中三个调用均成功，输出 03「扩展与延迟工具」、04「Codemode」、06「虚拟模型」。应检查事件中的 `isError` 与嵌套调用状态，不能只看模型声称“成功”。

不要额外添加 `--tools codemode,tool_search`，这个白名单会把课程工具排除。启动依赖已经提交的 `.pi/settings.json` 增量配置；若从其他目录运行，请先回到仓库根目录。

DeepSeek 可以验证扩展、工具发现和脚本组合。Anthropic 缓存预热需要 Anthropic 的认证和模型；MCP 与 Durable 仍需各自的服务及恢复实验。
