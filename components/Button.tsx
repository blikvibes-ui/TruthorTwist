import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', ...props }, ref) => {
    const baseClasses = 'font-semibold rounded-lg transition-all focus:outline-none'

    const variantClasses = {
      primary: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-pink-500/50 text-white',
      secondary: 'bg-white/10 border border-white/20 hover:bg-white/20 text-white',
      danger: 'bg-red-600/50 border border-red-500 hover:bg-red-600 text-white',
    }

    const sizeClasses = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    }

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export default Button
