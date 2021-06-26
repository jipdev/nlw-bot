import express from 'express';
import { constants } from 'http2';
import { Errors } from '../enums/errors';
import { InternalError } from '../errors/internal-error';
import { NotFound } from '../errors/not-found';
import { ClassParams } from '../interfaces/class-params';
import { ClassesParams } from '../interfaces/classes-params';
import { getAllClassesVideoUrl, getVideoUrl } from '../services/puppeteer';

const app = express();

app.get('/nlw/:edition/:lesson/:day', async (req, res) => {
  const params = req.params as ClassParams;
  try {
    const url = await getVideoUrl(params);
    res.send(url);
  } catch (e) {
    switch (e.message) {
      case Errors.NOT_FOUND:
        res.status(constants.HTTP_STATUS_NOT_FOUND).send(new NotFound('Aula não encontrada!'));
        return;
      default:
        console.log(e);
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(new InternalError());
    }
  }
});

app.get('/nlw/:edition/day-:day', async (req, res) => {
  const params = req.params as ClassesParams;
  try {
    const urls = await getAllClassesVideoUrl(params);
    res.send(urls);
  } catch (e) {
    switch (e.message) {
      default:
        console.log(e);
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(new InternalError());
    }
  }
});

export default app;
