# 扩展与 Codemode 实验

## 实验一：课程工具

执行 `npm start`，然后 `/learn 03`。命令显示人类可读的练习；模型工具 `learning_lesson` 返回结构化课程。工具使用 `exposure: "deferred"`，由工具搜索发现和激活；它也能从 Codemode 调用。[官方扩展文档](https://github.com/earendil-works/pi/blob/v1.0.0/packages/coding-agent/docs/extensions.md)

阅读 `extensions/learning.ts` 的注册代码。把 exposure 暂时改成 `direct`，执行 `/reload`，观察工具声明如何变化；完成后恢复配置。参数只接受 `01` 到 `08`，工具结果声明 `outputSchema` 并返回 `structuredContent`。

## 实验二：组合调用

让 Pi 执行 `examples/lesson-summary.js`。这段脚本并发读取三个课程，再仅输出编号和标题。`Promise.allSettled` 能保留成功调用的结果并单独报告失败。

Codemode 使用 QuickJS，外部操作经工具进行；它没有 Node.js 文件系统 API。只有脚本输出进入模型，但已执行的工具副作用不会因脚本失败而回滚。[官方 Codemode 文档](https://github.com/earendil-works/pi/blob/v1.0.0/packages/coding-agent/docs/codemode.md)

练习：改为输出每课问题，测量序列化后的字符数。字符数不是 token 数，若要比较成本，另外记录模型用量。

## 实验三：真实 CLI 输出

使用已配置的模型执行：

```bash
mkdir -p artifacts
npm exec -- pi --extension ./extensions/learning.ts --tools read --print "读取 src/lessons.ts，列出课程标题"
npm exec -- pi --extension ./extensions/learning.ts --tools read --mode json "读取 src/lessons.ts，列出课程标题" > artifacts/events.jsonl
```

`--tools` 是本次工具白名单，也会排除未列出的延迟工具。主启动命令通过 `.pi/settings.json` 的 `defaultTools` 增量启用 `codemode` 与 `tool_search`，保留 `read`，关闭 `bash`、`edit`、`write`；这保留了延迟工具的可发现性。项目设置需要通过 Pi 的项目信任检查。官方说明见 [CLI 文档](https://github.com/earendil-works/pi/blob/v1.0.0/packages/coding-agent/docs/cli.md)。实验输出默认被 Git 忽略。

## 验证与局限

测试用捕获注册的工具验证 schema，并模拟一次失败验证摘要逻辑。它不覆盖真实模型选择、Pi 的工具搜索排序或 QuickJS 沙箱。运行 `/learn` 与实际模型工具调用后，在学习日志中补充结果。
