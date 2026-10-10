# 源码阅读地图

固定阅读 [v1.0.0 源码树](https://github.com/earendil-works/pi/tree/v1.0.0)。本项目锁定 CLI；不同包的职责可从 [上游 README](https://github.com/earendil-works/pi/blob/v1.0.0/README.md) 开始核对。

| 包 | 阅读目标 |
| --- | --- |
| `pi-ai` | 找出统一模型接口怎样连接不同 provider |
| `pi-agent-core` | 跟踪一次工具调用到后续模型请求 |
| `pi-coding-agent` | 从 CLI 入口追踪扩展注册、工具发现与会话保存 |
| `pi-tui` | 查看终端输入与渲染如何分离 |
| `pi-durable` | 从 README 进入状态与恢复相关接口 |
| `chord` | 结合 Durable 示例研究服务组合 |

## 进阶练习：路由

虚拟模型选择每次请求实际使用的物理模型。先研究 `registerVirtualModel()` 与 `route()`。`previous` / `failed` 可用于保持 continuation / retry 的模型选择；路由状态跟随会话分支。[虚拟模型文档](https://github.com/earendil-works/pi/blob/v1.0.0/packages/coding-agent/docs/virtual-models.md)

设计：普通问题使用模型 A，复杂问题使用模型 B。写出包含模型不可用、请求失败、上下文过长的决策表，再用自己的 provider 和实际模型 ID 实现。不要将某个供应商的模型名称直接当作通用配置。

## 进阶练习：MCP 与恢复

先阅读 [MCP 配置文档](https://github.com/earendil-works/pi/blob/v1.0.0/packages/coding-agent/docs/mcp.md)，选自己的服务，记录连接失败和工具搜索的表现。服务配置包含个人认证信息时放在个人配置中。

之后按 [Durable README](https://github.com/earendil-works/pi/blob/v1.0.0/packages/durable/README.md) 的最小示例建立单独实验目录。官方将它作为长期会话、任务和文档的运行时。制定“完成一步 → 停止进程 → 重启 → 查看状态”的实验；额外测试重复提交会不会重复执行操作。本仓库不宣称实现了 Durable。
