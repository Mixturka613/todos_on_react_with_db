export function SendMess(props) {
    const { id, text, tocken } = props;
    fetch('http://localhost:5050/api/create', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            tocken: tocken,
            id: id,
            text: text
        })
    })
        .then(res => res.json())
        .then(data => {
            // Когда нибудь пригодится
        })
}

export function deleteDo(id, tocken) {
    fetch('http://localhost:5050/api/delete', {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            tocken: tocken,
            id: id,
        })
    })
        .then(res => res.json())
        .then(data => {
            // console.log(data)
        })
}

export function updateDo(id, tocken) {
    fetch('http://localhost:5050/api/update', {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            tocken: tocken,
            id: id,
        })
    })
        .then(res => res.json())
        .then(data => {
            // console.log(data)
        })
}