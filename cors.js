const PORT = Number(process.argv[2]) || 4344;
require('cors-anywhere')
  .createServer()
  .listen(PORT, (err) => {
    if (err)
      throw err;
    console.log(`CORS proxy listening at :${PORT}`)
  })