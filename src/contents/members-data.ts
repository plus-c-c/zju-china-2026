// Team-supplied biographies, including updates from the shared repository.
export interface Member {
  id: string;
  name: string;
  nickname?: string;
  role: string;
  group: "leaders" | "students" | "pis" | "advisors";
  bio: string;
  imageUrl?: string;
  imagePosition?: string;
}

export const members: Member[] = [
  {
    id: "sun-yuxuan",
    name: "Yuxuan Sun",
    role: "Protein Modeling",
    group: "students",
    bio: "Hi everyone! I’m Yuxuan Sun, a junior majoring in clinical medicine, and I’m responsible for protein modeling on our team. Failed experiments can be frustrating, but I believe synthetic biology is all about tackling challenges head-on, solving problems, and supporting our community. I’m excited to do my part to help move the field forward!",
    imageUrl:
      "https://static.igem.wiki/teams/6102/wiki/images/member/sunyuxuan.avif",
    imagePosition: "100% 50%",
  },
  {
    id: "yuanxin-wang",
    name: "Yuanxin Wang",
    role: "Wet Lab · Scaffold & Ligation System",
    group: "students",
    bio: "Hi, I’m Yuanxin Wang, currently a junior majoring in Biological Breeding. I’m a member of the wet lab team, mainly working on the scaffold and ligation system section of the project. It’s been a tough yet enlightening journey, and through the iGEM project I’ve gained a much deeper understanding of biology. So glad to be part of such a wonderful experience.",
    imageUrl:
      "https://static.igem.wiki/teams/6102/wiki/images/member/wangyuanxin.avif",
    imagePosition: "98% 50%",
  },
  {
    id: "rongqing-zhang",
    name: "Rongqing Zhang",
    role: "Wet Lab · Mitochondrial Response & Delivery",
    group: "students",
    bio: "I’m Rongqing Zhang, currently a sophomore majoring in Basic Medicine (Strong Foundation Plan). I’m a member of the wet lab team, mainly working on the mitochondrial response and delivery section of the project. The road wasn’t always easy, but every step taught me something new about biology. Being part of the iGEM project has been an unforgettable and inspiring experience for me.",
    imageUrl:
      "https://static.igem.wiki/teams/6102/wiki/images/member/zhangrongqing.avif",
    imagePosition: "98% 50%",
  },
  {
    id: "yuchen-chen",
    name: "Yuchen Chen",
    role: "Hardware Design",
    group: "students",
    bio: "Hi! I'm Yuchen Chen, a junior student majoring in Food Science and Engineering. I’m in charge of the hardware design for the team. I’m thrilled that iGEM gives me the chance to meet people from diverse academic backgrounds and forge lifelong friendships. Through this project, I’ve strengthened my engineering skills and learned a lot about teamwork. It has been a challenging but rewarding journey, and I’m proud to be part of it.",
    imageUrl:
      "https://static.igem.wiki/teams/6102/wiki/images/member/chenyuchen.avif",
    imagePosition: "95% 50%",
  },
  {
    id: "haoran-gao",
    name: "Haoran Gao",
    role: "Team Leader",
    group: "leaders",
    bio: "My name is Haoran Gao, and I am majoring in Ecology. So glad to be the leader of this lovely team! I am very happy to contribute a little bit to the world with my power, and even more surprised to be able to validate our ideas in the lab! Thanks to this team full of love and joy, let's explore synthetic biology together! I am deeply passionate about and dedicated to the field of life sciences.",
    imageUrl:
      "https://static.igem.wiki/teams/6102/wiki/images/member/gaohaoran.avif",
    imagePosition: "100% 50%",
  },
  {
    id: "yihui-wu",
    name: "Yihui Wu",
    role: "Team Leader",
    group: "leaders",
    bio: "Hello, I’m Wu Yihui, the team leader. Majoring in medicine, I grasp professional biomedical knowledge to ensure our project conforms to medical principles. I coordinate team tasks, arrange schedules, and communicate among members. I will lead our group to discuss problems, check content rationality, and push our project forward steadily.",
    imageUrl:
      "https://static.igem.wiki/teams/6102/wiki/images/member/wuyihui.avif",
    imagePosition: "97% 50%",
  },
  {
    id: "jiacheng-chen",
    name: "Jiacheng Chen",
    role: "Software",
    group: "students",
    bio: "My name is Jiacheng Chen, a senior student majoring in life sciences, responsible for the software part. Hopefully, we can finally construct a brilliant project together.",
    imageUrl:
      "https://static.igem.wiki/teams/6102/wiki/images/member/chenjiacheng.avif",
    imagePosition: "98% 50%",
  },
  {
    id: "chenfei-li",
    name: "Chenfei Li",
    role: "Visual Design",
    group: "students",
    bio: "Hi everyone. I'm Chenfei Li, and I'm responsible for visual work in the team. I'm really interested in the integration of technology and art, and I hope to learn more from this competition.",
    imageUrl:
      "https://static.igem.wiki/teams/6102/wiki/images/member/lichenfei.avif",
    imagePosition: "98% 50%",
  },
  {
    id: "yishuo-zhu",
    name: "Yishuo Zhu",
    role: "Wet Lab · Mitochondrial Delivery",
    group: "students",
    bio: "Hi, I’m Yishuo Zhu, a Pharmacy student at Zhejiang University! As a member of NEST’s wet lab team, I work on the mitochondrial delivery part. I’m passionate about biomaterials and drug delivery, and I love seeing ideas take shape through experiments. For me, iGEM is also about sharing questions, working through setbacks, and celebrating small discoveries with my teammates. I’m grateful to be part of such a supportive team and excited to explore how synthetic biology can contribute to better healthcare!",
    imageUrl:
      "https://static.igem.wiki/teams/6102/wiki/images/member/zhuyishuo.avif",
    imagePosition: "95% 50%",
  },
  {
    id: "wenxin-zhang",
    name: "Wenxin Zhang",
    role: "Wet Lab · GAG Retention",
    group: "students",
    bio: "Hi! I'm Wenxin Zhang, a student majoring in Biological Sciences at Zhejiang University. I'm a member of the wet lab team, mainly working on the GAG Retention Module. We encountered many difficulties during the project, but it was also a valuable and unforgettable experience. Through iGEM, I've gained a deeper understanding of synthetic biology and teamwork, and I'm really glad to be part of this journey.",
    imageUrl:
      "https://static.igem.wiki/teams/6102/wiki/images/member/zhangwenxin.avif",
    imagePosition: "100% 50%",
  },
  {
    id: "xinglu-lu",
    name: "Xinglu Lu",
    role: "Wet Lab · Finance & Procurement",
    group: "students",
    bio: "Hello! I'm Xinglu Lu, a junior majoring in Biological Breeding Science. Within the team, I conduct wet-lab experiments for several functional short peptides and take charge of finance as well as reagent procurement. I have learned a great deal during this work and made many friends. I am also delighted to get exposed to synthetic biology and make my own contributions to it.",
    imageUrl:
      "https://static.igem.wiki/teams/6102/wiki/images/member/luxinglu.avif",
    imagePosition: "98% 50%",
  },
  {
    id: "yingqi-zhou",
    name: "Yingqi Zhou",
    role: "Dry Lab · Wiki",
    group: "leaders",
    bio: "Hi! I'm Yingqi Zhou, a junior majoring in Computer Science and Technology. I enjoy eating hot pot, doing experiments, and chatting with friends. Once again, thank you so much for taking the time to explore the wiki that my team and I created together! Hope we'll all have a wonderful time together in Paris!",
    imageUrl:
      "https://static.igem.wiki/teams/6102/wiki/images/member/zhouyingqi.avif",
    imagePosition: "97% 50%",
  },
  {
    id: "yvette-zhao",
    name: "Yvette Zhao",
    role: "Human Practices Leader",
    group: "leaders",
    bio: "Hi everyone! I'm Yvette Zhao, a sophomore majoring in Philosophy at Zhejiang University. I’m the Human Practices (HP) Leader of ZJU-China, where I’ve been responsible for project management, product design, and all aspects of Human Practices. I’m truly grateful to all my teammates for their support and dedication throughout this journey. I believe that together, we can make the world a better place through synthetic biology.",
    imageUrl:
      "https://static.igem.wiki/teams/6102/wiki/images/member/zhaojingyu.avif",
    imagePosition: "98% 50%",
  },
  {
    id: "jialin-wu",
    name: "Jialin Wu",
    role: "Mathematical Modeling",
    group: "students",
    bio: "Hello everyone. I’m Wu Jialin, a sophomore majoring in Physics, responsible for mathematical modeling in our team. I’m good at sorting out data, building models, and running simulations to turn practical problems into quantifiable formulas. I enjoy analyzing data logic and debugging model codes. I will cooperate closely with teammates to verify our results and support the whole project with reliable quantitative analysis.",
    imageUrl:
      "https://static.igem.wiki/teams/6102/wiki/images/member/wujialin.avif",
    imagePosition: "98% 50%",
  },
  {
    id: "wenqi-huang",
    name: "Wenqi Huang",
    role: "Visual Design",
    group: "students",
    bio: "Hello everyone. I’m Huang Wenqi, the designer of our team. I take charge of visual design, including posters, slides, and display pages. I focus on neat layout, color matching, and clear graphic expression. I aim to turn our complex ideas into intuitive and attractive visuals, helping audiences quickly understand our project highlights.",
    imageUrl:
      "https://static.igem.wiki/teams/6102/wiki/images/member/wenqihuang.avif",
    imagePosition: "100% 50%",
  },
  {
    id: "ming-chen",
    name: "Ming Chen",
    role: "Primary PI",
    group: "pis",
    bio: "Professor Ming Chen is the head of the Bioinformatics discipline at Zhejiang University and Director of the Department of Bioinformatics. He has long been engaged in scientific research in bioinformatics and systems biology, focusing on big data integration and mining, non-coding RNA bioinformatics, biological network construction, and precision medicine.",
    imageUrl:
      "https://static.igem.wiki/teams/6102/wiki/images/member/mingchen.avif",
    imagePosition: "98% 50%",
  },
  {
    id: "fan-yang",
    name: "Fan Yang",
    role: "Primary PI",
    group: "pis",
    bio: "Fan Yang is an Associate Professor at the School of Life Sciences. Her research focuses on Biochemistry, Molecular Biology, and Basic Synthetic Biology.",
    imageUrl:
      "https://static.igem.wiki/teams/6102/wiki/images/member/fanyang.avif",
    imagePosition: "98% 50%",
  },
  {
    id: "boyue-zhang",
    name: "Boyue Zhang",
    role: "Advisor",
    group: "advisors",
    bio: "Hi! I'm Boyue Zhang, a senior student majoring in biophysics. I really love exploring and discovering new things. I hope you will like our project and that we can create something together that changes the world!",
    imageUrl:
      "https://static.igem.wiki/teams/6102/wiki/images/member/boyuezhang-2026.avif",
    imagePosition: "100% 50%",
  },
];
