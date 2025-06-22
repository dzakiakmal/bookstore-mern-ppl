import { useAuth } from '../../../context/AuthContext';
import { useGetOrderByEmailQuery } from '../../../redux/features/orders/ordersApi';
import { useFetchAllBooksQuery } from '../../../redux/features/books/booksApi';
import { getImgUrl } from '../../../utils/getImgUrl';

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser?.email);
  const { data: books = [], isLoading: booksLoading } = useFetchAllBooksQuery();

  const getBookById = (bookId) => books.find((book) => book._id === bookId);

  if (isLoading || booksLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isError) {
    return <div className="text-center text-red-600 p-4">Error getting orders data</div>;
  }

  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
        <p className="text-gray-700 mb-6">Welcome, {currentUser?.name || 'User'}! Here are your recent orders:</p>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800">Total Orders</h3>
            <p className="text-2xl font-bold text-blue-600">{orders.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-800">Books Purchased</h3>
            <p className="text-2xl font-bold text-green-600">{orders.reduce((total, order) => total + order.productIds.length, 0)}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="text-lg font-semibold text-purple-800">Total Spent</h3>
            <p className="text-2xl font-bold text-purple-600">${orders.reduce((total, order) => total + parseFloat(order.totalPrice), 0).toFixed(2)}</p>
          </div>
        </div>

        {/* Orders */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
          {orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order, index) => (
                <div key={order._id} className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <div className="flex justify-between items-start mb-4 pb-3 border-b border-gray-200">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">Order #{index + 1}</span>
                        <span className="text-gray-600 text-sm">{new Date(order.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-gray-500 font-mono">ID: {order._id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-green-600">${order.totalPrice}</p>
                      <p className="text-sm text-gray-500">{order.productIds.length} book(s)</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-md font-medium text-gray-800 mb-3">Books Purchased:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                      {order.productIds.map((productId) => {
                        const book = getBookById(productId);
                        return (
                          <div key={productId} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                            {book ? (
                              <>
                                <div className="aspect-[3/4] overflow-hidden">
                                  <img src={getImgUrl(book.coverImage)} alt={book.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-200" />
                                </div>
                                <div className="p-3">
                                  <h5 className="font-semibold text-sm text-gray-800 mb-1 line-clamp-2">{book.title}</h5>
                                  <p className="text-xs text-gray-600 mb-1">{book.author || 'Unknown Author'}</p>
                                  <p className="text-sm font-bold text-green-600">${book.newPrice}</p>
                                </div>
                              </>
                            ) : (
                              <div className="aspect-[3/4] bg-gray-200 flex items-center justify-center p-3">
                                <div className="text-center">
                                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <span className="text-gray-500 text-lg">📚</span>
                                  </div>
                                  <p className="text-xs text-gray-500 font-mono break-all">{productId}</p>
                                  <p className="text-xs text-gray-400 mt-1">Book not found</p>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gray-400 text-3xl">📚</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No orders yet</h3>
              <p className="text-gray-600 mb-4">You have no recent orders.</p>
              <p className="text-gray-500 mb-6">Start your reading journey by purchasing your first book!</p>
              <a href="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                Browse Books
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
