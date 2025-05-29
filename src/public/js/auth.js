const URL = 'http://localhost:8080/api'
const form = document.querySelector('form');

form.addEventListener('submit',(e)=> {
e.preventDefault();
const formData = {};

for(let input of form.elements){
  if(input.name.length){
  formData[input.name] = input.value;
  }
}

fetch(`${URL}/auth/login`,{
 method:'POST',
 body: JSON.stringify(formData),
 headers:{'Content-Type':'application/json'} 
})
.then(res => res.json())
.then(({token}) => {
localStorage.setItem('token',token);
window.location = 'chat.html'
})
.catch(err => {
  console.log(err)
})

})