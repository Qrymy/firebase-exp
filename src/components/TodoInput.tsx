import { useState, useCallback } from 'react'

type Props = {
  readonly onSubmit: (content: string) => void
}

export const TodoInput = ({ onSubmit }: Props) => {
  const [value, setValue] = useState('')

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value)
    },
    []
  )

  const handleClick = useCallback(() => {
    onSubmit(value)
    setValue('')
  }, [value])

  return (
    <div>
      <input onChange={handleChange} value={value} />
      <button disabled={!value} onClick={handleClick}>
        Submit
      </button>
    </div>
  )
}
