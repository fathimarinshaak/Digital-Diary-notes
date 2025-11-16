const express = require('express')
const app = express()

app.set('view engine','ejs')
app.set('views','views')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

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
    notes.push({
        pagenumber:notes.length+1,
        date:req.body.date,
        entry:req.body.entry
    })
    console.log(notes)
    return res.redirect('/contents')
})

app.get('/viewnoteslist',(req,res)=>{
    return res.render('viewnoteslist',{notes})
})

app.get('/viewnoteslist/:pagenumber',(req,res)=>{
    const pagenumber = Number(req.params.pagenumber)
    const currentNote = notes.find((i)=>{return i.pagenumber==pagenumber})
    console.log(currentNote.pagenumber)
    return res.render('viewnote',{currentNote})
})

app.post('/viewnoteslist/:pagenumber/edit',(req,res)=>{
    const page = Number(req.params.pagenumber)
    const {date,entry} = req.body
    notes.splice(page-1,1,{pagenumber:page,date:date,entry:entry})
    console.log(notes)
    return res.redirect('/viewnoteslist')
})

app.post('/viewnoteslist/:pagenumber/delete',(req,res)=>{
    const page = Number(req.params.pagenumber)
    notes.splice(page-1,1)
    notes.forEach((i,index)=>{
        i.pagenumber = index + 1
    })
    console.log(notes)
    return res.redirect('/viewnoteslist')
})

app.use((req,res,next)=>{
    return res.redirect('/')
})


app.listen(3000,()=>{
    console.log('app started!!!')
})