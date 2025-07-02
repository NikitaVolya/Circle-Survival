
function CreateObjectsContainer() {
    return {
        elements: [],
        toRemove: [],

        UpdateAll() {
            for (let i in this.elements)
            {
                const element = this.elements[i];
                element.Update();
            }

            for (let i in this.toRemove)
            {
                const element = this.toRemove[i];
                element.WhenDie();
            }

            this.elements = this.elements.filter(el => !this.toRemove.includes(el));
            this.toRemove = [];
        },

        DrawAll() {
            for (let i in this.elements)
            {
                const element = this.elements[i];
                element.Draw();
            }
        },

        ForEach(f) {
            for (let i in this.elements)
            {
                const element = this.elements[i];
                f(element);
            }
        },

        Add(element) {
            if (this.elements.includes(element))
                return;
            if (this.toRemove.includes(element))
                return;
            this.elements.push(element);
        },

        Remove(element) {
            if (this.toRemove.includes(element))
                return;
            if (!this.elements.includes(element))
                return;
            this.toRemove.push(element);
        },

        Contain(element) {
            return this.elements.includes(element);
        },

        GetById(id) {
            return this.elements.find(obj => obj.id == id) ?? null;
        },

        GetByName(name) {
            return this.elements.find(obj => obj.name == name) ?? null;
        }
    }
}