
function CreateObjectsContainer() {
    return {
        elements: [],
        toRemove: [],

        UpdateAll(updateFunction = null, whenDieFunction = null) {
            for (let i in this.elements)
            {
                const element = this.elements[i];
                if (updateFunction != null)
                    updateFunction(element);
                else
                    element.Update();
            }
            
            this.toRemove.forEach(element => {
                if (whenDieFunction != null)
                {
                    whenDieFunction(element);
                }
                else {
                    element.WhenDie();
                }
            });

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

        ForEach(func) {
            for (let i in this.elements)
            {
                const element = this.elements[i];
                func(element);
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