import { Router } from 'express';
import passport from 'passport';

/* Controllers */
import { searchController } from '../controllers/search.controller';

class SearchRoutes {
  constructor(public router: Router) {
    this.router.get(
      '/todo/:termino',
      passport.authenticate('jwt', { session: false }),
      searchController.getTodo
    );
    this.router.get(
      '/specific/:table/:termino',
      passport.authenticate('jwt', { session: false }),
      searchController.getTable
    );
  }
}

export const searchRoutes = new SearchRoutes(Router()).router;
