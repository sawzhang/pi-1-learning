import { getLesson, lessons, upstream } from "../src/lessons.ts";
try {
  const id = process.argv[2];
  if (!id) console.log(lessons.map((item) => `${item.id} ${item.title}`).join("\n"));
  else {
    const lesson = getLesson(id);
    console.log(`${lesson.title}\n问题：${lesson.question}\n练习：${lesson.task}\n来源：${upstream}${lesson.source}`);
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
