/**
 * CAPA DE PRESENTACIÓN: VIEW (MVC) y OBSERVER
 * Se encarga de renderizar la interfaz y emitir eventos de usuario
 * al Controlador. Reacciona a los cambios del Servicio (Observer).
 */
class HabitView {
    constructor() {
        this.form = document.getElementById('habit-form');
        this.inputName = document.getElementById('habit-name');
        this.inputCategory = document.getElementById('habit-category');
        this.inputDate = document.getElementById('habit-date');
        
        this.listContainer = document.getElementById('habit-list');
        this.totalCountElement = document.getElementById('total-count');
        this.summaryContainer = document.getElementById('summary-container');
        
        this.btnStrategyHabit = document.querySelector('button[data-strategy="habit"]');
        this.btnStrategyCategory = document.querySelector('button[data-strategy="category"]');
        
        // Setear la fecha actual por defecto
        this.inputDate.valueAsDate = new Date();
    }

    // Bindings para el Controlador
    bindAddHabit(handler) {
        this.form.addEventListener('submit', event => {
            event.preventDefault();
            const name = this.inputName.value;
            const category = this.inputCategory.value;
            const date = this.inputDate.value;
            
            if (name && category && date) {
                handler(name, category, date);
                this.inputName.value = ''; // Limpiar el nombre
            }
        });
    }

    bindDeleteHabit(handler) {
        this.listContainer.addEventListener('click', event => {
            if (event.target.className.includes('btn-delete')) {
                const id = event.target.parentElement.dataset.id;
                handler(id);
            }
        });
    }

    bindChangeStrategy(handler) {
        this.btnStrategyHabit.addEventListener('click', () => {
            this.btnStrategyHabit.classList.add('active');
            this.btnStrategyCategory.classList.remove('active');
            handler('habit');
        });

        this.btnStrategyCategory.addEventListener('click', () => {
            this.btnStrategyCategory.classList.add('active');
            this.btnStrategyHabit.classList.remove('active');
            handler('category');
        });
    }

    // Método de la interfaz Observer: llamado por Subject.notify()
    update(state) {
        this.renderList(state.habits);
        this.renderTotal(state.total);
        this.renderSummary(state.summary);
    }

    // Métodos de renderizado internos
    renderList(habits) {
        this.listContainer.innerHTML = '';
        if (habits.length === 0) {
            this.listContainer.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 1rem;">No hay cumplimientos registrados. ¡Empieza hoy!</p>';
            return;
        }

        // Ordenar por fecha de más reciente a más antigua
        const sortedHabits = [...habits].sort((a, b) => new Date(b.date) - new Date(a.date));

        sortedHabits.forEach(habit => {
            const div = document.createElement('div');
            div.className = 'habit-item';
            div.dataset.id = habit.id;
            
            div.innerHTML = `
                <div class="habit-info">
                    <span class="habit-title">${habit.name}</span>
                    <div class="habit-meta">
                        <span class="habit-cat ${habit.category}">${habit.category}</span>
                        <span>${habit.date}</span>
                    </div>
                </div>
                <button class="btn-delete">Eliminar</button>
            `;
            this.listContainer.appendChild(div);
        });
    }

    renderTotal(total) {
        this.totalCountElement.textContent = total;
    }

    renderSummary(summaryData) {
        this.summaryContainer.innerHTML = '';
        
        if (summaryData.length === 0) {
            this.summaryContainer.innerHTML = '<p style="color: var(--text-muted); grid-column: 1 / -1;">Sin datos para resumir.</p>';
            return;
        }

        summaryData.forEach(item => {
            const card = document.createElement('div');
            card.className = `summary-card ${item.cssClass}`;
            card.innerHTML = `
                <div class="summary-label" title="${item.label}">${item.label}</div>
                <div class="summary-value">${item.value}</div>
            `;
            this.summaryContainer.appendChild(card);
        });
    }
}
