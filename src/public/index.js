document.getElementById('login').onclick = async e => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const body = { email, password }
    const result = await fetch('/jwt/login', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const response = await result.json()
    console.log(response)
}

document.getElementById('service').onclick = async e => {
    try {
        const result = await fetch('/jwt/private', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('')
            }
        })
        const response = await result.json()
        console.log(response)
    } catch(error) {
        console.log(`Front: ${error}`)
    }
}