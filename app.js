// Crear estructura básica del documento
document.body.style.margin = "0";
document.body.style.fontFamily = "Arial, sans-serif";

// Crear el encabezado
const header = document.createElement("header");
header.style.backgroundColor = "#6200ea";
header.style.color = "white";
header.style.textAlign = "center";
header.style.padding = "1rem";
header.innerHTML = "<h1>Inventario de Accesorios</h1>";
document.body.appendChild(header);

// Crear el contenedor principal
const main = document.createElement("main");
main.style.maxWidth = "900px";
main.style.margin = "2rem auto";
main.style.padding = "1rem";
main.style.backgroundColor = "white";
main.style.borderRadius = "10px";
main.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
document.body.appendChild(main);

// Crear la sección del formulario
const formSection = document.createElement("section");
formSection.classList.add("form-section");
formSection.innerHTML = `
    <h2>Agregar/Editar Accesorio</h2>
    <form id="inventoryForm">
        <label for="productType">Tipo de Producto:</label>
        <select id="productType">
            <option value="iPhone">iPhone</option>
            <option value="Samsung">Samsung</option>
            <option value="Redmi">Redmi</option>
        </select>

        <label for="model">Modelo:</label>
        <input type="text" id="model" placeholder="Ej: Galaxy S23">

        <label for="accessoryType">Tipo de Accesorio:</label>
        <select id="accessoryType">
            <option value="Estuche">Estuche</option>
            <option value="Protector de Pantalla">Protector de Pantalla</option>
        </select>

        <label for="design">Diseño:</label>
        <select id="design">
            <option value="Liso">Liso</option>
            <option value="Diseño">Diseño</option>
        </select>

        <label for="quantity">Cantidad:</label>
        <input type="number" id="quantity" min="1" placeholder="Ej: 10">

        <button type="button" id="addButton">Agregar/Actualizar</button>
    </form>
`;
formSection.querySelector("form").style.display = "grid";
formSection.querySelector("form").style.gridTemplateColumns = "1fr 1fr";
formSection.querySelector("form").style.gap = "1rem";
main.appendChild(formSection);

// Crear la sección del inventario
const inventorySection = document.createElement("section");
inventorySection.classList.add("inventory-section");
inventorySection.innerHTML = `
    <h2>Lista de Inventario</h2>
    <input type="text" id="searchBar" placeholder="Buscar por modelo..." style="width: 100%; padding: 0.5rem; margin-bottom: 1rem; font-size: 1rem; border: 1px solid #ccc; border-radius: 5px;">
    <table id="inventoryTable" style="width: 100%; border-collapse: collapse;">
        <thead>
            <tr style="background-color: #6200ea; color: white;">
                <th>Tipo</th>
                <th>Modelo</th>
                <th>Accesorio</th>
                <th>Diseño</th>
                <th>Cantidad</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
`;
main.appendChild(inventorySection);

// Crear estilos de tabla
const tableStyles = `
    table th, table td {
        padding: 0.8rem;
        border: 1px solid #ddd;
        text-align: left;
    }
    table tbody tr:nth-child(even) {
        background-color: #f9f9f9;
    }
    button.action-btn {
        padding: 0.4rem 0.6rem;
        margin: 0 0.2rem;
        border-radius: 5px;
        font-size: 0.9rem;
        border: none;
        cursor: pointer;
    }
    button.edit {
        background-color: #ff9800;
        color: white;
    }
    button.delete {
        background-color: #f44336;
        color: white;
    }
`;

// Añadir estilos dinámicamente
const styleTag = document.createElement("style");
styleTag.innerText = tableStyles;
document.head.appendChild(styleTag);

// Implementación lógica del inventario
const inventoryTable = document.querySelector("#inventoryTable tbody");
const form = document.querySelector("#inventoryForm");
const searchBar = document.querySelector("#searchBar");

let inventory = [];
let editIndex = null;

// Agregar o actualizar accesorio
document.querySelector("#addButton").addEventListener("click", () => {
    const productType = document.querySelector("#productType").value;
    const model = document.querySelector("#model").value.trim();
    const accessoryType = document.querySelector("#accessoryType").value;
    const design = document.querySelector("#design").value;
    const quantity = parseInt(document.querySelector("#quantity").value);

    if (!model || isNaN(quantity)) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const accessory = { productType, model, accessoryType, design, quantity };

    if (editIndex !== null) {
        inventory[editIndex] = accessory;
        editIndex = null;
    } else {
        inventory.push(accessory);
    }

    form.reset();
    renderTable();
});

// Renderizar la tabla
function renderTable() {
    inventoryTable.innerHTML = "";
    inventory.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.productType}</td>
            <td>${item.model}</td>
            <td>${item.accessoryType}</td>
            <td>${item.design}</td>
            <td>${item.quantity}</td>
            <td>
                <button class="action-btn edit" onclick="editAccessory(${index})">Editar</button>
                <button class="action-btn delete" onclick="deleteAccessory(${index})">Eliminar</button>
            </td>
        `;
        inventoryTable.appendChild(row);
    });
}

// Editar accesorio
window.editAccessory = (index) => {
    const item = inventory[index];
    document.querySelector("#productType").value = item.productType;
    document.querySelector("#model").value = item.model;
    document.querySelector("#accessoryType").value = item.accessoryType;
    document.querySelector("#design").value = item.design;
    document.querySelector("#quantity").value = item.quantity;
    editIndex = index;
};

// Eliminar accesorio
window.deleteAccessory = (index) => {
    inventory.splice(index, 1);
    renderTable();
};

// Filtrar accesorios
searchBar.addEventListener("input", () => {
    const searchText = searchBar.value.toLowerCase();
    inventoryTable.innerHTML = "";
    inventory
        .filter(item => item.model.toLowerCase().includes(searchText))
        .forEach((item, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.productType}</td>
                <td>${item.model}</td>
                <td>${item.accessoryType}</td>
                <td>${item.design}</td>
                <td>${item.quantity}</td>
                <td>
                    <button class="action-btn edit" onclick="editAccessory(${index})">Editar</button>
                    <button class="action-btn delete" onclick="deleteAccessory(${index})">Eliminar</button>
                </td>
            `;
            inventoryTable.appendChild(row);
        });
});
