import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { changeName, changeAge } from "../store/userSlice";
import { quantityUpdate, deleteCart } from "./../store";
import { memo, useMemo, useState } from "react";

let Child = memo(function Child() {
  console.log("rerendering...");
  return <div>Child here...</div>;
});

function example() {
  let x = 0;
  return x;
}

function Cart() {
  useMemo(() => {
    return example();
  }, []);
  // *** useMemo와 useEffect 와 동일.  단 한가지 다른 점은 렌더링 시점. useEffect는 HTML 렌더링이 모두 끝난 후 실행.  useMemo는 HTML 렌더링과 같이 실행됨.

  let store = useSelector((state) => {
    return state;
  });
  let dispatch = useDispatch();
  let [count, setCount] = useState(0);

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {store.cart.map((product, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{product.name}</td>
                <td>{product.count}</td>
                <td>
                  <button
                    onClick={() => {
                      /* dispatch(changeName()); */
                      dispatch(quantityUpdate(product.id));
                    }}
                  >
                    +
                  </button>
                  {console.log("product.id", product.id)}
                </td>
                <td>
                  <button
                    onClick={() => {
                      dispatch(deleteCart(product.id));
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
