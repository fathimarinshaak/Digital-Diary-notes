const express = require('express')
const app = express()

app.set('view engine','ejs')
app.set('views','views')

app.use(express.static('public'))
app.use(express.urlencoded())

const notes = []

app.get('/',(req,res)=>{
    return res.render('home')
})

app.get('/contents',(req,res)=>{
    return res.render('contents')
})

app.get('/addnewnote',(req,res)=>{
    const pagenumber = notes.length+1
    return res.render('addnewnote',{pagenumber})
})

app.post('/addnewnote',(req,res)=>{
    console.log(req.body)
    notes.push({
        pagenumber:'',
        date:req.body.date,
        entry:req.body.entry
    })
    console.log(notes)
    return res.redirect('/contents')
})

app.get('/viewnotes',(req,res)=>{
    return res.render('viewnoteslist',{notes})
})

app.use((req,res,next)=>{
    return res.redirect('/')
})


app.listen(3000,()=>{
    console.log('app started!!!')
})