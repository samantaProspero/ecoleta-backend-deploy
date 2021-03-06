import {Request, Response, query} from 'express';
import knex from '../database/connection';
import cloudinary from '../config/cloudinary';

class PointsController {
  async index(request: Request, response: Response){
    const {city, uf, items} = request.query; 

    const parsedItems = String(items)
      .split(',')
      .map(item=> Number(item.trim()))

      const points = await knex('points')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        .whereIn('point_items.item_id', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('points.*');

        const serializedPoints = points.map( point => {
          return { 
            ...point,
            image_url: point.image,
          }
        });
    
    return response.json(serializedPoints)
  }

  async show(request: Request, response: Response) {
    const {id} = request.params;
  
    const point = await knex('points').where('id', id).first();

    if(!point){
      return response.status(400).json({ message: 'Point not found.' })
    }

    const serializedPoint = {
      ...point,
      image_url: point.image,
    };

    const items = await knex('items')
      .join('point_items','items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title');
      
    return response.json({point: serializedPoint, items}); 
  }

  async create(request: Request, response: Response) {
    try {
      const {
        name, 
        email, 
        whatsapp,
        latitude,
        longitude,
        city, 
        uf, 
        items
      } = request.body;
    
      const trx = await knex.transaction();
  
      const result = await cloudinary.uploader.upload(request.file.path);
      const {secure_url}  = result
  
  
      const point = {
        image: secure_url,
        name, 
        email, 
        whatsapp,
        latitude,
        longitude,
        city, 
        uf
      };
      
      const insertedIds = await trx('points').insert(point).returning('id');
    
      const point_id = insertedIds[0];
      const pointItems = items
        .split(',')
        .map((item: string) => Number(item.trim()))
        .map((item_id: number) => {
        return {
          point_id,
          item_id,
        };
      })
    
      await trx('point_items').insert(pointItems).returning('id');
  
      await trx.commit();
  
  
      return response.json({
        id: point_id,
        ...point, 
      });
    } catch (error) {
      console.error(error);
    }
    
  }
}

export default PointsController;