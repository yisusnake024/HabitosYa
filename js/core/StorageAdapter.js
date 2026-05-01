/**
 * PATRÓN ADAPTER: Adaptador para almacenamiento.
 * Esto envuelve la API del navegador (localStorage) proporcionando
 * una interfaz unificada. Si en el futuro cambiamos a IndexedDB o una API REST,
 * el resto de la aplicación no se verá afectada.
 */
class StorageAdapter {
    constructor(storageKey) {
        this.storageKey = storageKey;
    }

    save(data) {
        try {
            const serialized = JSON.stringify(data);
            localStorage.setItem(this.storageKey, serialized);
            return true;
        } catch (error) {
            console.error("Error saving data:", error);
            return false;
        }
    }

    load() {
        try {
            const serialized = localStorage.getItem(this.storageKey);
            if (serialized) {
                return JSON.parse(serialized);
            }
            return [];
        } catch (error) {
            console.error("Error loading data:", error);
            return [];
        }
    }
}
