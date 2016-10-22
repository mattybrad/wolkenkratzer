import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
mongoose.connect('mongodb://localhost/mysite');
import routes from './server/routes';
const app = express();
app.use('/', routes);
app.use('/', express.static('public'));
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.listen(process.env.PORT || 3000);
