// Pi codemode 输入脚本；不是 Node.js 脚本。在 Pi 中要求模型原样执行本文件。
// @options: {"max_output_tokens": 1000, "timeout_ms": 60000}
const results = await Promise.allSettled(
  ["03", "04", "06"].map((id) => tools.learning_lesson({ id }))
);
text(results.map((result, index) => result.status === "fulfilled"
  ? { id: result.value.id, title: result.value.title }
  : { index, error: String(result.reason) }
));
