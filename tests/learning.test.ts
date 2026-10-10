import assert from "node:assert/strict";
import { test } from "node:test";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";
import { Compile } from "typebox/compile";
import { fileURLToPath } from "node:url";
import { loadExtensions } from "../node_modules/@earendil-works/pi-coding-agent/dist/core/extensions/loader.js";

async function captureTool() {
  const root = fileURLToPath(new URL("../", import.meta.url));
  const loaded = await loadExtensions([`${root}extensions/learning.ts`], root);
  assert.deepEqual(loaded.errors, []);
  assert.equal(loaded.extensions.length, 1);
  assert.ok(loaded.extensions[0].commands.has("learn"));
  const tool = loaded.extensions[0].tools.get("learning_lesson")?.definition;
  assert.ok(tool);
  return tool;
}

test("延迟工具返回符合声明的数据，并拒绝未知课程", async () => {
  const tool = await captureTool();
  assert.equal(tool.exposure, "deferred");
  const execute = (id: string) => tool.execute("test", { id }, undefined, undefined, {} as never);
  const result = await execute("03");
  assert.ok(tool.outputSchema);
  assert.equal(Compile(tool.outputSchema).Check(result.structuredContent), true);
  await assert.rejects(execute("../../auth.json"), /未知课程/);
});

test("摘要脚本保留成功结果并报告单个失败", async () => {
  const source = await readFile(new URL("../examples/lesson-summary.js", import.meta.url), "utf8");
  const outputs: unknown[] = [];
  const tool = await captureTool();
  await runInNewContext(`(async () => { ${source}\n })()`, {
    tools: { learning_lesson: async ({ id }: { id: string }) => {
      if (id === "04") throw new Error("simulated failure");
      return (await tool.execute("test", { id }, undefined, undefined, {} as never)).structuredContent;
    } },
    text: (value: unknown) => outputs.push(value)
  });
  const rows = JSON.parse(JSON.stringify(outputs[0]));
  assert.equal(rows.length, 3);
  assert.equal(rows[0].id, "03");
  assert.match(rows[1].error, /simulated failure/);
  assert.equal(rows[2].id, "06");
  assert.equal(rows[0].task, undefined);
});
