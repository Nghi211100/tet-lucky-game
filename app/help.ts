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
  