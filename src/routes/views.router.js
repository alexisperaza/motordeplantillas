import express from 'express'

const router = express.Router();

const users = [
    {name: "Pepe", last_name: "Martinez", edad: 18, role: "admin"}, 
    {name: "Luis", last_name: "Gonzalez", edad: 32, role: "admin"}, 
    {name: "Arturo", last_name: "Gutierrez", edad: 25, role: "user"}, 
    {name: "Martin", last_name: "Lopez", edad: 50,role: "user"}
]

const food = [
    {name: "Hamburguesa", price: "100"},
    {name: "Soda", price: "30"},
    {name: "Ensalada", price: "120"},
    {name: "Pizza", price: "150"},

]

//Router
router.get('/', (req, res) => {
    const indice = Math.floor(Math.random() * users.length)

    //renderizar la vista
    res.render('index',{
        user:  users[indice], 
        style: 'index.css',
        isAdmin: users[indice].role === 'admin', 
        food})
})


router.get('/register', (req, res) => { 
    console.log(users)
    res.render('register')

})

router.post('/user', (req, res) => {
    const  {name, email, password} = req.body;

    users.push({name, email, password })

    res.render('register', { registroExitoso: true })
})

router.get('/socket', (req, res) => {
    res.render('socket')
})

export default router;