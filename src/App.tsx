import TodoWrapper from "./components/wrapper/TodoWrapper";
import Link from "./components/link/Link";
import SEO, { webApplicationSchema } from "./components/seo";

function App() {
    return (
        <>
            <SEO
                title="Smart Groceries - Shopping List Manager"
                description="Organize your grocery shopping with our smart shopping list app. Create, edit, and manage your groceries efficiently. Never forget an item again!"
                keywords="smart groceries, shopping list manager, grocery app, shopping manager, food list, meal planning, grocery tracker"
                structuredData={webApplicationSchema}
            />

            <div className="App">
                <TodoWrapper />
            </div>

            <Link />
        </>
    );
}

export default App;
