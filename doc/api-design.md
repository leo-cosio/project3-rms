## Modelo de datos

### User

| Campo      | Tipo   | Validaciones                                    | Notas               |
| ---------- | ------ | ----------------------------------------------- | ------------------- |
| `username` | String | min: 3, max: 16, required                       | Nombre de usuario   |
| `type`     | String | enum: ['admin', 'staff', 'reception'], required | Tipo de usuario     |
| `password` | String | min: 8, max: 16, required                       | Hasheado con bcrypt |

### Table

| Campo      | Tipo   | Validaciones                                      | Notas                        |
| ---------- | ------ | ------------------------------------------------- | ---------------------------- |
| `number`   | Number | required, unique                                  | Número de mesa               |
| `location` | String | enum: ['terraza', 'sala'], required               | Donde se ubica la mesa       |
| `status`   | String | enum: ['libre', 'ocupada', 'pendiente'], required | Estado de la mesa            |
| `capacity` | Number | required, min: 1, max: 12                         | Cantidad de personas en mesa |

### Menu Item

| Campo       | Tipo    | Validaciones                                                                 | Notas                             |
| ----------- | ------- | ---------------------------------------------------------------------------- | --------------------------------- |
| `name`      | String  | required, unique                                                             | Nombre del plato o bebida         |
| `type`      | String  | enum: ['entrante', 'primero', 'principal', 'postre', 'bebida'], <br>required | Tipo de comida o bebida           |
| `price`     | Number  | required                                                                     | Precio producto                   |
| `available` | Boolean | required                                                                     | Disponibilidad del plato o bebida |

### Order

| Campo      | Tipo     | Validaciones                                            | Notas                             |
| ---------- | -------- | ------------------------------------------------------- | --------------------------------- |
| `table`    | ObjectId | ref: 'table', required                                  | Enlace a mesa correspondiente     |
| `guests`   | Number   | required, min: 1, max: 12                               | Cantidad de personas en mesa      |
| `items`    | Array    | { menuItem: ObjectId ref 'menuItem', quantity: Number } | Enlace a todos los platos pedidos |
| `subtotal` | Number   | required                                                | Total a pagar                     |

## Extra (Completar si da tiempo)

- Bookings
