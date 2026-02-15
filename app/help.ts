export function shuffleAvoidAdjacent<T extends { value: string }>(
    items: T[],
    maxTries = 200
  ): T[] {
    if (items.length <= 2) return [...items]
  
    const hasAdjacentDuplicate = (arr: T[]) => {
      // Check adjacent pairs
      for (let i = 1; i < arr.length; i++) {
        if (arr[i].value === arr[i - 1].value) return true
      }
      // Check circular case (last vs first)
      if (arr.length > 0 && arr[arr.length - 1].value === arr[0].value) return true
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
  
    // Try multiple times to find a valid arrangement
    for (let i = 0; i < maxTries; i++) {
      const shuffled = shuffle(items)
      if (!hasAdjacentDuplicate(shuffled)) {
        return shuffled
      }
    }
  
    // If random shuffle fails, use greedy algorithm
    const available = [...items]
    const result: T[] = []
    
    // Start with a random item
    const firstIndex = Math.floor(Math.random() * available.length)
    result.push(available.splice(firstIndex, 1)[0])
    
    // Greedily place items that don't match the previous one
    while (available.length > 0) {
      const lastValue = result[result.length - 1].value
      const candidates = available.filter(item => item.value !== lastValue)
      
      if (candidates.length > 0) {
        // Pick a random candidate
        const randomIndex = Math.floor(Math.random() * candidates.length)
        const selected = candidates[randomIndex]
        result.push(selected)
        available.splice(available.indexOf(selected), 1)
      } else {
        // No valid candidate, must place any item (will create adjacent duplicate)
        const randomIndex = Math.floor(Math.random() * available.length)
        result.push(available.splice(randomIndex, 1)[0])
      }
    }
    
    // Final check: if last equals first, try to swap
    if (result.length > 2 && result[0].value === result[result.length - 1].value) {
      for (let i = 1; i < result.length - 1; i++) {
        if (result[i].value !== result[0].value && result[i].value !== result[result.length - 2].value) {
          // Swap with a safe position
          const temp = result[i]
          result[i] = result[result.length - 1]
          result[result.length - 1] = temp
          break
        }
      }
    }
  
    return result
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
  