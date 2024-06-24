import logo from './logo.svg';
import {BrowserRouter,Route,Routes} from "react-router-dom"

import CommentForm from './Page/CommentForm';
import Table from './Page/Table';

function App() {
  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<CommentForm/>} />
      <Route path="/table" element={<Table/>}  />
     </Routes>
     </BrowserRouter>


    </>
  );
}

export default App;
