export function shuffleAvoidAdjacent<T extends { value: string }>(
    items: T[],
    maxTries = 50
  ): T[] {
    if (items.length <= 2) return [...items]
  
    const hasAdjacentDuplicate = (arr: T[]) => {
      for (let i = 1; i < arr.length; i++) {
        if (arr[i].value === arr[i - 1].value) return true
      }
      return false
    }
  
    const shuffle = (arr: T[]) => {
      const copy = [...arr]
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[copy[i], copy[j]] = [copy[j], copy[i]]
      }
      return copy
    }
  
    for (let i = 0; i < maxTries; i++) {
      const shuffled = shuffle(items)
      if (!hasAdjacentDuplicate(shuffled)) {
        return shuffled
      }
    }
  
    // fallback (best effort)
    return shuffle(items)
  }
  
export  function generateColors(
    count: number,
    palette: string[]
  ): string[] {
    if (palette.length < 2) {
      throw new Error('Need at least 2 colors')
    }
  
    const result: string[] = []
  
    for (let i = 0; i < count; i++) {
      let available = palette.filter(
        c => c !== result[i - 1]
      )
  
      // prevent last == first (circle fix)
      if (i === count - 1 && result[0]) {
        available = available.filter(c => c !== result[0])
      }
  
      const color =
        available[Math.floor(Math.random() * available.length)]
  
      result.push(color)
    }
  
    return result
  }
  