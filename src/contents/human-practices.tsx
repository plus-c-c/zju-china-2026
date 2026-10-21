import { TableCaption } from "../components/FigureCaption";
import { FigureCaption } from "../components/FigureCaption";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { flushSync } from "react-dom";
import { Timeline, type TimelineItem } from "../components/Timeline";
import { ExtendCard } from "./entrepreneurship";
import {
  StakeholderChain,
  type ChainStage,
} from "../components/StakeholderChain";
import { TransparentImage } from "../components/TransparentImage";
import { StakeBridgeEmbed } from "../components/StakeBridgeEmbed";
import { SeedReaderRail } from "./human-practices/SeedReader";
import {
  cancelSectionScroll,
  getSectionScrollOffset,
  scrollToSection,
} from "./human-practices/scrollToSection";
import "./human-practices.css";

/** All figures live on the team static host. */
const HP_FIG = "https://static.igem.wiki/teams/6102/wiki/hp-new";
const SEED_RING =
  "https://static.igem.wiki/teams/6102/wiki/images/engagement/ihp/seed-ring.avif";
const SURVEY_REPORT_PDF =
  "https://static.igem.wiki/teams/6102/wiki/hp-new/res.pdf";

function Figure({
  src,
  alt,
  caption,
  width,
  height,
}: {
  src: string;
  alt: string;
  caption: React.ReactNode;
  width: number;
  height: number;
}) {
  return (
    <figure className="ihp-figure">
      <img src={src} alt={alt} width={width} height={height} loading="lazy" />
      <FigureCaption>{caption}</FigureCaption>
    </figure>
  );
}

/**
 * Placeholder timeline entries.
 *
 * Replace the `date`, `title` and `summary` fields of each entry with the real
 * human-practices content. An entry shows a "Read more" button only when it
 * has `details`; add or remove `details` sections as needed. To display a
 * photo inside the rail dot, add `image: "..."` (plus `imageAlt`).
 */
/**
 * Stakeholder interviews, summarised from the team's stakeholder archive.
 * Each entry records the approximate date of the engagement, a card title and
 * summary, and the Rationale / Interview Summary / Integration behind
 * "Read more". Dates are inferred from the content and the order of the
 * conversations, and the list runs in the order the engagements happened.
 */
function stakeholder(
  date: string,
  stage: string,
  title: string,
  summary: string,
  rationale: string,
  interview: string,
  integration: ReactNode,
  imageId?: string,
): TimelineItem {
  return {
    date,
    stage,
    title,
    summary: <p>{summary}</p>,
    ...(imageId
      ? {
          image: `https://static.igem.wiki/teams/6102/wiki/images/engagement/ihp/${imageId}.avif`,
          imageAlt: title,
        }
      : {}),
    details: [
      { heading: "Rationale", content: <p>{rationale}</p> },
      { heading: "Interview Summary", content: <p>{interview}</p> },
      { heading: "Integration", content: <p>{integration}</p> },
    ],
  };
}

const STAKEHOLDER_PHOTO =
  "https://static.igem.wiki/teams/6102/wiki/images/engagement/ihp";

const photo = (id: string) => `${STAKEHOLDER_PHOTO}/${id}.avif`;

/* People engaged at each stage; the map's dropdown cards show their avatars. */
const chainStages: ChainStage[] = [
  {
    id: "patient",
    label: "Patient",
    people: [
      { name: "Xuan Ge", image: photo("ihp-01") },
      { name: "Yue Wang, Yu Xu & Fangrui Liang" },
      { name: "Grandpa Gu" },
    ],
  },
  {
    id: "rd",
    label: "R&D",
    people: [
      { name: "Prof. Ouyang Hongwei", image: photo("ihp-12") },
      { name: "Songlin Shi", image: photo("ihp-22") },
      { name: "Prof. Patrick Butaye", image: photo("ihp-15") },
      { name: "Prof. Huang Wenwen", image: photo("ihp-17") },
      { name: "Dr. Yi Junzhi", image: photo("ihp-36") },
      { name: "Prof. Lin Si'en", image: photo("ihp-13") },
      { name: "Prof. Li Xiaoming", image: photo("ihp-16") },
      { name: "Prof. Wu Congjun", image: photo("ihp-20") },
      { name: "Dr. Hong Yi", image: photo("ihp-19") },
      { name: "Prof. Ma Guanghui", image: photo("ihp-35") },
      { name: "Prof. Chen Ming", image: photo("ihp-37") },
      { name: "Prof. Zhou Hong & Lin Lei", image: photo("ihp-24") },
    ],
  },
  {
    id: "treatment",
    label: "Treatment",
    people: [
      { name: "Dr. Huang Jun", image: photo("ihp-02") },
      { name: "Dr. Qiu Xiaoming", image: photo("ihp-08") },
      { name: "Dr. Li Zhiguo", image: photo("ihp-43") },
      { name: "Dr. Ren Bo", image: photo("ihp-09") },
      { name: "Dr. Zhang Yumei", image: photo("ihp-10") },
      { name: "Nurse Xue Han and her nursing team (18 in total)", image: photo("ihp-11") },
    ],
  },
  {
    id: "manufacturing",
    label: "Manufacturing",
    people: [
      { name: "Beijing Weixinkang" },
      { name: "Shaanxi Lanyanwei", image: photo("ihp-38") },
      { name: "Yuanyi Biology (Ueny)", image: photo("ihp-30") },
      { name: "Shanghai Lingjiu", image: photo("ihp-28") },
    ],
  },
  {
    id: "market",
    label: "Market Authorization & Access",
    people: [
      { name: "Li Zhuoya", image: photo("ihp-27") },
      { name: "ZJU Innovation & Entrepreneurship College" },
      { name: "Zhang Jie", image: photo("ihp-26") },
      { name: "Prof. Erik Forsberg", image: photo("ihp-44") },
      { name: "Prof. Li Jianqin", image: photo("ihp-34") },
      { name: "Zhang Binghong", image: photo("ihp-39") },
      { name: "Mavis Wu", image: photo("ihp-40") },
      { name: "Tung Wah Group of Hospitals", image: photo("ihp-33") },
      { name: "Legislator Lam Chit-yuen", image: photo("ihp-32") },
    ],
  },
  {
    id: "rehabilitation",
    label: "Rehabilitation",
    people: [
      { name: "Dr. Shen Yang" },
      { name: "Chen Xi (artist)" },
    ],
  },
];

const timelineItems: TimelineItem[] = [
  stakeholder(
    "Early February 2026",
    "Patient",
    "Insights from Patients with Sports Injuries: Tennis Player Xuan Ge",
    "XuanGe described the prolonged discomfort following sports injuries, the inadequacy of early intervention, and the burden of spending two hours daily on rehabilitation, which helped the team confirm the demand for focal cartilage repair and drove the development of an intelligent rehabilitation mirror that can correct training postures at home.",
    "After learning from the questionnaire that focal cartilage defect is also a very common type of hyaline cartilage injury, we decided to conduct interviews with athletes, a high-risk group for such conditions. To this end, we reached out to a key player on Zhejiang University's university tennis team, and looked into the cartilage injuries he sustained over the course of his 10-year tennis career.",
    "In the interview, he recalled that he had suffered two very severe sprains. The first one occurred right before a crucial youth qualifying tournament, when he was under immense pressure and sprained himself during training. After a hospital check-up, the CT scan showed obvious cartilage damage, but since there were no effective early intervention methods at the time, the doctor just prescribed painkillers and sent him home. However, he continued to feel persistent discomfort in subsequent training, and the solution he turned to was seeking help from a rehabilitation physician and trying traditional Chinese medicine physical therapy. It was a long and complex treatment, and he had to spend 2 hours on rehabilitation every day.\"And this was even with a team doctor on hand. \" But the support this provided for his recovery was extremely limited. After that crucial match ended, he continued to feel discomfort in his cartilage during normal movements for a long time. After hearing about the focus of our research, he told us that one of his athlete friends had accidentally torn his cruciate ligament and undergone an artificial cruciate ligament replacement. This type of artificial ligament is extremely rigid, and while it allows for a quick recovery, it constantly wears down the patient's cartilage — and there is nothing doctors can do about it.",
    "Thus, we have come to realize that focal cartilage defect is also a very crucial therapeutic direction, and our materials need to be able to adapt to various conditions of hyaline cartilage injury. The pain points of rehabilitation therapy are that it is overly slow and cumbersome, which gave us the idea of improving the rehabilitation experience. Later, we got in touch with Lei Zhang from the Department of Biomedical Engineering of Zhejiang University and collaborated with his team to develop a mirror that enables professional rehabilitation at home, which helps patients correct their rehabilitation postures via AI.",
    "ihp-01",
  ),
  stakeholder(
    "Mid-April 2026",
    "Patient",
    "Postoperative Dull Pain from Cartilage Injury: High School Student Yue Wang, College Students Yu Xu and Fangrui Liang",
    "Three post-operative patients were confronted with the dual burden of persistent pain, functional impairment, and the lack of understanding for their lingering discomfort. The interviews prompted the team to pay attention to psychological and social support beyond treatment, and develop popular science videos, public lectures and rehabilitation discussions for medical students.",
    "At the iGEM East China Regional Exchange Conference, I got to know YuXu and found that she was a survivor of postoperative cartilage injury. In the discussion thread initiated on RedNote, we noticed YueWang and FangruiLiang, both of whom were also survivors of postoperative cartilage injury.",
    "YuXu, who is also an iGEMer, showed great interest in our project. She underwent an autologous cruciate ligament replacement surgery last summer. When considering surgical options, her doctor mentioned that artificial cruciate ligament replacement enables faster recovery, but since the artificial ligament has extremely high hardness, the cartilage will be continuously worn down by the artificial material, and there is nothing doctors can do about this issue. She also met patients with the same condition at the rehabilitation center. We collaborated on a popular science video, sharing her diagnosis and rehabilitation experience, and uploaded it to public video platforms including Bilibili.YueWang developed sequelae of osteoarthritis after undergoing patella surgery. In the orthopedic surgeon's treatment plan, greater priority was given to the condition of her bones, so when she experienced discomfort in her joints and went to the doctor for a follow-up examination, she was told that it was a normal phenomenon. Later, she has been consistently undergoing rehabilitation training, and the rehabilitation physician told her that there is currently no particularly effective method to address the persistent friction caused by the protruding bone position, which is mechanical and irreversible, and that another surgery may lead to other complications. She experiences severe pain after prolonged sitting.YueWang specifically mentioned that this kind of invisible, intangible pain has caused her great anxiety. Most of the time, her family and friends cannot truly understand her hidden suffering, because the problem lies inside her joints, and there are no terrifying scars to remind others of her condition, yet she is still tormented by the pain. This has also placed enormous psychological pressure on her.Fangrui Liang’s experience is similar to that of Yue Wang; since her surgical site was the wrist joint, the impairment to her bodily functions was more severe. Yue Wang said that she often had to pause her work due to wrist pain, which made her extremely irritable, and sometimes she even grew to dislike herself because of it. Yue Wang’s wrist osteoarthritis was initially misdiagnosed and missed: doctors judged that the degree of her defect did not meet the criteria for osteoarthritis, before the condition progressed to moderate osteoarthritis, for which medication and rehabilitation therapy were the main treatments.",
    "We recognize that the neglect from doctors and the psychological issues of patients also merit attention, which requires changing the environment in which patients live, making doctors and the people around them aware that cartilage health is also a concern worthy of attention, and that we should give patients more understanding. We have held lectures to raise public awareness of cartilage health, and reflected on the structural problems behind the neglect of patients from an anthropological perspective. We have produced two research reports and also held roundtable discussions for medical students on rehabilitation issues.",
  ),
  stakeholder(
    "Late April 2026",
    "Patient",
    "Understanding the Plight of Primary Healthcare and the Lack of Public Awareness: A Visit to the Elderly in Yantan Village",
    "Field visits to Yantan Village revealed the plight of the elderly facing long travel distances for medical treatment, long-term reliance on painkillers for chronic joint problems, and insufficient attention to health. The team documented their observations on the accessibility of primary healthcare in the research report, and promoted the planning of community cartilage health screening and outreach initiatives.",
    "To understand the healthcare disparities across different regions, we visited Yantan Village, a small settlement that relies on seasonal tourism, with rather inconvenient transportation. A large number of elderly residents remain behind in the village, which is also located at a considerable distance from the nearest town.",
    "We paid a focused visit to an elderly man who makes a living by manual labor. He has been suffering from chronic arthritis for years, and his current treatment involves drinking some local traditional Chinese medicine and taking painkillers. He said he has had this illness for more than five years, yet he is still plagued by it. I asked him how he was diagnosed with the disease, and he recounted the several hospitals he visited and the tiring travels he went through during the consultation process. When I inquired about the medical standards in the township, he said it takes him an hour's drive to reach the nearest hospital.For him, arthritis is not a serious illness. Hospitals in towns and villages can only provide some acute treatment, and there are no particularly good medical resources for chronic diseases, \"let alone a minor ailment like his. \"",
    "We are aware of the significance and the dilemma of the imbalance in regional healthcare. We have documented all these observations in an investigation report, which we further compiled into a professional report in response to the Hangzhou Municipal Health Commission. This report will guide grassroots organizations within the region to launch screening and promotion initiatives related to cartilage health.",
  ),
  stakeholder(
    "Early May 2026",
    "Treatment",
    "Suggestions from the Perspective of Sports Rehabilitation: Dr. Huang Jun",
    "Starting from the needs of athletes, Dr. Huang Jun pointed out the constraints among injection operation scenarios, portability and rapid rehabilitation. The interview prompted us to explore acute repair materials and drug-loading modules to accelerate conservative treatment and reduce overtreatment.",
    "Dr. Huang serves as the director of the Department of Joint Surgery at the Zhejiang Provincial Sports Commission, Hangzhou Municipal Sports Bureau and Zhejiang Provincial Sports Hospital, and is a member of the Sports Medicine Branch of Zhejiang Medical Doctor Association. He previously worked as a team physician for the Gymnastics Team of the General Administration of Sport of China and for the Asian Games delegation. He has extensive experience in treating cartilage defects caused by sports injuries.",
    "Dr. Huang believes that our project boasts extremely strong application potential, yet for usage scenarios targeting athletes, our project needs to further take portability and operability into consideration. The surgical injection-based treatment protocol dictates that although our supplementary material can immediately reach the patient's injured area, the procedure must be performed within an operating room. Beyond that, he holds that the programmability of our design can excellently meet the specific needs of athletes, and he also told us cases where athletes received overtreatment because they had to guarantee their motor function.",
    "We have carefully adopted Dr. Huang's suggestion and decided to subsequently launch materials that may be more suitable for acute repair scenarios, which can be applied not only to athletes but also to some teams or extreme field treatment scenarios. In terms of transitional treatment, we hope to promote the therapeutic rate of conservative treatment through further extensive design of the re-drug module loaded with immune factors or direct drug administration, and this suggestion has also become one of our important considerations for the content loaded in the functional module package.",
    "ihp-02",
  ),
  stakeholder(
    "Mid-May 2026",
    "Treatment",
    "Adjustable SELP adapts to defects in different sites: Qiu Xiaoming",
    "Dr. Qiu Xiaoming pointed out that the differences in stress on different joints require materials to have adjustable strength. The interview prompted us to modify the properties of SELP by adjusting the repeat number of 2KY protein, and combine modeling to match cartilage defects in different regions.",
    "We aim to develop a material capable of treating a wide range of hyaline cartilage defects. The first step is to select a filling material that can meet the complex requirements of cartilage repair, which can directly fill the defect, immediately alleviate the patient's pain, and fill the gap in early-stage treatment. Dr. Qiu Xiaoming, an orthopedic surgeon at Hangzhou Sir Run Run Shaw Hospital, boasts extensive clinical experience and outstanding academic achievements. We paid a visit to him.",
    "We presented the first version of the SELP design draft, which only covers a single fixed protein design of 2ky5,2ky10 and 2ky16, to Qiu Xiaoming. The doctor pointed out that cartilage in different parts such as elbows and knees bears different stresses and thus requires different strengths, and that a material with only one strength level would fail to achieve our goal of widespread application to fill all hyaline cartilage defects. We proposed that the strength and toughness of our material could be adjusted by designing sequences with different insertion sites to regulate the repeat number of the 2KY series proteins. Qiu Xiaoming approved our viewpoint.",
    "In subsequent literature research, we also found that for the 2KY series proteins, as the numerical value increases, the pore diameter decreases, and the cell adhesion subsequently increases, which is more conducive to GAG production, autologous cartilage growth, and upregulation of anti-inflammatory factor levels, and can also adapt to patients with different immune capabilities and defect degrees. We decided to find a method for programmatically regulating the series of proteins, and use modeling work to simulate real cartilage to help us determine the final properties of the hydrogel, ultimately achieving the therapeutic versatility of SELP as a basic platform.",
    "ihp-08",
  ),
  stakeholder(
    "Late May 2026",
    "Treatment",
    "The Diagnosis and Treatment Gap in Early Cartilage Damage: Li Zhiguo",
    "Dr. Li Zhiguo pointed out that some patients with cartilage injury experience obvious discomfort but do not meet the criteria for clinical intervention; the interviews clarified the need for early defect filling and prompted us to verify the biocompatibility of non-autologous materials.",
    "Dr. Li Zhiguo is a physician in the Department of Osteoarthropathy at Mentougou Campus of Beijing Tongren Hospital, an authoritative expert in the treatment of osteoarthritis, with extensive clinical surgical experience. We hope to consult him to find out the reasons behind the inverted phenomenon that there are many cartilage injury cases but few records, and to conduct a feasibility assessment on our initial version of the design.",
    "Dr. Li Zhiguo had a telephone conversation with us. Regarding clinical cases, he acknowledged that many patients experience significant discomfort after developing cartilage defects, yet it is difficult to proceed with medication if clinical findings do not align with imaging manifestations and inflammatory markers. However, a considerable number of patients who do not meet the criteria for clinical intervention nonetheless suffer from extremely intense discomfort. Furthermore, there is no consensus within the academic community on the definition of cartilage injury itself. He has encountered patients who visited multiple hospitals, only to receive wildly divergent diagnoses ranging from rehabilitation therapy and no treatment required to surgical intervention.Articular cartilage injury is indeed a condition with rather ambiguous diagnostic boundaries, which explains why there is a relative scarcity of epidemiological research on it. Dr. Li Zhiguo believes that our material has great application potential, as many joint diseases indeed follow a chronic progressive course, and treatment options that come into play once the disease meets therapeutic criteria, such as joint replacement, are associated with numerous rehabilitation-related issues. If the progression of the disease can be halted in its early stages, it will be of tremendous benefit to patients. There are also some patients who cannot accept relatively conservative treatment methods like microfracture, as such conservative approaches rely on the body's own immune system for recovery, requiring a lengthy rehabilitation period that exerts a significant impact on their life and work. As a result, some patients specifically request more aggressive treatment regimens solely to achieve a faster recovery.Our material is relatively non-invasive, easy to operate, and can immediately relieve patients' discomfort, thus improving their compliance with conservative treatment. When treating patients with shoulder dislocation, patellar fracture, and undergoing autologous cruciate ligament replacement surgery, Dr. Li Zhiguo has observed the condition of Self-Adaptation in patients' bodies, which greatly facilitates prognosis. Dr. Li Zhiguo particularly emphasizes the biocompatibility of non-autologous materials.",
    "We verified our observations and further explored the underlying causes of the inversion phenomenon. Subsequently, we conducted biocompatibility experiments as recommended by Dr. Li Zhiguo, and the results were favorable.",
    "ihp-43",
  ),
  stakeholder(
    "Early June 2026",
    "Treatment",
    "Age Differences and Personalized Immune Repair: Ren Bo",
    "Dr. Ren Bo reminds that the complexity of materials and age-related immune differences can affect the repair outcome. The interview prompted us to focus on hyaline cartilage defects, design an immune module with adjustable dosage, and strengthen cartilage health education targeted at young people.",
    "Ren Bo is a chief physician at the Sports Medicine Center of Xi'an Honghui Hospital, a member of the International Cartilage Repair Society (ICRS) and a member of the Asia-Pacific Knee, Arthroscopy and Sports Medicine Society (APKASS). He is highly specialized in immunological research on bionic cartilage and regenerative cartilage. We hope to seek his help and support at the level of joint connection and Modularization design.",
    "After learning about our project, he raised concerns regarding the complexity of the materials, noting that many filling materials for treating early-stage cartilage defects already face challenges during the production and mammalian experimental phases. He specifically pointed out that differences in immune function between the elderly and the young also affect rehabilitation outcomes: cartilage wear in the elderly often stems from long-term improper exercise habits formed in youth, leaving the cartilage in a state of constant wear. However, since younger individuals have higher hormone levels and stronger immune function, they can continuously repair the wear without experiencing obvious discomfort, and the condition only progresses to moderate to severe osteoarthritis as they age. Immune recovery in the treatment of elderly patients has long been a difficult challenge.He also suggested that our product should be more specifically oriented towards the healing of hyaline cartilage defects, rather than cartilage in a broad sense, as cartilage also includes other immunologically active components such as osteochondral tissue. He also acknowledged the ambiguity surrounding cartilage treatment and the existing gaps in early-stage care. He emphasized that it is also crucial to raise awareness about cartilage health, and that people should start paying attention to their exercise habits, sitting posture, standing posture and other such aspects from a young age.",
    "We subsequently contacted Dr. Huang Wenwen to hold a discussion on animal experiments related to material complexity. We began to consider the construction of the immune module, and finally determined a personalized treatment regimen of liposome-encapsulated mitochondria or immune factors. Meanwhile, our adapter system enables us to control the dosage of the immune module, so that different therapeutic doses can be administered to elderly and young patients respectively. In terms of production, these adjustments do not require additional production lines, and only need to adjust the blending ratio of the protein powder.Inspired by Dr. Ren Bo, we went to the community on multiple occasions to promote knowledge about cartilage health, and eventually compiled these experiences into a research report that can exert an influence on the government.",
    "ihp-09",
  ),
  stakeholder(
    "Mid-June 2026",
    "Treatment",
    "Treatment Recommendations from the Department of Rehabilitation Medicine: Dr. Zhang Yumei",
    "Dr. Zhang Yumei clarified the applicable population for the combination of materials and conservative rehabilitation, and pointed out that non-standard home training movements may aggravate wear and tear. The interview thus gave rise to the rehabilitation mirror program, which helps patients reduce continuous injury through movement correction.",
    "Almost all the people we interviewed had received rehabilitation treatment, so we consulted a rehabilitation physician to learn about the clinical situation. Zhang Yumei is a doctor in the Department of Rehabilitation Medicine of the First Affiliated Hospital of Nanjing Medical University in Nanjing, who has extensive experience in the rehabilitation treatment of postoperative cartilage injuries and early to mid-stage osteoarthritis.",
    "First of all, conservative sports rehabilitation is indeed the first-line treatment for cartilage injuries. Conditions that do not meet surgical indications, such as small-area and superficial cartilage contusions, as well as cartilage injuries combined with bone tunnel wear after ligament reconstruction, are relatively suitable for sports rehabilitation. However, not all cartilage injuries can be repaired by the body itself. For young people with small-area cartilage contusions, some can achieve self-repair after removing abnormal frictional loads and correcting the force line; but if the cartilage wear is relatively severe and covers a large area, even in young people, the self-repair ability is very limited. For the elderly, the cartilage matrix itself has degenerated, making spontaneous repair almost impossible.There are significant differences in the treatment plans provided by different doctors, which stem from variables such as the classification, area and depth of cartilage injury, whether there are concomitant injuries to ligaments and meniscus, and the patient's activity demands. Even for the same imaging films, sports medicine physicians and general orthopedic surgeons will propose different management strategies. The course of sports rehabilitation treatment is generally relatively long, with 3 to 6 months as the basic cycle, and it may take up to one year for severe cases. Home-based rehabilitation training is not recommended. A large proportion of people, excluding those with injuries caused by falls or car accidents, suffer from articular cartilage wear due to incorrect body alignment. If you choose to do home-based training at this stage, non-standard movements will aggravate the injury to a certain extent. Dr. Zhang Yumei believes that this material is not a substitute for surgery, and is mainly intended for people with hyaline cartilage damage who opt for conservative treatment, specifically those with secondary cartilage wear after ligament surgery (the applicable scope can be expanded a bit to include post-knee surgery patients), superficial small-area cartilage lesions, and focal cartilage wear in the early to mid-stages of osteoarthritis, and it should be used in conjunction with exercise rehabilitation.",
    "Dr. Zhang Yumei inspired us to develop a mirror-style product that can guide home-based rehabilitation training, allowing patients to correct their rehabilitation movements according to the prompts. On the one hand, this fills the treatment gap during the long launch cycle of our products; on the other hand, it prevents patients from maintaining incorrect body alignment after receiving injectable materials, which would otherwise continue to cause cartilage wear and require repeated treatment. Dr. Zhang Yumei is fully willing to serve as the medical consultant for our rehabilitation program.",
    "ihp-10",
  ),
  stakeholder(
    "Late June 2026",
    "Treatment",
    "Hardware System Transformation: Nurse Xue Han and Her Colleagues",
    "18 nursing staff members provided feedback on operational procedures, training, and equipment compatibility, which drove the integration of endoscopes and operational supplies, the development of electronic instructions for use and Bluetooth screen casting design, and the optimization of precise drug delivery experience through blind tests on syringe damping.",
    "Ms. XueHan is an experienced nurse who has worked at the 254 Hospital for 10 years and rotated through various departments. Our hardware design mainly refers to the suggestions from her and her colleagues, totaling 18 people.",
    "We visited this professional nursing team with our first version of hardware design, and they raised three main concerns: the first was the ambiguity of the drug administration process, the second was questions about the usage experience of our medical device, the third was concerns regarding the training complexity as a new medical device entering the market, and they also had some worries about the adaptability of our medical device. They were quite concerned that if the interface of our medical device was not widely adopted, it would be impossible to display our endoscope images on the emergency display screens of major hospitals.",
    <> We have carefully taken these considerations into account: first, we designed an integrated structure to connect the endoscope and the operating equipment; Second, we developed a piece of software in the form of an electronic instruction manual, which can better help doctors and nurses master the correct operation of the system; finally, to adapt to the existing facilities of all hospitals and reduce costs, we designed hardware accessories such as screen casting displays to be connected via Bluetooth. To enable medical staff to operate more comfortably and maintain precise dosage when injecting filling materials, we also invited this professional nursing team to conduct blind tests on syringes with different damping levels to decide which type of syringe we would ultimately select. See the <a
        href="#ihp-syringe-questionnaire"
        onClick={(event) => {
          event.preventDefault();
          // Close the "Read more" dialog, then open the questionnaire on NEST.
          document.dispatchEvent(
            new KeyboardEvent("keydown", { key: "Escape" }),
          );
          window.dispatchEvent(new Event("ihp:open-questionnaire"));
        }}
      >
        syringe questionnaire
      </a>. </>,
    "ihp-11",
  ),
  stakeholder(
    "Late June 2026",
    "R&D",
    "1. Functional Module Design of OA-Specific Materials: Ouyang Hongwei",
    "Professor Ouyang Hongwei helped us narrow down the indications to focal, partial-thickness cartilage defects and early degeneration, and required that the degradation of the material match tissue regeneration. The interview prompted the supplementation of the degradation curve and clarified the therapeutic boundaries of the platform.",
    "The original concept of NEST was to develop an injectable, in-situ forming biomimetic hydrogel. However, at that time, our internal description of \"what exactly NEST treats\" was ambiguous — \"cartilage repair\" and \"osteoarthritis treatment\" were almost treated as one and the same. Yet, if the research scenario from the outset was not fully defined and remained nothing more than a vague, grand vision, this topic would in all likelihood be meaningless and lack any practical applicability. Ouyang Hongwei is a leading expert in regenerative medicine in China and a trailblazer in the field of therapeutic materials for osteoarticular diseases in the country.Therefore, to ensure that our project can be truly applied in bioengineering and regenerative medicine to address real human problems, we consulted Professor Ouyang Hongwei, who has long been engaged in tissue engineering of articular cartilage and repair of motor system injuries, with the aim of first clarifying the boundaries of repair scenarios and indications.",
    "Based on his research experience in the field of articular cartilage tissue engineering and musculoskeletal system injuries, Professor Ouyang put forward three points. First, repair should not be limited to defect filling: the material is implanted into a continuously degenerating microenvironment, and the filler itself will be remodeled by this environment. Second, the degradation rate of the material should be coordinated with the formation rate of nascent tissue, and it must reliably integrate with the surrounding cartilage. Third, and the most thought-provoking point for us, he directly asked us which clinical scenario we were targeting: focal partial-thickness defects, early degeneration, or late-stage OA with extensive subchondral bone changes?He clearly pointed out that \"local cartilage repair\" cannot be equated with \"the ability to reverse osteoarthritis at all stages\".",
    "Prior to our discussion with Professor Ouyang, we used to open our project introduction with \"injectable hydrogel for osteoarthritis\", and then supplement later that we actually target focal defects — which effectively framed a platform-grade material as a disease-specific therapy. After the discussion, we reversed the order of presentation: the target lesions of NEST are focal, partial-thickness articular cartilage defects, as well as post-traumatic and early degenerative stages; advanced OA is no longer a claimed indication, and only appears in the background as a downstream consequence of the cycle \"cartilage loss — mechanical imbalance — elevated inflammation — further degeneration\". The degradation rate has shifted from being a \"variable we never paid attention to\" to a parameter that must be deliberately designed, which is the most impactful insight from this discussion on the material itself. Our original sequence simulation revolved around five variables: the number of repeats versus chain length and strength, the S/E ratio versus phase transition temperature Tt, X-site substitution versus hydrophilic-hydrophobic balance, the number and exposure level of crosslinking sites versus gelation rate, and the reverse regulation of functional site insertion position — none of these five variables concerned when the material would degrade and disappear. It was not until Professor Ouyang pointed out that the degradation rate should be coordinated with the formation of nascent tissue that this gap came to our attention.We therefore added characterization items: in addition to ITC purification, compression testing, and lap shear testing, we supplemented degradation curves, i. e., the mass loss and modulus attenuation at 4/8/12 weeks under three conditions: PBS, simulated fluid containing collagenase/protease, and simulated synovial fluid. The significance of this set of data is to provide a time window for \"the material remaining intact\", which can then be aligned with the histological time window for \"the emergence of nascent matrix\". We considered introducing degradable sites into the main chain, and the most straightforward approach is to reuse the existing MMP-13-responsive peptide in the cargo module as the degradation element of the main chain.However, this will make main chain degradation and load release compete for the same enzyme: at the peak of inflammation, we want mitochondria to be released, but we do not want the scaffold to collapse at the same time.Therefore, if we adopt this approach, the degradation element of the main chain should be selected to follow a mechanism orthogonal to that of MMP-13. However, based on a literature review, our own degradation curves, and the normal regeneration rate of cartilage, we found that the degradation of the material is basically complementary to the regeneration period of cartilage, so there is no need to specifically introduce an additional degradation module. The relevant results have also been included in our Results section. After an amicable exchange, Professor Ouyang Hongwei established an advisory team for us and advised us to keep in touch with Researchers Hong Yi and Yi Junzhi, both PhD candidates in his lab who specialize in materials research, to guide our follow-up experiments and design work.",
    "ihp-12",
  ),
  stakeholder(
    "Early July 2026",
    "R&D",
    "2. Doubts about the early-stage design of the project: Songlin Shi",
    "Songlin Shi questioned the trade-off between magnetic particle orientation and metabolism, as well as the performance reliability of proteins after denaturation and renaturation. The interview led to the development of a scheme combining low-intensity magnetic field with rapid photo-crosslinking, and promoted the adoption of ITC purification to protect protein structures.",
    "Songlin Shi is a PhD candidate at the Center for Emergency Medicine Research, School of Medicine, Westlake University, a community mentor, former member of the CCiC Presidium, member of the HP Committee, and an iGEM BYLP. When we had an offline exchange with the Westlake University team, the project was still in the early planning stage: at that time, the concept of the three functional modules had taken shape, but we had not systematically considered whether they were compatible with each other, whether the hardware could support them, and whether the protein could actually be produced.After listening to the report, he raised a set of independent questions targeting different levels, which is exactly the kind of communication most needed in the early stage of a project.",
    "His questions focused on two aspects. First, the contradiction between the anisotropy regulated by nano-morphology and the entry of ionic forms into the normal metabolic cycle: to produce a considerable orientation effect, magnetic particles require a certain loading capacity, but Fe₃O₄ ultimately needs to be metabolized in vivo, so the retention of particles and the release of iron ions are a pair of parameters that need to be weighed. Second, the feasibility at the protein level: will the structure change after denaturation, renaturation and purification? Will the high β-sheet structure and the formation of inclusion bodies affect the final implementation of the project?",
    "These problems were stuck in different links at that time respectively. We consulted the literature one by one and discussed repeatedly, and finally formed the current plan. For the magnetic field hardware, our initial idea was to use a coil to generate a traction field outside the body to \"pull\" the particles into place. The problem was that the joint cavity is located deep inside the body, and the coil is far from the lesion; to generate sufficient field strength and gradient at the lesion site, the size and power of the coil would increase rapidly. Meanwhile, the orientation needs to be maintained continuously until the structure is fixed, which means a high-power coil has to keep working on the operating table. After he pointed out the unreasonableness of this solution, we completely changed our train of thought — instead of pulling forcefully by relying on the intensity of the magnetic field, we rely on anchoring and velocity.The current scheme has three key pivots: first, particles are anchored to the SELP backbone via Fe₃O₄-binding peptides, which ensures that the magnetic force is transmitted to the network rather than idling in the aqueous phase, thus only requiring a low-intensity external magnetic field to induce synchronous orientation of the particles and the backbone; second, the Ru/SPS system completes visible light crosslinking in approximately 2 seconds, the oriented structure is instantly fixed, and the magnetic field does not need to be maintained for a long time; third, the operational procedure is standardized as injection filling — observation confirmation — magnetic field orientation — blue light crosslinking, and the blue light is turned on while the magnetic field is maintained.The focus of hardware has also shifted from the \"magnetic field generation device\" to the endoscopic module and the independently controllable blue light source — a considerable number of the problems that originally required hardware to solve have been addressed by the gelation rate of the material itself. The second issue has a very direct impact on the technical route. What he is worried about is a real risk chain: SELP contains a high proportion of silk-like domains, and the (GAGAGS)ₙ repeat units tend to form β-sheet aggregates and enter inclusion bodies when highly expressed in E. coli; while the conventional treatment for inclusion bodies is denaturation and refolding, once this step is undergone, whether the structure can be restored and whether the properties of the restored material still match the original design both become uncontrollable variables. For a project that takes \"properties are determined by the primary structure\" as its core proposition, this poses a fundamental threat.The protocol we established after reviewing the literature circumvents this route itself: using Escherichia coli BL21 as the chassis, the target protein is purified via standard inverse phase transition cycling (ITC) — leveraging the property of SELP to precipitate at high temperatures and dissolve at low temperatures, the target protein is separated from contaminating proteins through repeated heating-cooling cycles, replacing traditional column chromatography purification with temperature-responsive phase transition characteristics. The value of this route lies in that it does not require the protein to be first disrupted and then refolded: phase transition is an intrinsic reversible physical property of SELP, which aggregates upon heating and redissolves upon cooling, with the protein remaining in its native folded state throughout the process.The \"structural alteration after denaturation and renaturation\" that he was concerned about has thus been circumvented at the process level, rather than being tolerated. This also explains why ITC is not merely a lower-cost purification method in our narrative — it is simultaneously the prerequisite that validates the proposition that \"sequence determines performance\". This route subsequently underwent two rounds of external calibration: from the perspective of industrialized production, Beijing Weixinkang suggested that we take protein purification into fuller consideration, which led to the division of labor where SELP is captured via ITC, while other functional proteins are captured with His-tag followed by elution and tag cleavage; Ms. Huang Wenwen pointed out that although increasing the salt concentration in ITC improves purification efficiency, residual high-concentration salt will interfere with the subsequent Ru/SPS photo-crosslinking, so we added a dialysis desalting step after purification, ultimately achieving visible light crosslinking gelation in approximately 2 seconds. The question raised by Songlin Shi was the starting point of this production line.",
    "ihp-22",
  ),
  stakeholder(
    "Early July 2026",
    "R&D",
    "3. Experimental Evaluation of Macromolecule Expression in E. coli System: Prof. Patrick Butaye",
    "Professor Butaye suggested that the SELP expression and phase transition behavior should first be verified through small-scale experiments before scaling up production. Following this recommendation, the team completed the verification of expression and ITC purification, thus reducing the risk of detecting protein abnormalities only after large-scale feeding.",
    "Prof. Patrick Butaye is the Associate Dean of the Jockey Club College of Veterinary Medicine and Life Sciences at City University of Hong Kong, and an adjunct professor at Ghent University. He is Editor-in-Chief of Veterinary Sciences and an invited expert for WHO and EFSA. In the early stage of the project, the entire technical route of NEST was built on an unvalidated hypothesis: SELP could be normally expressed in Escherichia coli.This is by no means a step that can be bypassed: SELP serves as the backbone, and if the backbone cannot be fabricated, there is no way to realize the three categories of functional modules, the connector system, the magnetically responsive orientation, and the 2-second crosslinking. Yet SELP is precisely a rather atypical target protein, featuring highly repetitive (GAGAGS)ₙ and (GVGVP)ₙ sequences, a large molecular weight, and a silk fibroin-like domain that tends to form β-sheets.The core question we therefore consulted Professor Butaye about is: as a macromolecular protein, can SELP be normally expressed in the E. coli expression system, and will there be transmembrane or other abnormal situations?",
    "The professor suggested that we first conduct a small-scale experiment to test the waters, and provided us with detailed guidance on the experimental framework. Based on his experience, he believes that our design is largely correct. He also sent us several valuable reference papers in our field via email. In addition, we visited his research lab, and the display boards in his lab that showcase their paper achievements also provided our team with a great deal of inspiration for designing our poster.",
    "We initially planned to proceed directly with expression and purification according to the scale of the final requirement. After the professor suggested conducting a small-scale trial first, we split this step into two phases: first, verify in a small volume whether the target protein can be expressed, what form it exists in, and whether its phase transition behavior meets expectations; after confirming there are no issues, we then scale up. Currently, we use E. coli BL21 as the chassis for large-scale and efficient production, and this \"large-scale\" production is built on the premise of passing small-scale verification, rather than a one-shot gamble.This change may have seemed like nothing more than a cautious move at the time, but in reality it safeguarded the entire project schedule: if something had gone wrong with the expression, we would have caught it early rather than after we had already committed to mass production. After our communication, we conducted an ITC experiment to extract the protein as a trial, and no abnormality was observed. We then fed the results back to Prof. Patrick Butaye, which resolved the issue. The significance of this step goes far beyond mere \"validation passed\". ITC purification relies on the reversible phase transition property of SELP, which precipitates at high temperatures and dissolves at low temperatures. The fact that the protein could be successfully purified via ITC in itself indicates that the protein was in a native state that is soluble and exhibits normal phase transition behavior, rather than being random aggregates accumulated in inclusion bodies.Therefore, this experiment simultaneously addresses two questions: whether the expression is normal, and whether the protein structure conforms to the design expectation. This also echoes the concern raised by Songlin Shi regarding the correlation between β-sheets and inclusion body risk — that concern has now received an experimental-level response. The current purification process was thus finalized: cell lysis → addition of 2× TN buffer → incubation at 65 ℃ for 2 h → recovery at 4 ℃ overnight → centrifugation to remove the precipitate and obtain purified SELP, where temperature-responsive phase transition properties are used to replace traditional column chromatography purification. This route was subsequently revised twice, once by Beijing MicroXCon (focusing on purification cost and factory-scale sample output) and once by Teacher Huang Wenwen (noting that high-salt residue from ITC affects Ru/SPS photo-crosslinking, so dialysis was added for desalination), ultimately achieving visible-light crosslinking gelation in approximately 2 seconds.To date, a mature expression and purification system has been established for SELP.",
    "ihp-15",
  ),
  stakeholder(
    "Mid-July 2026",
    "R&D",
    "4. Purification, Desalination and Rapid Gel Formation: Huang Wenwen",
    "Ms. Huang Wenwen pointed out that the residual high salt from ITC purification would interfere with photo-crosslinking. Based on this, the team added a dialysis desalting step, solved the problem that the protein was difficult to form gel, realized visible light crosslinking in about 2 seconds, and clarified that purification and gel formation must be optimized continuously.",
    "Associate Professor with tenure at Zhejiang University-University of Edinburgh Institute (ZJE), and a leading researcher in fields related to SELP. NEST takes the chain length, domain ratio, functional residues and peptide interfaces of SELP as designable parameters, and aims to achieve functional integration through recombinant expression and Modularization assembly. We consulted with Ms. Huang Wenwen, focusing on seeking her evaluation of the platform's scalability as well as her suggestions on the process connection between SELP protein purification and subsequent rapid photo-crosslinking.We would like to confirm how to prevent the purification conditions from interfering with subsequent gel formation while improving the protein purification efficiency. At one point towards the later stage of our experiments, we encountered the issue that the protein failed to crosslink, so we were also eager to communicate and consult with you, to make our entire process more suitable for stable and reproducible production.",
    "Professor Huang spoke highly of the overall design of NEST. She pointed out that the platform's scalability enables teams to combine or adjust functions on a shared material backbone as needed, offering a highly feasible approach to addressing the differentiated needs of diverse clinical patients. During the discussion, Professor Huang further focused on the correlation between the crosslinking efficiency of SELP and the previous protein purification conditions. The team increased the salt concentration in the ITC purification workflow to enhance purification performance, yet the residual high salt content may interfere with the subsequent Ru/SPS photo-crosslinking;Professor Huang also inquired about the team's protein purification efficiency and compared this process with the protocols in her own laboratory. She acknowledged that the stepwise increase in salt concentration during the ITC process helps improve the purification effect of SELP, and affirmed the team's process innovation in the SELP production workflow, stating that this route holds the potential for further exploration towards industrialized production.",
    "This exchange links the scalability advantages of NEST to specific process issues in the production workflow. On one hand, Professor Huang's feedback supports us in continuing to adopt the framework of \"common backbone + standardized interfaces + replaceable functional modules\" as the platform architecture, which enables materials to adjust their functional combinations according to different application requirements, without the need to rebuild a completely independent material system for every single demand.On the other hand, her desalination proposal helped us bridge the process connection between ITC purification and the subsequent photo-crosslinking: we increased the salt concentration during the ITC process to enhance protein purification efficiency, and added a dialysis step after purification to remove residual salts that might interfere with crosslinking. According to the team's practice records, after this process adjustment, SELP achieved visible light crosslinking gelation in approximately 2 seconds. This result translates the exchanged suggestions into verifiable process improvements, and also demonstrates that purification and gelation conditions need to be optimized jointly as a continuous workflow, rather than pursuing the performance of a single step in isolation.Teacher Huang's affirmation of the purification process also made us recognize the potential of this route in further scale-up and industrialization exploration. She specifically emphasized and reminded us that while our high-salt condition does improve purification efficiency, crosslinking will become extremely difficult if the salt is not removed. She suggested that we remove residual salt via dialysis after protein purification before proceeding with photo-crosslinking. The day after our discussion, we redid the dialysis and then performed photo-crosslinking, and sure enough, gel formation was achieved in 2 seconds. With that, the entire specific design of our protein characterization process was a complete success!",
    "ihp-17",
  ),
  stakeholder(
    "Mid-July 2026",
    "R&D",
    "5. Assembly verification of pluggable modules: Yi Junzhi",
    "Researcher Yi Junzhi requested to use assembly efficiency, function retention, and replacement repeatability to demonstrate the advantages of Modularization. The interviews prompted the team to select an efficient connection system, compare the insertion positions of connectors, and reserve flexible connecting peptides to reduce spatial masking.",
    "Yi Junzhi is a researcher at Liangzhu Laboratory, Zhejiang University, focusing on the implementation of bionic materials in biological experiments, and participating in research related to Modularization protein engineering biomaterials and bone tissue engineering. The core idea of NEST is to take protein domains and functional peptides as designable and combinable modules, and reduce repeated chemical modifications through standardized interfaces. At that time, the \"plug-and-play modules\" was mainly just a proposition on our design drawing — the backbone remains unchanged while functional units can be freely replaced. It sounded feasible, but we could not explain what evidence could prove it.The focus of the discussion therefore lies in: whether Modularization design truly delivers verifiable and reusable engineering advantages.",
    "From the research perspective in the field of modularization protein engineering, the supervisor acknowledged that sequence-level design and standardized interfaces contribute to regulating material properties, while further questioning whether modules would interact with each other. For instance, functional peptide fusion may affect protein expression or solubility; tags and ligases may alter spatial conformation; after multiple functional modules are assembled simultaneously, issues such as site shielding, reduced efficiency, or a certain function being weakened by other components may also arise. Therefore, \"module pluggability\" should be verified by data including assembly efficiency, function retention, and post-replacement reproducibility, rather than merely based on design diagrams.",
    "After the teacher listed assembly efficiency as the first piece of evidence, the selection criteria for connectors shifted from \"whether it can be connected\" to \"how fast, how completely, and under what conditions it can be connected\".Among various protein tools, we selected the SnoopTag/SnoopLigase system, and ultimately determined a more lightweight and efficient system derived therefrom as the core linker module: after directed evolution and rational design, we obtained the SnoopLigase 2 system (comprising SnoopLigase2, SnoopTag2, and DogTag2), which is capable of maintaining highly efficient conjugation even under conventional PBS conditions, with a significantly enhanced reaction rate compared to the original system, making it suitable for direct use under standard biological experimental conditions.The aspect of \"conventional PBS conditions\" is particularly critical in the context of Modularization — if a new set of reaction buffer conditions has to be adjusted every time a module is replaced, the so-called plug-and-play capability only exists in theory. To address the issues that tags may alter the spatial conformation and multi-module assembly may cause mutual masking, we retained two linker insertion strategies in the structural implementation: the first is to place SnoopTag2 directly at the end of SELP, which features simple construction and high controllability, making it suitable as the first-round validation scheme; the second is to insert SnoopTag2 between the internal domains or repeating units of SELP, so as to obtain more flexible functional assembly sites without significantly compromising the properties of the main chain.Meanwhile, a flexible linker is reserved as an optional component to reduce steric hindrance and improve conjugation efficiency, making the linker more accessible for enzyme recognition and reaction in space. The selection of the tags themselves also serves the same purpose: SnoopTagJr and DogTag consist of only 12 and 23 amino acids respectively, imposing minimal structural burden on the target protein, and they can be placed not only at the N-terminus or C-terminus, but also inserted into the interior of the protein while retaining reactivity. Our adoption of this system now means that the mechanical and phase transition properties of SELP can remain independent, while the grafting of functional modules is accomplished via a unified interface, with the two parts not interfering with each other. This statement is a direct response to the teacher's question of \"whether modules will interfere with each other\" — by confining linkages to pre-encoded designated sites, we make interference predictable and controllable. This represents a marked improvement in precision over linkages that rely on chemical modification of randomly exposed residues: the enzyme \"only attaches at the specified site\". 36",
    "ihp-36",
  ),
  stakeholder(
    "Late July 2026",
    "R&D",
    "6. Let magnetic particles drive the orientation of the skeleton: Lin Si'en",
    "Professor Lin Si'en distinguishes between particle orientation, protein network orientation and directional mechanical properties, pointing out that the three need to be verified separately. The interview prompted the team to introduce magnetic particle-binding peptides to anchor the particles to the SELP backbone for transmitting magnetic force.",
    "In the early stage of the project, the Magnetically Responsive Anisotropy Module was merely a conceptual idea along one of our research directions: since the collagen in the superficial zone of natural cartilage is parallel to the articular surface while that in the deep zone is perpendicular to the cartilage-bone interface, and this directional arrangement is closely correlated with the tissue's shear resistance and compression resistance, if we could achieve an ordered alignment within the material, it would be possible to approximate the mechanical behavior of natural cartilage. Furthermore, numerous studies have indicated that such anisotropy can promote cell adhesion in tissues, making it highly suitable for incorporation into our project. Our original approach was to directly mix Fe₃O₄ magnetic nanoparticles into the SELP precursor solution, apply an external magnetic field to induce their alignment, and then crosslink and fix them — there was no anchoring mechanism, nor had we considered how to verify that the particles had been properly aligned. We took this prototype to consult with Professor Sze Yan Lam from the field of tissue engineering and regenerative medicine at the University of Hong Kong, with the core question being: how can mere structural orientation be translated into measurable functionality in tissue engineering applications.",
    "Professor Lin's response centered on \"evidence\". He told us that observing magnetic particles aligned in a certain direction does not automatically prove that the entire SELP network has formed stable anisotropy, nor does it equate to having reproduced the layered mechanical properties of natural cartilage — particle orientation, protein network orientation, and the direction-dependent properties of the final gel are three things that must be demonstrated separately. He also listed five variables that affect the orientation effect: magnetic field strength and gradient, particle concentration, crosslinking efficiency, rheological properties of the precursor solution, and photocrosslinking timing.Finally, he added that when discussing the effects on cells, a distinction should also be made between the two levels: \"the formation of a directional material structure\" and \"this structure indeed alters cellular behavior\".",
    "The teacher pointed out that particle orientation is not equivalent to network orientation, which later directly led to our final design of the Fe₃O₄-binding peptide. This is the point from this discussion that has had the most profound impact on NEST. In our original scheme, there was no physical connection between the particles and the protein network — the magnetic field only pulled the particles, and there was no guarantee at all that the particles could drive the SELP chains to align together. After Professor Lin pointed out this disconnect, we realized that the magnetic force must be transferred to the backbone instead of idling in the aqueous phase.First, we had Wu Jialin and Sun Yuxuan from our team conduct relevant modeling simulations. Although SELP can regulate charges to attract magnetic nanoparticles by introducing lysine, we found that magnetic nanoparticles alone indeed cannot ensure consistent molecular orientation of SELP. This led to our current scheme: we introduce Fe₃O₄-binding peptides as magnetic response recognition elements, first anchor Fe₃O₄ to the SELP backbone via short peptides, and then use a low-intensity external magnetic field to induce synchronous orientation of the particles and the backbone.The two screened 7-mer short peptides HYIDFRW and TVNFKLY have been verified to be able to bind to Fe₃O₄ nanoparticles, and TVNFKLY can also be tandemized with other functional peptides while retaining its binding capacity. The statement in the Description that \"our design does not randomly mix magnetic particles into the material\" is precisely targeted at the iteration of this part of our own work. Furthermore, this change has triggered a cascading consequence: a standardized connection method is required for the magnetically responsive unit, which has thus been incorporated into the SnoopTag2/DogTag interface system, forming the current SELP–STJr + DogTag–Fe₃O₄ peptide → SELP–peptide–MNP assembly route. The Magnetically Responsive Anisotropy Module has evolved from \"adding components into the material\" to \"assembling the module onto the scaffold\", which marks the starting point of its integration into the platform-based architecture and also provides feasible support for the introduction of our linker system. Beyond the aspects mentioned above, we also found that the envisioned operation process after introducing the Magnetically Responsive Anisotropy Module was rather crude: the sequence and duration of the three steps — injection, magnetic field application, and light irradiation — had not been defined. After Professor Lin listed rheological properties and photocrosslinking timing as variables affecting orientation, these two factors were designed as an integrated whole, which eventually developed into the current fixed operation sequence: injection and filling — observation and confirmation — magnetic field alignment — blue light crosslinking; it also explicitly specifies that blue light is turned on while the magnetically induced alignment is maintained, so as to fix the internal structure via rapid crosslinking before proceeding to subsequent operations.This requirement is further implemented in the hardware: the endoscopic module is equipped with an independently controlled blue light source, which allows the operator to first observe the defect location and filling status, and activate the light irradiation only after the material is in place and completes the predetermined orientation. We therefore chose the Ru/SPS system that can gel in 2 seconds, because the oriented structure must be instantly locked while the magnetic field is still applied; the faster the gelation, the smaller the window for structural relaxation after the field is removed.",
    "ihp-13",
  ),
  stakeholder(
    "Late July 2026",
    "R&D",
    "7. From Externally Induced Structures to Local Mechanical Microenvironment: Professor Li Xiaoming",
    "Discussions with Professor Li Xiaoming linked magnetic fields, structural orientation, and local mechanical responses, facilitating the establishment of a four-phase model that incorporates cross-linking timing; while the model was used to guide experimental sampling, the YAP/TAZ response of cells still requires separate validation.",
    "Professor Li Xiaoming is a professor at the School of Biological and Medical Engineering, Beihang University, and Vice Chair of the Intelligent Bionic Biomaterials Branch of the Chinese Society for Biomaterials. During the project implementation, we aim to regulate the internal structure of hydrogels via external fields to construct a continuously varying mechanical microenvironment, and further explore its correlation with the YAP/TAZ mechanical signal response. However, we are confronted with a critical issue: how to link external field effects, material structural changes, and the local mechanical conditions perceivable by cells, so that modeling can provide a concrete basis for experimental design?The research by Professor Li Xiaoming's team published in *Advanced Science*, titled *Biomimetic Gradient Hydrogels Regulate Osteochondral Regeneration Microenvironment Remodeling via Spatiotemporal Programming Engineering*, has attracted our attention.In this study, a continuous gradient hydrogel is constructed via electric field driving, which integrates compositional, structural and mechanical gradients, providing a reference for us to understand the regulation of material microenvironments by external fields.",
    "We had an online contact and discussion with Professor Li. The reference study uses an electric field, whereas our system responds to a magnetic field via the binding of magnetic nanoparticles to SELP, so it is necessary to re-establish a model based on the mechanism of action of our own materials. The discussion helped us refine the originally broad concept of \"external fields altering hydrogel properties\" into a process that can be analyzed step by step: how an external field affects internal orientation, how this orientation is retained by crosslinking, and how the fixed structure modifies local mechanical response.",
    "This idea is embodied in our Model as the adjustment of modeling scale and material description. The original molecular dynamics and cross-linking network analysis were mainly used to understand the mechanical properties of the SELP network itself; after adding Fe₃O₄, we further established a four-phase continuum model to describe SELP–Fe₃O₄ paired fibers, non-fiber matrix, free magnetic particles and aqueous phase respectively. This treatment enables us to distinguish the roles of different components, and analyze the directional changes caused by the magnetic field and the influence of pore water pressure on the material response.We also incorporated the sequential order of the fabrication process into the model: first, a non-uniform magnetic field is used to induce spatially varying fiber orientation, then this structure is fixed via photo-crosslinking, and finally the mechanical response after removing the magnetic field is analyzed. Accordingly, the model can focus on the structural and mechanical characteristics retained by the material during its actual service phase, and assist in screening the sampling locations and comparison conditions for subsequent experiments through outputs such as local modulus and fiber strain. This exchange also helped us clarify the connection approach between mechanical modeling and YAP/TAZ research.The current model only provides predictions for the local material microenvironment, and it cannot directly verify that the YAP/TAZ pathway is activated. Therefore, we have further transformed this issue into a subsequent verification direction: to compare cellular responses across different predicted mechanical regions, and to examine whether changes in material structure are accompanied by expected alterations in mechanical signals, in combination with indicators such as the nucleocytoplasmic localization of YAP/TAZ.",
    "ihp-16",
  ),
  stakeholder(
    "Early August 2026",
    "R&D",
    "8. Operation sequence of blue light cross-linking: Wu Congjun",
    "Professor Wu Congjun's discussion helped the team distinguish between the filling orientation window before light irradiation and the rapid fixation requirement after light irradiation, clarified the workflow of injecting first, followed by observation, magnetic field orientation, and then activation of the blue light, and adopted independently controlled light sources.",
    "Professor Congjun Wu holds the Chair Professorship in Physics at Westlake University. In the design of the NEST platform, we need to ensure that the SELP precursor solution remains fluid initially, so that it can be injected to fill irregularly shaped cartilage defects, and then rapidly form a stable network at the target site. Therefore, how to use blue light to timely trigger cross-linking and how to arrange the timing of light irradiation became the key focus of our discussions with Professor Congjun Wu.",
    "We introduced to Professor Wu the Ru/SPS visible light crosslinking system adopted in this project: it triggers crosslinking between tyrosine sites on protein chains via blue light, so as to form a covalent network in the precursor solution. Under the described experimental conditions, this system can achieve gelation after being irradiated with blue light for approximately 2 seconds. What we focus on is how to convert this rapid gelation capability into a controllable operation process, so that the material can not only have sufficient time to complete filling and internal orientation, but also be quickly fixed when needed.The discussion centered on \"immediate cross-linking upon light exposure\" has further clarified two distinct timing requirements for us: an operational window must be maintained before light exposure, while fixation should be completed as soon as possible after light exposure. If blue light is activated too early, the material may lose its fluidity before the filling process or magnetic field alignment is finalized; if the trigger is delayed excessively, the risk of precursor liquid leakage or deformation of the already formed structure may increase. Therefore, the cross-linking rate and light exposure timing need to be designed in a coordinated manner.",
    "This exchange prompted us to more explicitly control the injection and photo-crosslinking in separate steps in the design, forming an operation sequence of \"injection filling — observation confirmation — magnetic field orientation — blue light crosslinking\". In the Magnetically Responsive Anisotropy Module, we plan to turn on the blue light while maintaining the magnetic field-induced orientation, use rapid crosslinking to fix the internal structure, and then proceed to subsequent operations. A blue light source independently controlled in the endoscopic module is designed: the operator can first observe the defect location and filling status, and then activate the light irradiation after the material is in place and completes the predetermined orientation.The software workflow also needs to explicitly present the light irradiation and gel formation steps accordingly, so as to align the rapid response capability of the material with the actual operation sequence. This discussion has made us more clearly aware that the project's requirement for \"rapid cross-linking\" covers the entire process before and after triggering. Based on this, we have specified the timing of turning on the blue light and its coordination with the magnetic field operation.",
    "ihp-20",
  ),
  stakeholder(
    "Early August 2026",
    "R&D",
    "9. Wet Adhesion and Cartilage Interface Verification: Hong Yi",
    "Dr. Hong Yi broke down the vague concept of \"adhesion\" into three distinct components: wet-state bonding, shape retention, and long-term interfacial integration. This insight prompted his team to add lap shear, compression, and rheological characterization tests, and to further elucidate the mechanism underlying the covalent bonding between the material and host cartilage.",
    "Dr. Hong Yi is a researcher at the Liangzhu Laboratory of Zhejiang University, whose main research focus is biomimetic materials, with relevant work in biomimetic cartilage and medical tissue adhesive materials. In the early stage of the project, our understanding of \"adhesion\" was general: as long as SELP could form a gel, fill the defect, and appeared to fit well, we thought the adhesion problem had been solved. However, the application environment of NEST is characterized by obvious wet conditions and dynamic loads — synovial fluid, repeated compression and shear will all affect the retention of the material at the defect site and the interface stability.We hope that he will review this concept from the perspectives of the material-organization interface and real-world usage environments.",
    "The professor first pressed for a clear definition of the \"adhesion\" mentioned in the project: does it refer to the wet adhesion strength of the material itself, the shape retention of the gel, or the long-term stable interfacial integration between the material and native cartilage? These properties are interrelated but not identical. Furthermore, the results of a single tensile or compression test can hardly represent the long-term performance during joint movement, as the material also needs to address issues such as cyclic loading, local wear, interfacial delamination, and structural changes after degradation. He also pointed out that there is a trade-off between adhesion capacity, modulus, and toughness, so it is inappropriate to evaluate whether a material is \"suitable for cartilage\" using a single indicator.",
    "At the very beginning, we only had a vague statement that \"the material adheres tightly to the host tissue\", but there was actually no corresponding measurement. It was not until the instructor broke this concept down into three items: wet adhesion strength, shape retention, and long-term interfacial integration, that we realized these three items required three distinct experiments, none of which we had arranged at that time. After that, we split \"adhesion\" into three separate components, each paired with a corresponding testing method — and it was at this point that lap shear was added to the characterization list. The current characterization route has thus been established as three parallel tracks: compression testing corresponds to the mechanical support and shape retention properties inherent to the material itself; lap shear testing corresponds to the interfacial bonding strength between the material and cartilage; rheological testing corresponds to the fluidity and gelation behavior of the precursor solution. Together with ITC purification, these three components constitute the complete set of characterization route that now \"provides a clear handle for determining performance in the subsequent validation sequence\". Among these, lap shear testing serves as the most direct evidence — it measures the shear load-bearing capacity of the adhesive layer between two substrates, which is precisely the property \"between the material and cartilage\" rather than a property of \"the material itself\".Without this deconstruction of the term \"adhesion\", our mechanical characterization would likely have remained limited to the parameter of compressive modulus, and no matter how excellently that parameter was measured, it would never have been able to address the interfacial issue. Following this discussion, we clarified that the mechanism of interfacial bonding has been refined down to specific chemical reactions, rather than merely \"adhesion\". Our Ru/SPS visible light crosslinking system triggers crosslinking between tyrosine residues on protein chains via blue light to form a covalent network; and the other half explicitly stated in the design specification is that — engineered tyrosine residues can covalently couple with endogenous tyrosine. This means that the bonding between the material and the host cartilage does not rely solely on physical adhesion or mechanical interlocking, but also constitutes a genuine covalent linkage.After the teacher pressed further about the \"long-term stable interface integration\", this mechanism shifted from being a casually mentioned point to becoming the primary basis for us to explain interface-related issues.",
    "ihp-19",
  ),
  stakeholder(
    "Mid-August 2026",
    "R&D",
    "10. Multi-module Process and Quality Control: Ma Guanghui",
    "Professor Ma Guanghui focuses on the compatibility of various components under different conditions of temperature, salinity, light exposure and storage. The interview prompted the team to convert the module list into a step-by-step process, establish batch quality indicators, and separately evaluate the integrity and function of mitochondrial load. 35",
    "Ma Guanghui is a professor at the University of Science and Technology of China and has also served as a judge for iGEM. By the mid-project stage, the designs for all three functional modules had taken shape, yet we consistently approached problems on a per-module basis: how to achieve orientation for the Magnetically Responsive Anisotropy Module, how to implement enrichment for the GAG Retention Module, and how to trigger responsive release for the cargo module. Meanwhile, NEST not only involves recombinant protein expression and purification, but also integrates magnetic nanoparticles, standardized peptide , liposomal carriers, mitochondrial loading, temperature control, injection and in-situ photo-crosslinking into a unified workflow.We consulted Teacher Ma regarding the feasibility of the project, as it depends not only on whether individual components are effective, but also on whether the various components are compatible in terms of operating sequence, stability and storage requirements.",
    "The instructor has extensive experience with iGEM, so from the perspective of engineering and process integration, he mainly focuses on whether multiple components need to be mixed at the same time; which components are sensitive to temperature, salt concentration, light or shear conditions; how long the assembly can be maintained after completion; whether proteins, magnetic particles and liposomes from different batches can provide consistent performance; and which steps in the process are most likely to cause loss or inactivation. For vectors carrying exogenous mitochondria, the integrity and functional maintenance of the payload require special separate consideration.",
    "Originally, NEST was a parallel list of modules; after discussion, it evolved into a pipeline with defined sequences, time windows, and acceptance checkpoints. We decomposed precursor solution preparation, module assembly, temporary storage, delivery, injection, magnetic field alignment, and blue-light crosslinking into discrete steps, and specified for each step the input components, operation window, condition monitoring items, and release criteria.The practical consequence of this decomposition is that a previously non-existent problem arises between every two adjacent steps: under what conditions should the output of the previous step be handed over to the next step, how long can it wait, and what will be lost during the waiting process. These problems are invisible in the modular checklist-style thinking, and therefore they enable us to view and solve problems from a perspective of practical application. We have gradually established at the material end quality metrics including protein purity, endotoxin/residual impurities, conjugation efficiency, storage stability and functional retention. This directly addresses the instructor's question regarding batch consistency: if a \"platform\" performs differently from batch to batch, the interchangeability of modules becomes meaningless. The \"conjugation efficiency\" mentioned here is also a core metric for linker modules, and refers to the same parameter that Teacher Yi Junzhi cited when stating that \"the plug-and-play capability of modules must be validated by assembly efficiency\". For the Mitochondrial Therapeutic Module, we separately evaluated payload integrity, responsive linker cleavage, and delivery outcomes. This is a direct implementation of the instructor's instruction that \"payload integrity and functional retention require separate consideration\". Mitochondria are not small-molecule drugs; rather, they are organelles with complete metabolic functions — capable of participating in ATP production, redox homeostasis maintenance, and cellular metabolic recovery — that may become inactivated at every step of assembly, storage, injection, and light exposure, and inactivated mitochondria serve no purpose even if successfully released. This exchange transformed our NEST from a set of designs into a complete process. None of the questions the instructor raised concerned whether a certain module was advanced; all of them focused on whether these modules could coexist on the same timeline. As a matter of fact, the starting point of the core thread running through materials, hardware and monetization — \"assembly — precursor preparation — injection filling — magnetic field orientation — blue light crosslinking\" — in the current NEST documentation lies right here.",
    "ihp-35",
  ),
  stakeholder(
    "Mid-August 2026",
    "R&D",
    "11. Closed-loop Verification of Model and Experiment: Chen Ming",
    "Through four rounds of discussions, Professor Chen Ming required the team to clarify the variables, model assumptions and experimental basis. Based on this, the team broke down five categories of design variables, defined the respective tasks for models at different scales, and calibrated the predictions using rheological, gelation and directional mechanics experiments. 37",
    "NEST adopts sequence design, molecular dynamics simulation, coarse-grained network simulation, and magneto-mechanical coupling modeling to assist material development, and aims to organize parameters and experimental workflows via software. In the early stage of the project, we had overly high expectations for modeling, hoping that simulations could directly output \"which sequence is the best\", while the software was mainly conceived as a display interface. We consulted with Teacher Ming Chen from Zhejiang University, hoping to examine whether this approach is feasible from the perspectives of systematic modeling and Data Analysis.",
    "Looking back on the entire iGEM preparation phase this year, our two modeling teammates had a total of 4 in-person meetings with Professor Chen. To summarize, the three core concerns the professor raised during these exchanges were: whether variables were clearly defined, whether the model's input and output were interpretable, and whether the simulation results were supported by independent experimental data. He cited specific examples: there is a multivariate relationship between SELP repeat number, domain proportion, functional site arrangement, crosslinking density, and the mechanical properties of the gel; magnetic field strength, particle distribution, and crosslinking sequence may also jointly influence anisotropy.If a model only provides a predicted value without clarifying its assumptions, parameter ranges and error sources, it becomes difficult to judge whether the prediction can guide experiments. He also pointed out that \"developing a software interface\" should not be equated with completing model validation — the software should help users record parameters, compare schemes, check the basis of the model, and feed the results back to the next round of design.",
    "After the instructor pointed out that there was multivariate coupling among the variables and required that the variables be clearly defined, we split the originally mixed simulations apart. The current standardized process revolves around five key variables: first, the effect of varying the number of repeats on chain length and mechanical strength; second, the effect of varying the S/E ratio on the phase transition temperature Tt; third, the effect of X-site substitution on hydrophilic-hydrophobic balance and structural stability; fourth, the number and exposure level of crosslinking sites on gelation rate and network formation; fifth, the insertion position of functional sites and its reverse regulatory effect on material behavior.The significance of these five points lies in the fact that each of them has a single dependent variable that can be verified independently, rather than providing a comprehensive score. Furthermore, our models at different scales have been properly positioned respectively, making it clear what type of question each category of simulation addresses. The current division of labor is as follows: All-atom molecular dynamics and enhanced sampling are used to investigate the chain conformation and the spatial state of functional sites;The coarse-grained Martini 3.0 network model is applied to explore the mechanical response after multi-chain crosslinking;The magneto-mechanical coupling model is utilized to compare the potential effects of magnetic field and particle parameters on the structural and stress response of materials. On this basis, we point out that the macroscopic behavior of SELP hydrogels is governed by three types of key mechanisms: conformational transition of single molecules, geometrical constraints within the network, and intermolecular electrostatic interactions. Beyond that, we require the support of wet experiments, and each category of simulation has designated corresponding calibration and validation experiments — this is the implementation of \"supported by independent experimental data\". It is now explicitly stipulated that: experimental data including those from rheology tests, gelation time measurements, structural imaging, and directional mechanical testing shall be used to calibrate or validate the corresponding models. The corresponding relationships are clear: gelation time is used to validate cross-linking site simulations; rheology and compression tests are used to validate coarse-grained network models; structural imaging and directional mechanical testing are used to validate magneto-mechanical coupling models. This forms a closed loop between models and experiments, rather than having them operate independently of each other. Throughout this year's entire iGEM preparation period, our two modeling team members and Teacher Chen had a total of 4 in-person exchanges, during which everyone demonstrated remarkable imagination and practical capabilities. For this reason, we have chosen to apply for the Best Model Award as one of our nominations this year.",
    "ihp-37",
  ),
  stakeholder(
    "Mid-August 2026",
    "R&D",
    "12. Collaborative development of home rehabilitation mirror: Lin Lei Team, Zhou Hong",
    "Addressing the pain points of long rehabilitation cycles, frequent trips to hospitals and difficulties in professional exercise guidance, our team collaborated with the Lin Lei Team to develop an intelligent rehabilitation mirror. The training content is determined by doctors' recommendations and patient research, while motion monitoring and demonstration feedback help patients conduct standardized training at home and stick to their rehabilitation regimen. Our product is also undergoing iteration and optimization.",
    "During our extensive prior investigation into patient conditions, we observed that rehabilitation therapy, despite being a widely applicable treatment modality, is extremely difficult for patients to adhere to. The root cause lies in the excessively long treatment cycle, the requirement for professional personnel to guide patients through the exercises, which consumes a tremendous amount of their energy, and the constant back-and-forth travel between home and the hospital, all of which further dampen their enthusiasm for treatment. We turned to Professor Hong Zhou, Party Secretary of the College of Biomedical Engineering & Instrument Science at Zhejiang University, who leads an outstanding team of researchers, for assistance.",
    "To address this issue, we collaborated with the team led by Lin Lei from the Biomedical Engineering program at Zhejiang University to develop an intelligent mirror rehabilitation system, which allows patients to complete rehabilitation treatment at home by observing their own movements through the mirror. The mirror is embedded with a set of components designed by AI, which can monitor whether the patient's movements conform to the tutorial specifications built into the mirror, and also enable patients to see in the mirror whether their movements match the actions of the AI avatar displayed on the mirror, which can improve patients' compliance with rehabilitation treatment.",
    "We have maintained a long-term cooperation: the ZJU-China team provided professional medical guidance and research findings to reflect the rehabilitation exercises and specific functions that patients actually need, while students from the biomedical engineering team offered technical support. We have achieved sound function development, which can provide patients with ample encouragement, and meanwhile take into account the psychological issues of rehabilitation patients. The current effect of the mirror is as follows. Based on the feedback from Zhang Yumei, we have reflected on our work: our current product only accommodates standing rehabilitation exercises, and we should take into account the convenience for patients when they receive treatment in sitting or lying positions in the next step. [1.mp4]",
    "ihp-24",
  ),
  stakeholder(
    "Mid-August 2026",
    "Manufacturing",
    "Factory-scale Purification and Sample Cost: Beijing Weixinkang Medical Co., Ltd.",
    "From the perspective of factory sample preparation, Beijing Weixinkang put forward requirements for purification, transportation and hospital acceptance, which prompted SELP and functional proteins to adopt different purification routes, and helped estimate the production equipment, annual output and the cost of first-generation samples.",
    "When we considered factory-based production, we realized through literature research that we needed to find an experienced partner to help us produce samples first. So we reached out to Beijing Weixinkang Medical Co., Ltd. , an enterprise with extensive experience in patent application for medical devices and registration of Class III medical devices.",
    "During the interview, he offered us a great number of constructive suggestions regarding the production of medical devices, including advising us to give more consideration to protein purification to facilitate the release of the first batch of samples from factory-based production. We need to take into account the costs of protein extraction and transportation as well as the acceptability in hospitals.",
    "Taking all factors into consideration, we adopted the ITC method to purify the SELP protein, while for other proteins, the purification was completed by capturing the His tag fused to the proteins, followed by elution and tag cleavage. He also assisted us in estimating the production equipment required for the first-generation NEST product, the annual output and the production cost per sample in the calculation of the cost model, and provided a relatively reliable profit analysis.",
  ),
  stakeholder(
    "Late August 2026",
    "Manufacturing",
    "The Commercialization Boundary of Scientific Research Protocols: Chief Scientist of Lanyiwei",
    "The chief scientist of Lanyiwei helped the team clarify whether the deliverables were materials, functional components or complete systems. Through communication, the requirements for application, assembly and storage, operation and items to be verified were sorted out respectively, and the responsibilities of the R&D team and partner enterprises were defined clearly. 38",
    "NEST has developed an interconnected design system covering materials, functional modules and supporting operating devices, yet there is still a need for further clarification on how to translate the research scheme into a product with well-defined product boundaries, production requirements and sales conditions. As Lanyiwei also boasts a background in scientific research and clinical achievement transformation, we hope to leverage its experience to identify the links that need to be supplemented when moving from laboratory validation to product development.",
    "The discussion centered on the product positioning of the materials and supporting devices, as well as the preparations required for the production and sales links. Issues to be clarified during the discussion include: what will be delivered in the first phase of preparation, hydrogel materials, functional components, or a complete system integrating light irradiation and magnetic field manipulation? Who will produce, assemble and deliver these parts? In the laboratory preparation process, which steps still rely on the personal operation of researchers? This perspective leads us to recognize that the Modularization advantage of NEST needs to be further translated into clear product specifications: what function each component undertakes, how to combine them, how to store them, and in what order users should operate them.At the level of industrial-research transformation, the chief scientist of Lanyiwei shared experience on balancing the time devoted to scientific research, clinical practice and entrepreneurship, as well as balancing clinical efficacy and Market Access.",
    "Accordingly, we divide the transformation preparation into three interrelated parts: materials, functional components and supporting devices, and sort out their respective uses, compositions, operation requirements and items to be verified. Meanwhile, we further clarify the connection relationship of the overall process of \"assembly — precursor solution preparation — injection filling — magnetic field orientation — blue light crosslinking\". The follow-up plan is to verify the corresponding production and sales requirements with professional institutions in combination with the final product definition, and determine the division of responsibilities between the R&D team and cooperative enterprises.",
    "ihp-38",
  ),
  stakeholder(
    "Late August 2026",
    "Manufacturing",
    "Expression Amplification and Batch Consistency: Yuanyi Biology (Ueny)",
    "From the perspective of raw material production, Yuanyi Biology has raised inquiries regarding the consistency of expression yield, purification recovery rate, and assembly formulation. Based on these findings, the team plans to supplement cross-batch records and sample traceability, and incorporate purification loss, testing and storage into the scale-up cost assessment.",
    "Founder Zhang Li held an online meeting with us. The SELP scaffold of NEST and its various functional components rely on recombinant expression and subsequent assembly. As sample demand grows, we need to understand the potential challenges that the laboratory expression and purification workflow may face during scale-up. Ueny (Yuanyi Biology) is an established synthetic biology raw material production company, and is therefore able to assist us in evaluating the feasibility of raw material supply and process scaling.",
    "The discussion centered on expression, purification, and batch-to-batch consistency. Regarding NEST, outstanding questions that require further clarification include: whether the yield and recovery rate of different SELP constructs remain stable; whether the existing ITC purification can maintain its performance as the processing volume increases; and how to ensure the consistency of assembly ratio and final formulation after multiple functional components are produced separately. The exchanges also prompted us to view costs from the perspective of the complete production process: beyond the yield per expression run, inputs arising from purification losses, assembly efficiency, testing, and storage also need to be factored in.",
    "We will retain the existing recombinant expression and ITC purification workflow, and plan to add cross-batch records for yield, recovery rate and performance. For different constructs and functional components, we will establish traceable sample numbers and assembly records. Subsequently, based on the results of small-scale scale-up, we will jointly determine the priority optimization processes with the production party, and then update the cost estimation.",
    "ihp-30",
  ),
  stakeholder(
    "Early September 2026",
    "Manufacturing",
    "Assessment of Contract Manufacturing Partnership: Shanghai Lingjiu Medical Technology Co. , Ltd.",
    "Discussions with Shanghai Lingjiu have refined the contract manufacturing arrangement into specifics including raw material division of labor, trial formula development, production scale, and acceptance criteria. The team plans to compile a technology transfer package, verify assembly, gelation and mechanical properties against small-batch samples, before finalizing quality and delivery responsibilities.",
    "To advance NEST from a research sample to a material that can be delivered reproducibly, we need to evaluate external production partnerships. Shanghai Lingjiu Medical Technology Co. , Ltd. is regarded by the team as a potential CDMO partner, as they can provide customized",
    "For collaborative discussions, it is necessary to translate the statement \"our materials can be produced\" into a clear technical scope: which raw materials will be provided by the team, which processes will be undertaken by the partner, what formula and scale will be adopted for the first batch of trial production, and which indicators will be used to judge whether the technology transfer is successful. For NEST, production transfer should also cover the performance retention after raw material preparation, including the assembly capability of functional components, the state of precursor solution, the performance of blue-light-induced gelation, and the mechanical properties of the formed gel. We have reached a preliminary cooperation intention and will continue to refine our technology in accordance with the company's guidelines and requirements.",
    "We plan to first organize the technology transfer package, which covers raw material requirements, formulas, process steps, testing methods and sample traceability rules, before proceeding with small-batch trial production and laboratory sample comparison. Afterwards, we will define the cooperation scope, quality responsibilities and delivery terms based on the trial production results.",
    "ihp-28",
  ),
  stakeholder(
    "Early September 2026",
    "Market Authorization & Access",
    "Team Handovers and Continuous Entrepreneurship: Li Zhuoya",
    "Starting from the continuous entrepreneurship of the student team, Li Zhuoya delves into technical division of labor, experiment reproducibility and result presentation. The interviews have facilitated the team to plan unified handover and version management, and clarify the person in charge, phased objectives and investment priority of each R&D route.",
    "Zhuoya Li, Partner of Yiwu Bio, is also a former iGEMer and has extensive experience in the entrepreneurial translation of iGEM teams. We would like to understand how student teams can continuously accumulate technologies, organize teams and promote external cooperation after completing scientific research design and competition presentations, so as to prevent projects from being interrupted due to members' graduation or personnel changes.",
    "The discussion mainly revolved around the sustainability of the founding team: who is respectively in charge of the materials, the devices and the software? Can new members replicate the key experiments based on the existing records? When making external presentations, how to distinguish between the obtained results, the functions under verification and the future plans? Combined with the Modularization design of NEST, we further discussed the resource dispersion issue that frequently arises in platform projects. While multiple functional modules offer room for expansion, this also means that teams need to clarify priorities, and assign a responsible person, phased objectives and criteria for judging continued investment to each R&D roadmap.",
    "We plan to establish a unified project handover and version management mechanism to align protein construction, module assembly, experimental conditions, equipment operation and data records. External materials will also be organized according to the status of evidence, with clear indication of completed validations and follow-up objectives. In terms of team building, we will further clarify the responsibilities for technical liaison, production docking and commercial development, so as to ensure that the project can continue to advance even after member turnover.",
    "ihp-27",
  ),
  stakeholder(
    "Mid-September 2026",
    "Market Authorization & Access",
    "Integration of Campus Resources and Long-Term R&D: Zhejiang University Innovation and Entrepreneurship Institute",
    "Facilitated by Teacher Wang Feifan, the team participated in research training, field investigations and entrepreneurial projects. Through exchanges, the team advanced the alignment of on-campus resources with specific deliverables, and plans to share laboratories, budgets and achievement records to support continuous R&D and member handover.",
    "NEST spans materials R&D, equipment development and entrepreneurship preparation, requiring continuous teamwork and resource support. We hope to learn about on-campus projects, competitions and entrepreneurship guidance resources through the Innovation and Entrepreneurship Institute of Zhejiang University, so that support at different stages can correspond to actual R&D needs.",
    "Through the coordination of Teacher Wang Feifan, we have participated in the Young Eagle Program, SRTP, SQTP and the Dandelion Innovation and Entrepreneurship Competition, which respectively cover future technology exploration, scientific research training, project investigation and practice, as well as innovation and entrepreneurship This discussion prompted us to align the competition presentation with long-term research and development tasks, and take into account personnel training, result archiving and team handover, so that the materials accumulated in different stages can continue to serve the project.",
    "We plan to establish a unified project task list, map on-campus support opportunities to clear research or entrepreneurial deliverables, and share experimental records, budgets and outcome materials. Through periodic reviews, we will continuously update technical evidence, business plans and team division of labor, so that external presentations are based on traceable project progress.",
  ),
  stakeholder(
    "Mid-September 2026",
    "Market Authorization & Access",
    "Key Focuses of Phase 1 Products and Financing: Zhang Jie, Huadan Angel Investment",
    "From an investment perspective, Ms. Zhang Jie probed into the product value in the first phase, the differences with competing products and the total cost of ownership, pushed the team to narrow down the verification scope, distinguish between the near-term product and subsequent module expansion, and reached a preliminary cooperation intent on the production of the first batch of samples.",
    "At the Hackathon entrepreneurship pitch event held at Zhejiang University, Ms. Zhang Jie listened to our project presentation and further discussed market, competing product and cost issues with the team. NEST features platform-based characteristics, yet the development progress, verification cost and application value of different functional modules vary. Therefore, we hope to clarify from an investment perspective what should be prioritized for validation in the early stage of the project, and which key milestones the limited funds should support.",
    "The discussion focused on how platform capabilities can shape a clear first-phase product. We presented the design of carrying different functional modules on a shared SELP backbone, and discussed its potential commercial appeal: the same material base can support functional iterations, reducing the burden of starting from an entirely new system for each development. The market is broad, yet there is no mature competing product in competition. Centering on competing product and costs, the discussion further extended to: Compared with existing repair solutions, which specific value is NEST first prepared to demonstrate? Do the cost estimates cover purification, quality testing, storage, functional components and supporting consumables?What verifiable deliverables can the team produce at the close of the early-stage financing?",
    "We broke down the business plan into two tiers: the first-phase product and subsequent module expansion, retained the platform design of NEST, and meanwhile set a clearer verification scope for the first phase. The cost analysis is also planned to be expanded from raw material costs to the full cost of a single-use solution. We finally reached a preliminary cooperation intent and secured RMB 1.5 million in funding to produce the first batch of samples.",
    "ihp-26",
  ),
  stakeholder(
    "Late September 2026",
    "Market Authorization & Access",
    "Cost Structure and Target Market Measurement: Erik Forsberg",
    "Professor Erik Forsberg provided the data and analytical framework required for cost modelling, guided the team in measuring market size, assessing commercial viability, and incorporating Hong Kong into the comparison and planning of potential pilot markets.",
    "When it comes to cost estimation, we have relatively limited data. We reached out to Erik Forsberg, a teacher in Zhejiang University's technology entrepreneurship program who is an experienced professor with a hardware background, to ask him to guide our project's monetization process and serve as our business consultant.",
    "Erik Forsberg assisted us by providing a large amount of non-public source data for our business model, guiding us in conducting cost analysis, and building a cost structure framework and cash flow analysis. He also suggested that we could consider launching a pilot in regions with relatively lenient regulatory standards.",
    "With the professor's guidance, we measured the market size and target market, and conducted a monetization feasibility assessment for our project. We are considering launching a pilot promotion in Hong Kong, where commercial medical insurance is more mature and regulations are more relaxed.",
    "ihp-44",
  ),
  stakeholder(
    "Late September 2026",
    "Market Authorization & Access",
    "Monetization Roadmap and Team Equity Stake Arrangements: Li Jianqin",
    "Professor Li Jianqin helped the team sort out pre-IPO preparations and equity stake arrangements, emphasizing the need to first clarify members' contributions, intellectual property rights and cooperative relationships. Based on this, the team planned phased deliverables, funds and responsible persons, so as to maintain continuity for members' exit and subsequent financing.",
    "As NEST moves from a research project to startup preparation, the team needs to simultaneously consider the sequence of technology development, fund utilization, intellectual property rights and organizational arrangements. We therefore consulted Li Jianqin, a professor of economics at Zhejiang University, hoping to organize the scattered monetization tasks into a promotion path with clear stages and well-defined responsibilities.",
    "The discussion mainly covered the pre-launch preparation process for the product and the equity stake structure. We need to first clarify the relationship between the R&D achievements and the team members, before discussing the arrangements for enterprise establishment, capital injection and future cooperation. Specific issues include: which technologies and materials involve the university or other partners? How to stipulate the commitment of core members? How can the team maintain decision-making continuity when personnel withdraw, subsequent financing is conducted, or external resources are introduced? In terms of product development, it is necessary to incorporate technical verification, production preparation, professional consultation and market exploration into the same time schedule.",
    "We plan to develop a phased monetization roadmap, listing the deliverables, required funds and responsible parties for each phase. Meanwhile, before determining the equity stake ratio, we will first sort out the contributions of members, ownership of intellectual property and existing cooperation agreements, and then have professionals assist in designing the specific arrangements. The above work serves the continuous development of NEST and will not change the existing materials and functional module design.",
    "ihp-34",
  ),
  stakeholder(
    "Early October 2026",
    "Market Authorization & Access",
    "Translating Health Research into Policy Recommendations: Zhang Binghong",
    "Under the guidance of Teacher Zhang Binghong, the team organized research centering on government demands and put forward a replicable action plan. Based on this, the team completed the cartilage health research report and received a reply from Hangzhou Municipal Health Commission, which provides a basis for subsequent community health promotion.",
    "Ms. Zhang Binghong is the secretary of RTC Talent Development Business School and an international senior entrepreneurship coach. She has extensive experience in government relations and assistance for vulnerable groups. The research report she authored once secured tens of millions of yuan in municipal government funding support for the disabled community. She served as a judge for us at the Zhejiang University Dandelion Entrepreneurship Competition. After the competition, we held in-depth discussions on a wide range of topics including government relations, research report writing, and support for vulnerable groups.",
    "Teacher Zhang Binghong put forward many key points for writing the research report, including that the report should be well-organized, aligned with the government's needs, specify what specific research needs to be conducted, and deliver a replicable and scalable timeline plan. We had active exchanges during the drafting process and finally completed a draft document.",
    "We have put forward specific action proposals in the government research report, and received a reply from Hangzhou Municipal Health Commission, which is considering adopting them. This document will serve as a guide for our participation in the next government-led community cartilage health promotion initiative.",
    "ihp-39",
  ),
  stakeholder(
    "Early October 2026",
    "Market Authorization & Access",
    "Commercial Insurance Payment and Documentation Preparation: Mavis Wu",
    "Mavis Wu explained the correlation between the hospital's adoption of solutions and insurance reimbursement arrangements, and suggested preparing product materials for payers. Based on this advice, the team incorporated the full costs of materials, consumables and procedures, and organized the information required for communicating patient benefits and reimbursement matters.",
    "The accessibility of our products is also affected by affordability. We have observed that medical insurance largely determines the price that patients who are the most considerate of the materials have to pay. The access and approval mechanisms for resident medical insurance in Chinese Mainland require mature therapies, and the approval process takes a long time. Although it has broad coverage, it is not suitable for innovative therapies like ours. Therefore, we have turned to commercial medical insurance. We consulted Mavis Wu on issues related to commercial insurance. Mavis Wu is the Director of the Sales Department at Prudential Insurance and a recipient of the 2026 Quality Advisor Award (QAA).We hope to understand, from the perspective of insurance practitioners, the payment arrangements that may be involved in future applications, as well as what information the team should accumulate regarding treatment costs and application value.",
    "Mavis Wu elaborated on the basic workflow of insurance business and the client profile of high-end commercial insurance. She introduced to us that many medical insurance policies offer direct billing services at designated hospitals, and fundamentally, it depends on whether our materials are recognized and accepted by major hospitals. There are also some commercial medical insurance plans that come with an access list; for instance, in Chinese Mainland, the government document *Catalog of Innovative Drugs for Commercial Health Insurance (2025)* serves as a reference, while in Hong Kong, such lists are mostly determined by individual insurance companies. We can prepare a data package for insurance payers to clarify the claim settlement criteria for insurance companies.",
    "We plan to incorporate a payment perspective into business analysis, integrate expenses related to materials, consumables, equipment utilization and operations into the cost framework, and focus on patient benefits and resource utilization indicators in subsequent research planning. We have drafted a preliminary package of materials.",
    "ihp-40",
  ),
  stakeholder(
    "Mid-October 2026",
    "Market Authorization & Access",
    "Hospital Admission and Clinical Procurement Preparation: Chen Yihua, Li Yongshi",
    "Through exchanges with Tung Wah Group of Hospitals, the hospital cooperation has been refined into the confirmation of target departments, initial formulas and product categories, as well as the preparation of safety and efficacy evidence; meanwhile, the requirements for procurement, training and batch traceability have been sorted out, establishing a task list for subsequent clinical cooperation.",
    "After talking with Mavis, we decided that we needed to further clarify the hospital admission criteria, so we contacted Chan Yik-wa, the Medical Services Supervisor of Tung Wah Group of Hospitals in Hong Kong, and Lai Wing-sze, the Center Director, to discuss the possibility of NEST being admitted to the hospital.",
    "We shall confirm the target departments and cooperation methods, finalize the formula, intended use and mechanism of action of the initial product, and verify with the Hong Kong Department of Health whether the product falls under medical devices, its risk classification, and whether the MDACS listing applies. The base hydrogel and the version integrated with an active delivery module shall be assessed separately. We will prepare product introduction, technical specifications, compliance documents, safety and efficacy evidence, and clarify the cost of a full treatment course as well as its value proposition relative to existing therapies. We will also undergo clinical and technical evaluation, complete supplier and procurement procedures, and fulfill product acceptance, training, batch traceability, adverse event reporting and subsequent quality monitoring as required by the contract and the hospital.",
    "The \"Office for the Introduction of Innovative Drugs and Medical Devices\" established by Tung Wah Group of Hospitals in June 2026 accepts product information submitted by manufacturers or local agents, and the email address is imds@ha.org.hk. The official requirements include product introductions, technical specifications, regulatory compliance documents, and empirical data on safety and efficacy. Units making independent purchases from Tung Wah Group of Hospitals may refer to Tung Wah Group of Hospitals Supplier Application. After we complete the stable rollout at manufacturing facilities, we will consider establishing cooperation first with private hospitals with higher flexibility such as Tung Wah Group of Hospitals.",
    "ihp-33",
  ),
  stakeholder(
    "Mid-October 2026",
    "Market Authorization & Access",
    "Hong Kong Access Pathways and Phased Products: Lam Chit-huen",
    "The exchanges with Hon. Lam Chit-huen focused on the access of medical devices in Hong Kong and the classification of composite materials, prompting the team to re-examine its first-phase products, consider prioritizing the advancement of the simpler SELP material, and undertake the translation costs and access tasks in a phased manner.",
    "We have noted that even for hospital use, recognition under the MDACS listing administered by the Hong Kong Department of Health is still required, and there have been continuous changes to medical device access standards in Hong Kong in recent years. To gain a further understanding of the overall situation, we consulted Dr. David Lam Chit-huen, a Legislative Council member representing the medical and health services constituency in Hong Kong.",
    "MDACS stands for Medical Device Administrative Control System. \"Listing\" means that after a medical device passes the document review required by this system, it will be included in the list published by the Department of Health for public and procurement agencies to consult. At present, it is still a voluntary listing system that covers Class II, III and IV general medical devices as well as Class B, C and D in vitro diagnostic devices, and is equipped with post-market surveillance arrangements. Hospitals may additionally require products to be listed for procurement, so \"voluntary\" does not mean that listing is not required during procurement.As a composite material, our hydrogel cannot be declared in accordance with the same standard during the application process. Member of the Legislative Council Dr. Lam Cheuk-huen's work focuses on reflecting the policy issues in the translation of innovative medical care, and assisting the communication among the legislative, administrative and medical departments. He is full of interest in new materials like ours, and stated that Hong Kong has been introducing relevant support programs for innovative materials, and welcomes us to develop in Hong Kong.",
    "We further reviewed our material design and decided that, for the sake of the company's cost control, we can first produce and launch relatively simple materials such as SELP to avoid extending the launch cycle and encountering difficulties in Market Access.",
    "ihp-32",
  ),
  stakeholder(
    "Late October 2026",
    "Rehabilitation",
    "PhD Shenyang",
    "Dr. Shen Yang helped us turn the interviews into a systematic anthropological study of why early joint symptoms remain medically invisible. The work became a paper discussed at an ethnographic workshop and fed back to Zhejiang University's health-services institute, and it shaped our medical-humanities lectures for future doctors.",
    "Through field research and interviews with doctors and patients, we have gained a preliminary understanding of the current situation where cartilage defects are neglected within the healthcare system. We aim to further explore the structural issues underlying the neglect of hidden ailments in the healthcare system and how to address this problem systematically. Shen Yang, a researcher under the \"New 100 Talents Program\" of the Department of Sociology at Zhejiang University, holds a PhD in Anthropology from Boston University. We contacted her at the 3rd Annual Conference of Social Studies of the Department of Sociology at Zhejiang University, hoping that she could offer us some insights and suggestions.",
    "Dr. Shenyang advised us to produce a thesis after systematic study. After completing one semester of coursework, we authored the paper *Pain Beyond Diagnostic Thresholds: Medical Invisibility of Early Joint Symptoms*. Starting from the observation of \"frequent symptom reports but sparse formal documentation\" in a background survey on cartilage injuries, and incorporating exchanges with hospital stakeholders, this paper discusses how real pain is underestimated during the processes of diagnosis and documentation.Drawing on Kleinman’s distinction between disease and illness experience, as well as Carel and Kidd’s framework of epistemic injustice, this paper analyzes how patients’ accounts of pain, mobility limitations, and life disruptions are translated into clinically recognizable information, and which experiences may be omitted in this process. The paper proposes that even when a diagnosis remains unclear, patients’ care needs can still be identified and addressed. Understanding this issue requires simultaneous consideration of the uncertainty inherent in pathological identification, the situational context of patients’ expression, and the organizational structure of healthcare services.The contribution of this paper lies in expanding the focus from the number of confirmed cases to the under-documented symptom burden, and proposing the direction of incorporating patient-reported pain, life impact and follow-up needs into assessment. Meanwhile, the article also pays attention to structural violence and the inherent power imbalance in the doctor-patient relationship.",
    "We brought this paper to the ethnography workshop in Chiang Mai for exchanges, and fed back the findings of the paper to the Institute of Social Medicine and Health Management of Zhejiang University. We also held medical anthropology lectures and seminars to further enhance the patient awareness of future doctors, helping them understand that diseases are not merely physiological infringements, but are often accompanied by the influence of social environments and the violence of power structures. We also called for the recognition and response to patients' care needs even within ambiguous diagnostic criteria. We hope to address patients' problems at a deeper level by reflecting on the healthcare system.",
  ),
  stakeholder(
    "Early November 2026",
    "Rehabilitation",
    "Artist Chen Xi",
    "Artist Chen Xi advised us on motion sensors and artistic visualisation, and our rehabilitation movements became two artworks. The collaboration also brought a visual-tracking piece on engineered bacteria into our science talks and is planned for a future art–science exhibition.",
    "Chen Xi is a designer and artist, currently a PhD candidate in Art and Computational Technology at Goldsmiths, University of London. He curated the exhibition *Larvae of Time* for Bai Shunong, a Berggruen Scholar at the School of Life Sciences, Peking University. The exhibition features a series of visual artworks created through artistic processing of eye-tracking data that records the artist drawing butterfly trajectories in mid-air, bridging the gaps between science and art, as well as biology and the general public.",
    "At a lecture, we had the privilege of meeting Chen Xi. We explained our background to him and mentioned that we were inspired by his work *Larvae of Time*, and wanted to create a trajectory artwork based on cartilage rehabilitation movements. Chen Xi gave us specific advice on using sensors and guidance on artistic drawing, which helped us complete this visual art piece derived from cartilage rehabilitation movements. He also enthusiastically shared their experience of drawing with visual sensors, and allowed us to present our new work of visual tracking trajectory drawing of engineered bacteria, which enhanced the interactivity after the popular science lecture on synthetic biology and deepened people's understanding of engineered bacteria.",
    "Finally, referring to the suggestions from Chen Xi, we completed artworks on two themes. We plan to exhibit our paintings in the upcoming technology + art exhibitions to be held at the Future Learning Center, to promote the concept of cartilage health and knowledge of synthetic biology to more people. View Gallery. Interested in our design details? Click to jump to Design Interested in our business plan? Click to visit Entrepreneurship Interested in our anthropological and philosophical reflections? Click to visit Education",
  ),
];
/* ------------------------------------------------------------------ */
/* Blocks                                                             */
/* ------------------------------------------------------------------ */

function SeedMethodBlock() {
  return (
    <>
      <h3 className="mt-4 mb-3">Analytical Methods of SEED</h3>
      <TransparentImage
        src={SEED_RING}
        alt="The SEED cycle — Spark a Question, Explore & Analyze, Engineering & Implementation, Dialogue & Feedback — as the outer ring, with the Design–Build–Test–Learn cycle nested inside it"
        className="ihp-seed__ring"
        width={1600}
        height={1600}
        loading="eager"
      />
      <p>
        iHP connects laboratory research with the real world. Because our
        material is intended for medical applications, we must approach its
        design with care. To ensure that each design decision addresses a
        real-world problem, we developed a new iterative cycle:{" "}
        <strong>SEED</strong>. In engineering stages such as Evidence-based
        Co-design and Situated Implementation, we embedded the conventional
        Design–Build–Test–Learn (DBTL) cycle within SEED, making laboratory
        iteration part of the project&rsquo;s broader development process.
      </p>
      <p>
        SEED is the seed of our product design. It enabled NEST to take the
        first step in alleviating cartilage-related ailments, and we hope it
        will also serve as a seed within the iGEM community, inspiring more
        teams to identify real-world suffering and work to address it.
      </p>
      <ul>
        <li>
          <strong>S — Spark a Question.</strong> When experiments stall or the
          design hits a bottleneck that needs iteration, we organize the
          difficulty at hand and ask a worthwhile question.
        </li>
        <li>
          <strong>E — Explore &amp; Analyze.</strong> We try to answer that
          question — exploring outward by asking stakeholders and running public
          surveys, and inward through the literature — and then analyze what we
          have gathered from the project&rsquo;s own perspective, writing the
          needs and possible solutions into a PRD document that the engineering
          team can use.
        </li>
        <li>
          <strong>E — Engineering &amp; Implementation.</strong> The engineering
          team runs the DBTL cycle, confirms the plan, and carries out the
          experiments and application.
        </li>
        <li>
          <strong>D — Dialogue &amp; Feedback.</strong> We show the latest
          design and experimental results to stakeholders, to the team members
          who raised the question, and to the wider target group, and listen to
          their feedback.
        </li>
      </ul>
      <p>
        Every design cycle in the narrative —{" "}
        <strong>Evidence-based Co-design</strong> and{" "}
        <strong>Situated Implementation</strong> — runs one SEED loop: the
        question that sparked it, what we explored, the engineering work that
        followed, and the dialogue that closed the loop. The cycles themselves
        are written on the NEST page, each paragraph tagged with its SEED phase.
      </p>
      <p>
        SEED is the seed of our product design — the first step that let NEST
        begin to treat cartilage pain — and we hope it can also be a seed for
        the iGEM community, helping more teams see real pain and solve it.
      </p>
    </>
  );
}

function CoDesignBlock() {
  return (
    <>
      <h3 className="mt-4 mb-3">E — Evidence-based Co-design</h3>
      <p>
        The first three cycles turn the needs we discovered into a material:
        SELP as a programmable filler, a linker system that lets us attach
        functional modules, and the modules that answer OA&rsquo;s vicious
        cycle. Each cycle is one SEED loop.
      </p>

      <h4 className="mt-4 mb-2">Cycle 1 — SELP</h4>
      <p data-seed-phase="spark">
        S: Based on our background research, we aim to design a material capable
        of treating a wide range of hyaline cartilage defects. The first step is
        to select a filling material that can meet the complex requirements of
        cartilage repair, which can directly fill the defect, immediately
        alleviate patients' pain, and fill the gap in early-stage treatment. We
        presented the first version of the SELP design draft — a protein design
        only covering fixed variants 2ky5,2ky10 and 2ky16 — to Dr. Qiu Xiaoming
        and the research team of Ouyang Hongwei. Doctors believe that cartilage
        in different parts of the body such as elbows and knees is subjected to
        varying levels of force and thus requires different levels of strength.
        If we only develop a material with a single strength, we will be unable
        to achieve the broad application goal of being able to fill all hyaline
        cartilage defects.
      </p>
      <p data-seed-phase="explore">
        E: Our research found that by regulating the repeat number of 2KY series
        proteins, we can alter the strength and toughness of our material. As
        the value increases, the pore size decreases, and cell adhesion
        increases accordingly, which is more conducive to GAG production, native
        cartilage growth, and upregulation of anti-inflammatory factor levels,
        and can also adapt to patients with different immune capacities and
        defect severities. We decided to find a method for programmatically
        regulating the series of proteins, and use modeling work to help us
        determine the final properties of the hydrogel.
      </p>
      <p data-seed-phase="engineering">
        E: We entered the DBTL cycle of SELP. To better realize the complex
        functions required for SELP as a versatile defect-filling material, we
        raised a number of issues at the experimental level and actively held
        discussions with multiple stakeholders. See{" "}
        <a href="#ihp-engagement-timeline">Engagement Timeline</a>.
      </p>
      <p data-seed-phase="dialogue">
        D: We showed our latest design to Dr. Qiu Xiaoming and the team led by
        Ouyang Hongwei again, and they gave relatively positive feedback.
        Subsequent experiments have verified the reliability of our design.
      </p>

      <h4 className="mt-4 mb-2">Cycle 2 — Linker System</h4>
      <p data-seed-phase="spark">
        S: Through literature research, we found that simply filling the defects
        is insufficient. To better meet the requirements of microenvironment
        repair for different clinical conditions, we intend to add
        therapy-related functional modules. However, if high-molecular-weight
        functional modules are directly inserted into the molecule, they will
        significantly impair the normal function of our SELP protein, so we plan
        to adopt protein linkers for extended design. Initially, we selected the
        mainstream SpyTag and SnoopTag linker systems, but protein modeling
        revealed that these linkers have excessively large molecular weights,
        which would mask the functional short peptide domains.
      </p>
      <p data-seed-phase="explore">
        E: We interviewed stakeholders, among whom Dr. Yi Junzhi suggested that
        SnoopLigase could be adopted as our linker system. We initially opted
        for the mainstream SpyTag and SnoopTag adapter system, yet protein
        modeling revealed that the molecular weight of these adapters was
        excessively large, which would mask the functional short peptide
        domains.
      </p>
      <p data-seed-phase="engineering">
        E: Through our modeling work, we engineered enzymes to improve
        efficiency and iterated on the SnoopLigase system. We innovatively
        developed the
        <strong>SnoopligaseZJU</strong> system, which significantly boosts work
        efficiency and ensures the efficient operation of our linker system.
      </p>
      <p data-seed-phase="dialogue">
        D: We showed our design to Dr. Yi Junzhi and Dr. Ren Bo, and they
        approved of it.
      </p>

      <h4 className="mt-4 mb-2">Cycle 3 — Functional Modules</h4>
      <p data-seed-phase="spark">
        S: After designing the programmable platform, we selected OA as the
        first specific application condition for the NEST series materials, and
        carried out modularization loading targeting OA. We hope our materials
        can meet clinical needs, so we consulted doctors.
      </p>
      <p data-seed-phase="explore">
        E: During our conversation with the doctor, we learned that the closed
        microenvironment of osteoarthritis readily gives rise to a vicious cycle
        involving three factors: local mechanical imbalance, GAG loss, and
        exacerbated inflammatory response. After extensive literature review, we
        found that the physical property of anisotropy can effectively mimic the
        natural structure of cartilage, as it can withstand shear force while
        maintaining toughness and elasticity, thus perfectly blocking the onset
        of this three-part vicious cycle.
      </p>
      <p data-seed-phase="engineering">
        E: After consulting with physicians and researchers, we designed
        magnetic nanoparticles to adsorb short peptides, and applied an external
        magnetic field to attract SELP, thereby achieving anisotropic alignment.
        We also developed a GAG- retaining peptide segment based on the
        principle of electrostatic adsorption, as well as a liposome delivery
        module that meets the personalized treatment needs of patients, to break
        down the three vicious cycle modules one by one.
      </p>
      <p data-seed-phase="dialogue">
        D: We revisited doctors and researchers and solicited their opinions.
        Some doctors pointed out that our material was overly complex, which
        might trigger concerns among clinicians in practical application and
        pose potential difficulties during the marketing approval process. This
        feedback prompted us to adopt a more cautious attitude toward the safety
        issues related to our material. In addition, we cross- referenced the
        patient needs collected via questionnaires to ensure that our
        programmable module can accommodate patients in almost all scenarios.
      </p>
    </>
  );
}

function SituatedBlock() {
  return (
    <>
      <h3 className="mt-4 mb-3">S — Situated Implementation</h3>
      <p>
        A material only matters if it reaches the clinic. The next three cycles
        carry NEST into practice — hardware, manufacturing, and market access —
        each again run as a SEED loop with the stakeholders who will use it.
      </p>

      <h4 className="mt-4 mb-2">Cycle 1 — Hardware</h4>
      <p data-seed-phase="spark">
        S: To enable our project to be applied in clinical settings, we have
        designed a set of hardware systems that are compatible with all
        biological designs. The first version includes an implantable device
        that integrates an endoscope and a blue light irradiation system, as
        well as a syringe.
      </p>
      <p data-seed-phase="explore">
        E: We proceeded to the clinical scenario trial. The interviewed nurses
        raised three core questions for us: Where should the preprocessing of
        materials be performed? How to operate this operating system? How can
        the system be adapted to the hospital's existing display devices? In
        response to these questions, we conducted on-site investigations and
        troubleshooting, consulted with a medical device company, and decided to
        add a premixing module, an electronic instruction manual, and a
        Bluetooth connection component.
      </p>
      <p data-seed-phase="engineering">
        E: Combined with the protein purification design of the wet lab, we
        carried out the iteration of hardware, and finally obtained the
        integrated hardware that is widely adapted to operating rooms of
        different specifications.
      </p>
      <p data-seed-phase="dialogue">
        D: To ensure the device conforms to users' usage habits, we invited the
        nurse team from the emergency ward of 254 Hospital and medical college
        students to conduct evaluations of different schemes, and finally
        selected the one with the highest score, which has also been recognized
        by stakeholders.
      </p>

      <h4 id="ihp-syringe-questionnaire" className="mt-5 mb-3">
        Syringe operation questionnaire
      </h4>
      <p>
        The syringe is the part of the hardware the clinician actually holds, so
        before fixing its design we designed an operation-experience
        questionnaire for 24 participants, each evaluating three configurations
        (A, B, C).
      </p>
      <Figure
        src={`${HP_FIG}/fig5.avif`}
        alt="Figure 5 — participant profile and evaluation design"
        width={4000}
        height={1227}
        caption={
          <>
            <strong>
              Figure 5 | Participant profile and evaluation design (24
              participants, 72 evaluations).
            </strong>{" "}
            (A) Participant roles. (B) Prior syringe use. (C) Balanced
            repeated-measures design in which each participant evaluated
            configurations A, B and C. The 72 evaluations are not 72 independent
            participants.
          </>
        }
      />
      <ExtendCard title="Questionnaire details: design, figures and comparison">
        <p>
          The run included 24 participants — clinicians, researchers, device
          developers, students and other users — each evaluating three
          configurations (A, B, C) in a balanced repeated-measures design,
          giving 72 evaluations. The figures compare the configurations on
          start-up force, resistance, speed and stop control, hand fatigue,
          operational problems and overall satisfaction.
        </p>
        <Figure
          src={`${HP_FIG}/fig6.avif`}
          alt="Figure 6 — favourable response profile across syringe configurations"
          width={4000}
          height={1149}
          caption={
            <>
              <strong>
                Figure 6 | Favourable response profile across syringe
                configurations (n = 24 per configuration).
              </strong>{" "}
              Values show the proportion of favourable responses for start
              force, resistance suitability, speed control, output smoothness,
              stop control and hand fatigue. Configuration B showed the most
              balanced profile; Configuration C showed more difficulty with
              start-up and fatigue. These are exploratory differences, not
              evidence of clinical superiority.
            </>
          }
        />
        <Figure
          src={`${HP_FIG}/fig7.avif`}
          alt="Figure 7 — operational problems and overall evaluation"
          width={4000}
          height={964}
          caption={
            <>
              <strong>
                Figure 7 | Operational problems and overall evaluation.
              </strong>{" "}
              (A) Proportion reporting any operational problem, no problem, or
              unable to judge (Q11). (B) Satisfaction (Q12 D+E) and willingness
              to reuse (Q13 D+E) by configuration.
            </>
          }
        />
      </ExtendCard>
      <p>
        Configuration B had the most balanced profile, which informed the scheme
        we carried forward. These are exploratory results from the evaluation,
        not clinical evidence.
      </p>

      <h4 className="mt-4 mb-2">Cycle 2 — Manufacturing</h4>
      <p data-seed-phase="spark">
        S: We hope our materials can be manufactured in a factory, and we have
        discussed matters related to sample production with Beijing MicroXinkang
        Company. They have extended a cooperation invitation to us and suggested
        that we take into account the design of the materials for protein
        purification, product transportation and storage.
      </p>
      <p data-seed-phase="explore">
        E: We conducted a literature review on protein extraction, purification
        and drug transportation methods of commercially available hydrogels, and
        finally decided to make it into protein powder, package it into a
        pharmaceutical preparation and supply it to hospitals. We visited a
        mature synthetic biology raw material production company, YuanYi Bio, to
        learn more knowledge applicable in practical scenarios.
      </p>
      <p data-seed-phase="engineering">
        E: We convert the information obtained from research and enterprise
        guidance into specific engineering design solutions, and further sort
        out the technical issues that NEST needs to address in the process of
        transforming from laboratory samples to standardized products focusing
        on key links such as protein purification, powder preparation, product
        packaging, transportation and storage. We take protein powder as the
        Product Form for priority exploration, and focus on how to maintain the
        integrity of protein materials and the properties of their hydrogel
        after reconstitution while facilitating factory production,
        transportation and storage.In addition, based on the production
        experience of the enterprise, we sorted out the key points of quality
        control that need attention in the subsequent sample preparation,
        including protein purity, storage stability, material properties after
        reconstitution and batch consistency, and incorporated these
        requirements into the communication with Microxincon regarding sample
        cooperation, laying a foundation for subsequent process optimization and
        production scale-up.
      </p>
      <p data-seed-phase="dialogue">
        D: We conducted another interview with Weixinkang, obtained recognition
        from their engineers, and successfully signed a sample cooperation
        agreement with them.
      </p>

      <h4 className="mt-4 mb-2">
        Cycle 3 — Entrepreneurship &amp; Market Access
      </h4>
      <p data-seed-phase="spark">
        S: As a medical material to be implanted into the human body, NEST
        requires us to treat product safety with greater prudence and undergo
        various inspections for Market Access. We have numerous doubts regarding
        the access process, market conditions and sales channels. After
        conducting research, we have also formed some thoughts and questions
        about the access of national health insurance and commercial health
        insurance. Following a preliminary cost calculation, we find that our
        upfront investment is enormous and unavoidable, which determines that we
        need upfront financial support.
      </p>
      <p data-seed-phase="explore">
        E: In response to these issues, we have extensively reached out to
        stakeholders across multiple links including production, sales,
        government regulation, finance, and entrepreneurship guidance. We have
        also received guidance from Shaanxi Lanyiwei Biotechnology Co. , Ltd. ,
        which boasts rich experience in the commercialization of medical
        research achievements.
      </p>
      <p data-seed-phase="engineering">
        E: In our design, we placed greater emphasis on cost considerations,
        established a detailed business model, sought out CDMO partners,
        participated in multiple entrepreneurship events, and successfully
        secured our first letter of intent for investment. For more information,
        please refer to <Link to="/entrepreneurship">Entrepreneurship</Link>
      </p>
      <p data-seed-phase="dialogue">
        D: Every time we modify and iterate on our business model, we will
        consult with the corresponding stakeholders for feedback until we reach
        a consensus within our team and among the stakeholders. Through
        competitions and investor pitches, the recognition of investment
        institutions also demonstrated the project’s entrepreneurial
        feasibility.
      </p>
    </>
  );
}

function DiscoveryBlock() {
  return (
    <>
      <h3 className="mt-4 mb-3">N — Need-led Discovery</h3>
      <p>
        After a member of our team suffered an acute cartilage injury, we
        developed an interest in hyaline cartilage injuries. We found that
        hyaline cartilage injuries can lead to a variety of conditions,
        including osteoarthritis, focal traumatic defects, and post-surgical
        adaptive defects.
      </p>
      <p>
        We conducted questionnaire surveys in the following areas and platforms:
        a university community (around 150 respondents), Qigudeng Subdistrict,
        Gongshu District, Hangzhou, a certain subdistrict in Sandun Town, Xihu
        District, Hangzhou, Shuishang West Subdistrict, Nankai District, Tianjin
        (a total of 1200 respondents), and Chinese internet platforms (RedNote,
        CDM patient support groups)(300 respondents). Our questionnaire form
        features rigorous privacy protection and risk notification mechanisms.
        In total the questionnaire reached more than{" "}
        <strong>1,700 people</strong>, of whom{" "}
        <strong>1,647 provided valid responses</strong>.
      </p>
      <p>
        In addition to the extensive questionnaire survey, we also conducted
        in-depth interviews with patients representing three main types of
        hyaline cartilage injury. For details, please refer to the subsequent{" "}
        <a
          href="#ihp-engagement-
        patient"
        >
          Stakeholder Interviews
        </a>
        . The wide distribution of such cases, coupled with the sharp pain and
        persistent foreign body sensation experienced by patients, motivated us
        to develop a product capable of widely healing hyaline cartilage
        injuries, which also inspired our platform-based design concept.
      </p>
      <ExtendCard title="Survey details: responses, figures and clinical context">
        <p>
          Among the 1,647 valid responses, 391 respondents (23.7%) reported
          personal or family experience of cartilage injury; including family
          members who were unsure, the figure was 432 (26.2%). The university
          and online samples were purposively enriched, so the overall share is
          not population-representative.
        </p>
        <Figure
          src={`${HP_FIG}/fig1.avif`}
          alt="Figure 1 — survey reach and experience of cartilage injury"
          width={4000}
          height={1528}
          caption={
            <>
              <strong>
                Figure 1 | Survey reach and experience of cartilage injury.
              </strong>{" "}
              (A) Valid responses by recruitment channel (n = 1,647). (B)
              Explicit personal or family experience by channel (25.8%, 21.2%,
              33.1%); light bars include family members who were unsure (27.2%,
              24.2%, 33.8%).
            </>
          }
        />
        <p>
          The clinical profile differed by channel. Among the 391 respondents
          with personal or family experience, acute injury was the largest
          mechanism in the university sample (53.8%), while the community sample
          had similar acute and chronic shares (33.1% and 32.7%) and the online
          sample most often reported recurrent injury after acute injury
          (34.7%). Surgical treatment was reported by 7.7% of the university
          group, 10.2% of the community group and 20.4% of the online group. In
          the community, 57.8% of respondents with chronic degeneration (OA)
          were 46 or older (n = 83).
        </p>
        <Figure
          src={`${HP_FIG}/fig2.avif`}
          alt="Figure 2 — clinical profile across survey channels"
          width={4000}
          height={1603}
          caption={
            <>
              <strong>
                Figure 2 | Clinical profile across survey channels.
              </strong>{" "}
              (A) Injury mechanism among respondents with personal or family
              experience (n = 391). (B) Proportion reporting surgical treatment.
              (C) Age distribution of community respondents with chronic
              degeneration/OA (n = 83); 57.8% were aged 46 years or older.
              Injury mechanism is used as a proxy for local traumatic defect and
              OA.
            </>
          }
        />
        <p>
          Knee involvement was most common (80.8%), followed by hip, ankle and
          spine. 40.9% of these respondents reported severe or sharp pain, and
          35.3% reported a foreign-body sensation lasting hours to long-term;
          interviewees described this as persistent irritation rather than pain
          alone.
        </p>
        <Figure
          src={`${HP_FIG}/fig3.avif`}
          alt="Figure 3 — broad injury sites and persistent symptom burden"
          width={4000}
          height={1268}
          caption={
            <>
              <strong>
                Figure 3 | Broad injury sites and persistent symptom burden.
              </strong>{" "}
              Among respondents with personal or family experience (n = 391),
              (A) knee involvement was most common, followed by hip, ankle and
              spinal involvement; (B) 40.9% reported severe or sharp pain; and
              (C) 35.3% reported foreign-body sensation lasting hours to
              long-term. Injury site is multi-select; percentages sum to more
              than 100%.
            </>
          }
        />
        <p>
          The treatment picture shows the limits of current options. Painkillers
          were the most common treatment (61.6%), followed by TCM (32.7%) and
          rehabilitation exercise (29.4%); 12.5% had surgery and 13.6% received
          no treatment. Recovery outcomes left residual symptoms (slight
          improvement, no change or worsening) in 47–71% of treated respondents;
          and when asked for their first-choice treatment, respondents preferred
          TCM (35.8%) and rehabilitation (33.2%) ahead of painkillers (16.9%)
          and surgery (14.1%). The same trade-offs recur in interviews:
          untreated symptoms persist, rehabilitation is hard to sustain, and
          surgery is reserved for more severe cases.
        </p>
        <Figure
          src={`${HP_FIG}/fig4.avif`}
          alt="Figure 4 — treatment pathways, recovery, and patient preference"
          width={4000}
          height={2064}
          caption={
            <>
              <strong>
                Figure 4 | Treatment pathways, recovery, and patient preference.
              </strong>{" "}
              (A) Treatments ever received (multi-select). (B) First-choice
              treatment in the ranking question (n = 391). (C) Recovery outcomes
              by mutually exclusive treatment pathway; residual symptoms (slight
              improvement, no change, or worsening) remained in 47–71% of
              treated respondents. &ldquo;No treatment&rdquo; respondents had no
              recorded recovery outcome.
            </>
          }
        />
        <p>
          Literature research shows that current statistics on osteoarthritis
          (OA) and its associated cartilage damage are relatively comprehensive,
          while data on local traumatic defects and postoperative secondary
          defects remain very limited. For example, the Global Burden of Disease
          (GBD) study has compiled osteoarthritis (OA) data from 204 countries
          and regions spanning 1990 to 2023, categorized by joint site, age,
          gender and region [1]. The US Osteoarthritis Initiative (OAI) also
          conducted long-term follow-up on 4,796 subjects, accumulating over
          430,000 clinical and imaging examinations and approximately 26.63
          million images [2].In contrast, studies on focal cartilage defects are
          generally smaller in scale; for instance, Hjelle et al. only
          investigated the status of cartilage defects in 1,000 patients
          undergoing knee arthroscopy [3]. Considering the sufficiency of
          evidence and the safety of the study design, we decided to take
          OA-related cartilage defects, which have the largest volume of data
          and the widest scope of influence, as the primary research and
          development target of NEST.
        </p>
      </ExtendCard>
      <p>
        In the existing literature, there are no authoritative sources
        specifying what degree of cartilage defect qualifies as a pathological
        condition. Even for osteoarthritis (OA), which has the most
        well-established standards and comprehensive data, no unified diagnostic
        criteria are defined in the authoritative treatment guidelines of either
        the US or China. Chinese guidelines adopt both the Kellgren- Lawrence
        (K–L) and Outerbridge grading systems [4], while the American Academy of
        Orthopaedic Surgeons (AAOS) guidelines primarily target patients with
        already diagnosed symptomatic OA [5]. Neither set of guidelines
        establishes a uniform standard for determining disease onset or
        initiating treatment based solely on the area, depth, or volume of a
        cartilage defect. In this context, we have found that doctors from
        different regions and with different professional backgrounds do not
        reach consistent diagnoses for the same type of cartilage defect. In
        cases of early- to-mid stage osteoarthritis (OA) and localized traumatic
        defects, the lack of unified diagnostic criteria and effective treatment
        protocols for early cartilage injury tends to lead clinicians to refrain
        from classifying the patient as having a pathological condition.
        However, in the broad category of post-surgical cartilage injury, the
        underlying cause of such damage often stems from the fact that, in
        orthopedic surgery, the metrics for measuring surgical success overlook
        the threat posed by implanted materials to cartilage health, and fail to
        attach due importance to functional recovery as defined by the patient's
        perceived physical well-being.For example, when conducting an in-depth
        interview with Yue, a patient suffering from cartilage wear after
        patella surgery, she elaborated in detail that the attending doctor's
        realignment of her original patella position had caused the artificial
        implant to encroach on the original space for cartilage survival. This
        point was also confirmed by multiple doctors in the doctor interviews.
      </p>
      <p>
        On the one hand, when patients receive a diagnosis that no treatment is
        needed after going to the hospital, they will deliberately ignore their
        pain symptoms and rationalize their conditions; on the other hand, some
        patients, especially elderly patients, inherently have a relatively low
        willingness to seek medical treatment, and the elderly in remote areas
        also face the problem of inconvenient access to medical care. Grandpa Gu
        from Yantan Village, Zhejiang Province, epitomizes the predicament of
        elderly patients.
      </p>
      <p>
        Out of this discovery we defined four values that our project design is
        organized around:
      </p>
      <ul>
        <li>
          <strong>Health</strong> — improve the joint health and quality of life
          of patients with cartilage injury.
        </li>
        <li>
          <strong>Empathy</strong> — see the patient experiences, such as pain
          and foreign-body sensation, that are easily overlooked.
        </li>
        <li>
          <strong>Accessibility</strong> — pay attention to treatment needs
          across different ages, regions and care conditions.
        </li>
        <li>
          <strong>Responsibility</strong> — advance development based on
          evidence, and weigh safety and real-world impact cautiously.
        </li>
      </ul>

      <h4 className="mt-5 mb-3">References</h4>
      <ol className="small">
        <li id="ihp-ref-1">
          GBD 2021 Osteoarthritis Collaborators. Global, regional, and national
          burden of osteoarthritis, 1990&ndash;2020 and projections to 2050: a
          systematic analysis for the Global Burden of Disease Study 2021.{" "}
          <em>Lancet Rheumatology</em>. 2023;5(9):e508&ndash;e522.
          doi:10.1016/S2665-9913(23)00163-7.
        </li>
        <li id="ihp-ref-2">
          National Institute of Mental Health Data Archive. Osteoarthritis
          Initiative (OAI) [data repository]. National Institutes of Health;
          accessed 19 October 2026.
        </li>
        <li id="ihp-ref-3">
          Hjelle K, Solheim E, Strand T, Muri R, Brittberg M. Articular
          cartilage defects in 1,000 knee arthroscopies. <em>Arthroscopy</em>.
          2002;18(7):730&ndash;734. doi:10.1053/jars.2002.32839.
        </li>
        <li id="ihp-ref-4">
          Joint Surgery Group, Chinese Orthopaedic Association. Chinese
          guideline for diagnosis and management of osteoarthritis (2018
          edition). <em>Chinese Journal of Orthopaedics</em>.
          2018;38(12):705&ndash;715.
          doi:10.3760/cma.j.issn.0253-2352.2018.12.001. [In Chinese].
        </li>
        <li id="ihp-ref-5">
          American Academy of Orthopaedic Surgeons.{" "}
          <em>
            Management of Osteoarthritis of the Knee (Non-Arthroplasty):
            Evidence-Based Clinical Practice Guideline
          </em>
          . 3rd ed. Rosemont, IL: AAOS; 2021.
        </li>
      </ol>
    </>
  );
}

function ImpactBlock() {
  return (
    <>
      <h3 className="mt-4 mb-3">T — Trust and Lasting Impact</h3>
      <h4 className="mt-4 mb-2">Sustained Commercialization</h4>
      <p>
        Medical products require a long lead time to reach the market—far beyond
        a single iGEM season—so we need a sustainable, long-term business plan.
        To meet the relevant administrative requirements, we plan to file a
        patent application in November 2026. We have developed a highly detailed
        Business Plan, including a dedicated ESG module designed to encourage
        NexCode Biotechnologies to consider its broader social impact and
        operate as a responsible enterprise. All 16 team members are committed
        to continuously improving the project, achieving profitability, and
        advancing the real- world translation of NEST.
      </p>
      <h4 className="mt-4 mb-2">The Pain That Goes Unnoticed</h4>
      <p>
        During our preliminary research, we discovered a striking discrepancy
        surrounding articular cartilage injuries: many people around us reported
        symptoms, yet relatively few cases appeared in official records. Our
        subsequent consultations with hospital stakeholders confirmed that pain
        which “does not meet the diagnostic threshold but is nonetheless real”
        is far from uncommon in clinical practice. However, because effective
        solutions for early-stage cartilage damage remain limited, both
        physicians and patients tend to overlook these injuries.
      </p>
      <p>
        Protecting cartilage health requires collective action. To help break
        this cycle of neglect, we conducted targeted educational and advocacy
        activities for children, older adults, the general public, and medical
        students. Under the guidance of Zhang Binghong, we compiled our findings
        into a research report and submitted it to the Hangzhou Municipal Health
        Commission. The Commission accepted our recommendations and issued an
        official response, which cannot be publicly disclosed due to policy
        requirements. Our team also provided practical references for the
        government’s planned training programs for community hospitals,
        residents’ committees, and other grassroots organizations. Our
        age-specific lectures and activities may serve as useful examples for
        future public education on cartilage health.
      </p>
      <p>
        We also encouraged physicians and medical students to adopt a
        patient-centered approach to orthopedic care—one that values patients’
        lived experiences of health rather than focusing solely on the
        restoration of physical function. In collaboration with medical
        anthropologists, we wrote two papers examining the structural factors
        within healthcare systems that cause the hidden suffering associated
        with seemingly minor conditions to be overlooked. We shared our findings
        with the Institute of Social Medicine and Health Management at Zhejiang
        University. In addition, we organized lectures and seminars on medical
        anthropology to strengthen future physicians’ awareness of patients’
        lived experiences. These activities helped participants understand that
        illness is not merely a form of physiological harm; it is often shaped
        by social conditions and compounded by structural violence embedded in
        systems of power.
      </p>
      <h4 className="mt-4 mb-2">Research Report</h4>
      <p>
        The research report records this work in full. Open the card below to
        read it here, or use the link to open it in a new tab:{" "}
        <a href={SURVEY_REPORT_PDF} target="_blank" rel="noreferrer">
          research report on the neglected pain of cartilage injury
        </a>
        .
      </p>
      <ExtendCard title="Read the research report (PDF)">
        <div className="ihp-pdf">
          <div className="ihp-pdf__head">
            <strong>
              Survey report — the neglected pain of cartilage injury
            </strong>
            <a href={SURVEY_REPORT_PDF} target="_blank" rel="noreferrer">
              Open in a new tab
            </a>
          </div>
          <iframe
            className="ihp-pdf__frame"
            src={SURVEY_REPORT_PDF}
            title="Survey report — the neglected pain of cartilage injury"
            loading="lazy"
          />
        </div>
      </ExtendCard>

      <h4 className="mt-4 mb-2">
        Our Contribution to Synthetic Biology Education
      </h4>
      <p>
        Throughout our synthetic biology education initiatives, we received an
        enthusiastic response from every educational institution we worked with.
        However, through conversations with other teams, we learned that many
        struggled to find suitable educational partners. To address this
        challenge, we collaborated with Westlake and XJTLU-China to create{" "}
        <a href="https://syneduglobal.top" target="_blank" rel="noreferrer">
          <strong>SynEdu Global</strong>
        </a>
        , an open synthetic biology education platform for everyone. Both
        educational institutions and iGEM teams can use the platform to invite
        teams to collaborate and share synthetic biology education resources. By
        moving these connections and materials online, the platform also helps
        reduce regional disparities in access to educational opportunities.
      </p>
      <p>
        We later recognized that the biotechnology industry also has a strong
        interest in synthetic biology and that many industry professionals
        require further education in the field. We therefore partnered with
        Jiangnan University to develop an industry-focused module. Our four
        universities signed a five-year cooperation agreement to ensure the
        platform’s sustainable, long-term operation.{" "}
        <Link to="/education">Learn more</Link>.
      </p>
      <p>
        Our educational program extended beyond lectures, hands-on activities,
        and fitness exercises. We also collaborated with artist Chen Xi to
        create visual artwork.{" "}
        <Link to="/education">View the gallery</Link>. Beyond promoting
        synthetic biology and reducing public misconceptions, we
        critically reflected on the development of both the healthcare system
        and synthetic biology itself. To deepen this reflexive inquiry, we held
        extensive discussions with Dr. Shen Yang and Dr. Chen Bohang.{" "}
        <Link to="/education">Learn more</Link>.
      </p>

      <h4 className="mt-5 mb-3">Summary and Reflection</h4>
      <p>
        Our iHP work has been as comprehensive and effective as possible,
        addressing all patient-centered aspects. We not only focus on
        biotherapeutic approaches, but also care deeply about the social
        circumstances of patients. We have also contributed to the iGEM
        community through numerous platform-based initiatives. Thank you to all
        members of our team; it is your dedication that has made this
        comprehensive iHP work possible.
      </p>
      <p>
        Two limitations remain: we have not developed synthetic biology safety
        standards for biomimetic cartilage biomaterials, and we have not yet
        established a sufficiently transferable format for other teams to
        reproduce our anthropological research approach.
      </p>
    </>
  );
}

function MixedMethodsBlock() {
  return (
    <>
      <h3 className="mt-4 mb-3">Mixed methods research</h3>
      <p>
        Our work follows <strong>mixed-methods research</strong> (Creswell &amp;
        Plano Clark, 2018,{" "}
        <em>Designing and Conducting Mixed Methods Research</em>, 3rd ed.,
        SAGE): understanding a complex social phenomenon cannot rely on a single
        type of data. We deliberately collect, analyze and integrate
        quantitative data (surveys and statistics — how many, how distributed,
        what relationships exist) and qualitative data (one-to-one interviews —
        why things happen, how people understand them, which contexts and
        mechanisms lie behind them). The NIH&rsquo;s{" "}
        <a
          href="https://obssr.od.nih.gov/research-resources/mixed-methods-research"
          target="_blank"
          rel="noreferrer"
        >
          mixed-methods research guidance
        </a>{" "}
        makes the same point: integrated quantitative and qualitative evidence
        explains a problem better than either type alone.
      </p>
      <p>
        In practice the survey gave us breadth — how common cartilage pain is,
        who it affects and which treatments fail — while the interviews gave us
        depth — why patients wait, why doctors under-diagnose, and how a device
        fits an operating room. We integrated the two in the PRD documents that
        opened each engineering cycle, so every design change can be traced back
        to a need that both kinds of evidence support.
      </p>
    </>
  );
}

function AnthroBlock() {
  return (
    <>
      <h3 className="mt-4 mb-3">Anthropology &amp; philosophy</h3>
      <p>
        We also fold humanities discussion and reflection into the project — not
        only about how cartilage health is diagnosed and healed, but also about
        the iGEM community and the ethics of synthetic biology. This lens keeps
        asking who is heard and who is missed when a technology enters the
        clinic: it shaped how we read the &ldquo;invisible&rdquo; pain in our
        survey and led us to work with anthropology scholars on the structural
        reasons small illnesses go unnoticed.
      </p>
      <p>
        The outcomes of that work — one paper written with anthropology
        scholars, and the medical-anthropology lecture and seminar we ran for
        future doctors — are described under{" "}
        <a href="#ihp-nest-trust">
          <strong>T — Trust and Lasting Impact</strong>
        </a>
        .
      </p>
    </>
  );
}

/* The stakeholder interviews are grouped along the product path, matching
   the stakeholder map above the timeline. */
const TIMELINE_STAGES = [
  "Patient",
  "R&D",
  "Treatment",
  "Manufacturing",
  "Market Authorization & Access",
  "Rehabilitation",
];

/* Deep links for the stage headings under "Stakeholder Interviews". */
const TIMELINE_STAGE_IDS: Record<string, string> = {
  Patient: "ihp-engagement-patient",
  "R&D": "ihp-engagement-rd",
  Treatment: "ihp-engagement-treatment",
  Manufacturing: "ihp-engagement-manufacturing",
  "Market Authorization & Access": "ihp-engagement-market-access",
  Rehabilitation: "ihp-engagement-rehabilitation",
};

function EngagementBlock() {
  return (
    <>
      <h3 className="mt-4 mb-3">Stakeholder Engagement</h3>

      <h4 id="ihp-stakeholders-map" className="mt-4 mb-3" data-toc="include">
        Stakeholder Map
      </h4>
      <p>
        We aimed to engage a broad range of stakeholders through an organized
        interview process. We therefore scheduled interviews for different
        modules in line with the progress of our project design. In total,{" "}
        <strong>56 stakeholders</strong> participated in our interviews and
        technical tests, including patients, physicians, nurses, researchers,
        government officials, administrative agencies, manufacturers, business
        advisers, humanities scholars, and artists.
      </p>
      <StakeholderChain
        stages={chainStages}
        note="To protect patient privacy, we have applied privacy protection measures to all patients except those who have given consent to appear on camera."
      />
      <h4 id="ihp-engagement-timeline" className="mt-5 mb-3" data-toc="include">
        Stakeholder Interviews
      </h4>
      <p>
        What follows is a timeline of our interactions with the stakeholders who
        made our <a href="#nest">NEST-based</a> Integrated Human Practices
        possible.
      </p>
      {TIMELINE_STAGES.map((stage) => {
        const items = timelineItems.filter((item) => item.stage === stage);
        if (!items.length) return null;
        return (
          <section key={stage} className="ihp-timeline-stage">
            <h4
              id={TIMELINE_STAGE_IDS[stage]}
              className="ihp-timeline-stage__title"
              data-toc="include"
              data-toc-depth="3"
            >
              {stage}
            </h4>
            <Timeline items={items.map((item) => ({ ...item, date: "" }))} />
          </section>
        );
      })}

      <h4 className="mt-5 mb-3" data-toc="include">
        Further reading
      </h4>
      <ul>
        <li>
          Interested in the design details?{" "}
          <Link to="/design">Go to Design</Link>.
        </li>
        <li>
          Interested in the business plan?{" "}
          <Link to="/entrepreneurship">Go to Entrepreneurship</Link>.
        </li>
        <li>
          Interested in our anthropological and philosophical reflection?{" "}
          <Link to="/education">Go to Education</Link>.
        </li>
      </ul>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

const HP_PAGES = [
  { key: "toolbox", label: "iHP Toolkit" },
  { key: "nest", label: "NEST" },
  { key: "engagement", label: "Stakeholder Engagement" },
];

function SectionSubnav({
  items,
  className = "eng-subnav",
}: {
  items: { id: string; label: string }[];
  className?: string;
}) {
  const navRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState(items[0]?.id);

  useEffect(() => {
    const nav = navRef.current;
    const section = nav?.parentElement;
    if (!nav || !section) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = getSectionScrollOffset() + 8;
      let current = items[0]?.id;
      for (const item of items) {
        const target = section.querySelector<HTMLElement>(`#${item.id}`);
        if (target && target.getBoundingClientRect().top <= line)
          current = item.id;
      }
      if (
        window.scrollY + innerHeight >=
        document.documentElement.scrollHeight - 2
      ) {
        current = items[items.length - 1]?.id;
      }
      setActiveId(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(nav);
    for (const item of items) {
      const target = section.querySelector(`#${item.id}`);
      if (target) observer.observe(target);
    }
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    nav.addEventListener("transitionend", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      nav.removeEventListener("transitionend", schedule);
    };
  }, [items]);

  const jump = (id: string) => {
    if (!document.getElementById(id)) return;
    history.replaceState(null, "", `#${id}`);
    /* One easing curve that keeps tracking the heading, so late layout
       changes above the target never turn into an instant correction. */
    scrollToSection(id);
  };
  return (
    <nav ref={navRef} className={className} aria-label="Page sections">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`eng-subnav-button${activeId === item.id ? " active" : ""}`}
          aria-current={activeId === item.id ? "location" : undefined}
          onClick={() => jump(item.id)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}

function NestFrameworkBlock() {
  const rows = [
    {
      letter: "N",
      module: "Need-led Discovery",
      what: "Research the background of the problem and uncover the real pain points that still need solving.",
    },
    {
      letter: "E",
      module: "Evidence-based Co-design",
      what: "Study the literature and the real world, bring product-design questions back to the engineering team, and find solutions together.",
    },
    {
      letter: "S",
      module: "Situated Implementation",
      what: "Consider the concrete situations in which the product is implemented — production, market access and user experience — and adapt it so that access improves in practice.",
    },
    {
      letter: "T",
      module: "Trust and Lasting Impact",
      what: "Consider the lasting contribution the product can make to the target group, the industry and the iGEM community — earning the trust of users and partners and carrying social responsibility.",
    },
  ];
  return (
    <>
      <h3 className="mt-4 mb-3">NEST — the iHP framework</h3>
      <p>
        The four NEST modules organise the human-practices narrative: each one
        asks a different question about the product, from the first real need to
        the impact that outlasts the competition.
      </p>
      <div className="table-responsive mb-4">
        <table
          className="table table-bordered align-middle"
          aria-label="The NEST human-practices framework"
        >
          <TableCaption as="caption">
            Table 1 | The NEST human-practices framework.
          </TableCaption>
          <thead className="table-primary">
            <tr>
              <th scope="col" style={{ width: "4.5rem" }}>
                Letter
              </th>
              <th scope="col">Module</th>
              <th scope="col">What we do</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.letter}>
                <th scope="row">{row.letter}</th>
                <td>
                  <strong>{row.module}</strong>
                </td>
                <td>{row.what}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function StakeBridgeBlock() {
  return (
    <>
      <h3 className="mt-4 mb-3">StakeBridge</h3>
      <p>
        We expect stakeholder maps to be comprehensive, structured, and aligned
        with the project development lifecycle. To this end, we organize
        stakeholders based on the general workflow of product design. The
        modules of our project are divided into: Patient → R&amp;D → Treatment →
        Manufacturing → Market Authorization &amp; Access → Rehabilitation.
      </p>
      <p>
        Following this guiding principle, we developed a piece of software that
        enables other teams to organize the ranking of stakeholders and
        interview content based on product concepts, so as to facilitate project
        management. Inspired by BioBricks and the parts library, we also built a
        stakeholder library within the tool, which displays stakeholders in the
        relevant field who are willing to communicate with teams, helping other
        iGEMers take the first step in stakeholder outreach.
      </p>
      <StakeBridgeEmbed />
    </>
  );
}

function ToolboxPage() {
  const sections = [
    {
      id: "ihp-toolbox-nest",
      label: "NEST framework",
      node: <NestFrameworkBlock />,
    },
    { id: "ihp-toolbox-seed", label: "SEED", node: <SeedMethodBlock /> },
    {
      id: "ihp-toolbox-stakebridge",
      label: "StakeBridge",
      node: <StakeBridgeBlock />,
    },
    {
      id: "ihp-toolbox-mixed",
      label: "Mixed Methods",
      node: <MixedMethodsBlock />,
    },
    {
      id: "ihp-toolbox-anthro",
      label: "Anthropology & Philosophy",
      node: <AnthroBlock />,
    },
  ];
  return (
    <>
      <p>
        We wanted our Human Practices work to make NEST more responsive to
        real-world needs and to provide useful approaches for future teams. We
        therefore compiled the tools used throughout our Human Practices
        activities, including analytical and iterative frameworks, software for
        organizing stakeholder interviews, and a stakeholder network that other
        teams can build upon.
      </p>
      <SectionSubnav
        className="eng-subnav ihp-toolbox-tabs"
        items={sections.map(({ id, label }) => ({ id, label }))}
      />
      {sections.map((entry) => (
        <section className="ihp-subpage" id={entry.id} key={entry.id}>
          {entry.node}
        </section>
      ))}
    </>
  );
}

const NEST_GLYPHS: Record<string, { w: number; h: number; d: string }> = {
  N: {
    w: 340,
    h: 400,
    d: "M409 3636 c-2 -3 -23 -7 -47 -10 -23 -3 -53 -13 -66 -23 -41 -30 -44 -45 -52 -298 -1 -49 -3 -103 -3 -118 0 -16 -4 -33 -7 -39 -4 -6 -6 -108 -6 -227 1 -119 1 -234 1 -256 -1 -22 -1 -48 0 -57 1 -21 1 -71 0 -95 -1 -10 0 -82 2 -161 1 -78 -1 -145 -4 -148 -3 -4 -1 -16 4 -27 8 -14 8 -22 -1 -27 -8 -5 -9 -10 -2 -14 7 -4 9 -140 6 -399 -5 -425 -7 -508 -18 -525 -3 -6 -2 -13 3 -16 5 -4 9 -93 9 -209 -1 -235 0 -463 1 -527 3 -207 0 -383 -9 -404 -22 -58 -37 -56 432 -56 l429 0 -6 82 c-3 45 -9 86 -13 92 -3 6 -7 117 -8 246 -1 129 -3 242 -4 250 0 8 2 71 6 140 7 117 8 279 5 730 -2 304 2 390 17 378 6 -6 12 -17 12 -24 0 -8 5 -14 10 -14 6 0 16 -12 22 -27 7 -16 20 -40 31 -55 10 -16 16 -28 13 -28 -3 0 4 -11 16 -25 12 -14 31 -40 42 -59 12 -19 37 -58 56 -87 19 -30 41 -67 49 -84 7 -16 17 -37 22 -45 5 -8 12 -22 16 -30 4 -8 12 -21 19 -30 52 -63 74 -95 74 -110 0 -10 9 -20 20 -23 11 -3 25 -19 31 -36 6 -17 15 -31 20 -31 5 0 9 -7 9 -15 0 -7 6 -18 13 -22 6 -4 21 -24 31 -43 10 -19 29 -46 41 -60 13 -14 26 -34 29 -45 3 -11 22 -37 41 -57 19 -20 35 -41 35 -46 0 -4 11 -19 25 -32 14 -13 25 -27 25 -32 0 -10 16 -31 43 -56 9 -9 17 -22 17 -29 0 -7 4 -13 10 -13 5 0 21 -23 35 -50 14 -28 33 -59 43 -69 9 -10 28 -37 40 -61 13 -23 45 -69 70 -102 26 -33 55 -75 64 -93 10 -18 26 -39 36 -47 10 -7 28 -30 41 -50 12 -21 27 -38 32 -38 5 0 9 -7 9 -15 0 -9 6 -18 14 -21 8 -3 18 -18 21 -34 3 -16 13 -34 21 -41 8 -6 14 -20 14 -30 0 -11 9 -27 20 -36 11 -10 20 -25 20 -34 0 -35 41 -39 429 -39 l379 0 14 23 c24 36 37 143 34 282 -2 72 -5 130 -6 130 -9 0 -27 1027 -19 1105 1 14 -1 37 -4 52 -3 16 -1 43 4 60 8 27 11 306 7 626 0 28 -6 70 -14 91 -8 23 -13 79 -13 133 1 51 0 192 0 313 -2 254 5 423 19 480 13 56 12 168 -2 202 -18 43 -74 93 -104 93 -14 0 -33 4 -42 9 -10 5 -46 5 -87 -1 -45 -6 -96 -6 -144 1 -50 6 -80 6 -87 0 -8 -7 -14 -6 -19 0 -3 6 -16 11 -28 11 -12 0 -53 3 -91 6 -96 9 -173 -9 -209 -48 -15 -17 -27 -37 -27 -44 0 -8 -4 -14 -8 -14 -9 0 -7 -251 3 -455 4 -66 8 -187 10 -270 1 -82 6 -202 9 -265 8 -127 9 -143 7 -180 -2 -64 -4 -117 -3 -135 0 -11 1 -54 1 -95 0 -41 0 -79 1 -85 5 -49 5 -265 0 -320 -4 -38 -8 -63 -8 -54 -1 8 -15 28 -32 44 -16 16 -30 34 -30 41 0 6 -20 32 -45 56 -25 25 -45 53 -45 63 0 10 -3 16 -6 12 -4 -3 -12 -1 -18 6 -23 24 -76 95 -76 102 0 3 -12 20 -27 36 -16 15 -41 47 -58 69 -16 22 -40 54 -52 69 -13 16 -23 36 -23 44 0 8 -18 34 -40 58 -22 24 -40 50 -40 56 0 7 -4 13 -9 13 -6 0 -16 11 -23 25 -23 43 -150 229 -169 248 -11 10 -19 26 -19 37 0 10 -3 20 -7 22 -10 4 -80 110 -106 158 -10 19 -24 40 -31 45 -6 6 -22 31 -36 58 -14 26 -37 62 -52 80 -16 17 -28 37 -28 43 0 5 -13 23 -28 40 -16 16 -44 58 -63 94 -18 36 -39 71 -46 78 -7 7 -13 20 -13 28 0 8 -4 14 -10 14 -5 0 -10 7 -10 15 0 9 -7 18 -15 21 -8 4 -15 15 -15 26 0 11 -13 39 -29 63 -16 24 -32 53 -36 64 -3 12 -11 21 -16 21 -5 0 -9 5 -9 12 0 7 -9 21 -20 33 -11 11 -28 31 -39 44 -24 32 -120 41 -180 18 -21 -9 -40 -14 -42 -12 -10 9 -183 27 -264 27 -49 0 -95 4 -101 9 -6 5 -13 7 -15 5z",
  },
  E: {
    w: 335,
    h: 400,
    d: "M2915 3619 c-22 -5 -96 -9 -165 -8 -69 0 -129 0 -135 0 -5 0 -68 -3 -140 -6 -152 -6 -230 -6 -540 -1 -126 2 -306 4 -400 5 -93 0 -179 0 -190 1 -433 10 -486 10 -491 -5 -4 -8 -24 -18 -46 -21 -32 -6 -42 -13 -59 -45 -18 -36 -19 -59 -18 -336 1 -164 1 -381 1 -483 0 -102 2 -309 4 -460 6 -401 6 -443 -1 -1035 -7 -634 -8 -753 -6 -978 1 -92 0 -171 -4 -176 -3 -5 7 -23 21 -40 l26 -31 1157 0 c887 0 1160 3 1169 12 7 7 12 22 12 35 0 12 5 34 12 48 9 19 9 31 1 44 -7 11 -8 23 -1 34 5 10 5 17 0 17 -10 0 -8 185 3 288 6 57 4 67 -21 110 -15 26 -35 52 -43 59 -25 19 -80 15 -120 -9 -26 -17 -52 -23 -96 -23 -33 -1 -65 -4 -71 -7 -8 -5 -83 -3 -104 2 -9 3 -316 -1 -570 -7 -229 -5 -307 -8 -420 -16 -25 -2 -49 0 -55 4 -5 3 -35 3 -65 -2 -30 -4 -74 -8 -98 -8 l-43 -1 6 77 c12 164 17 327 18 555 0 131 1 238 1 238 1 0 33 3 71 6 39 3 84 9 100 13 17 4 145 9 285 10 298 3 248 3 390 -5 63 -3 149 -7 192 -8 42 0 80 -4 83 -8 4 -4 15 -3 24 1 9 5 52 12 96 16 102 9 140 31 156 88 14 50 18 338 5 422 -10 68 -26 89 -90 125 -43 23 -49 23 -93 11 -45 -12 -190 -20 -378 -20 -44 -1 -129 -1 -190 -2 -60 0 -159 0 -220 0 -60 0 -144 0 -185 -1 -41 0 -84 0 -95 1 -11 0 -40 1 -64 1 -24 0 -49 4 -55 9 -6 5 -22 11 -36 13 -23 3 -25 8 -28 58 -7 150 -4 605 5 647 5 20 12 22 111 27 59 3 123 7 142 10 19 3 118 8 220 11 102 3 212 8 245 10 33 3 65 5 70 6 6 0 23 -2 38 -6 16 -3 44 0 63 7 25 9 37 9 45 1 8 -8 19 -9 37 -2 15 6 60 9 102 8 41 -1 134 -2 205 -1 72 0 150 -1 175 -4 25 -3 70 -8 100 -11 l55 -4 28 42 c26 42 27 46 29 209 4 401 -2 440 -65 479 -37 23 -42 23 -102 10z",
  },
  S: {
    w: 320,
    h: 400,
    d: "M1680 3736 c-3 -2 -50 -6 -105 -9 -55 -3 -116 -10 -135 -16 -19 -6 -49 -11 -66 -11 -30 0 -67 -12 -141 -46 -17 -8 -40 -14 -52 -14 -12 0 -21 -5 -21 -11 0 -5 -17 -17 -37 -25 -20 -9 -61 -31 -90 -50 -29 -19 -60 -34 -67 -34 -8 0 -16 -6 -19 -14 -3 -7 -19 -16 -35 -19 -16 -3 -36 -12 -44 -20 -8 -8 -28 -18 -45 -21 -18 -4 -51 -28 -81 -59 -167 -171 -202 -210 -202 -221 0 -8 -9 -25 -20 -39 -11 -14 -20 -30 -20 -37 0 -6 -11 -26 -25 -44 -14 -18 -25 -43 -25 -54 0 -12 -8 -31 -17 -41 -39 -46 -54 -112 -59 -257 -2 -82 1 -162 7 -190 6 -27 12 -60 14 -74 1 -14 5 -32 8 -40 3 -8 8 -43 12 -77 3 -35 12 -75 20 -90 8 -16 15 -34 15 -40 0 -27 70 -160 104 -198 20 -22 36 -43 36 -47 0 -5 7 -8 15 -8 8 0 15 -6 15 -13 0 -14 68 -80 94 -90 9 -4 16 -11 16 -17 0 -5 16 -16 35 -24 19 -8 35 -20 35 -25 0 -6 4 -11 9 -11 6 0 22 -11 37 -25 25 -24 38 -32 117 -72 17 -9 36 -22 40 -30 4 -7 21 -13 36 -13 16 0 50 -8 77 -19 79 -30 116 -40 174 -46 30 -4 66 -11 80 -15 14 -5 39 -12 55 -14 48 -9 146 -32 195 -47 25 -7 55 -14 68 -15 39 -5 126 -23 251 -53 46 -11 93 -28 105 -38 38 -32 115 -118 121 -135 4 -10 11 -18 16 -18 5 0 9 -9 9 -19 0 -10 7 -21 15 -25 8 -3 15 -13 15 -22 0 -10 7 -25 15 -34 23 -26 23 -128 -1 -171 -10 -18 -25 -38 -31 -42 -7 -4 -13 -19 -13 -32 0 -18 -6 -25 -19 -25 -10 0 -21 -6 -24 -14 -10 -26 -100 -136 -111 -136 -6 0 -38 -14 -70 -30 -32 -17 -67 -30 -77 -30 -10 0 -20 -4 -23 -9 -12 -18 -291 -37 -302 -20 -3 5 -9 7 -14 4 -14 -8 -195 31 -275 60 -38 14 -76 25 -82 25 -7 0 -36 11 -65 24 -85 39 -202 86 -214 86 -6 0 -42 29 -80 65 -39 37 -78 65 -89 65 -12 0 -29 6 -39 13 -15 11 -24 11 -52 -2 -18 -9 -33 -20 -34 -24 0 -14 -64 -97 -103 -134 -20 -20 -37 -40 -37 -44 0 -5 -17 -26 -38 -47 -112 -116 -124 -132 -127 -160 -1 -16 -4 -33 -7 -38 -3 -5 -8 -22 -12 -37 -8 -35 5 -53 52 -72 18 -8 46 -27 61 -42 46 -47 105 -93 119 -93 6 0 12 -4 12 -8 0 -5 18 -14 40 -21 22 -6 40 -16 40 -21 0 -6 11 -10 25 -10 15 0 47 -17 76 -40 28 -22 57 -40 65 -40 12 0 62 -22 126 -56 14 -8 33 -14 42 -14 9 0 41 -9 71 -19 52 -18 90 -20 659 -21 479 0 607 2 617 12 8 7 47 28 87 47 39 19 72 40 72 47 0 7 14 22 30 34 17 12 30 27 30 33 1 7 12 21 26 32 14 11 31 26 37 33 7 7 22 23 35 34 12 12 22 27 22 34 0 7 11 26 25 42 13 16 29 40 35 53 13 31 33 62 44 70 4 4 21 35 36 69 15 34 34 70 43 80 8 10 18 28 22 41 4 13 11 29 16 34 9 13 49 156 56 205 15 106 14 239 -2 286 -9 27 -20 53 -24 59 -4 5 -23 56 -41 112 -22 65 -44 113 -62 132 -15 16 -28 34 -28 38 -1 4 -24 29 -53 55 -29 26 -70 64 -92 84 -22 20 -53 42 -70 49 -16 7 -47 27 -69 44 -21 17 -42 31 -45 31 -3 0 -19 12 -34 26 -38 35 -198 116 -274 139 -35 10 -63 22 -63 27 0 4 -11 8 -25 8 -14 0 -25 4 -25 8 0 4 -8 8 -17 9 -37 4 -129 22 -163 32 -19 6 -56 11 -82 11 -26 0 -50 5 -53 10 -4 6 -18 10 -33 10 -29 -1 -42 1 -147 26 -38 9 -71 21 -73 25 -2 5 -12 9 -23 9 -22 0 -192 79 -197 91 -2 5 -10 9 -18 9 -8 0 -14 7 -14 15 0 8 -6 15 -14 15 -8 0 -16 7 -20 15 -3 8 -11 15 -18 15 -20 0 -47 69 -54 140 -9 101 -7 129 15 176 12 24 21 51 21 59 0 8 5 15 10 15 6 0 10 4 10 10 0 20 35 90 46 90 11 0 54 45 54 58 0 11 94 91 152 128 29 19 64 35 78 35 14 1 30 2 35 3 96 16 178 15 265 -4 52 -12 115 -25 139 -30 24 -6 50 -15 57 -21 8 -6 21 -9 29 -5 8 3 15 1 15 -5 0 -6 5 -7 10 -4 6 3 17 -1 26 -9 8 -9 25 -16 38 -16 12 0 31 -7 42 -15 10 -8 29 -15 40 -15 12 0 27 -7 34 -15 7 -8 20 -15 30 -15 10 0 23 -7 30 -15 7 -8 18 -15 25 -15 7 0 27 -13 45 -30 18 -16 40 -30 50 -30 10 0 20 -5 22 -11 6 -17 107 -13 127 5 10 9 22 16 27 16 22 0 109 111 140 180 19 41 39 82 44 90 6 8 14 25 20 37 5 12 23 29 39 38 19 9 33 26 37 43 3 15 10 40 15 56 5 16 9 33 9 38 0 15 -68 78 -85 78 -8 0 -15 4 -15 8 0 14 -136 142 -151 142 -4 0 -41 16 -82 35 -42 19 -87 37 -101 41 -14 3 -30 12 -37 20 -6 8 -16 14 -21 14 -5 0 -16 7 -24 15 -9 8 -29 15 -45 15 -16 0 -29 4 -29 9 0 5 -26 15 -57 21 -58 11 -150 38 -168 48 -5 3 -16 7 -25 7 -8 1 -40 7 -70 13 -61 12 -263 26 -270 18z",
  },
  T: {
    w: 303,
    h: 400,
    d: "M274 3566 c-61 -28 -76 -58 -74 -142 1 -33 3 -117 5 -189 1 -71 5 -141 8 -155 3 -14 6 -44 6 -67 1 -29 8 -50 21 -63 11 -11 20 -22 20 -25 0 -3 8 -14 17 -25 14 -16 30 -20 74 -20 30 0 59 3 63 8 11 11 78 11 98 1 10 -6 162 -11 339 -12 231 -2 322 -6 327 -14 4 -7 7 -38 5 -70 -1 -32 2 -71 7 -88 10 -34 22 -241 22 -357 -1 -43 3 -80 9 -83 5 -4 7 -11 4 -16 -6 -8 -10 -167 -5 -179 6 -17 5 -139 -2 -159 -5 -14 -5 -28 1 -35 12 -14 12 -123 0 -154 -9 -25 -16 -203 -24 -652 -3 -146 -8 -292 -13 -325 -4 -33 -7 -157 -7 -275 0 -166 3 -221 14 -240 10 -18 14 -54 12 -127 l-2 -103 310 0 309 0 17 27 c21 31 23 75 30 748 3 248 5 459 6 470 2 45 -11 204 -22 265 -12 68 -20 1100 -9 1100 6 0 11 65 14 183 0 44 6 71 14 76 8 4 84 7 170 5 146 -2 196 -5 312 -18 49 -6 282 -8 314 -2 11 1 22 8 24 14 2 7 8 12 14 12 29 0 62 68 53 110 -15 70 -12 228 7 320 22 109 21 101 14 158 -5 48 -32 81 -81 100 -40 16 -184 25 -199 13 -6 -5 -34 -13 -61 -16 -28 -3 -59 -8 -71 -10 -58 -12 -587 -2 -864 17 -8 0 -20 5 -27 10 -7 5 -14 5 -18 -2 -4 -6 -13 -7 -23 -2 -9 5 -262 9 -562 10 l-545 2 -51 -24z",
  },
};

const NEST_GLYPH_COLORS: Record<string, string> = {
  N: "#004898",
  E: "#3090d8",
  S: "#0088f0",
  T: "#0068d0",
};

/* Hand-drawn NEST letters taken from the Figma wordmark, embedded as vectors
   so they stay crisp and need no extra assets. */
function NestGlyph({ letter }: { letter: string }) {
  const glyph = NEST_GLYPHS[letter];
  if (!glyph) return null;
  return (
    <svg
      className="ihp-nest-tab__letter"
      viewBox={`0 0 ${glyph.w} ${glyph.h}`}
      style={{ color: NEST_GLYPH_COLORS[letter] }}
      aria-hidden="true"
      focusable="false"
    >
      <g transform={`translate(0 ${glyph.h}) scale(0.1 -0.1)`}>
        <path d={glyph.d} fill="currentColor" />
      </g>
    </svg>
  );
}

const NEST_TABS = [
  { id: "ihp-nest-need", letter: "N", label: "Need-led Discovery" },
  { id: "ihp-nest-codesign", letter: "E", label: "Evidence-based Co-design" },
  { id: "ihp-nest-situated", letter: "S", label: "Situated Implementation" },
  { id: "ihp-nest-trust", letter: "T", label: "Trust and Lasting Impact" },
];

/* NEST module switcher: one card per module, letter badge + label. The tabs
   are pure jump links — the page TOC already marks the module being read, so
   no tab carries a selected state. */
function NestSubnav() {
  const jump = (id: string) => {
    if (!document.getElementById(id)) return;
    history.replaceState(null, "", `#${id}`);
    scrollToSection(id);
  };
  return (
    <nav className="ihp-nest-tabs" aria-label="NEST modules">
      {NEST_TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className="ihp-nest-tab"
          onClick={() => jump(tab.id)}
        >
          <NestGlyph letter={tab.letter} />
          <span className="ihp-nest-tab__label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}

function NestPage() {
  const sections = [
    {
      id: "ihp-nest-need",
      label: "N · Need-led Discovery",
      node: <DiscoveryBlock />,
    },
    {
      id: "ihp-nest-codesign",
      label: "E · Evidence-based Co-design",
      node: <CoDesignBlock />,
    },
    {
      id: "ihp-nest-situated",
      label: "S · Situated Implementation",
      node: <SituatedBlock />,
    },
    {
      id: "ihp-nest-trust",
      label: "T · Trust and Lasting Impact",
      node: <ImpactBlock />,
    },
  ];
  return (
    <>
      <NestSubnav />
      {sections.map((entry) => (
        <section className="ihp-subpage" id={entry.id} key={entry.id}>
          {entry.node}
        </section>
      ))}
    </>
  );
}

/** Whole-page swipe between the pages, reusing the cross-page transition from
 *  the Experiments ↔ Results pair. Set to false for instant switching. */
const HP_PAGE_SWIPE = true;
/** Matches the cross-page swipe transition in toc.css. */
const HP_PAGE_SWIPE_MS = 640;
export function HumanPractices() {
  /* Toolbox is preselected on mount: the page never starts in the bare
     overview state, which avoids the layout/scroll edge cases around it. */
  const [page, setPage] = useState<number | null>(0);
  const navRef = useRef<HTMLDivElement>(null);
  const articleRef = useRef<HTMLElement>(null);
  const busyRef = useRef(false);
  const timerRef = useRef(0);
  const pageRef = useRef<number | null>(0);
  const openScrollRef = useRef<number | null>(null);
  const actionsRef = useRef<{
    open: (index: number) => void;
    collapse: () => void;
    reset: () => void;
  }>({
    open: () => {},
    collapse: () => {},
    reset: () => {},
  });

  useEffect(() => {
    const nav = navRef.current;
    const article = articleRef.current;
    if (!nav || !article) return;
    const measure = () =>
      article.style.setProperty("--ihp-primary-nav-height", `${nav.offsetHeight}px`);
    const observer = new ResizeObserver(measure);
    observer.observe(nav);
    measure();
    return () => observer.disconnect();
  }, []);

  const setPageSync = (value: number | null) => {
    pageRef.current = value;
    /* The overview block sits directly above NEST, so it has no footer: its
       last element is the three buttons. */
    document.documentElement.classList.toggle("ihp-overview", value === null);
    flushSync(() => setPage(value));
  };

  /* Keep the level-1 buttons just under the site header when a page opens,
     so they stay in place while its sub-panels switch; the section starts
     right below them. */
  const alignSectionTop = () => {
    const nav = navRef.current;
    const viewport = nav?.nextElementSibling;
    if (!nav || !(viewport instanceof HTMLElement)) return;
    cancelSectionScroll();
    // The sticky row's current rectangle follows the viewport, so it cannot
    // locate the start of the section. Its flowing sibling keeps that anchor.
    const offset =
      (parseFloat(getComputedStyle(nav).top) || 0) + nav.offsetHeight + 8;
    const top = Math.max(
      0,
      viewport.getBoundingClientRect().top + window.scrollY - offset,
    );
    window.scrollTo({ top, behavior: "instant" });
    openScrollRef.current = window.scrollY;
  };

  /* Overview state: the page ends just after the three buttons. */
  const alignOverviewBottom = () => {
    const article = articleRef.current;
    if (!article) return;
    const bottom = article.getBoundingClientRect().bottom + window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: Math.min(max, Math.max(0, bottom - window.innerHeight + 8)),
      behavior: "instant",
    });
    openScrollRef.current = null;
  };

  const openSection = (index: number) => {
    setPageSync(index);
    alignSectionTop();
  };

  const collapseSection = () => {
    setPageSync(null);
    alignOverviewBottom();
  };

  const reduceMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Entering from the overview: "down" (open) / "up" (back to the overview).
     Switching sub-panels: "next" / "prev" pan the section only. */
  const runSwipe = (
    direction: "down" | "up" | "next" | "prev",
    swap: () => void,
  ) => {
    const root = document.documentElement;
    busyRef.current = true;
    window.clearTimeout(timerRef.current);

    type ViewTransitionDocument = Document & {
      startViewTransition?: (update: () => void) => { finished: Promise<void> };
    };
    const startViewTransition = (document as ViewTransitionDocument)
      .startViewTransition;
    if (startViewTransition) {
      root.setAttribute("data-ihp-swipe", direction);
      const transition = startViewTransition.call(document, swap);
      void transition.finished
        .catch(() => undefined)
        .finally(() => {
          root.removeAttribute("data-ihp-swipe");
          busyRef.current = false;
        });
      return;
    }

    /* Fallback for browsers without View Transitions: the horizontal stage
       slide used by the cross-page swipe. */
    const exit =
      direction === "next" || direction === "down" ? "left" : "right";
    const enter = exit === "left" ? "right" : "left";
    root.classList.add(`page-swipe-exit-${exit}`);
    timerRef.current = window.setTimeout(() => {
      root.classList.remove(`page-swipe-exit-${exit}`);
      swap();
      root.classList.add(`page-swipe-enter-${enter}`, "page-swipe-instant");
      void document.body.offsetHeight;
      requestAnimationFrame(() => {
        root.classList.remove("page-swipe-instant");
        root.classList.add("page-swipe-run");
        timerRef.current = window.setTimeout(() => {
          root.classList.remove(`page-swipe-enter-${enter}`, "page-swipe-run");
          busyRef.current = false;
        }, HP_PAGE_SWIPE_MS);
      });
    }, HP_PAGE_SWIPE_MS);
  };

  /* Switching between two open pages resets to the incoming page's start.
     The outgoing page is cloned into a ghost layer so both pages pan at the
     same time, inside the section's column:
     the old one leaves through one edge while the new one enters from the
     other. */
  const switchPage = (index: number) => {
    const viewport = document.querySelector<HTMLElement>(
      ".ihp-section-viewport",
    );
    const current = viewport?.querySelector<HTMLElement>(".ihp-section");
    const direction = index > (pageRef.current as number) ? "next" : "prev";
    busyRef.current = true;
    window.clearTimeout(timerRef.current);
    if (!viewport || !current || reduceMotion()) {
      setPageSync(index);
      alignSectionTop();
      busyRef.current = false;
      return;
    }
    const ghost = current.cloneNode(true) as HTMLElement;
    ghost.classList.add("ihp-section-ghost", `ihp-section-ghost-${direction}`);
    ghost.setAttribute("aria-hidden", "true");
    viewport.appendChild(ghost);
    setPageSync(index);
    alignSectionTop();
    const incoming = viewport.querySelector<HTMLElement>(
      ".ihp-section:not(.ihp-section-ghost)",
    );
    incoming?.classList.add(`ihp-section-enter-${direction}`);
    timerRef.current = window.setTimeout(() => {
      ghost.remove();
      incoming?.classList.remove(`ihp-section-enter-${direction}`);
      busyRef.current = false;
    }, 320);
  };

  /* The deck's pages have stable URL hashes so links can target them:
     #toolbox, #nest, #stakeholder-engagement (plus the sub-section ids). */
  const syncHash = (index: number | null) => {
    const id =
      index === null
        ? ""
        : (["toolbox", "nest", "stakeholder-engagement"][index] ?? "");
    const url = id
      ? `#${id}`
      : `${window.location.pathname}${window.location.search}`;
    history.replaceState(null, "", url);
  };

  const selectPage = (index: number) => {
    if (busyRef.current) return;
    syncHash(index);
    if (index === pageRef.current) {
      alignSectionTop();
      return;
    }
    const wasOpen = pageRef.current !== null;
    if (wasOpen) {
      switchPage(index);
      return;
    }
    if (!HP_PAGE_SWIPE || reduceMotion()) {
      openSection(index);
      return;
    }
    runSwipe("down", () => openSection(index));
  };

  const collapseWithSwipe = () => {
    if (busyRef.current || pageRef.current === null) return;
    if (!HP_PAGE_SWIPE || reduceMotion()) {
      collapseSection();
      return;
    }
    runSwipe("up", collapseSection);
  };

  /* Overview: once the page has scrolled down to the buttons, a further
     wheel-down opens the Toolbox page instead of dead-ending. A page that is
     already open is left to normal scrolling (no wheel lock). */
  useEffect(() => {
    if (page !== null) return;
    const onWheel = (event: WheelEvent) => {
      if (event.deltaY <= 0 || busyRef.current) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY < max - 24) return; /* scroll to the buttons first */
      event.preventDefault();
      actionsRef.current.open(0);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [page]);

  /* Back at the very top the page returns to the overview-only state, so a
     further scroll down locks at the three buttons again. */
  const resetToOverview = () => {
    if (busyRef.current || pageRef.current === null) return;
    setPageSync(null);
    syncHash(null);
    openScrollRef.current = null;
  };

  actionsRef.current = {
    open: selectPage,
    collapse: collapseWithSwipe,
    reset: resetToOverview,
  };

  /* Links from the stakeholder timeline jump to the syringe questionnaire on
     the NEST page: open that page if needed, then align the questionnaire.
     Figures above it load lazily, so the alignment is repeated until the
     heading settles just below the sticky header. */
  useEffect(() => {
    const scrollToQuestionnaire = (attempt = 0) => {
      const el = document.getElementById("ihp-syringe-questionnaire");
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      const offset = getSectionScrollOffset();
      if (Math.abs(top - offset) > 24) {
        window.scrollTo({
          top: top + window.scrollY - offset,
          behavior: "instant",
        });
      }
      if (attempt < 4) {
        window.setTimeout(() => scrollToQuestionnaire(attempt + 1), 500);
      }
    };
    const openQuestionnaire = () => {
      if (document.getElementById("ihp-syringe-questionnaire")) {
        history.replaceState(null, "", "#ihp-syringe-questionnaire");
        scrollToQuestionnaire();
        return;
      }
      actionsRef.current.open(1);
      window.setTimeout(() => {
        history.replaceState(null, "", "#ihp-syringe-questionnaire");
        scrollToQuestionnaire();
      }, 750);
    };
    window.addEventListener("ihp:open-questionnaire", openQuestionnaire);
    return () =>
      window.removeEventListener("ihp:open-questionnaire", openQuestionnaire);
  }, []);

  /* Incoming links: #toolbox / #nest / #stakeholder-engagement open that page,
     and any #ihp-… anchor (also from the other pages) aligns the section.
     Figures above some targets load lazily, so the alignment is repeated
     until the heading settles below the sticky header. */
  useEffect(() => {
    const pageOf = (id: string): number | null => {
      if (id === "toolbox" || id.startsWith("ihp-toolbox")) return 0;
      if (
        id === "nest" ||
        id.startsWith("ihp-nest") ||
        id === "ihp-syringe-questionnaire"
      )
        return 1;
      if (
        id === "stakeholder-engagement" ||
        id === "ihp-stakeholders-map" ||
        id.startsWith("ihp-engagement")
      )
        return 2;
      return null;
    };
    let timer = 0;
    const cancelPendingAlignment = () => window.clearTimeout(timer);
    const jump = () => {
      cancelPendingAlignment();
      const raw = window.location.hash.replace(/^#/, "");
      if (!raw) return;
      let id: string;
      try {
        id = decodeURIComponent(raw);
        // Keep the previous engagement link on the restored stakeholder map.
        if (id === "ihp-engagement-stakebridge") id = "ihp-stakeholders-map";
      } catch {
        return;
      }
      const target = pageOf(id);
      if (target === null) return;
      const align = (attempt = 0) => {
        if (["toolbox", "nest", "stakeholder-engagement"].includes(id)) {
          alignSectionTop();
          return;
        }
        const el = document.getElementById(id);
        if (!el) return;
        const top =
          el.getBoundingClientRect().top + window.scrollY - getSectionScrollOffset();
        window.scrollTo({ top: Math.max(0, top), behavior: "instant" });
        if (el && attempt < 4) {
          window.clearTimeout(timer);
          timer = window.setTimeout(() => align(attempt + 1), 450);
        }
      };
      if (pageRef.current !== target) {
        setPageSync(target);
        requestAnimationFrame(() => align());
      } else {
        align();
      }
    };
    jump();
    window.addEventListener("hashchange", jump);
    window.addEventListener("wheel", cancelPendingAlignment, { passive: true });
    window.addEventListener("pointerdown", cancelPendingAlignment, {
      passive: true,
    });
    window.addEventListener("keydown", cancelPendingAlignment);
    return () => {
      window.removeEventListener("hashchange", jump);
      window.removeEventListener("wheel", cancelPendingAlignment);
      window.removeEventListener("pointerdown", cancelPendingAlignment);
      window.removeEventListener("keydown", cancelPendingAlignment);
      window.clearTimeout(timer);
    };
  }, []);

  /* Touch / keyboard can still return to the overview; the wheel is left to
     the page so the reader keeps a normal scroll. */
  useEffect(() => {
    let touchY = 0;
    const atSectionTop = () =>
      pageRef.current !== null &&
      openScrollRef.current !== null &&
      window.scrollY <= openScrollRef.current + 2;

    const onTouchStart = (event: TouchEvent) => {
      touchY = event.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (event: TouchEvent) => {
      const y = event.touches[0]?.clientY ?? 0;
      if (y > touchY + 6 && atSectionTop() && !busyRef.current) {
        actionsRef.current.collapse();
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        (event.key === "ArrowUp" || event.key === "PageUp") &&
        atSectionTop() &&
        !busyRef.current
      ) {
        event.preventDefault();
        actionsRef.current.collapse();
      }
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("ihp-overview", page === null);
  }, [page]);

  // Leave no swipe classes behind if the page unmounts mid-transition.
  useEffect(
    () => () => {
      window.clearTimeout(timerRef.current);
      const root = document.documentElement;
      root.classList.remove(
        "ihp-overview",
        "page-swipe-exit-left",
        "page-swipe-exit-right",
        "page-swipe-enter-left",
        "page-swipe-enter-right",
        "page-swipe-run",
        "page-swipe-instant",
      );
      root.removeAttribute("data-ihp-swipe");
    },
    [],
  );

  return (
    <div className="row mt-4 mb-5">
      <div className="col-lg-10 mx-auto">
        <article ref={articleRef}>
          <blockquote className="ihp-quote">
            <p>
              &ldquo;Human Practices is the study of how your work affects the
              world, and how the world affects your work.&rdquo;
            </p>
            <footer>&mdash; Peter Carr, iGEM Judging Director</footer>
          </blockquote>
          <h2>Overview</h2>
          <p>
            Cartilage defects are a complex health concern: they are widespread,
            difficult to define, and often overlooked, yet they have a direct
            impact on people&rsquo;s health. As a medical biomaterial, NEST must
            address patient experience, research, manufacturing, market access,
            clinical use, and societal perspectives. Balancing these factors to
            bring NEST into real-world practice is a considerable challenge.
          </p>
          <p>
            To this end, we engaged <strong>56 stakeholders</strong> in our
            interviews and technical tests, covering patients, doctors,
            researchers, government officials, administrative agencies,
            manufacturers, business consultants, humanities scholars and
            artists. Our questionnaires reached over{" "}
            <strong>1,700 people</strong>, and our online and offline events and
            lectures cumulatively covered more than{" "}
            <strong>450 people</strong>.
          </p>
          <p>
            We aim to develop a therapeutic approach for patients, address
            unmet needs through design, support innovation in the field, raise
            public awareness of cartilage health, deepen understanding of
            patients&rsquo; experiences, and contribute to the synthetic biology
            community.
          </p>
          <p>
            The following sections describe our Integrated Human Practices (iHP)
            work and how we pursued these goals. Use the three buttons below to
            open the iHP Toolkit, Stakeholder Engagement, or NEST-based
            Integrated Human Practices.
          </p>
          <div
            className={`eng-module-nav ihp-page-nav${
              page !== null ? " ihp-page-nav--selected" : ""
            }`}
            ref={navRef}
          >
            {HP_PAGES.map((entry, index) => (
              <button
                key={entry.key}
                type="button"
                className={`eng-module-button ${
                  page === index ? "active" : ""
                }`}
                aria-pressed={page === index}
                onClick={() => selectPage(index)}
              >
                {entry.label}
              </button>
            ))}
          </div>
          {page !== null && (
            <div className="ihp-section-viewport">
              <div className="ihp-section">
                {page === 0 && <ToolboxPage />}
                {page === 1 && <NestPage />}
                {page === 2 && <EngagementBlock />}
              </div>
            </div>
          )}
          {/* The scrolling SEED wheel follows the [data-seed-phase] cycle
              paragraphs; it collapses on its own where they are not shown. */}
          <SeedReaderRail />
        </article>
      </div>
    </div>
  );
}
