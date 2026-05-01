/**
 * ENTIDAD DE DOMINIO: Habit
 * Representa la lógica central del negocio para un Hábito.
 */
class Habit {
    constructor(id, name, category, date) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.date = date;
    }

    // Aquí podrían ir métodos con lógica de negocio específica del dominio,
    // como validar si la fecha es en el futuro (lo cual no debería permitirse), etc.
    isValid() {
        return this.name.trim().length > 0 && this.category && this.date;
    }
}
