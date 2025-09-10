import app from './app';

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  console.log(
    `Example API http://localhost:${port}/api/images?filename=encenadaport&height=700&width=400`
  );
});
