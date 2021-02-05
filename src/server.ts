import express from 'express';
import cors from 'cors';
import path from 'path';

import routes from './routes';
import { errors } from 'celebrate';


const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
// app.use('/upload-images', multerConfig.array('image'), async(req, res)=>{
//   const uploader = async (path) => await cloudinary.uploads(path, 'Images')
//   if(req.method === 'POST'){
//     const url = []
//     const files = req.files
//     for (const file of files){
//       const {path} = file
//       const newPath = await uploader(path)
//       urls.push(newPath)
//       fs.unlinkSync(path)
//     }
//     res.status(200).json({
//       message: 'Images Uploaded Successfully',
//       data: urls
//     })
//   } else{
//     res.status(405).json({
//       err: 'Images not Uploaded Successfully',
//     })
//   } 
// });

app.use(errors());


app.listen(process.env.PORT || 3333);
