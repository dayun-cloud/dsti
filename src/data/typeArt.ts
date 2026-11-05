import type { TypeCode } from './types'

import INTJ from '@/assets/images/types/INTJ.webp'
import INTP from '@/assets/images/types/INTP.webp'
import ENTJ from '@/assets/images/types/ENTJ.webp'
import ENTP from '@/assets/images/types/ENTP.webp'
import INFJ from '@/assets/images/types/INFJ.webp'
import INFP from '@/assets/images/types/INFP.webp'
import ENFJ from '@/assets/images/types/ENFJ.webp'
import ENFP from '@/assets/images/types/ENFP.webp'
import ISTJ from '@/assets/images/types/ISTJ.webp'
import ISFJ from '@/assets/images/types/ISFJ.webp'
import ESTJ from '@/assets/images/types/ESTJ.webp'
import ESFJ from '@/assets/images/types/ESFJ.webp'
import ISTP from '@/assets/images/types/ISTP.webp'
import ISFP from '@/assets/images/types/ISFP.webp'
import ESTP from '@/assets/images/types/ESTP.webp'
import ESFP from '@/assets/images/types/ESFP.webp'

/** 16 型立绘：与 TYPE_CODES 一一对应，供卡片与弹窗共用 */
export const TYPE_ART: Record<TypeCode, string> = {
  INTJ,
  INTP,
  ENTJ,
  ENTP,
  INFJ,
  INFP,
  ENFJ,
  ENFP,
  ISTJ,
  ISFJ,
  ESTJ,
  ESFJ,
  ISTP,
  ISFP,
  ESTP,
  ESFP,
}
