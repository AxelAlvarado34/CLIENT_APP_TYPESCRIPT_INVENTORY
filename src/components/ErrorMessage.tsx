import { ReactNode } from "react"

type ErrorMessageProops = {
    children: ReactNode
}


export const ErrorMessage = ({children} : ErrorMessageProops) => {
  return (
    <div
        className="p-3 rounded-md text-white mt-5 bg-red-600 text-center font-bold uppercase"
    >
        {children}
    </div>
  )
}
