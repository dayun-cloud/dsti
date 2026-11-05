import { DIM_ORDER, DIMENSIONS, type DimKey, type Pole } from './dimensions'
import { QUESTIONS } from './questions'
import type { TypeCode } from './types'

export type Answer = 0 | 1

export type Score = Record<Pole, number>

export function emptyScore(): Score {
  return { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }
}

/** answers[i] 为原题选项下标（0 = 第一极，1 = 第二极） */
export function scoreAnswers(answers: (Answer | null)[]): Score {
  const score = emptyScore()
  QUESTIONS.forEach((q, i) => {
    const picked = answers[i]
    if (picked === null || picked === undefined) return
    const pole = (picked === 0 ? q.dim[0] : q.dim[1]) as Pole
    score[pole] += 1
  })
  return score
}

export function getResultCode(score: Score): TypeCode {
  const code =
    (score.E >= score.I ? 'E' : 'I') +
    (score.S >= score.N ? 'S' : 'N') +
    (score.T >= score.F ? 'T' : 'F') +
    (score.J >= score.P ? 'J' : 'P')
  return code as TypeCode
}

export interface DimensionStat {
  key: DimKey
  label: string
  leftPole: Pole
  rightPole: Pole
  leftName: string
  rightName: string
  leftCount: number
  rightCount: number
  leftPct: number
  rightPct: number
  dominant: 'left' | 'right'
  strength: string
  accent: string
}

export function dimensionStats(score: Score): DimensionStat[] {
  return DIM_ORDER.map((key) => {
    const dim = DIMENSIONS[key]
    const leftCount = score[dim.left.key]
    const rightCount = score[dim.right.key]
    const total = leftCount + rightCount
    const leftPct = Math.round((leftCount / total) * 100)
    const rightPct = 100 - leftPct
    const dominant = leftCount > rightCount ? 'left' : 'right'
    const high = Math.max(leftPct, rightPct)

    let strength = '非常接近中线'
    if (high === 100) strength = '绝对倾向'
    else if (high >= 80) strength = '强烈倾向'
    else if (high >= 60) strength = '轻微倾向'

    return {
      key,
      label: dim.label,
      leftPole: dim.left.key,
      rightPole: dim.right.key,
      leftName: dim.left.name,
      rightName: dim.right.name,
      leftCount,
      rightCount,
      leftPct,
      rightPct,
      dominant,
      strength,
      accent: dim.accent,
    }
  })
}
