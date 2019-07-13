import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from 'body-parser';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const app = express();
const main = express();

main.use('/api/v1', app);
main.use(bodyParser.json());

export const webApi = functions.https.onRequest(main);

const GIF_COLLECTION = 'gifs';

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
      response.status(404).send('GIF doesnt exist.');
    }

    response.json({
      id: gif.id,
      data: gif.data(),
    });
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get('/gifs', async (request, response) => {
  try {
    const gifQuerySnapshot = await db.collection(GIF_COLLECTION).get();
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

    if (!gifId) {
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
