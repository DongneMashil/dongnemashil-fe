import React from 'react'

export const CurrentKeywordButton = ({children, onClick} : {children: string; onClick: (e:React.MouseEvent<HTMLElement>)}) => {
    const onQuery = (e:React.MouseEvent<HTMLElement>) => {
        onClick(e);
    }
  return (
    <button onClick={onQuery}>{children}</button>
  )
}