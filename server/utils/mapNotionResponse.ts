class PropertyHandlerFactory {
    static checkbox = class {
      constructor(property, data) {
        this.property = property;
        this.data = data;
      }
  
      handleProperty() {
        return this.data.checkbox ? this.data.checkbox.toString() : "";
      }
    };
  
    static created_by = class {
      constructor(property, data) {
        this.property = property;
        this.data = data;
      }
  
      handleProperty() {
        return userToString(this.data.created_by);
      }
    };
  
    static created_time = class {
      constructor(property, data) {
        this.property = property;
        this.data = data;
      }
  
      handleProperty() {
        return new Date(this.data.created_time).toISOString();
      }
    };
  
    static date = class {
      constructor(property, data) {
        this.property = property;
        this.data = data;
      }
  
      handleProperty() {
        return this.data.date ? new Date(this.data.date.start).toISOString() : "";
      }
    };
  
    static email = class {
      constructor(property, data) {
        this.property = property;
        this.data = data;
      }
  
      handleProperty() {
        return this.data.email ?? "";
      }
    };
  
    static url = class {
      constructor(property, data) {
        this.property = property;
        this.data = data;
      }
  
      handleProperty() {
        return this.data.url ?? "";
      }
    };
  
    static number = class {
      constructor(property, data) {
        this.property = property;
        this.data = data;
      }
  
      handleProperty() {
        return typeof this.data.number === "number" ? this.data.number.toString() : "";
      }
    };
  
    static phone_number = class {
      constructor(property, data) {
        this.property = property;
        this.data = data;
      }
  
      handleProperty() {
        return this.data.phone_number ?? "";
      }
    };
  
    static select = class {
      constructor(property, data) {
        this.property = property;
        this.data = data;
      }
  
      handleProperty() {
        if (!this.data.select) {
          return "";
        }
        return `${this.data.select.id} ${this.data.select.name}`;
      }
    };
  
    static multi_select = class {
      constructor(property, data) {
        this.property = property;
        this.data = data;
      }
  
      handleProperty() {
        if (!this.data.multi_select) {
          return "";
        }
        return this.data.multi_select
          .map((select) => `${select.id} ${select.name}`)
          .join(", ");
      }
    };
  
    static people = class {
      constructor(property, data) {
        this.property = property;
        this.data = data;
      }
  
      handleProperty() {
        return userToString(this.data.people);
      }
    };
  
    static last_edited_by = class {
      constructor(property, data) {
        this.property = property;
        this.data = data;
      }
  
      handleProperty() {
        return userToString(this.data.last_edited_by);
      }
    };
  
    static last_edited_time = class {
      constructor(property, data) {
        this.property = property;
        this.data = data;
      }
  
      handleProperty() {
        return new Date(this.data.last_edited_time).toISOString();
      }
    };
  
    static title = class {
      constructor(property, data) {
        this.property = property;
        this.data = data;
      }
  
      handleProperty() {
        return this.data.title.plain_text;
      }
    };
  
    static rich_text = class {
      constructor(property, data) {
        this.property = property;
        this.data = data;
      }
  
      handleProperty() {
        return this.data.rich_text.plain_text;
      }
    };
  
    static files = class {
      constructor(property, data) {
        this.property = property;
        this.data = data;
      }
  
      handleProperty() {
        return this.data.files.map((file) => file.name).join(", ");
      }
    };
  
    static formula = class {
      constructor(property, data) {
        this.property = property;
        this.data = data;
      }
  
      handleProperty() {
        if (this.data.formula.type === "string") {
          return this.data.formula.string || "???";
        } else if (this.data.formula.type === "number") {
          return this.data.formula.number?.toString() || "???";
        } else if (this.data.formula.type === "boolean") {
          return this.data.formula.boolean?.toString() || "???";
        } else if (this.data.formula.type === "date") {
          return (
            (this.data.formula.date?.start &&
              new Date(this.data.formula.date.start).toISOString()) ||
            "???"
          );
        } else {
          return assertUnreachable(this.data.formula);
        }
      }
    };
  
    static rollup = class {
      constructor(property, data) {
        this.property = property;
        this.data = data;
      }
  
      handleProperty() {
        if (this.data.rollup.type === "number") {
          return this.data.rollup.number?.toString() || "???";
        } else if (this.data.rollup.type === "date") {
          return (
            (this.data.rollup.date?.start &&
              new Date(this.data.rollup.date?.start).toISOString()) ||
            "???"
          );
        } else if (this.data.rollup.type === "array") {
          return JSON.stringify(this.data.rollup.array);
        } else if (
          this.data.rollup.type === "incomplete" ||
          this.data.rollup.type === "unsupported"
        ) {
          return this.data.rollup.type;
        } else {
          return assertUnreachable(this.data.rollup);
        }
      }
    };
  
    static relation = class {
      constructor(property, data) {
        this.property = property;
        this.data = data;
      }
  
      handleProperty() {
        if (this.data.relation) {
          return this.data.relation.id;
        }
        return "???";
      }
    };
  
    static status = class {
      constructor(property, data) {
        this.property = property;
        this.data = data;
      }
  
      handleProperty() {
        return this.data.status?.name ?? "";
      }
    };
  
    static getPropertyHandler(property, data) {
      const propertyName = property.type;
      const FactoryClass = this[propertyName];
  
      if (FactoryClass) {
        return new FactoryClass(property, data);
      } else {
        console.log(`${propertyName} does not have a corresponding handler.`);
        return null;
      }
    }
  }



  