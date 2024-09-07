import React from 'react'
import { Button } from 'react-bootstrap'
const ButtonComponent = (props) => {
    const {size, children,onClick,className,variant} =props
  return (
    <Button
    size={size}
    onClick={onClick}
    className={className}
    variant={variant}
   >{children}</Button>
  )
}

export default ButtonComponent