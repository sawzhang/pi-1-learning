import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { Type } from "typebox";
import { getLesson, lessons, upstream } from "../src/lessons.ts";

export default function learning(pi: ExtensionAPI) {
  pi.registerCommand("learn", {
    description: "显示 Pi 1.0 学习目录，或用 /learn 03 查看练习",
    handler: async (args, ctx) => {
      const id = args.trim();
      let output: string;
      try {
        const lesson = id ? getLesson(id) : undefined;
        output = lesson
          ? `${lesson.title}\n${lesson.question}\n练习：${lesson.task}\n${upstream}${lesson.source}`
          : lessons.map((item) => `${item.id} ${item.title}`).join("\n");
      } catch (error) {
        output = error instanceof Error ? error.message : String(error);
      }
      if (ctx.hasUI) ctx.ui.notify(output, "info");
    }
  });

  pi.registerTool({
    name: "learning_lesson",
    label: "学习课程",
    description: "Read a Pi 1.0 learning lesson: question, exercise and official source. IDs 01–08.",
    exposure: "deferred",
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    parameters: Type.Object({ id: Type.String({ pattern: "^0[1-8]$", description: "Lesson ID, 01–08" }) }),
    outputSchema: Type.Object({
      id: Type.String(), title: Type.String(), question: Type.String(), task: Type.String(), source: Type.String()
    }),
    async execute(_toolCallId, { id }) {
      const lesson = getLesson(id);
      const data = { ...lesson, source: `${upstream}${lesson.source}` };
      return {
        content: [{ type: "text", text: JSON.stringify(data) }],
        details: data,
        structuredContent: data
      };
    }
  });
}
