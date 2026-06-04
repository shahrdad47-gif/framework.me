export default function EmptyState({ icon, message }) {
  return (
    <div className="empty-state">
      <span>{icon}</span>
      <p>{message}</p>
    </div>
  )
}
