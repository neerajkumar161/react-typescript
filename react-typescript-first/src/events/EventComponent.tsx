export const EventComponent: React.FC = () => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    return
  }

  const onDrag = (e: React.DragEvent<HTMLDivElement>) => {
    console.log('Im being dragged!', e.target)
  }

  return (
    <div>
      <input type='text' onChange={onChange} />
      <div draggable onDragStart={onDrag}>
        Drage Me!
      </div>
    </div>
  )
}
