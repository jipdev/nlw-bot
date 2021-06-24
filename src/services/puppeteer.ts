import puppeteer from 'puppeteer';
import { browserOptions } from '../constants/browser-options';
import { lessons } from '../constants/lessons';
import { Errors } from '../enums/errors';
import { ClassParams } from '../interfaces/class-params';
import { ClassesParams } from '../interfaces/classes-params';

export const getVideoUrl = async ({ day, edition, lesson }: ClassParams): Promise<string> => {
  const browser = await puppeteer.launch(browserOptions);
  const page = await browser.newPage();
  await page.goto(`https://nextlevelweek.com/episodios/${lesson}/aula-${day}/edicao/${edition}`);
  const iframe = await page.$('iframe');
  const src = await iframe?.getProperty('src');
  if (src) {
    const url = await src.jsonValue();
    await browser.close();
    return `${(url as string).split('?')[0]}`;
  } else {
    await browser.close();
    throw Error(Errors.NOT_FOUND);
  }
};

export const getAllClassesVideoUrl = async ({ day, edition }: ClassesParams): Promise<string[]> => {
  const browser = await puppeteer.launch(browserOptions);
  const page = await browser.newPage();

  const videos: string[] = [];
  for (const lesson of lessons) {
    await page.goto(`https://nextlevelweek.com/episodios/${lesson}/aula-${day}/edicao/${edition}`);
    const iframe = await page.$('iframe');
    const src = await iframe?.getProperty('src');
    if (src) {
      const url = await src.jsonValue();
      videos.push((url as string).split('?')[0]);
    }
  }

  await browser.close();

  return videos;
};
