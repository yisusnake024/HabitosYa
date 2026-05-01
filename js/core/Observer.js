/**
 * PATRÓN OBSERVER: Subject
 * La clase Subject mantiene una lista de observadores y les notifica
 * cuando ocurre un cambio de estado.
 */
class Subject {
    constructor() {
        this.observers = [];
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notify(data) {
        this.observers.forEach(observer => {
            // Se asume que el observador tiene un método update
            if (typeof observer.update === 'function') {
                observer.update(data);
            }
        });
    }
}
