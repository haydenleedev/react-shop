import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: "kim",
});

let products = createSlice({
  name: "products",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
});

let stock = createSlice({
  name: "stock",
  initialState: [10, 11, 12],
});

export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    products: products.reducer,
  },
});

/* 
*** store의 state 변경하는 법 ****

1. store.js 안에 state 수정해주는 함수부터 만듭니다. -> slice 안에 reducers : { } 열고 거기 안에 함수 만들면 됩니다.
- 함수 작명 맘대로 합니다.
- 파라미터 하나 작명하면 그건 기존 state가 됩니다.
- return 우측에 새로운 state 입력하면 그걸로 기존 state를 갈아치워줍니다. 

let user = createSlice({
    name: 'user',
    initialState: 'Lee',
    reducers : {
        changeName(state) {
            return 'John ' + state  // -> 변경될 state: John Lee
        }
    }
})

2. store.js 에서 다른 곳에서 쓰기좋게 export 해둡니다.
- 아래의 export 코드 store.js 밑에 추가하면 됩니다.
- user.actions -> slice이름.actions 라고 적으면 state 변경함수가 전부 그 자리에 출력됩니다.
- 그걸 변수에 저장했다가 export 하라는 뜻일 뿐임 
export let { changeName } = user.actions


3. 원하는 파일에 import 해서 사용합니다. 근데 dispatch() 로 감싸서 써야함 
예를 들어서 Cart.js 에서 버튼같은거 하나 만들고
그 버튼 누르면 state를 'kim' -> 'john kim' 이렇게 변경하고 싶으면
아래처럼 코드짜면 됩니다. 
- store.js에서 원하는 state변경함수 가져오면 되고 
- useDispatch 라는 것도 라이브러리에서 가져옵니다.
- useDispatch를 변수에 저장해놓음.
- 그리고 dispatch( state변경함수() ) 이렇게 감싸서 실행하면 state 진짜로 변경됩니다. 

import { useDispatch, useSelector } from "react-redux"
import { changeName } from "./../store.js"

function(){
  let dispatch = useDispatch();
  return (

    <button onClick={()=>{
        dispatch(changeName())
    }}Click Here</button>

  )
}

*/
