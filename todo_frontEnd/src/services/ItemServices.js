export const addItemToServer = async (task, date) => {
    const response = await fetch('http://localhost:3000/api/todo/items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({task, date}),
    })

    return await response.json();
}