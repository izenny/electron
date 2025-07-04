import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
  const { logout } = useAuth()
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: null
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'image') {
      setProduct((prev) => ({ ...prev, image: files[0] }))
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // You can handle API call here
    console.log('Product submitted:', product)
  }
  const handlelogout = async () => {
    try {
      await logout()
    } catch (error) {}
  }
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Dashboard</h1>
      <button onClick={handlelogout}>LOGOUT</button>
      <form onSubmit={handleSubmit} className="max-w-xl rounded-2xl bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-gray-700">Add Product</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="w-full rounded-md border p-2"
            placeholder="Product name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
            className="w-full rounded-md border p-2"
            placeholder="Enter product description"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            className="w-full rounded-md border p-2"
            placeholder="Enter price"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Category</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
            className="w-full rounded-md border p-2"
            placeholder="e.g. Electronics"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Stock Quantity</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            required
            className="w-full rounded-md border p-2"
            placeholder="Available stock"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600">Product Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full rounded-md border p-2"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>
    </div>
  )
}

export default Dashboard
