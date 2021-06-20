const express = require('express');
const app = express();
const fs = require('fs')
const PORT = 4001;

app.use(express.static('public'));

let listItems;

app.get('/api/list', (req, res) => {
    const JSONdata = fs.readFileSync('./itemList.json');
    listItems = JSON.parse(JSONdata);
    res.send(listItems)
})
app.delete('/api/delete/:id', (req, res) => {
    let newArray = listItems.filter((item) => {
        if (item.item != req.params.id) {
            return item;
        }
    })
    listItems = newArray;

    const jsonString = JSON.stringify(listItems)
    fs.writeFileSync('./itemList.json', jsonString)

    res.status(200).send(listItems);
})
app.post('/api/add', (req, res) => {
    listItems.push(req.query)
    res.status(200).send(listItems);
    const jsonString = JSON.stringify(listItems)
    fs.writeFileSync('./itemList.json', jsonString)
})

app.listen(PORT, (req, res) => {
    console.log(`Listening on Port: ${PORT}`);
})