import style from "./tabContent.module.css";
import { useState, useEffect } from "react";

function TabContent(props) {
  let [fadeIn, setFadeIn] = useState("");

  useEffect(() => {
    let timer = setTimeout(() => {
      setFadeIn("end");
    }, 100);
    return () => {
      clearTimeout(timer);
      setFadeIn("");
    };
  }, [props.tab]);

  const content = [
    <div>{props.title}</div>,
    <div>{props.content}</div>,
    <div>{props.price}</div>,
  ];
  return (
    <div className={`tabContent pt-5 pb-5 mb-5 start ${fadeIn}`}>
      {content[props.tab]}
    </div>
  );
}

export default TabContent;
