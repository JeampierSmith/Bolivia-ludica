const API_URL = import.meta.env.VITE_API_URL + '/pedidos';

export async function getPedidos() {
  const res = await fetch(API_URL, {
    credentials: 'include'
  });
  let errorMsg = 'Error al obtener pedidos';
  let errorBody = null;
  try {
    errorBody = await res.json();
  } catch {}
  if (!res.ok) {
    console.error('Respuesta error pedidos:', errorBody);
    if (errorBody && errorBody.error) errorMsg += ': ' + errorBody.error;
    throw new Error(errorMsg);
  }
  return errorBody;
}

export async function createPedido(data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  let errorMsg = 'Error al crear pedido';
  let errorBody = null;
  try {
    errorBody = await res.json();
  } catch {}
  if (!res.ok) {
    if (errorBody && errorBody.error) errorMsg += ': ' + errorBody.error;
    throw new Error(errorMsg);
  }
  return errorBody;
}

export async function getPedidosCliente() {
  const res = await fetch(API_URL + '/tienda', {
    credentials: 'include'
  });
  let errorMsg = 'Error al obtener pedidos del cliente';
  let errorBody = null;
  try {
    errorBody = await res.json();
  } catch {}
  if (!res.ok) {
    if (errorBody && errorBody.error) errorMsg += ': ' + errorBody.error;
    throw new Error(errorMsg);
  }
  return errorBody;
}

export async function createPedidoCliente(data) {
  const res = await fetch(API_URL + '/tienda', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  let errorMsg = 'Error al crear pedido (cliente)';
  let errorBody = null;
  try {
    errorBody = await res.json();
  } catch {}
  if (!res.ok) {
    if (errorBody && errorBody.error) errorMsg += ': ' + errorBody.error;
    throw new Error(errorMsg);
  }
  return errorBody;
}

export async function updatePedido(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  let errorMsg = 'Error al actualizar pedido';
  let errorBody = null;
  try {
    errorBody = await res.json();
  } catch {}
  if (!res.ok) {
    if (errorBody && errorBody.error) errorMsg += ': ' + errorBody.error;
    throw new Error(errorMsg);
  }
  return errorBody;
}

export async function deletePedido(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  });
  let errorMsg = 'Error al eliminar pedido';
  let errorBody = null;
  try {
    errorBody = await res.json();
  } catch {}
  if (!res.ok) {
    if (errorBody && errorBody.error) errorMsg += ': ' + errorBody.error;
    throw new Error(errorMsg);
  }
  return errorBody;
}
