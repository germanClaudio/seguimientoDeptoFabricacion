function updateTime() {
    const now = new Date()
    //const date = now.toLocaleDateString()
    const weekdays = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
    const weekday = weekdays[now.getDay()]
    const day = String(now.getDate()).padStart(2, '0')
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const year = now.getFullYear()
    const time = now.toLocaleTimeString('en-US', { hour12: false })
    const timeString = `${weekday}, ${day}/${month}/${year} - ${time}`
    document.getElementById("clock").textContent = timeString
}
setInterval(updateTime, 1000)