import data from '../data/data.json'
export const getWord = () => {
    let index = localStorage.getItem('juzi') ? Number(localStorage.getItem('juzi')) : -1
    const d = data[index+1]
    if(d) {
        localStorage.setItem('juzi', index+1)
        return d
    } else {
        localStorage.setItem('juzi', 0)
        return data[0]
    }
}