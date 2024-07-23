import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'

export function useResettableState<S>(
  initialValue: S
): [S, Dispatch<SetStateAction<S>>] {
  const [value, setValue] = useState(initialValue)
  useEffect(() => setValue(initialValue), [initialValue])
  return useMemo(() => [value, setValue], [value])
}
