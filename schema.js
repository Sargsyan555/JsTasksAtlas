function validateSchema(obj, schema) {
    function validateType(value, rule) {
      const { type, minLength, maxLength, min, max, itemType } = rule;
  
      if (type === "string") {
        if (typeof value !== "string") return false;
        if (minLength !== undefined && value.length < minLength) return false;
        if (maxLength !== undefined && value.length > maxLength) return false;
      } else if (type === "number") {
        if (typeof value !== "number") return false;
        if (min !== undefined && value < min) return false;
        if (max !== undefined && value > max) return false;
      } else if (type === "boolean") {
        if (typeof value !== "boolean") return false;
      } else if (type === "array") {
        if (!Array.isArray(value)) return false;
        if (itemType) {
          for (const item of value) {
            if (!validateType(item, { type: itemType })) return false;
          }
        }
      } else if (type === "object") {
        if (typeof value !== "object" || value === null) return false;
      } else {
        return false;
      }
  
      return true;
    }
  
    for (const key in schema) {
      const rule = schema[key];
      const value = obj[key];
  
      if (rule.required && value === undefined) {
        return false;
      }
  
      if (value !== undefined && !validateType(value, rule)) {
        return false;
      }
    }
  
    return true;
  }
  
  const schema = {
    name: { type: "string", minLength: 2 },
    age: { type: "number", min: 18 },
    isActive: { type: "boolean" },
    tags: { type: "array", itemType: "string" },
  };
  
  const obj = { name: "Alice", age: 25, isActive: true, tags: ["admin", "user"] };
  console.log(validateSchema(obj, schema)); // Expected output: true
  