import { Request, Response, NextFunction } from 'express';

const pageNotFound404 = (req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'test') {
    return res.status(404).send('404 - Page Not Found');
  }
  res.status(404).render('pageNotFound', { message: 'Page not found' });
};

export default pageNotFound404;
