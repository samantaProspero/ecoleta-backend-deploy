import Knex from 'knex';

export async function seed(knex:Knex){
  await knex('items').insert([
    {title: 'Lâmpadas', image: 'https://res.cloudinary.com/dc5wd994b/image/upload/v1612363455/items/L%C3%A2mpadas_ziyhbd.png'},
    {title: 'Pilhas e Baterias', image: 'https://res.cloudinary.com/dc5wd994b/image/upload/v1612363455/items/Pilhas_e_Baterias_lnew5a.png'},
    {title: 'Papéis/Papelão', image: 'https://res.cloudinary.com/dc5wd994b/image/upload/v1612363455/items/Pap%C3%A9is_wvnqix.png'},
    {title: 'Resíduos Eletrônicos', image: 'https://res.cloudinary.com/dc5wd994b/image/upload/v1612363455/items/Eletr%C3%B4nicos_jfkpzn.png'},
    {title: 'Resíduos Orgânicos', image: 'https://res.cloudinary.com/dc5wd994b/image/upload/v1612363455/items/Org%C3%A2nicos_ts6jci.png'},
    {title: 'Óleo de Cozinha', image: 'https://res.cloudinary.com/dc5wd994b/image/upload/v1612363454/items/%C3%93leo_de_Cozinha_azbjwe.png'},
  ]);
}