function updateTime() {
    const now = new Date()
    //const date = now.toLocaleDateString()
    const weekdays = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
        weekday = weekdays[now.getDay()],
        day = String(now.getDate()).padStart(2, '0'),
        month = String(now.getMonth() + 1).padStart(2, '0'),
        year = now.getFullYear(),
        time = now.toLocaleTimeString('en-US', { hour12: false }),
        timeString = `${weekday}, ${day}/${month}/${year} - ${time}`

    if (document.getElementById("clock")) document.getElementById("clock").textContent = timeString
}

setInterval(updateTime, 1000)