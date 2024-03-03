import { Link, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div>
      <h3>Welcome Home!</h3>
      <Link to="login">Login</Link>
    </div>
  )
}