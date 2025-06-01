document.addEventListener('DOMContentLoaded', () => {
    const exp_name = document.getElementById('expense-name');
    const exp_amount = document.getElementById('expense-amount');
    const add_butt = document.getElementById('add-expense-btn');
    const expenses_list = document.getElementById('expenses-list');
    const total_price = document.getElementById('total-price');
    let tasks = JSON.parse(localStorage.getItem('task')) || [];

    tasks.forEach(task => render(task));
    updateTotal();

    add_butt.addEventListener('click', () => {
        const task = exp_name.value.trim();
        const exp_am = exp_amount.value.trim();
        if (task === "" || exp_am === "") return;
        const new_task = {
            id: Date.now(),
            text: task,
            text2: exp_am,
            completed: false
        };

        tasks.push(new_task);
        render(new_task);
        save();
        updateTotal();

        exp_name.value = "";
        exp_amount.value = "";
        console.log(tasks);
    });

    function render(task) {
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);
        if (task.completed) li.classList.add('completed');

        li.innerHTML = `
            <span>${task.text}</span>
            <span>$${task.text2}</span>
            <button style="background-color:red; border-radius:30px; color:white; width:70px; height:30px;">Delete</button>
        `;

        li.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') return;
            task.completed = !task.completed;
            li.classList.toggle('completed');
            save();
        });

        li.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation();
            tasks = tasks.filter(t => t.id !== task.id);
            li.remove();
            save();
            updateTotal();
        });

        expenses_list.appendChild(li);
    }

    function updateTotal() {
        const totalprice = tasks.reduce((sum, task) => sum + parseFloat(task.text2 || 0), 0);
        total_price.textContent = `$${totalprice.toFixed(2)}`;
    }

    function save() {
        localStorage.setItem('task', JSON.stringify(tasks));
    }
});
