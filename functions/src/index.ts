import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from 'body-parser';

//Init
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const app = express();
const main = express();
const cors = require('cors')({ origin: true });

//Create Service
main.use('/api/v1', app);
main.use(bodyParser.json());

app.use(cors);
main.use(cors);
export const webApi = functions.https.onRequest(main);

//Handy Constants
const GIF_COLLECTION = 'gifs';
const CATEGORY_COLLECTION = 'categories';

//GIFs CRUD
app.post('/gif', async (request, response) => {
  try {
    const { userId, gifData } = request.body;
    if (!userId) {
      response.status(400).send('Missing userId');
    } else if (!gifData) {
      response.status(400).send('Missing gifData');
    } else {
      const data = {
        userId,
        gifData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const gifRef = await db.collection(GIF_COLLECTION).add(data);
      const gif = await gifRef.get();

      response.json({
        id: gifRef.id,
        data: gif.data(),
      });
    }
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get('/gif/:id', async (request, response) => {
  try {
    const gifId = request.params.id;

    if (!gifId) {
      response.status(400).send('Missing GIF id');
    }

    const gif = await db
      .collection(GIF_COLLECTION)
      .doc(gifId)
      .get();

    if (!gif.exists) {
      response.status(404).send('GIF does not exist.');
    }

    response.json({
      id: gif.id,
      data: gif.data(),
    });
  } catch (error) {
    response.status(500).send(error);
  }
});

//Get all GIFs
app.get('/gifs', async (request, response) => {
  try {
    const gifQuerySnapshot = await db.collection(GIF_COLLECTION).get();
    const gifs: any = [];
    gifQuerySnapshot.forEach(doc => {
      gifs.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    response.json(gifs);
  } catch (error) {
    response.status(500).send(error);
  }
});

//Get Gifs for user
app.get('/gifs/:uid', async (request, response) => {
  const { limit, skip, orderBy, direction, uid } = request.params;
  try {
    const gifQuerySnapshot = await db
      .collection(GIF_COLLECTION)
      .where('userId', '==', uid)
      .orderBy(orderBy || 'createdAt', direction || 'desc')
      .limit(limit || 20)
      .startAt(skip || 0)
      .get();
    const gifs: any = [];
    gifQuerySnapshot.forEach(doc => {
      gifs.push({
        id: doc.id,
        data: doc.data(),
      });
    });

    response.json(gifs);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.put('/gif/:id', async (request, response) => {
  try {
    const gifId = request.params.id;
    const gifData = request.body.gifData;

    if (!gifId) {
      response.status(400).send('Missing GIF id');
    } else if (!gifData) {
      response.status(400).send('gifData is required');
    } else {
      const data = {
        gifData,
        updatedAt: new Date(),
      };
      await db
        .collection(GIF_COLLECTION)
        .doc(gifId)
        .set(data, { merge: true });

      response.json({
        id: gifId,
        data,
      });
    }
  } catch (error) {
    response.status(500).send(error);
  }
});

app.delete('/gif/:id', async (request, response) => {
  try {
    const gifId = request.params.id;

    const gif = await db
      .collection(GIF_COLLECTION)
      .doc(gifId)
      .get();

    if (!gif.exists) {
      response.status(404).send('GIF does not exist.');
    } else if (!gifId) {
      response.status(400).send('Missing GIF id');
    } else {
      await db
        .collection(GIF_COLLECTION)
        .doc(gifId)
        .delete();

      response.json({
        id: gifId,
      });
    }
  } catch (error) {
    response.status(500).send(error);
  }
});

//CATEGORIES Crud
app.post('/category', async (request, response) => {
  try {
    const { userId, categoryName, gifs } = request.body;
    if (!userId) {
      response.status(400).send('Missing userId');
    } else if (!categoryName) {
      response.status(400).send('Missing category name');
    } else {
      const data = {
        userId,
        categoryName,
        gifs,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const categoryRef = await db.collection(CATEGORY_COLLECTION).add(data);
      const newCategory = await categoryRef.get();

      response.json({
        id: categoryRef.id,
        data: newCategory.data(),
      });
    }
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get('/category/:id', async (request, response) => {
  try {
    const categoryId = request.params.id;

    if (!categoryId) {
      response.status(400).send('Missing Category id');
    }

    const category = await db
      .collection(GIF_COLLECTION)
      .doc(categoryId)
      .get();

    if (!category.exists) {
      response.status(404).send('Category does not exist.');
    }

    response.json({
      id: category.id,
      data: category.data(),
    });
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get('/categories', async (request, response) => {
  const { limit, skip, orderBy, direction } = request.params;
  try {
    const categoryQuerySnapshot = await db
      .collection(CATEGORY_COLLECTION)
      .orderBy(orderBy || 'createdAt', direction || 'desc')
      .limit(limit || 20)
      .startAt(skip || 0)
      .get();
    const categories: any = [];
    categoryQuerySnapshot.forEach(doc => {
      categories.push({
        id: doc.id,
        data: doc.data(),
      });
    });

    response.json(categories);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.put('/category/:id', async (request, response) => {
  try {
    const categoryId = request.params.id;
    const { categoryName, gifs } = request.body;

    if (!categoryId) {
      response.status(400).send('Missing Cateory id');
    } else if (!categoryName) {
      response.status(400).send('Category name is required');
    } else {
      const data = {
        categoryName,
        gifs,
        updatedAt: new Date(),
      };
      await db
        .collection(GIF_COLLECTION)
        .doc(categoryId)
        .set(data, { merge: true });

      response.json({
        id: categoryId,
        data,
      });
    }
  } catch (error) {
    response.status(500).send(error);
  }
});

app.delete('/category/:id', async (request, response) => {
  try {
    const categoryId = request.params.id;

    const category = await db
      .collection(CATEGORY_COLLECTION)
      .doc(categoryId)
      .get();

    if (!category.exists) {
      response.status(404).send('Category does not exist.');
    } else if (!categoryId) {
      response.status(400).send('Missing Category id');
    } else {
      await db
        .collection(CATEGORY_COLLECTION)
        .doc(categoryId)
        .delete();

      response.json({
        id: categoryId,
      });
    }
  } catch (error) {
    response.status(500).send(error);
  }
});
