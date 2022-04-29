export const getDate = (date) => {
    const newDate = new Date(date)
    const yyyy = newDate.getFullYear()
    const month = newDate.getMonth()+1
    const mm = String(month).padStart(2,"0")    
    const today = newDate.getDate()
    const dd = String(today).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`
}