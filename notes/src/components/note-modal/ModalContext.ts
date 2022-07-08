import React from 'react'

type ModalContextPropType = {
  handleSubmit: () => void
}
const ModalContext = React.createContext<Partial<ModalContextPropType>>({handleSubmit: undefined})

export const ModalProvider = ModalContext.Provider

export default ModalContext
