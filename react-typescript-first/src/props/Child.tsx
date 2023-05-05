type TProps = {
  color: string
  onClick: () => void
  children?: React.ReactNode
}

/* Functional Component React.FC */
export const Child: React.FC<TProps> = (props) => {
  return (
    <div>
      Child Component with color {props.color}
      <button onClick={props.onClick}>Click Me</button>
    </div>
  )
}
