import express from 'express';
import routes from './routes/index';
import path from 'path';
import pageNotFound404 from './routes/api/pageNotFound';

const app = express();
const port = 3000;

app.use('/api', routes);
app.use('/public', express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(pageNotFound404);

export default app;
