# Team ZJU-China 2026 Wiki

iGEM 2026 ZJU-China 队的 wiki 源码（React + TypeScript + Vite）。本仓库除网站页面外，也用于介绍团队的两个软件项目；两个项目的完整源码托管在 iGEM Software 仓库：<https://gitlab.igem.org/2026/software/zju-china/nest>。

## 项目一：SELP Molecular Dynamics Simulation Platform

面向研究者与材料开发者的分子模拟平台，把 SELP 水凝胶从序列到力学性质的模拟组织成一条可查看、可修改的流水线。

- **三步流水线**：TIGER2 全原子模拟（NAMD，含 DCD → CG 起点结构转换）→ GROMACS 粗粒化交联网络与杨氏模量（Martini 3）→ 磁力学复合模量（本地计算）
- **交互方式**：参数面板、运行控制与结果图表集中在同一页面；模板一键建链，产物自动传递，无需手工拷贝文件
- **技术栈**：React 19 · TypeScript · Vite；Node.js · Express；NAMD · GROMACS · MATLAB
- **代码**：[SELP-Molecular-Dynamics-Simulation-Platform](https://gitlab.igem.org/2026/software/zju-china/nest/-/tree/main/SELP-Molecular-Dynamics-Simulation-Platform)（GitHub 镜像：<https://github.com/plus-c-c/igem-2026-software>）

## 项目二：NEST Software

面向医生、护士与临床操作人员的 Android 应用，把材料选型与床旁配制转化为可逐步确认的流程。

- **预订下单**：选择预制 SELP 支架（2KY-5-Tag / 2KY-10-Tag，SnoopTag2 停靠位点）与功能模块（线粒体治疗、磁响应各向异性、GAG 保留）
- **操作说明**：四步向导——扫描二维码 → 总体说明书 → 放入试剂（PBS → SELP → Ru/SPS → 功能模块）→ 预混指引
- **技术栈**：Kotlin · Jetpack Compose（Material 3）；CameraX · ZXing；英文界面
- **代码**：[NEST-Software](https://gitlab.igem.org/2026/software/zju-china/nest/-/tree/main/NEST-Software)（GitHub 镜像：<https://github.com/plus-c-c/igem-2026-app>）

## 本仓库

- 页面内容位于 `src/contents/`，页面路由在 `src/pages.ts`
- 本地开发：Node.js ≥ 20.19（推荐 22 LTS）→ `yarn install` → `yarn run dev`
- 提交到 `main` 后由 CI 自动构建并部署；图片、字体等静态资源按 iGEM 要求存放于 `static.igem.wiki`
- 预览：<https://plus-c-c.github.io/igem-zju-china-2026/>
