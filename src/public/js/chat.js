const URL = "http://localhost:8080/api/auth";
let user;
let socket;

//HTML
const txtUid = document.querySelector("#txtUid");
const txtMessage = document.querySelector("#txtMessage");
const ul_users = document.querySelector("#ul_users");
const ul_messages = document.querySelector("#ul_messages");

const socketConnect = async () => {
  socket = io({
    extraHeaders: {
      "x-access-token": localStorage.getItem("token"),
    },
  });

  socket.on("connect", () => {
    console.log("succesfully connected");
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });

  socket.on("server:receive-message", printMessages);

  socket.on("server:active-users", printUsers);

  socket.on("server:receive-private-message", (payload) => {
    console.log('private message', payload)
  });
};

const printUsers = (users=[]) => {
let usersHTML='';

users.forEach(({name,uid}) => {
  usersHTML += `
  <li>
  <p>
    <h5 class="text-success"> ${name} </h5>
    <span class="fs-6 text-muted"> ${uid} </span>
  </p>
</li>
  `
})

ul_users.innerHTML = usersHTML;

}

const printMessages = (messages=[]) => {
  let MessagesHTML='';
  
  messages.forEach(({nombre,mensaje}) => {
    MessagesHTML += `
    <li>
    <p>
      <span class="text-primary"> ${nombre}: </span>
      <span > ${mensaje} </span>
    </p>
  </li>
    `
  })
  
  ul_messages.innerHTML = MessagesHTML;
  
  }

const validateJWT = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location = "index.html";
    throw new Error("No token provided");
  }

  const res = await fetch(URL, {
    headers: { "x-access-token": token },
  });

  const { token: tokenDB, user: userDB } = await res.json();
  console.log(userDB);
  localStorage.setItem("token", tokenDB);
  user = userDB;
  document.title = user.name;

  await socketConnect();
};

txtMessage.addEventListener('keyup',({keyCode})=> {
  if(keyCode !== 13) return;
  const uid = txtUid.value;
  const message = txtMessage.value;
  if(message.length ===0) return ;
  socket.emit('client:send-message',{message,uid});
  txtMessage.value = '';
})

const main = async () => {
  validateJWT();
};

main();
