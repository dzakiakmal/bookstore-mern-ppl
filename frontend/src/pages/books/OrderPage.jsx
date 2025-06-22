import React from 'react';
import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi';
import { useAuth } from '../../context/AuthContext';

const OrderPage = () => {
  const { currentUser } = useAuth();
  const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser.email);

  const formatDate = (dateString) => {
    if (!dateString) return 'Tanggal tidak tersedia';
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('us-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount); // Asumsi 1 USD = 15.000 IDR
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error getting orders data</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Riwayat Pesanan</h2>
                <p className="text-sm text-gray-600 mt-1">{orders.length > 0 ? `${orders.length} pesanan ditemukan` : 'Tidak ada pesanan untuk ditampilkan'}</p>
              </div>
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                <span className="text-sm font-medium text-gray-700">Total Pesanan: </span>
                <span className="text-sm font-bold text-blue-600">{orders.length}</span>
              </div>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div className="text-xl font-medium text-gray-900 mb-2">Tidak ada pesanan ditemukan</div>
              <p className="text-gray-500 max-w-sm mx-auto">Riwayat pesanan Anda akan muncul di sini setelah Anda melakukan pembelian pertama.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">Detail Pesanan</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">Info Pelanggan</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">Alamat Pengiriman</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">Produk</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">Total Harga</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((order, index) => (
                    <tr key={order._id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="py-6 px-6">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-bold">{index + 1}</span>
                            </div>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">#{order._id.slice(-8).toUpperCase()}</div>
                            <div className="text-sm text-gray-500 mt-1">{formatDate(order.createdAt)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-6">
                        <div>
                          <div className="font-medium text-gray-900">{order.name}</div>
                          <div className="text-sm text-gray-500 mt-1">{order.email}</div>
                          <div className="text-sm text-gray-500">{order.phone}</div>
                        </div>
                      </td>
                      <td className="py-6 px-6">
                        <div className="text-sm">
                          <div className="text-gray-900 font-medium">
                            {order.address.city}, {order.address.state}
                          </div>
                          <div className="text-gray-500 mt-1">{order.address.country}</div>
                          <div className="text-gray-500">{order.address.zipcode}</div>
                        </div>
                      </td>
                      <td className="py-6 px-6">
                        <div>
                          <div className="font-medium text-gray-900">
                            {order.productIds.length} {order.productIds.length === 1 ? 'Item' : 'Item'}
                          </div>
                          <div className="text-xs text-gray-500 mt-1 max-w-xs">
                            {order.productIds.slice(0, 2).join(', ')}
                            {order.productIds.length > 2 && <span className="text-blue-600 font-medium">+{order.productIds.length - 2} lainnya</span>}
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-6">
                        <div className="text-lg font-bold text-gray-900">{formatCurrency(order.totalPrice)}</div>
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
  );
};

export default OrderPage;
