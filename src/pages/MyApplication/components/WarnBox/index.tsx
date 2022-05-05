import { Link } from "react-router-dom";
import style from "./WarnBox.module.css";

const WarnBox = (props: any) => {
  return <div className={style["WarnBox-container"]}>{props.children}</div>;
};

export default WarnBox;
