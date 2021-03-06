const axios = require ('axios');
//const fetch = require('node-fetch');
const users = 'users';
const userid = '1';
const jsonplace = 'https://jsonplaceholder.typicode.com/users/1';
const userinfo = jsonplace/users/userid;
const createTask = 'https://jsonplaceholder.typicode.com/posts'
async function asyncall()
    {
    const response = axios.get(jsonplace); 
    const rop = await (response);
//Assume that the id of the account is 1. So we know that an account 1 exists in the api, therefore a task has to be created in the account.
//The following block executes the code based on an if else loop.
    if(rop.data.id == 1)
    {   
        const obj = {
            "title": "new task",
            "body": "task is to run this code",
            "userID": "1"
        }
        axios.post(
            createTask,
            [this.obj],
        )
        .then(response => {
            console.log(response.data.id)
          })
        .catch(error => {
            console.log(error);
          });       
    } 
    else
    {
        const obj = {
            "title": "new task",
            "body": "task is to run this code but for user 2 since user 1 already has a task created in the first step",
            "userID": "2"
        }
        axios.post(
            createTask,
            [this.obj],
        )
        .then(response => {
            console.log(response.data.id)
          })
        .catch(error => {
            console.log(error);
          }); 
        //console.log('User is unique');
    }
    } 
asyncall()
