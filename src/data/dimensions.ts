export type DimKey = 'EI' | 'SN' | 'TF' | 'JP'
export type Pole = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'

export interface PoleInfo {
  key: Pole
  name: string
  desc: string
}

export interface DimensionInfo {
  key: DimKey
  label: string
  subtitle: string
  accent: string
  glow: string
  left: PoleInfo
  right: PoleInfo
}

export const DIMENSIONS: Record<DimKey, DimensionInfo> = {
  EI: {
    key: 'EI',
    label: '能量方向',
    subtitle: '你的电从哪里来',
    accent: '#5ddcff',
    glow: 'rgba(93, 220, 255, 0.35)',
    left: { key: 'E', name: '外向蹦跶', desc: '社交充电，主动贴贴' },
    right: { key: 'I', name: '安静宅家', desc: '独处回血，省电模式' },
  },
  SN: {
    key: 'SN',
    label: '信息获取',
    subtitle: '你怎么认识世界',
    accent: '#b9a2ff',
    glow: 'rgba(185, 162, 255, 0.35)',
    left: { key: 'S', name: '落地实干', desc: '具体细节，照谱干活' },
    right: { key: 'N', name: '抽象整活', desc: '脑洞联想，接梗三层' },
  },
  TF: {
    key: 'TF',
    label: '决策方式',
    subtitle: '你如何做决定',
    accent: '#ff9ec7',
    glow: 'rgba(255, 158, 199, 0.35)',
    left: { key: 'T', name: '讲理铁面', desc: '先分对错，再讲情面' },
    right: { key: 'F', name: '共情软乎', desc: '先哄关系，再谈事情' },
  },
  JP: {
    key: 'JP',
    label: '生活节奏',
    subtitle: '你怎么安排鱼生',
    accent: '#ffd166',
    glow: 'rgba(255, 209, 102, 0.35)',
    left: { key: 'J', name: '计划满档', desc: '清单提前，闹钟三个' },
    right: { key: 'P', name: '随缘营业', desc: '见招拆招，deadline 战神' },
  },
}

export const DIM_ORDER: DimKey[] = ['EI', 'SN', 'TF', 'JP']
