export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user')!)
  return (
    <main>
      <h1>Hello {user.firstName}, what are you learning today</h1>
    </main>
  )
}
