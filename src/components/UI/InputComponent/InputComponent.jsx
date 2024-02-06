/* eslint-disable react/prop-types */
import { Controller } from 'react-hook-form'
import styles from './styles.module.css'

const InputComponent = ({label, name, border, control, ...rest}) => {
  return (
    <div>
      <label id={styles.label}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => <input id={styles.input} style={{ border: border}} {...field} {...rest} />}
      />
    </div>
  )
}

export default InputComponent