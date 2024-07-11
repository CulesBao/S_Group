const time = async() => {
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const d = new Date();
    const day = days[d.getDay()]
    const time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    const createAt = day + " " + time
    
    return createAt
}

export default {time}