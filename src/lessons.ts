export const lessons = [
  { id: "01", title: "定位与最小核心", question: "哪些能力属于 harness，哪些适合交给扩展？", task: "画出模型、agent loop、工具和用户界面之间的数据流。", source: "README.md" },
  { id: "02", title: "CLI 与会话", question: "同一任务在 interactive、print、JSON 和 RPC 下如何消费结果？", task: "用一个小型只读任务比较输出，保存到 artifacts/。", source: "packages/coding-agent/docs/cli.md" },
  { id: "03", title: "扩展与延迟工具", question: "注册、可调用和暴露给模型是同一件事吗？", task: "运行 /learn 03，再让模型用 tool_search 查找 learning_lesson。", source: "packages/coding-agent/docs/extensions.md" },
  { id: "04", title: "Codemode", question: "脚本过滤结果怎样改变进入模型的上下文？", task: "执行 examples/lesson-summary.js，比较完整记录与标题摘要的大小。", source: "packages/coding-agent/docs/codemode.md" },
  { id: "05", title: "MCP", question: "MCP 连接和工具 exposure 分别解决什么问题？", task: "选一个自己的 MCP 服务，记录连接状态和搜索到的工具，不保存凭据。", source: "packages/coding-agent/docs/mcp.md" },
  { id: "06", title: "虚拟模型", question: "selected model 和 dispatched model 为什么需要区分？", task: "设计按难度路由的表，补充 continuation 与 retry 的保持策略。", source: "packages/coding-agent/docs/virtual-models.md" },
  { id: "07", title: "上下文与缓存", question: "工具或 system prompt 变化后，如何保持会话可解释？", task: "阅读会话记录中的 system 变化；测量 cache warming 开关前后的用量。", source: "packages/coding-agent/docs/extensions.md" },
  { id: "08", title: "Pi Durable", question: "跨进程恢复与模型对话记录的职责有什么区别？", task: "沿官方 README 找到最小示例，记录持久化、重启、恢复的步骤和实际结果。", source: "packages/durable/README.md" }
] as const;

export function getLesson(id: string) {
  const lesson = lessons.find((item) => item.id === id);
  if (!lesson) throw new Error(`未知课程 ${id}；有效编号为 01–08`);
  return lesson;
}

export const upstream = "https://github.com/earendil-works/pi/blob/v1.0.0/";
