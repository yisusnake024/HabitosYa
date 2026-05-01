/**
 * PATRÓN DTO (Data Transfer Object)
 * Se utiliza para transferir datos entre las capas de presentación, servicio y repositorios
 * de forma independiente de la entidad de dominio.
 */
class HabitDTO {
    constructor(id, name, category, date) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.date = date;
    }

    // Convertir de DTO a Entidad
    static toEntity(dto) {
        return new Habit(dto.id, dto.name, dto.category, dto.date);
    }

    // Convertir de Entidad a DTO
    static fromEntity(entity) {
        return new HabitDTO(entity.id, entity.name, entity.category, entity.date);
    }
}
