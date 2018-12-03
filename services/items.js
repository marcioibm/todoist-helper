const axios = require('axios');

axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.TODOIST_API_TOKEN}`;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

module.exports = {
     getTasks : async function(){
         return axios.post('https://todoist.com/api/v7/sync',{
            token: process.env.TODOIST_API_TOKEN,
            resource_types: '["items"]',
            sync_token: '*',
        })
        .then((response)=> response && response.data.items)
        .catch(console.error);
    }
}