import {useState} from "react"

export function useLocalStorage(keyName, defaultValue){

    const [storedValue, setStoredValue] = useState(() => {
        try{
            const value = window.localStorage.getItem(keyName)

            if(value){
                return JSON.parse(value)
            }

            window.localStorage.setItem(keyName, defaultValue)
            return defaultValue

        }catch(error){
            console.log(error)
            return defaultValue
        }
    })

    const setValue = (newValue) => {
        try{
            window.localStorage.setItem(newValue)
        }catch(err){
            console.log(err)
        }

        setStoredValue(newValue)
    }

    return [storedValue, setValue]

}