const express = require('express')
const app = express()
const port = 3001
app.use(express.json())


/*alunos = [{ra: 123, name: "Eduardo", turma: "DSM", cursos: ["VueJS", "React"]}, 
            {ra: 124, name: "Paulo", turma: "DSM", cursos: ["React", "Python"]}, 
            {ra: 125, name: "Thiago", turma: "DSM", cursos: ["Python", "VueJS", "Angular"]}]
*/
const alunos = []
cursos = []

//POST adiciona aluno
app.post('/', (req, res) => {
    pessoa = alunos.find(aluno => aluno.ra === parseInt(req.body.ra));
    if(!pessoa){
        alunos.push(req.body)
        res.send(JSON.stringify(alunos))
    }
    else{
        res.send("RA ja cadastrado")
    }
    
})

//POST adiciona curso
app.post('/curso', (req, res) => {
    const pessoa = alunos.find(aluno => aluno.ra === parseInt(req.query.ra));
    pessoa.cursos.push(req.body.curso)

    res.send(JSON.stringify(pessoa))
})

//PUT altera dados através do RA
app.put('/', (req, res) => {
    const pessoa = alunos.findIndex(aluno => aluno.ra === parseInt(req.body.ra));
    alunos[pessoa] = req.body

    res.send(JSON.stringify(alunos))
})

//PUT altera o curso do aluno
app.put('/curso', (req, res) => {
    const pessoa = alunos.find(aluno => aluno.ra === parseInt(req.query.ra));
    if(pessoa){
        pessoa.cursos = req.body.cursos
        res.send(JSON.stringify(alunos))
    }else {
        res.send('Aluno não encontrado')
    }

    
})

//DELETE remove aluno da lista
app.delete('/', (req, res) => {
    const pessoa = alunos.findIndex(aluno => aluno.ra === parseInt(req.query.ra));
    if (pessoa !== -1) {
        alunos.splice(pessoa, 1);
        res.send(JSON.stringify(alunos))
    } else {
        res.send('Aluno não encontrado')
    }

    
})

//DELETE remove um curso
app.delete('/curso', (req, res) =>{
    const pessoa = alunos.find(pessoa => pessoa.ra === parseInt(req.query.ra));
    if (pessoa) {
        const curso = pessoa.cursos.findIndex(habilidade => habilidade === req.body.curso);
        if (curso !== -1) {
            pessoa.cursos.splice(curso, 1);
            res.send(JSON.stringify(alunos));
        } else {
            res.send('Curso não encontrado');
        }
    } else {
        res.send('Aluno não encontrado');
    }
})

//GET lista alunos
app.get('/', (req, res) => {
    let num = []
    for (let i = 0; i < alunos.length; i++) {
        num.push({ra: alunos[i].ra, nome: alunos[i].nome, turma: alunos[i].turma})
    }
    res.send(JSON.stringify(num))
})

//GET lista aluno através do RA
app.get('/aluno', (req, res) => {
    const pessoa = alunos.find(aluno => aluno.ra === parseInt(req.query.ra));
    if(pessoa){
        res.send(JSON.stringify(pessoa))
    }else {
        res.send('Aluno não encontrado')
    }
})

app.listen(port, () => {
    console.log(`Exemplo rodando na porta ${port}`)
})

