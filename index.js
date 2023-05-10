const { request, response, json } = require('express')
const express=require('express')
const app=express()
const uuid=require('uuid')
const cors=require('cors')

app.use(express.json())
app.use(cors())

const port = process.env.PORT || 3001

const orders=[]

const checkOrderId=(request, response, next) => {
    const {id}=request.params
    const index=orders.findIndex(order => order.id===id)
    if(index<0){
        return response.status(404).json({message:"order not found"})
    }
    request.orderIndex=index

    next()
}

const checkUrl=(request, response, next) => {
    const url=request.params
    const method=request.params

    console.log(url)
    console.log(method)

    next()
}

app.get('/', (resq, resp) => {
    return resp.json("hello world")
})

app.post('/order', checkUrl, (request, response) => {
    const {order, name}=request.body
    const newOrder={id:uuid.v4(), order, name, status:"Em preparação"}

    orders.push(newOrder)
    return response.status(201).json(newOrder)
})

app.get('/order', checkUrl, (request, response) =>{
    return response.json(orders)
})

app.put('/order/:id', checkOrderId, checkUrl, (request, response) => {
    const {order, name, price}=request.body
    const index=request.orderIndex
    const id=request.orderIde
    const updateOrder={id:uuid.v4(), order, name, price}

    orders[index]=updateOrder

    return response.json(updateOrder)
})

app.delete('/order/:id', checkOrderId, checkUrl, (request, response) => {
    const index=request.orderIndex

    orders.splice(index,1)

    return response.status(204).json()
})

app.get('/order/id', checkOrderId, checkUrl, (request, response) => {
    const index=request.orderIndex
    const id=request.orderId
    const specificOrder={id:uuid.v4(), order, name, price}

    orders[index]=specificOrder

    return response.json(specificOrder)

    // essa rota não estar pegando
})

app.patch('/order/:id', checkOrderId, checkUrl, (request, response) => {
    try {
        const index=request.orderIndex
        const finishedOrder = { id: uuid.v4(), status:"Pronto" }

        orders[index] = finishedOrder

        return response.status(204).json(finishedOrder)
    } catch (err) {
        return response.status(500).json({ error:err.message })
    } finally{
        console.log("Terminou tudo")
    }
})

app.listen(port, () =>{
    console.log('🚀🚀 Server started on port 3001')
})