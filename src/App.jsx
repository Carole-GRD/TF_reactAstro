
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './containers/header/header'
import Footer from './containers/footer/footer'



function App() {

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default App
