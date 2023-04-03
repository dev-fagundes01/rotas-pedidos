const { request, response, json } = require('express')
const express=require('express')
const app=express()
const uuid=require('uuid')
const port=3000

const orders = []

const checkOrderId=(request, response, next) => {
    const {id}=request.params
    const index=orders.findIndex(order => order.id===id)

    if(index<0){
        return response.status(404).json({message:"order not found"})
    }

    next()
}

const checkUrl=(request, response, next) => {
    const url=request.url
    const method=request.method

    console.log(url)
    console.log(method)

    next()
}

app.get('/', (resq, resp) => {
    return resp.json("hello world")
})

app.post('/order', checkUrl, (request, response) => {
    const {order, name, price}=request.body
    const newOrder={id:uuid.v4(), order, name, price, status:"Em preparação"}

    orders.push(newOrder)
    return response.status(201).json(newOrder)
})

app.get('/order', checkUrl, (request, response) =>{
    return response.json(orders)
})

app.put('/orders/:id', checkOrderId, checkUrl, (request, response) => {
    const {order, name, price}=request.body
    const index=request.orderIndex
    const id=request.orderIde
    const updateOrder={id:uuid.v4(), order, name, price}

    orders[index]=updateOrder

    return response.json(updateOrder)
})

app.delete('/orders/:id', checkOrderId, checkUrl, (request, response) => {
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

app.patch('/order/id', checkOrderId, checkUrl, (request, response) => {
    const index=request.orderIndex
    const id=request.orderId
    const updateOrder={id:uuid.v4(), order, name, price, status:"Pronto"}

    orders[index] = updateOrder

    return response.json(updateOrder)
})

app.delete('/order/:id', (request, response) => {
    const { id } = request.params
    const index = orders.findIndex(order => order.id === id)

    if (index < 0) {
        return response.status(404).json({ message: "User not found" })
    }

    orders.splice(index, 1)

    return response.status(204).json()
})

app.get('/order/:id', (request, response) => {
    const { id } = request.params
    const index = orders.find(order => order.id === id)
    const SpecificOrder = index

    if (index < 0) {
        return response.status(404).json({ message: "User not found" })
    }

    orders[index] = SpecificOrder

    return response.json(SpecificOrder)
})

app.patch('/order/:id', (request, response) => {
    try {
        const { id } = request.params
        const finishedOrder = { id: uuid.v4(), status: "Pronto" }
        const index = orders.findIndex(order => order.id === id)

        if (index < 0) {
            return response.status(404).json({ message: "User not found" })
        }

        orders[index] = finishedOrder

        return response.status(204).json(finishedOrder)
    } catch (err) {
        return response.status(500).json({ error:err.message })
    } finally{
        console.log("Terminou tudo")
    }
})

app.listen(port, () => {
    console.log('🚀🚀🚀🚀🚀')
})