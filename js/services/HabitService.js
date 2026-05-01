/**
 * CAPA DE SERVICIO (Business Logic) y SUBJECT (Patrón Observer)
 * Intermedia entre el Controlador y el Repositorio. Contiene la lógica de negocio.
 * Notifica a las Vistas cuando los datos cambian.
 */
class HabitService extends Subject {
    constructor(repository) {
        super();
        this.repository = repository;
        
        // Estrategia por defecto para el resumen
        this.summaryStrategy = new SummaryByHabitStrategy();
    }

    setSummaryStrategy(strategy) {
        this.summaryStrategy = strategy;
        this.notifyStateChanged();
    }

    addHabit(name, category, date) {
        try {
            // Uso de Factory Method para crear el dominio
            const habit = HabitFactory.createHabit(name, category, date);
            
            // Convertir a DTO antes de pasar a la capa de persistencia
            const dto = HabitDTO.fromEntity(habit);
            this.repository.add(dto);
            
            // Notificar a los observadores que hubo un cambio
            this.notifyStateChanged();
            return true;
        } catch (error) {
            console.error("No se pudo agregar el hábito:", error);
            return false;
        }
    }

    deleteHabit(id) {
        this.repository.remove(id);
        this.notifyStateChanged();
    }

    getHabits() {
        return this.repository.getAll();
    }

    getTotalCount() {
        return this.repository.count();
    }

    getSummary() {
        const habits = this.repository.getAll();
        // Aplicar la estrategia actual para obtener el resumen
        return this.summaryStrategy.generateSummary(habits);
    }

    // Helper para notificar todo el estado a la vista
    notifyStateChanged() {
        this.notify({
            habits: this.getHabits(),
            total: this.getTotalCount(),
            summary: this.getSummary()
        });
    }
}
