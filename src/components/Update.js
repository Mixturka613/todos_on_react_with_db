const linkServ = 'http://192.168.1.4:5050/api/'

export function SendMess(props) {
    const { id, text, tocken } = props;
    fetch(`${linkServ}create`, {
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
    fetch(`${linkServ}delete`, {
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
    fetch(`${linkServ}update`, {
        method: "PUT",
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