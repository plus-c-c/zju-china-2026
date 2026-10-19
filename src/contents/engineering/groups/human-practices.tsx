import type { Group } from "../group";
import type { SeedCycle, SeedModule } from "../seed";

/**
 * Human Practices groups — the SEED framework (Integrated Human Practices
 * toolbox). Each chapter of the IHP manuscript is one group; each cycle of
 * the chapter is one sub-module whose steps follow
 * Spark → Explore → Engineering & Implementation → Dialogue. The
 * Engineering & Implementation step is where the DBTL cycle runs; the
 * nested ring lights up on that step.
 *
 * PROVISIONAL: the phase texts below are condensed from the draft
 * `Integrated Human Practices.md` (still being written — several phases are
 * placeholders and the final English copy will replace the Chinese draft).
 */

const todo = (
  <p>
    <em>（待补充）</em>
  </p>
);

const cycle = (
  title: string,
  Spark: SeedCycle["content"]["Spark"],
  Explore: SeedCycle["content"]["Explore"],
  Engineering: SeedCycle["content"]["Engineering"],
  Dialogue: SeedCycle["content"]["Dialogue"],
): SeedCycle => ({
  title,
  content: { Spark, Explore, Engineering, Dialogue },
});

const module = (title: string, ...cycles: SeedCycle[]): SeedModule => ({
  title,
  cycles,
});

/* ------------------------------------------------------------------ */
/* Chapter 1 — Need-led Discovery                                     */
/* ------------------------------------------------------------------ */

const realWorldNeed = module(
  "Real-world need",
  cycle(
    "Cycle 1 — Real-world cases versus sparse medical records",
    <p>
      在我们团队成员一次急性软骨损伤后，我们对透明软骨损伤产生了兴趣：它可能导致骨关节炎、局部创伤性缺损和术后适应性缺损等多种情况，但现实病例与医疗系统记载之间存在明显矛盾。
    </p>,
    <p>
      我们在大学社区（约 150 份）、杭州市拱墅区七古登街道、西湖区三墩镇、天津市南开区水上西街道（共约 1200 份）以及中文互联网平台（小红书、CDM 病友群，约 300 份）开展问卷调查：有过相关经历（含认识的患者）的人群占 23.8%。大学生以局部创伤性缺损为主，社区中的 OA 集中在老年人，互联网平台对 OA 和术后损伤的讨论较多。
    </p>,
    <p>
      我们将调研结论整理为 PRD 文档，交接给工程部门作为设计依据。
    </p>,
    todo,
  ),
);

const clinicalControversy = module(
  "Clinical controversy",
  cycle(
    "Cycle 1 — Disagreement in the clinic",
    <p>
      医疗界对软骨损伤存在争议：诊断标准不统一，早期软骨损伤容易被忽视。
    </p>,
    <p>
      文献中并没有权威依据指导何种程度的软骨缺损可以算作疾病程度；即使是标准相对最完善的 OA，在美国和中国的权威治疗标准中也没有统一的判定标准。不同地区、不同身份的医生对同一种软骨缺损的诊断也不一致；术后损伤中，骨科手术的成功衡量标准忽视了对人工材料威胁软骨健康的评估（髌骨手术术后软骨磨损患者 yue 的深度访谈）。
    </p>,
    todo,
    todo,
  ),
);

const patientExperience = module(
  "Patient experience",
  cycle(
    "Cycle 1 — Patients themselves overlook cartilage health",
    <p>患者自身也在忽视软骨健康。</p>,
    <p>
      一方面，患者得到“无需治疗”的诊断后，会刻意忽视自己的疼痛情况、合理化病症；另一方面，部分患者（尤其是老年患者）就医意愿较低，偏远地区还存在就医不便的问题（浙江省岩坦村顾爷爷的案例）。
    </p>,
    todo,
    todo,
  ),
);

export const needLedDiscoveryGroup: Group = {
  label: "Need-led Discovery",
  flavor: "seed",
  lead: (
    <p>
      NEST 的 iHP 从真实的疼痛出发：广泛问卷、深度访谈与文献调研共同构成了
      Need-led Discovery 阶段。
    </p>
  ),
  outlook: (
    <p>
      我们认为任何合成生物学医疗材料的设计，都应该满足四个价值观：
      <strong>健康</strong>（改善软骨损伤患者的关节健康与生活质量）、
      <strong>共情</strong>（看见疼痛和异物感等容易被忽视的患者体验）、
      <strong>可及</strong>（关注不同年龄、地区和就医条件下的治疗需求）、
      <strong>责任</strong>（依据证据推进研发，审慎考虑安全性与实际影响）。
      我们的项目设计围绕实现这四个价值观的目标。
    </p>
  ),
  parts: [
    { label: "Real-world need", seedModule: realWorldNeed },
    { label: "Clinical controversy", seedModule: clinicalControversy },
    { label: "Patient experience", seedModule: patientExperience },
  ],
};

/* ------------------------------------------------------------------ */
/* Chapter 2 — Evidence-based Co-design                               */
/* ------------------------------------------------------------------ */

const selpCycle = module(
  "SELP scaffold",
  cycle(
    "Cycle 1 — SELP",
    <p>
      基于背景调查，我们希望设计一款能够治愈广泛透明软骨缺损的材料。第一步是选择一种能够满足软骨修复复杂需求的填充材料，直接填补缺损、立刻减少患者疼痛。我们将第一版 SELP 设计稿（只涵盖固定 2KY5、2KY10、2KY16
      的蛋白设计）呈现给研究者和医生；医生认为手肘、膝盖等不同部位的软骨受力不同、所需强度不同，只做一种强度的材料无法达到广泛性施用的目标。
    </p>,
    <p>
      我们调研发现，可以调控 2KY 系列蛋白的重复次数来改变材料的强度和韧度；随着重复数增大，孔径变小、细胞黏附性上升，更有利于 GAG 生成、自身软骨生长和抗炎因子水平上调，也可以适应不同免疫能力、缺损程度的病人。我们决定找到编程化序列蛋白的方法，并用建模工作帮助我们确定水凝胶的最终性质。
    </p>,
    <p>
      我们进入 SELP 的 <strong>DBTL 循环</strong>
      。为了更好实现 SELP 作为广泛缺损填充材料所需要的复杂功能，我们在实验层面产生诸多问题，积极地与多位利益相关者展开了讨论（见
      Engagement Timeline）。
    </p>,
    <p>
      我们又给医生和研究者看了我们最新的设计，他们给出了比较积极的反馈。后续的实验证明了我们设计的可靠性。
    </p>,
  ),
);

const linkerCycle = module(
  "Linker system",
  cycle(
    "Cycle 1 — Linker System",
    <p>
      经过文献调研，单填补缺损是不够的。为了更好贴合不同临床病症微环境的修复需求，我们希望添加与治疗相关的功能模块；而大分子量的功能模块如果直接插入分子内部，会对
      SELP 蛋白正常功能产生较大影响，因此我们希望选择蛋白接头进行扩展型设计。我们一开始选择了主流的
      SpyTag 和 SnoopTag 接头系统，通过蛋白建模发现接头分子量太大，功能短肽结构域会被掩盖。
    </p>,
    <p>
      我们询问利益相关者，其中一位研究员建议可以用 SnoopLigase 作为我们的
      linker 系统。
    </p>,
    <p>
      我们通过建模工作改造酶、提升连接效率，并对 SnoopLigase
      系统进行迭代，创新性地形成了 <strong>SnoopLigase-ZJU</strong>{" "}
      系统，大幅提升工作效率，保证接头系统高效运行。
    </p>,
    <p>我们给医生和研究者看了我们的设计，他们表示赞同。</p>,
  ),
);

const functionalCycle = module(
  "Functional modules",
  cycle(
    "Cycle 1 — Functional module",
    <p>
      在设计好可编程平台后，我们选择 OA 作为 NEST
      系列材料的第一个具体应用病症，进行针对 OA
      的模块化搭载。我们希望材料符合临床需求，因此询问了医生。
    </p>,
    <p>
      在与医生谈话的过程中我们了解到，骨关节炎所处的封闭微环境很容易形成局部力学失衡、GAG
      流失、炎症反应加剧三者的恶性循环。我们广泛阅读文献，发现各向异性这一物理性质可以很好地模拟软骨天然结构，既能承接剪切力，又能保持韧度和弹性，可以阻止三个恶性循环的开端。
    </p>,
    <p>
      在与医生和研究人员商议后，我们设计了磁性纳米颗粒吸附短肽，通过外接磁场吸引
      SELP，实现各向异性排列；还设计了静电吸附原理的 GAG
      保持肽段和满足患者个性化治疗需求的脂质体递送模块，将三个恶性循环模块逐个击破。
    </p>,
    <p>
      我们重新访问了医生和研究者并询问意见。有医生认为我们的材料太复杂，实际应用可能引起医生的担心，在上市审批阶段可能面临困难——这让我们更加审慎地面对材料的安全问题。此外，我们比对问卷收集的患者需求，确保可编程模块可以覆盖几乎所有情况的病人。
    </p>,
  ),
);

export const evidenceBasedCoDesignGroup: Group = {
  label: "Evidence-based Co-design",
  flavor: "seed",
  lead: (
    <p>
      Co-design 阶段围绕 SELP 骨架、Linker 系统与功能模块展开三轮 SEED
      循环：每一轮都由利益相关者的反馈推动迭代。
    </p>
  ),
  parts: [
    { label: "SELP scaffold", seedModule: selpCycle },
    { label: "Linker system", seedModule: linkerCycle },
    { label: "Functional modules", seedModule: functionalCycle },
  ],
};

/* ------------------------------------------------------------------ */
/* Chapter 3 — Situated Implementation                                */
/* ------------------------------------------------------------------ */

const hardwareCycle = module(
  "Hardware",
  cycle(
    "Cycle 1 — Hardware design",
    <p>
      为了使我们的项目能够在临床端得到应用，我们设计了一套适配全部生物设计的硬件系统。第一版包括内窥镜、蓝光照射系统二合一的入体式设备和注射器。
    </p>,
    <p>
      我们进入临床场景试验。受访的护士提出 3
      个主要问题：材料的预处理应该在哪里进行？如何使用这套操作系统？系统如何适配医院既有的显示设备？根据这些问题，我们进行了现场调研和排查，并咨询了医疗器械公司，决定增加预混模块、电子说明书和蓝牙连接的组块。
    </p>,
    <p>
      结合 wet lab 的蛋白纯化设计，我们开展硬件的迭代，最终得到了广泛适配不同规格手术室的一体化硬件。
    </p>,
    <p>
      为了让设备使用符合用户使用习惯，我们寻找 254
      医院的急诊病房护士组和医学院的学生进行了不同方案的评测，最终选出一款得分最高的方案，该方案也得到利益相关者的认可。
    </p>,
  ),
);

const manufacturingCycle = module(
  "Manufacturing",
  cycle(
    "Cycle 1 — Factory production",
    <p>
      我们希望我们的材料能够进行工厂化生产，并与北京微欣康公司商讨样本生产的相关事宜。他们对我们提出了合作邀请，并建议我们考虑材料在蛋白纯化、产品运输和存储的设计。
    </p>,
    <p>
      我们对已经上市的水凝胶的蛋白提取、纯化和药品运输方式进行了文献调研，最终决定做成蛋白粉包装成药剂进入医院。我们探访了一家成熟的合成生物学原料生产公司——元一生物，学习了更多实用场景下的知识。
    </p>,
    todo,
    <p>
      我们对微欣康又做了访谈，并且得到了工程师的认可，成功与他们签订了样品合作协议。
    </p>,
  ),
);

const entrepreneurshipCycle = module(
  "Entrepreneurship",
  cycle(
    "Cycle 1 — Entrepreneurship and market access",
    <p>
      NEST
      作为一款进入人体的医疗材料，我们必须更加审慎地对待产品安全，接受市场准入的诸多考察。我们对准入流程、市场情况和销售通路有很多疑惑；在简单的成本测算后，我们的前期投入巨大、无法避免，这决定了我们要有前期的资金支持。
    </p>,
    <p>
      带着这些问题，我们广泛地寻找利益相关者，涵盖生产、销售、政府监管、金融、创业指导多个环节，并且得到了有效的建议。
    </p>,
    <p>
      我们在设计中更加看重成本层面的考虑，建立了细致的商业模型，寻找了 CDMO
      合作方，参与多次创业活动并成功拿下第一笔意向投资。更多信息可见
      Entrepreneurship 页面。
    </p>,
    <p>
      每一次商业模式的修改和迭代，我们都会与相应利益相关者协商反馈，直到得到我们团队内部和利益相关者的一致认同。最终，投资机构的认可也证明了我们项目创业的可行性。
    </p>,
  ),
);

export const situatedImplementationGroup: Group = {
  label: "Situated Implementation",
  flavor: "seed",
  lead: (
    <p>
      Implementation
      阶段把设计放进真实的临床、生产与市场场景：硬件、工厂化生产与创业准入三轮循环分别回应了不同场景中的需求。
    </p>
  ),
  parts: [
    { label: "Hardware", seedModule: hardwareCycle },
    { label: "Manufacturing", seedModule: manufacturingCycle },
    { label: "Entrepreneurship", seedModule: entrepreneurshipCycle },
  ],
};

/* ------------------------------------------------------------------ */
/* Chapter 4 — Trust and Lasting Impact                               */
/* ------------------------------------------------------------------ */

const commercializationCycle = module(
  "Commercialization",
  cycle("Cycle 1 — 持续的商业化进程", todo, todo, todo, todo),
);

const neglectedPainCycle = module(
  "Neglected pain",
  cycle("Cycle 1 — 被忽视的疼痛", todo, todo, todo, todo),
);

const educationCycle = module(
  "SynBio education",
  cycle("Cycle 1 — 合成生物学教育贡献", todo, todo, todo, todo),
);

export const trustAndLastingImpactGroup: Group = {
  label: "Trust and Lasting Impact",
  flavor: "seed",
  parts: [
    { label: "Commercialization", seedModule: commercializationCycle },
    { label: "Neglected pain", seedModule: neglectedPainCycle },
    { label: "SynBio education", seedModule: educationCycle },
  ],
};

/** All Human Practices groups, in chapter order. */
export const humanPracticesGroups: Group[] = [
  needLedDiscoveryGroup,
  evidenceBasedCoDesignGroup,
  situatedImplementationGroup,
  trustAndLastingImpactGroup,
];
