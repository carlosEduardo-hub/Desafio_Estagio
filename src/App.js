import React, { useState } from 'react';
import { toast } from "sonner";

const App = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    value: '',
    available: 'sim',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setProducts((prevProducts) => [
      ...prevProducts,
      { ...newProduct, value: parseFloat(newProduct.value) },
    ]);
    setShowForm(false);
    toast.success('Produto cadastrado com sucesso!')
  };

  function handleNewProduct(e) {
    e.preventDefault();
    setShowForm(true)
    setNewProduct('');
  }

  const sortedProducts = products.sort((a, b) => a.value - b.value);

  return (
    <div className="h-screen bg-gray-600">
      {showForm ? (
        <form onSubmit={handleFormSubmit} className="h-full flex flex-col justify-center items-center w-full space-y-6">
          <h1 className='text-4xl font-bold'>Cadastro</h1>
          <div className="space-y-2">
            <label className="text-sm font-medium block">
              <p>Nome do produto</p>
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                required
                className="border border-zinc-800 rounded-lg px-3 py-2 bg-zinc-800/50  text-sm"
              />
            </label>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium block">
              <p>Descrição do produto</p>
              <input
                type="text"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                required
                className="border border-zinc-800 rounded-lg px-3 py-2 bg-zinc-800/50  text-sm"
              />
            </label>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium block">
              <p>Valor do produto</p>
              <input
                type="number"
                name="value"
                value={newProduct.value}
                onChange={handleInputChange}
                required
                className="border border-zinc-800 rounded-lg px-3 py-2 bg-zinc-800/50  text-sm"
              />
            </label>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium block">
              <p>Disponível para venda</p>
              <select
                name="available"
                value={newProduct.available}
                onChange={handleInputChange}
                required
                className="border border-zinc-800 rounded-lg px-3 py-2 bg-zinc-800/50 text-sm"
              >
                <option value="sim">Sim</option>
                <option value="não">Não</option>
              </select>
            </label>
          </div>
          <button type="submit" className="bg-slate-500 text-gray-950 rounded-md px-2 py-1.5">Cadastrar</button>
        </form>
      ) : (
        <div className='space-y-3'>
          <button onClick={handleNewProduct} className="bg-slate-500 text-gray-950 rounded-md px-2 py-1.5">Cadastrar Novo Produto</button>
          <h1 className='text-center text-4xl font-bold'>Listagem</h1>
          <table className="w-full" >
            <thead>
              <tr className='flex justify-around w-full'>
                <th className='w-1/2 text-center text-3xl font-bold'>Nome</th>
                <th className='w-1/2 text-center text-3xl font-bold'>Valor</th>
              </tr>
            </thead>
            <tbody >
              {sortedProducts.map((product, index) => (
                <tr className='flex justify-around w-full' key={index}>
                  <td className='w-1/2 text-center text-lg font-semibold'>{product.name}</td>
                  <td className='w-1/2 text-center text-lg font-semibold'>{product.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default App;

