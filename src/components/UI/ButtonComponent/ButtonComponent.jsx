/* eslint-disable react/prop-types */
import styles from './styles.module.css'

const ButtonComponent = ({children, color, width, height, ...props}) => {
  return (
    <button {...props} id={styles.btnLogin} style={{backgroundColor: color, width: width, height: height}}>
        {children}
    </button>
  )
}

export default ButtonComponent