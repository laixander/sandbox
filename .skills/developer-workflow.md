# Developer Workflow Guide: Collaborating with Agents

This project is built to be extended rapidly using **Agent Skills**. As a developer acting as the "Project Manager", you will achieve the highest quality code by guiding AI agents through granular, sequential steps rather than asking for massive features all at once.

---

## 🛑 The "One-Hit" Risk

**Prompt:** *"Use `.skills/add-entity.md` to build a full Products feature."*

While we have a skill that can build everything at once, doing so is risky. If the agent makes an incorrect assumption early in the process (e.g., forgetting a critical data field or misunderstanding the relationship), you will have to manually clean up the Type, Seeder, Store, and UI components simultaneously. 

---

## ✅ The "Granular" Approach (Recommended)

The most effective way to build features is to step through the skills sequentially. This gives you a chance to review the foundation before the agent attempts to build the interface.

### Step 1: Data Architecture
First, define the core data structures and ensure the mock data generator understands the shape.

**Your Prompt:**
> *"Use `.skills/add-type.md` and `.skills/add-mock-api-endpoint.md` to create a `Product` entity. It should have an id, title, price, SKU, and a category enum ('Electronics', 'Clothing', 'Home')."*

**Your Job:** Review the generated `app/types/product.ts` and `server/api/products.ts` to ensure the properties and mock data values match your expectations.

### Step 2: Business Logic & State
Once the data shape is perfect, generate the Pinia store. Because the agent just wrote the Type, it knows exactly what to scaffold.

**Your Prompt:**
> *"Looks great! Now use `.skills/add-store.md` to build the `productStore`."*

**Your Job:** Review `app/stores/productStore.ts`. Ensure the `deployMockData` logic looks correct and the CRUD actions (`createProduct`, `updateProduct`, `deleteProduct`) are properly typed.

### Step 3: Interface & UI
With a flawless foundation in place, the agent can confidently build the user interface without hallucinating data bindings.

**Your Prompt:**
> *"Perfect. Finally, use `.skills/add-crud-page.md` to build the Products UI and Add Modal."*

**Your Job:** Run the application locally and verify the UI. Check that the columns match the data, the Add Modal forms use the correct input types (e.g., `USelect` for the category enum), and the CRUD actions properly hit the store.

---

## 🎯 Golden Rules for Agentic Development

1. **Be specific:** When naming fields or components, explicitly list them.
2. **Review continuously:** Stop the agent and check its work after every step.
3. **Reference conventions:** If the agent strays from the project style, point it back to `.skills/agent-skills-guide.md`.
4. **Update skills:** If you establish a new pattern (like a new component), document it as a new `.md` skill file so the agent can repeat it in the future!
