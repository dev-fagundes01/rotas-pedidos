const { request, response } = require('express')
const express=require('express')
const app=express()
const uuid=require('uuid')
const port=3000
app.use(express.json())

const orders=[]

app.post('/order', (request, response) =>{
    const {order, name, price}=request.body
    const updateOrder={id:uuid.v4(), order, name, price}

    orders.push(updateOrder)
    return response.status(100).json(updateOrder)
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

app.listen(port, () =>{
    console.log('🚀🚀🚀🚀🚀')
})