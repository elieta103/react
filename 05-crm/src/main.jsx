import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import NuevoCliente, {action as nuevoClienteAction} from './pages/NuevoCliente'
import EditarCliente, {action as editarClienteAction, loader as clienteEditarLoader} from './pages/EditarCliente'
import {action as eliminarClienteAction} from './components/Cliente'

import Index, {loader as clientesLoader} from './pages/Index'

import ErrorPage from './components/ErrorPage'




const router = createBrowserRouter([
  {
    path: '/', 
    element: <Layout/>,
    children : [
      {
        index: true,
        element: <Index />,
        loader: clientesLoader,
        errorElement: <ErrorPage/>
      },
      {
        path: '/clientes/nuevo', 
        element: <NuevoCliente />,
        action: nuevoClienteAction,
        errorElement: <ErrorPage/>
      },
      {
        path: '/clientes/:clienteId/editar', 
        element: <EditarCliente />,
        loader: clienteEditarLoader,
        action: editarClienteAction,
        errorElement: <ErrorPage />
      },
      {
        path: '/clientes/:clienteId/eliminar',
        action: eliminarClienteAction
      }
  ]
  }
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
