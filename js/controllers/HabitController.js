/**
 * CAPA DE PRESENTACIÓN: CONTROLLER (MVC)
 * Interpreta las acciones del usuario (desde View) y llama al Servicio.
 */
class HabitController {
    constructor(service, view) {
        this.service = service;
        this.view = view;

        // Suscribir la vista al servicio (Observer Pattern)
        this.service.subscribe(this.view);

        // Bindings entre los eventos de la vista y los manejadores del controlador
        this.view.bindAddHabit(this.handleAddHabit.bind(this));
        this.view.bindDeleteHabit(this.handleDeleteHabit.bind(this));
        this.view.bindChangeStrategy(this.handleChangeStrategy.bind(this));

        // Inicializar la vista por primera vez con los datos actuales del servicio
        this.service.notifyStateChanged();
    }

    handleAddHabit(name, category, date) {
        this.service.addHabit(name, category, date);
    }

    handleDeleteHabit(id) {
        this.service.deleteHabit(id);
    }

    handleChangeStrategy(strategyType) {
        let strategy;
        if (strategyType === 'habit') {
            strategy = new SummaryByHabitStrategy();
        } else if (strategyType === 'category') {
            strategy = new SummaryByCategoryStrategy();
        }

        if (strategy) {
            this.service.setSummaryStrategy(strategy);
        }
    }
}
