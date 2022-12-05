import { useSelector } from 'react-redux'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import LoadingScreen from './components/LoadingScreen'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductsId from './pages/ProductsId'
import Purchases from './pages/Purchases'

function App() {

  const isLoading = useSelector(state => state.isLoading)

  return (

    <HashRouter>
      <NavBar/>
      {isLoading && <LoadingScreen/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products/:id' element={<ProductsId/>}/>
        <Route path='/purchases' element={<Purchases/>}/>
        <Route path='/login' element={<Login/>}/>

      </Routes>
    </HashRouter>
  )
}

export default App
