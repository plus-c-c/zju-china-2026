// Keep manuscript spellings intact, including variants awaiting verification.
// Match known people rather than treating every capitalized phrase as a name.
const names = [
  "Xuan Ge",
  "XuanGe",
  "Yue Wang",
  "YueWang",
  "Yu Xu",
  "YuXu",
  "Fangrui Liang",
  "FangruiLiang",
  "Grandpa Gu",
  "Huang Jun",
  "Qiu Xiaoming",
  "Li Zhiguo",
  "Ren Bo",
  "Zhang Yumei",
  "Xue Han",
  "XueHan",
  "Ouyang Hongwei",
  "Songlin Shi",
  "Patrick Butaye",
  "Huang Wenwen",
  "Wenwen Huang",
  "Yi Junzhi",
  "Lin Si'en",
  "Sien Lin",
  "Sze Yan Lam",
  "Li Xiaoming",
  "Wu Congjun",
  "Congjun Wu",
  "Hong Yi",
  "Ma Guanghui",
  "Chen Ming",
  "Ming Chen",
  "Lin Lei",
  "Zhou Hong",
  "Hong Zhou",
  "Lei Zhang",
  "Wu Jialin",
  "Sun Yuxuan",
  "Zhang Li",
  "Li Zhuoya",
  "Wang Feifan",
  "Zhang Jie",
  "Erik Forsberg",
  "Li Jianqin",
  "Zhang Binghong",
  "Mavis Wu",
  "Mavis",
  "Chen Yihua",
  "Li Yongshi",
  "Chan Yik-wa",
  "Lai Wing-sze",
  "David Lam Chit-huen",
  "Lam Chit-huen",
  "Lam Cheuk-huen",
  "Lam Chit-yuen",
  "David Lam Tzit-yuen",
  "Yang Shen",
  "Chen Xi",
  "Chen Bohang",
  "Bai Shunong",
  "Kleinman",
  "Carel",
  "Kidd",
];

const fullNames = names
  .sort((a, b) => b.length - a.length)
  .map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
  .join("|");
const title = "(?:Dr\\.|Prof\\.|Professor|Teacher|Ms\\.|Mr\\.|Hon\\.|Nurse)";
const surnames = "Butaye|Chen|Huang|Li|Lin|Ma|Ouyang|Shen|Wu";
const personPattern = new RegExp(
  `\\b(?:(?:${title}\\s+)?(?:${fullNames})|${title}\\s+(?:${surnames}))\\b`,
  "g",
);

/** Emphasize people in interview prose without changing text or stored data. */
export function StakeholderText({ children }: { children: string }) {
  const parts = [];
  let end = 0;
  for (const match of children.matchAll(personPattern)) {
    const start = match.index;
    parts.push(children.slice(end, start));
    parts.push(<strong key={start}>{match[0]}</strong>);
    end = start + match[0].length;
  }
  parts.push(children.slice(end));
  return <>{parts}</>;
}
