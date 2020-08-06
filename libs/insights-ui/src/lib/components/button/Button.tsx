import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@material-ui/core'
import React from 'react'
interface ButtonProps extends MuiButtonProps {
  onClick?: React.MouseEventHandler<HTMLElement>
}
export const Button: React.FC<ButtonProps> = ({ onClick, children, ...props }): JSX.Element => {
  return (
    <MuiButton variant="contained" color="primary" {...props} onClick={onClick}>
      {children}
    </MuiButton>
  )
}
