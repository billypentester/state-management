'use client'
import { useState } from 'react'
import { useGetItemsQuery, useDeleteItemMutation, useUpdateItemMutation } from './../../redux/features/item/api'
import { addItem, removeItem } from '@/redux/features/cart/slice'
import { useDispatch, useSelector } from 'react-redux';

export default function Items() {

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

    const [itemToUpdate, setItemToUpdate] = useState({
        id: 0,
        name: '',
        desc: '',
        price: 0
    })

    const { data, error, isLoading } = useGetItemsQuery()
    const [ deleteItem ] = useDeleteItemMutation()
    const [ updateItem ] = useUpdateItemMutation()

    const itemUpdateHandler = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setItemToUpdate({ ...itemToUpdate, [name]: value })
    }

    const updateItemModal = (cat) => {
        setItemToUpdate(cat)
        document.getElementById('item_update_modal').showModal()
    }

    const addToCart = (item) => {
        const data = {
            ...item,
            quantity: 1
        }
        dispatch(addItem(data));
    }

    return (
        <div>
            <h1 className='text-2xl mb-3'>Items</h1>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.desc}</td>
                            <td>{item.price}</td>
                            <td className="flex gap-2">
                                <button className="btn btn-sm btn-primary" onClick={()=>updateItemModal(item)}>Edit</button>
                                <button className="btn btn-sm btn-error" onClick={()=>deleteItem(item.id)}>Delete</button>
                                <button className='btn btn-sm btn-warning' onClick={()=>addToCart(item)}>Add to Cart</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {
                cart.items.length > 0 ? (
                    <div className="flex gap-3">
                        <h1 className="text-xl">Cart</h1>
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.items.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.price * item.quantity}</td>
                                        <td>
                                            <button className="btn btn-sm btn-error" onClick={()=>dispatch(removeItem(index))}>Remove</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : null
            }
            <dialog id="item_update_modal" className="modal">
                <div className="modal-box">
                    <h1 className="text-xl mb-3">Update Item</h1>
                    <form method="dialog">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">ID</span>
                            </div>
                            <input type="text" name="id" disabled={true} placeholder="Type here" className="input input-bordered w-full" value={itemToUpdate.id} onChange={(e) => catUpdateHandler(e)} />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Name</span>
                            </div>
                            <input type="text" name="name" placeholder="Type here" className="input input-bordered w-full" value={itemToUpdate.name} onChange={(e) => itemUpdateHandler(e)} />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Description</span>
                            </div>
                            <input type="text" name="desc" placeholder="Type here" className="input input-bordered w-full" value={itemToUpdate.desc} onChange={(e) => itemUpdateHandler(e)} />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Price</span>
                            </div>
                            <input type="number" name="price" placeholder="Type here" className="input input-bordered w-full" value={itemToUpdate.price} onChange={(e) => itemUpdateHandler(e)} />
                        </label>
                        <button className="btn btn-neutral w-full mt-7" onClick={()=> {updateItem(itemToUpdate)}}>Update</button>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}