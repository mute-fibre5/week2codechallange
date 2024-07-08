document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('itemInput');
    const addItemButton = document.getElementById('addItemButton');
    const clearListButton = document.getElementById('clearListButton');
    const shoppingList = document.getElementById('shoppingList');
    let items = JSON.parse(localStorage.getItem('shoppingListItems')) || [];

    // Function to render the list
    function renderList() {
        shoppingList.innerHTML = '';
        items.forEach((item, index) => {
            const li = document.createElement('li');
            const span = document.createElement('span');
            span.textContent = item.name;
            if (item.purchased) {
                span.classList.add('purchased');
            }
            span.addEventListener('click', () => togglePurchased(index));

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('edit');
            editButton.addEventListener('click', () => editItem(index));

            li.appendChild(span);
            li.appendChild(editButton);
            shoppingList.appendChild(li);
        });
    }

    // Function to add a new item
    function addItem() {
        const itemName = itemInput.value.trim();
        if (itemName) {
            items.push({ name: itemName, purchased: false });
            itemInput.value = '';
            saveAndRender();
        }
    }

    // Function to toggle the purchased status
    function togglePurchased(index) {
        items[index].purchased = !items[index].purchased;
        saveAndRender();
    }

    // Function to clear the list
    function clearList() {
        items = [];
        saveAndRender();
    }

    // Function to edit an item
    function editItem(index) {
        const newName = prompt('Edit item:', items[index].name);
        if (newName) {
            items[index].name = newName.trim();
            saveAndRender();
        }
    }

    // Function to save items to local storage and render the list
    function saveAndRender() {
        localStorage.setItem('shoppingListItems', JSON.stringify(items));
        renderList();
    }

    addItemButton.addEventListener('click', addItem);
    clearListButton.addEventListener('click', clearList);
    renderList();
});