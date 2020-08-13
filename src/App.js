import React from 'react';
import logo from './logo.svg';
import './App.css';
import ListaProductos from '../src/components/catalogo/listaProductos'
import AddProductForm from '../src/components/gestion/addProductForm'


function App() {
  return (
    <div>
      <ListaProductos/>
      <AddProductForm />


      {/* <script src="https://www.gstatic.com/firebasejs/7.17.2/firebase-app.js"></script>

     
      <script src="https://www.gstatic.com/firebasejs/7.17.2/firebase-analytics.js"></script>

      <script>
        {
          apiKey: "AIzaSyBT6ytCJTBSoaiYq9cFlBkazH_q9BBs6oM",
          authDomain: "mystore-eba84.firebaseapp.com",
          databaseURL: "https://mystore-eba84.firebaseio.com",
          projectId: "mystore-eba84",
          storageBucket: "mystore-eba84.appspot.com",
          messagingSenderId: "368884795131",
          appId: "1:368884795131:web:f12e4aecd5126e2dd1925e",
          measurementId: "G-18ZS86Z3XZ"
        };
        Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();
      </script> */}
    </div>
    
        
  );
}

export default App;
