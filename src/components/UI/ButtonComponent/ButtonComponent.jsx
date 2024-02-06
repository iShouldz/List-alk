import styles from './styles.module.css'

const ButtonComponent = ({children, color, ...props}) => {
  return (
    <button {...props} id={styles.btnLogin} style={{backgroundColor: color}}>
        {children}
    </button>
  )
}

export default ButtonComponent