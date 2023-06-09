import { Button, Navbar, Container, Nav } from "react-bootstrap";
import {
  lazy,
  Suspense,
  useState,
  useEffect,
  useTransition,
  useDeferredValue,
} from "react";
import data from "./data";
import Main from "./routes/main";
import Footer from "./components/footer";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

/* import Detail from "./routes/detail";
import Cart from "./routes/cart"; */

const Detail = lazy(() => import("./routes/detail"));
const Cart = lazy(() => import("./routes/cart"));

let a = new Array(1000).fill(0);

function App() {
  let [defaultData, setData] = useState(data);
  let [loadMore, setLoadMore] = useState(false);
  let navigate = useNavigate();
  let [clickCount, setClickCount] = useState(0);
  let [loading, setLoading] = useState(false);
  let [noMoreProducts, setNoMoreProducts] = useState(false);
  let [name, setName] = useState("");

  function handleLoadMore(...newData) {
    let defaultDataCopy = [...defaultData, ...newData];
    setData(defaultDataCopy);
  }

  useEffect(() => {
    let isWatched = localStorage.getItem("watched");
    if (!isWatched) {
      localStorage.setItem("watched", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    console.log(loadMore);
    if (loadMore) {
      axios
        .get(`./data/data${clickCount + 1}.json`)
        .then((result) => {
          handleLoadMore(...result.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("failed");
          setNoMoreProducts(true);
        });
    }
  }, [loadMore, clickCount]);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Shoe Shop
          </Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/cart" className="nav-link">
              Cart
            </Link>

            <Nav className="ms-auto text-white pt-2"></Nav>
          </Nav>
        </Container>
      </Navbar>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1 className="pt-3 pb-2 medium">
                  Shop Early, Save More! 30% OFF Your Order
                </h1>
                <Main
                  defaultData={defaultData}
                  loadMore={() => {
                    setClickCount(clickCount + 1);
                    setLoadMore(true);
                  }}
                  noMoreProducts={noMoreProducts}
                />
              </>
            }
          />

          <Route
            path="/detail/:id"
            element={<Detail defaultData={defaultData} />}
          />

          <Route path="/about" element={<About />}>
            <Route path="member" element={<div>Members</div>} />
          </Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/event" element={<Event />}>
            <Route
              path="one"
              element={
                <div>
                  When you order first, the cabbage juice will be provided free.
                </div>
              }
            />
            <Route
              path="two"
              element={<div>The birthday coupone will be provided.</div>}
            />
          </Route>
          <Route path="*" element={<div>The page doesn't exist</div>} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>Company Information</h4>
      <Outlet></Outlet>{" "}
      {/* <Outlet>은 nested routes안의 element들을 어디에 보여줄지 표기하는 곳 */}
    </div>
  );
}

function Event() {
  return (
    <div>
      <h4>Today's Event</h4>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
