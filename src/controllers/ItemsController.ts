import {Request, Response} from 'express';
import knex from '../database/connection';

class ItemsController {
  async index (request: Request, response: Response) {
    const items = await knex('items').select('*');
  
    const serializedItem = items.map( item => {
      return { 
        id: item.id,
        title: item.title,
        image_url: item.image,
      }
    })
  
    return response.json(serializedItem)
  }
}
export default ItemsController;