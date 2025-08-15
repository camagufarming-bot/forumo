export default {
  auth: {
    register: '/auth/register',
    login: '/auth/login',
    me: '/auth/me'
  },
  products: {
    list: '/products',
    create: '/products',
    byId: (id)=>`/products/${id}`,
    search: '/products/search'
  },
  orders: {
    create: '/orders',
    mine: '/orders/my',
    byId: (id)=>`/orders/${id}`
  },
  chat: {
    create: '/chat/threads',                 // POST { toUserId?, productId? } -> thread
    threads: '/chat/threads',                // GET -> list
    threadById: (id)=>`/chat/threads/${id}`, // GET -> one
    send: (id)=>`/chat/threads/${id}/messages` // POST { message }
  }
};
