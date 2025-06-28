// Global array to store the products
const productos_de_inventario = [];

// Function to add a product to the inventory
function añadirProductos() {
  const nombre = document.getElementById("nombre").value;  // Get the product name from the input field
  const precio = parseFloat(document.getElementById("precio").value);  // Get the product price and convert it to a float
  const cantidad = parseInt(document.getElementById("cantidad").value);  // Get the product quantity and convert it to an integer

  // Data validation: Ensure the name is provided and the price and quantity are valid numbers
  if (!nombre || isNaN(precio) || isNaN(cantidad)) {
    document.getElementById("resultado-agregar").innerHTML = "Please enter a valid name, price, and quantity.";
    return;
  }

  // Check if the product already exists in the inventory by comparing the product name
  const productoExistente = productos_de_inventario.find(producto => producto.nombre === nombre);
  if (productoExistente) {
    document.getElementById("resultado-agregar").innerHTML = "The product name already exists in the inventory.";
    return;
  }

  // Add the new product to the inventory with a unique ID based on the current timestamp
  productos_de_inventario.push({
    id: new Date().getTime(),  // Generate a unique ID based on the current time
    nombre,
    precio,
    cantidad,
  });

  console.log("Product added:", productos_de_inventario);  // Log the added product to the console
  actualizarTabla();  // Update the product table in the HTML
  document.getElementById("resultado-agregar").innerHTML = "Product added successfully.";  // Display success message
}

// Function to search for a product by its ID
function consultar_Productos() {
  const idConsulta = parseInt(document.getElementById("consulta-id").value);  // Get the ID for search

  // Check if the ID entered is valid
  if (isNaN(idConsulta)) {
    document.getElementById("resultado-consulta").innerHTML = "Please enter a valid ID.";
    return;
  }

  // Search for the product in the inventory by ID
  const producto = productos_de_inventario.find(p => p.id === idConsulta);

  // If the product is found, display its details; otherwise, show an error message
  if (producto) {
    document.getElementById("resultado-consulta").innerHTML = `
      Product found: ${producto.nombre} <br>
      Price: $${producto.precio} <br>
      Quantity: ${producto.cantidad}
    `;
  } else {
    document.getElementById("resultado-consulta").innerHTML = `Product with ID '${idConsulta}' not found.`;
  }
}

// Function to update the price of an existing product by its ID
function actualizar_Precios() {
  const idActualizar = parseInt(document.getElementById("update-id").value);  // Get the product ID to update
  const nuevoPrecio = parseFloat(document.getElementById("update-precio").value);  // Get the new price from the input field

  // Validate the input values
  if (isNaN(idActualizar) || isNaN(nuevoPrecio)) {
    document.getElementById("resultado-actualizar").innerHTML = "Please enter a valid ID and price.";
    return;
  }

  // Search for the product in the inventory by ID
  const producto = productos_de_inventario.find(p => p.id === idActualizar);

  // If the product is found, update its price; otherwise, show an error message
  if (producto) {
    producto.precio = nuevoPrecio;  // Update the product price
    console.log(`Price of product with ID ${idActualizar} updated to $${nuevoPrecio}`);  // Log the update
    actualizarTabla();  // Update the product table in the HTML
    document.getElementById("resultado-actualizar").innerHTML = `Price of product with ID '${idActualizar}' updated to $${nuevoPrecio}.`;
  } else {
    document.getElementById("resultado-actualizar").innerHTML = `Product with ID '${idActualizar}' not found.`;
  }
}

// Function to delete a product from the inventory by its ID
function eliminar_productos() {
  const idEliminar = parseInt(document.getElementById("delete-id").value);  // Get the ID of the product to delete

  // Validate if the entered ID is a valid number
  if (isNaN(idEliminar)) {
    document.getElementById("resultado-eliminar").innerHTML = "Please enter a valid ID.";
    return;
  }

  // Search for the product in the inventory by ID and delete it if found
  const productoIndex = productos_de_inventario.findIndex(p => p.id === idEliminar);

  // If the product is found, delete it from the array; otherwise, show an error message
  if (productoIndex !== -1) {
    productos_de_inventario.splice(productoIndex, 1);  // Remove the product from the inventory
    console.log(`Product with ID ${idEliminar} deleted.`);  // Log the deletion
    actualizarTabla();  // Update the product table in the HTML
    document.getElementById("resultado-eliminar").innerHTML = `Product with ID '${idEliminar}' deleted.`;
  } else {
    document.getElementById("resultado-eliminar").innerHTML = `Product with ID '${idEliminar}' not found.`;
  }
}

// Function to update the product table in the HTML
function actualizarTabla() {
  const tabla = document.getElementById("tabla-inventario").getElementsByTagName('tbody')[0];  // Get the table body element
  tabla.innerHTML = "";  // Clear the table before updating

  // Iterate over the inventory and add each product as a new row in the table
  productos_de_inventario.forEach((producto) => {
    const fila = document.createElement("tr");  // Create a new table row
    fila.innerHTML = `
      <td>${producto.id}</td>
      <td>${producto.nombre}</td>
      <td>$${producto.precio.toFixed(2)}</td>
      <td>${producto.cantidad}</td>
    `;
    tabla.appendChild(fila);  // Append the new row to the table
  });
}

// Function to submit the form for adding a product (specifically for adding a new product)
function enviarFormulario() {
  añadirProductos();  // Call the function to add a product
}
