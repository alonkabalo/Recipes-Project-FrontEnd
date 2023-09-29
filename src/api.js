import { API_KEY } from "./config"
import axios from 'axios'

const get = async (path,
    params = {
    from: '0',
    size: '20',
    tags: 'under_30_minutes,mexican'
}) => {
    return await axios.get('https://tasty.p.rapidapi.com' + path,{
        params,
        headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
         'Content-Type':"application/json"
        }
    })
}

export const getAllRecipes = async (country) => {
    const response = await get("/recipes/list",{
        from: '0',
        size: '100',
        tags: `under_30_minutes,${country}`
    })
    const json = await response.data  // response as json
    return json.results
}



export const register = async (user) => {

    return await axios.post(`https://api.shipap.co.il/signup`,user, {
        headers :{'Content-type': 'application/json'},
        withCredentials:true
    }).then(res => res.data)
    .catch(console.log)
}

export const login = async (email, password) => {
  return await fetch(`https://api.shipap.co.il/login`, {
    credentials: 'include',
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({email,password}),
 })
 .then(res => {
     if (res.ok) {
         return res.json();
     } else {
         return res.text().then(x => {
             throw new Error(x);
         });
     }
 })
 .catch(err => {
     console.log(err.message);
 });
}