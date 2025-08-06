'use client'

import { userAPI } from "../../lib/app.js"
import { useEffect, useState } from "react"

export default function Home() {
  const [user, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phonenumber: '',
    pannumber: ''
  })

  useEffect(() => {
    fetchUsers() // user def function
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)

      const response = await userAPI.getAll()

      setUsers(response.data)
    } catch (error) {
      console.error('error fetching', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await userAPI.create(formData)

      setFormData({
        name: '',
        email: '',
        phonenumber: '',
        pannumber: ''
      })

      setShowForm(false)
      fetchUsers()

      alert('User created sucessfully')
    } catch (error) {
      alert('error creating')
      console.error('error fetching', error)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleDelete = async (id) => {
    if (confirm('Are u sure')) {
      try {
        await userAPI.delete(id)
        fetchUsers()

        alert('user data deleted')
      } catch (error) {
        console.error('error', error)
      }
    }
  }


  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-row justify-between py-6"> <h1 className="text-3xl font-bold">Quick Tax</h1>

          <button onClick={() => setShowForm(!showForm)} className="bg-green-500 text-white px-4 py-2 rounded ">
            {showForm ? 'Cancel' : 'Add User'}
          </button>

        </div>


        {showForm && (
          <div>
            <h2>Add User</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text" name='name' placeholder="Full Name" value={formData.name} onChange={handleInputChange} className="w-full p-2 border rounded-full" required
              />

              <input
                type="email" name='email' placeholder="Email Address" value={formData.email} onChange={handleInputChange} className="w-full p-2 border rounded-full" required
              />

              <input
                type="number" name='phonenumber' placeholder="Phone Number" value={formData.phonenumber} onChange={handleInputChange} className="w-full p-2 border rounded-full" required
              />

              <input
                type="text" name='pannumber' placeholder="Pan Number" value={formData.pannumber} onChange={handleInputChange} className="w-full p-2 border rounded-full" required
              />

              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded"> Create User</button>

            </form>
          </div>
        )}

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="">All User ({user.length})</h2>

          {loading ? (
            <p className="text-gray-50">Loading users...</p>
          ) : user.length === 0 ? (
            <p className="text-gray-50">No users...</p>

          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr className="rounded"><th className="px-6 py-2 text-left text-md font-bold uppercase tracking-wide">
                    ID
                  </th>
                    <th className="px-6 py-2 text-left text-md font-bold uppercase tracking-wide">
                      Name
                    </th>
                    <th className="px-6 py-2 text-left text-md font-bold uppercase tracking-wide">
                      Email
                    </th>
                    <th className="px-6 py-2 text-left text-md font-bold uppercase tracking-wide">
                      Phone Number
                    </th>
                    <th className="px-6 py-2 text-left text-md font-bold uppercase tracking-wide">
                      Pan Number
                    </th>
                    <th className="px-6 py-2 text-left text-md font-bold uppercase tracking-wide">
                      Actions
                    </th></tr>
                </thead>
                <tbody>
                  {user.map(user => (

                    <tr key={user.userId} className="hover:bg-gray-50">

                      <td className="px-6 py-3 font-medium">
                        {user.userId}
                      </td>

                      <td className="px-6 py-3 font-medium">
                        {user.name}
                      </td>

                      <td className="px-6 py-3 font-medium">
                        {user.email}
                      </td>

                      <td className="px-6 py-3 font-medium">
                        {user.phonenumber}
                      </td>

                      <td className="px-6 py-3 font-medium">
                        {user.pannumber}
                      </td>

                      <td className="px-6 py-3 font-medium">
                        <button onClick={()=> handleDelete(user.userId)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                      </td>

                    </tr>

                  ))}
                </tbody>
              </table>

            </div>
          )}
        </div>
      </div>
    </div>
  )

}
