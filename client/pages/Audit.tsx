export default function Audit() {
  return (
    <section className="container py-8 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Bulk Review & Audit</h1>
      <div className="rounded-xl border bg-card p-4">
        <table className="w-full text-sm">
          <thead className="text-left text-muted-foreground">
            <tr><th className="py-2">ID</th><th>Type</th><th>Action</th><th>Outcome</th><th>Override</th></tr>
          </thead>
          <tbody>
            {Array.from({length:6}).map((_,i)=> (
              <tr key={i} className="border-t">
                <td className="py-2">CF-{100+i}</td>
                <td>Conflict</td>
                <td>Precedence swap</td>
                <td className="text-emerald-400">-1.5m avg delay</td>
                <td><button className="rounded-md border px-2 py-1 hover:bg-muted">Override</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
