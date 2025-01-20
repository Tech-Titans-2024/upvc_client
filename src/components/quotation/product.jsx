import React from 'react';

function Product(props) 
{
    return (
        <div className='flex flex-col border-2 border-black rounded-lg bg-blue-300'>
            <div className="grid grid-cols-5 gap-7 p-7 border-b-2 border-black py-12">
                <div className="flex flex-col gap-4">
                    <label className="font-semibold ml-1 uppercase">Brand : </label>
                    <select
                        className="w-full p-3 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        onChange={(e) => props.handleInputChange('brand', e.target.value)}
                        value={props.currentData.brand || ''}
                    >
                        <option value='Veka' className='p-2 text-md'>VEKA</option>
                        <option value='Eiti' className='p-2 text-md'>EITI</option>
                    </select>
                </div>
                <div className="flex flex-col gap-4">
                    <label className="font-semibold ml-1 uppercase">Product : </label>
                    <select
                        className="w-full p-3 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={props.currentData.product || ''}
                        onChange={(e) => props.handleInputChange('product', e.target.value)}
                    >
                        <option className='p-2 text-md'>Door</option>
                        <option className='p-2 text-md'>Window</option>
                        <option className='p-2 text-md'>Louver</option>
                    </select>
                </div>
                {(props.currentData.product === 'Door' || props.currentData.product === 'Window') && (
                    <div className="flex flex-col gap-4">
                        <label className="font-semibold ml-1 uppercase">Type : </label>
                        <select
                            className="w-full p-3 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={props.currentData.type || ''}
                            onChange={(e) => props.handleInputChange('type', e.target.value)}
                        >
                            <option className='p-2 text-md'>Select</option>
                            {props.type.map((typeItem, index) => (
                                <option key={index}>{typeItem}</option>
                            ))}
                        </select>
                    </div>
                )}
                <div className="flex flex-col gap-4">
                    <label className="font-semibold ml-1 uppercase">Variant : </label>
                    <select
                        className="w-full p-3 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={props.currentData.varient || ''}
                        onChange={(e) => props.handleInputChange('varient', e.target.value)}
                    >
                        <option className='p-2 text-md'>Select</option>
                        {props.varient.map((varientItem, index) => (
                            <option key={index}>{varientItem.varient}</option>
                        ))}
                    </select>
                </div>
                {(props.currentData.product === 'Window' || props.currentData.product === 'Louver') && (
                    <>
                        <div className="flex flex-col gap-4">
                            <label className="font-semibold ml-1 uppercase">Mesh : </label>
                            <select
                                className="w-full p-3 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                name="mesh"
                                value={props.currentData.mesh || ''}
                                onChange={(e) => props.handleInputChange('mesh', e.target.value)}
                            >
                                <option value='Yes' className='p-2 text-md'>Yes</option>
                                <option value='No' className='p-2 text-md'>No</option>
                            </select>
                        </div>
                    </>
                )}
            </div>
            <div className="grid grid-cols-6 gap-7 px-7 py-10 rounded-lg">
                <div className="flex flex-col gap-4">
                    <label className="font-semibold ml-1 uppercase">Width : </label>
                    <input
                        className="w-full p-3 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        name="width"
                        value={props.currentData.width || ''}
                        autoComplete="off"
                        onChange={(e) => props.handleInputChange('width', e.target.value)} />
                </div>
                <div className="flex flex-col gap-4">
                    <label className="font-semibold ml-1 uppercase">Height : </label>
                    <input
                        className="w-full p-3 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        name="height"
                        value={props.currentData.height || ''}
                        autoComplete="off"
                        onChange={(e) => props.handleInputChange('height', e.target.value)} />
                </div>
                <div className="flex flex-col gap-4">
                    <label className="font-semibold ml-1 uppercase">Sq Ft : </label>
                    <input
                        className="w-full p-3 border-2 border-black rounded-md bg-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        name="area"
                        value={props.currentData.area || ''}
                        readOnly
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <label className="font-semibold ml-1 uppercase">Price : </label>
                    <input
                        className="w-full p-3 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        name="price"
                        value={props.currentData.price || ''}
                        autoComplete="off"
                        onChange={(e) => props.handleInputChange('price', e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <label className="font-semibold ml-1 uppercase">Quantity : </label>
                    <input
                        className="w-full p-3 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        name="quantity"
                        value={props.currentData.quantity || ''}
                        autoComplete="off"
                        onChange={(e) => props.handleInputChange('quantity', e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <label className="font-semibold ml-1 uppercase">Total Qty Price : </label>
                    <input
                        className="w-full p-3 border-2 border-black rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-200"
                        name="total"
                        value={props.currentData.totalPrice || ''}
                        onChange={(e) => props.handleInputChange('totalPrice', e.target.value)}
                        readOnly
                        disabled
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <label className="font-semibold ml-1 uppercase">Glass : </label>
                    <select
                        className="w-full p-3 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        name="glass"
                        value={props.currentData.glass || ''}
                        onChange={(e) => props.handleInputChange('glass', e.target.value)}
                    >
                        <option className='p-2 text-md'>Select</option>
                        <option className='p-2 text-md'>Normal Glass</option>
                        <option className='p-2 text-md'>Toughened Glass</option>
                    </select>
                </div>
                <div className="flex flex-col gap-4">
                    <label className="font-semibold ml-1 uppercase">COLOUR : </label>
                    <select
                        className="w-full p-3 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        name="glass"
                        value={props.currentData.color || ''}
                        onChange={(e) => props.handleInputChange('color', e.target.value)}
                    >
                        <option className='p-2 text-md'>Select</option>
                        <option className='p-2 text-md'>Mahogany</option>
                        <option className='p-2 text-md'>Rustic Oak</option>
                        <option className='p-2 text-md'>Golden Oak</option>
                        <option className='p-2 text-md'>Black</option>
                        <option className='p-2 text-md'>Anthracite Grey</option>
                        <option className='p-2 text-md'>Walnut</option>
                    </select>
                </div>
                <div className="flex flex-col gap-4">
                    <label className="font-semibold ml-1 uppercase">ADDL Cost : </label>
                    <input
                        className="w-full p-3 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={props.currentData.additionalcost || ''}
                        autoComplete="off"
                        onChange={(e) => props.handleInputChange('additionalcost', e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <label className="font-semibold ml-1 uppercase ">Total Cost : </label>
                    <input
                        className="w-full p-3 border-2 bg-slate-200 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={props.currentData.total || ''}
                        onChange={(e) => props.handleInputChange('total', e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}

export default Product;