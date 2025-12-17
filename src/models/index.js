import { Produto } from "./produto.js";
import { Categoria } from "./Categoria.js";
import { Marca } from "./Marca.js";


Categoria.hasMany(Produto, {
    foreignKey: 'categoria_id'
})

Produto.belongsTo(Categoria, {
    foreignKey: 'categoria_id'
})

Produto.belongsTo(Marca, {
    foreignKey: 'marca_id'
})

Produto.hasMany(Marca, {
    foreignKey: 'marca_id'
})

export { Produto, Categoria, Marca };