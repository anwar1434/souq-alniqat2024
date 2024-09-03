import styles from "./styles/Botton.module.css"
function Button ({text} : {text:string})
{
  return <button className={styles["btn"]}>{text}</button>
  
}

export default Button;
