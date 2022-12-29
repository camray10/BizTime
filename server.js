/** Server startup for BizTime. */

const app = require("./app");
const http = require('http');


const server = http.createServer(app);

// start the servers
const port = 3000;
server.listen(port, () => {
  console.log(`HTTP server listening on port ${port}`);
});