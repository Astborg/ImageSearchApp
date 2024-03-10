

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { SearchPage } from "./pages/SearchPage";
import { MyPhotos } from "./pages/MyPhotos";
function App() {

  return (
    <>
        <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/myphotos/:id' element={<MyPhotos />} />
        </Routes>
      </Router>
        </>
      )}  
   

export default App
