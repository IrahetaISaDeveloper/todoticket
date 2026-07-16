import app from "./app.js";

import "./database.js";

async function main() {
    const port = process.env.PORT || 4000;
    app.listen(port);
    console.log('Server running on port ${port}');
}

main();