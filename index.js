const { request, response } = require('express')
const express=require('express')
const app=express()
const uuid=require('uuid')
const port=3000
app.use(express.json())

const orders=[]

app.post('/order', (request, response) =>{
    const {order, name, price}=request.body
    const newOrder={id:uuid.v4(), order, name, price, status:"Em preparação" }

    orders.push(newOrder)
    return response.status(200).json(newOrder)
})

app.get('/order', (request, response) =>{
    return response.json(orders)
})

app.put('/order/:id', (request, response) => {
    const {id}=request.params
    const {order, name, price}=request.body
    const updateOrder={id:uuid.v4(), order, name, price}
    const index=orders.findIndex(order => order.id===id)

    if(index<0){
        return response.status(404).json({message:"User not found"})
    }

    orders[index]=updateOrder

    return response.json(updateOrder)
})

app.delete('/order/:id', (request, response) => {
    const {id}=request.params
    const index=orders.findIndex(order => order.id===id)

    if(index<0){
        return response.status(404).json({message:"User not found"})
    }

    orders.splice(index,1)

    return response.status(204).json()
})

app.get('/order/:id', (request, response) => {
    const {id}=request.params
    const index=orders.find(order => order.id===id)
    const SpecificOrder=index

    if(index<0){
        return response.status(404).json({message:"User not found"})
    }

    orders[index]=SpecificOrder

    return response.json(SpecificOrder)
})

app.patch('/order/:id', (request, response) => {
    const {id}=request.params
    const finishedOrder={id:uuid.v4(), order, name, price, status:"Pronto"}
    const index=orders.findIndex(order => order.id===id)

    if(index<0){
        return response.status(404).json({message:"User not found"})
    }

    orders[index]=finishedOrder

    return response.status(204).json(finishedOrder)
})

app.listen(port, () =>{
    console.log('🚀🚀🚀🚀🚀')
})