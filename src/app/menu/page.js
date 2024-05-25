'use client'
import { useState } from 'react'
import { useGetCategoriesQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } from './../../redux/features/category/api'

export default function Category() {

    const [catToUpdate, setCatToUpdate] = useState({
        id: 0,
        name: '',
        desc: ''
    })

    const { data, error, isLoading } = useGetCategoriesQuery()
    const [ deleteCategory ] = useDeleteCategoryMutation()
    const [ updateCategory ] = useUpdateCategoryMutation()

    const catUpdateHandler = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setCatToUpdate({ ...catToUpdate, [name]: value })
    }

    const updateCategoryModal = (cat) => {
        setCatToUpdate(cat)
        document.getElementById('cat_update_modal').showModal()
    }

    return (
        <div>
            <h1 className='text-2xl mb-3'>Category</h1>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((category) => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{category.desc}</td>
                            <td className="flex gap-2">
                                <button className="btn btn-sm" onClick={()=>updateCategoryModal(category)}>Edit</button>
                                <button className="btn btn-sm btn-error" onClick={()=>deleteCategory(category.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <dialog id="cat_update_modal" className="modal">
                <div className="modal-box">
                    <h1 className="text-xl mb-3">Update Category</h1>
                    <form method="dialog">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">ID</span>
                            </div>
                            <input type="text" name="id" disabled={true} placeholder="Type here" className="input input-bordered w-full" value={catToUpdate.id} onChange={(e) => catUpdateHandler(e)} />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Name</span>
                            </div>
                            <input type="text" name="name" placeholder="Type here" className="input input-bordered w-full" value={catToUpdate.name} onChange={(e) => catUpdateHandler(e)} />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Description</span>
                            </div>
                            <input type="text" name="desc" placeholder="Type here" className="input input-bordered w-full" value={catToUpdate.desc} onChange={(e) => catUpdateHandler(e)} />
                        </label>
                        <button className="btn btn-neutral w-full mt-7" onClick={()=> {updateCategory(catToUpdate)}}>Update</button>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}