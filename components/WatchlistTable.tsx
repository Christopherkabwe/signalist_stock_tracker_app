import { WATCHLIST_TABLE_HEADER } from '@/lib/constants'

// Minimal, self-contained table primitives (shadcn-style)
function Table({ className = '', children, ...props }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className={`w-full caption-bottom text-sm ${className}`} {...props}>
        {children}
      </table>
    </div>
  )
}

function TableHeader({ className = '', children, ...props }) {
  return (
    <thead className={`${className}`} {...props}>
      {children}
    </thead>
  )
}

function TableBody({ className = '', children, ...props }) {
  return (
    <tbody className={`${className}`} {...props}>
      {children}
    </tbody>
  )
}

function TableRow({ className = '', children, ...props }) {
  return (
    <tr
      className={`border-b border-gray-800/60 transition-colors hover:bg-gray-900/40 ${className}`}
      {...props}
    >
      {children}
    </tr>
  )
}

function TableHead({ className = '', children, ...props }) {
  return (
    <th
      className={`h-10 px-4 text-left align-middle font-medium text-gray-400 ${className}`}
      {...props}
    >
      {children}
    </th>
  )
}

function TableCell({ className = '', children, ...props }) {
  return (
    <td className={`p-4 align-middle text-left ${className}`} {...props}>
      {children}
    </td>
  )
}

export default function WatchlistTable() {
  const rows = [
    {
      company: 'Apple Inc.',
      symbol: 'AAPL',
      price: '$189.79',
      change: '+0.56%',
      marketCap: '$2.97T',
      pe: '33.42',
      alert: '—',
      action: '—',
    },
    {
      company: 'Microsoft Corp.',
      symbol: 'MSFT',
      price: '$377.43',
      change: '+0.21%',
      marketCap: '$2.86T',
      pe: '35.18',
      alert: '—',
      action: '—',
    },
    {
      company: 'NVIDIA Corp.',
      symbol: 'NVDA',
      price: '$489.65',
      change: '-0.37%',
      marketCap: '$1.21T',
      pe: '59.02',
      alert: '—',
      action: '—',
    },
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {WATCHLIST_TABLE_HEADER.map((col) => (
            <TableHead key={col}>{col}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r, idx) => (
          <TableRow key={idx}>
            <TableCell>{r.company}</TableCell>
            <TableCell>{r.symbol}</TableCell>
            <TableCell>{r.price}</TableCell>
            <TableCell>{r.change}</TableCell>
            <TableCell>{r.marketCap}</TableCell>
            <TableCell>{r.pe}</TableCell>
            <TableCell>{r.alert}</TableCell>
            <TableCell>{r.action}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
