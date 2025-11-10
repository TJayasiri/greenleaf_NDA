'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

type NDA = {
  id: string
  customer_name: string
  customer_email: string
  sent_date: string
  reminder_sent: string | null
  status: string
  locked: boolean
  file_url: string | null
  created_by: string
}

export default function Dashboard() {
  const [ndas, setNdas] = useState<NDA[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    checkUser()
    loadNDAs()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/')
    }
  }

  const loadNDAs = async () => {
    const { data, error } = await supabase
      .from('ndas')
      .select('*')
      .order('sent_date', { ascending: false })

    if (!error && data) {
      setNdas(data)
    }
    setLoading(false)
  }

  const handleSendNDA = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase.from('ndas').insert({
      customer_name: customerName,
      customer_email: customerEmail,
      sent_date: new Date().toISOString(),
      status: 'sent',
      locked: false,
      created_by: user.id
    })

    if (!error) {
      setShowForm(false)
      setCustomerName('')
      setCustomerEmail('')
      loadNDAs()
      alert('NDA sent successfully!')
    } else {
      alert('Error: ' + error.message)
    }
  }

  const sendReminder = async (id: string) => {
    const { error } = await supabase
      .from('ndas')
      .update({ reminder_sent: new Date().toISOString() })
      .eq('id', id)

    if (!error) {
      loadNDAs()
      alert('Reminder sent!')
    }
  }

  const toggleLock = async (id: string, currentLock: boolean) => {
    const { error } = await supabase
      .from('ndas')
      .update({ locked: !currentLock })
      .eq('id', id)

    if (!error) {
      loadNDAs()
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">NDA Manager Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {showForm ? 'Cancel' : 'Send New NDA'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-xl font-bold mb-4">Send NDA to Customer</h2>
            <form onSubmit={handleSendNDA} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Customer Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Customer Email</label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Send NDA
              </button>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <h2 className="text-xl font-bold p-6 border-b">All NDAs</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sent Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reminder</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {ndas.map((nda) => (
                  <tr key={nda.id} className={nda.locked ? 'bg-gray-100' : ''}>
                    <td className="px-6 py-4">{nda.customer_name}</td>
                    <td className="px-6 py-4">{nda.customer_email}</td>
                    <td className="px-6 py-4">
                      {new Date(nda.sent_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {nda.reminder_sent 
                        ? new Date(nda.reminder_sent).toLocaleDateString()
                        : 'Not sent'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        nda.status === 'sent' ? 'bg-yellow-100 text-yellow-800' :
                        nda.status === 'signed' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {nda.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      {!nda.locked && (
                        <button
                          onClick={() => sendReminder(nda.id)}
                          className="text-blue-600 hover:underline text-sm"
                        >
                          Send Reminder
                        </button>
                      )}
                      <button
                        onClick={() => toggleLock(nda.id, nda.locked)}
                        className={`text-sm ${
                          nda.locked ? 'text-green-600' : 'text-red-600'
                        } hover:underline`}
                      >
                        {nda.locked ? 'Unlock' : 'Lock'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {ndas.length === 0 && (
              <div className="p-6 text-center text-gray-500">
                No NDAs yet. Send your first one!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
