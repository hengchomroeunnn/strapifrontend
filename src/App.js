import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import ReviewDetail from "./pages/ReviewDetail";
import Category from "./pages/Category";
import { InMemoryCache, ApolloClient, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://strapizin-203511fa200d.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/reviewdetail/:id' element={<ReviewDetail />} />
          <Route path='/category/:id' element={<Category/>} />
        </Routes>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
