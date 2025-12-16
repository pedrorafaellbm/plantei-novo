import { Produto } from "./produto";
import { Categoria } from "./Categoria";


Categoria.hasMany(Produto, {
    foreignKey: 'categoria_id', as: 'produtos'
})

Produto.belongsTo(Categoria, {
    foreignKey: 'categoria_id'
})

export { Produto, Categoria };