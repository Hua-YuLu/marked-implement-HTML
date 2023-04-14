const marked = require('marked')
const axios = require('axios')

axios.get('http://localhost:8080/data').then(response=>{
    document.body.innerHTML = marked.parse(response.data);
})
