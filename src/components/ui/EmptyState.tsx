interface Props {
  icon: string
  message: string
}

export default function EmptyState({ icon, message }: Props) {
  return (
    <div className="empty-state">
      <span>{icon}</span>
      <p>{message}</p>
    </div>
  )
}
