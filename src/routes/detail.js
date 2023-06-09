import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../store";
import Tab from "../components/tab";

function Detail(props) {
  let [count, setCount] = useState(0);
  let { id } = useParams();
  let product = props.defaultData.find(
    (item) => parseInt(item.id) === parseInt(id)
  );
  let [alert, setAlert] = useState(true);
  let [inputValue, setInputValue] = useState("");
  let [warning, setWarning] = useState(false);
  let [fadeIn, setFadeIn] = useState("");

  let store = useSelector((state) => {
    return state;
  });
  let dispatch = useDispatch();

  console.log("product:", product);

  useEffect(() => {
    let watched = localStorage.getItem("watched");
    watched = JSON.parse(watched);
    watched.push(product.id);
    watched = new Set(watched);
    watched = [...watched];
    localStorage.setItem("watched", JSON.stringify(watched));
  }, []);

  useEffect(() => {
    setFadeIn("end");
    return () => {
      setFadeIn("");
    };
  }, []);

  useEffect(() => {
    isNaN(inputValue) && inputValue.length > 0
      ? setWarning(true)
      : setWarning(false);
  }, [inputValue]);

  useEffect(() => {
    console.log("This is executed When this component is mount or update");

    let setTimer = setTimeout(() => {
      setAlert(false);
    }, 2000);

    return () => {
      clearTimeout(setTimer); // Timer 제거해주는 함수
    };
  }, []); // [] -> useEffect 실행조건 넣을 수 있는 곳, []내의 변수값이 변할때마다 useEffect내의 코드가 실행됨. []안에 변수가 없으면, mount될때만, 코드가 실행됨.

  const imgDomain = "https://codingapple1.github.io/shop/shoes";
  return (
    <div className={`container mb-5 start ${fadeIn}`}>
      {alert ? (
        <div className="alert alert-warning">
          Disount when purchasing within 2 seconds.
        </div>
      ) : null}

      <div className="row">
        <div className="col-md-6">
          <img
            src={imgDomain + (parseInt(product.id) + 1) + ".jpg"}
            width="100%"
            alt=""
          />
        </div>

        <div className="col-md-6">
          <h4 className="pt-5">{product.title}</h4>
          <p>{product.content}</p>
          <p>$ {product.price}</p>

          <button
            className="btn btn-danger"
            onClick={() => {
              dispatch(
                addToCart({
                  id: product.id,
                  name: product.title,
                  count: 1,
                })
              );
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>

      <Tab
        title={product.title}
        content={product.content}
        price={product.price}
      ></Tab>
    </div>
  );
}

export default Detail;
