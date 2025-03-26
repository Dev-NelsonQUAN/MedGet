import React from 'react'

const Input = ({ labelText, htmlFor, type, placeholder, border, outline, px, py, pl, rounded, w, p, bg, borderCol, icon, onChange,value, name }) => {
  // console.log("Input component -  value", value)
  // console.log("Input component -  onChange", onChange)

  return (
    <div className='relative'>
      {labelText && <label
        htmlFor={htmlFor}
        className='font-medium text-[18px] mb-2'>{labelText}</label>}

      <input
        className={`${border} ${outline} ${px} ${py} ${pl} ${rounded} ${w} ${p} ${bg} ${borderCol}`}
        type={type}
        onChange={onChange}
        name={name}
        value={value || ''}
        placeholder={placeholder}
      />
      {icon && <span className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer mt-3.5'> {icon} </span>}
    </div>
  )
}

export default Input