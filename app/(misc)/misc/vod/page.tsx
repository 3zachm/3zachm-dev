'use client';
import useSWR from 'swr';
import styles from './page.module.scss';
import { Skeleton } from '@mui/material';
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { add, parseISO } from 'date-fns';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Vod() {
  const [formDate, setFormDate] = useState<Date | null>(null);
  const [vodData, setVodData] = useState<{ vodURL: string, vodTime: string, vodThumbnail: string, vodTitle: string } | null | false>(null);
  const { data: videos, error: videoError, isLoading: videoIsLoading } = useSWR(`/api/public/anny/videos`, fetcher, { revalidateOnFocus: false });

  
  useEffect(() => {
    if (formDate && videoData) {
      const vod = getVod(formDate as Date, videoData);
      setVodData(vod);
    }
  }, [formDate]);

  if (videoIsLoading) return (
    <div className={styles['page__container']}>
      <div className={styles['page__card__container']}>
        <div className={styles['page__card']}>
          <div className={styles['card__header']}>
            <div className={styles['card__header__title']}>
              <h1>anny vod timestamp</h1>
            </div>
            <div className={styles['card__header__subtitle']}>
              <p>select a time for a corresponding vod URL/timestamp</p>
            </div>
          </div>
          <div className={styles['card__body']}>
            <div className={styles['form__container']}>
              <Skeleton animation="wave" variant="text" width={220} height={80} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const videoData = videos.data.map((video: any) => {
    const startTime = parseISO(video.created_at);
    const length = video.duration; // formatted like 03h20m00s, may be shorter
    const timeRegex = /(\d+)(h|m|s)/g;
    let match;
    let duration = { hours: 0, minutes: 0, seconds: 0 };

    while ((match = timeRegex.exec(length)) !== null) {
      if (match[2] === "h") duration.hours = parseInt(match[1]);
      else if (match[2] === "m") duration.minutes = parseInt(match[1]);
      else if (match[2] === "s") duration.seconds = parseInt(match[1]);
    }

    const end = add(startTime, duration);

    return {
      id: video.id,
      title: video.title,
      startTime: startTime,
      endTime: end,
      thumbnail: video.thumbnail_url.replace("%{width}", "320").replace("%{height}", "180")
    }
  });

  return (
    <div className={styles['page__container']}>
      <div className={styles['page__card__container']}>
        <div className={styles['page__card']}>
          <div className={styles['card__header']}>
            <div className={styles['card__header__title']}>
              <h1>anny vod timestamp</h1>
            </div>
            <div className={styles['card__header__subtitle']}>
              <p>select a time for a corresponding vod URL</p>
            </div>
          </div>
          <div className={styles['card__body']}>
            <div className={styles['form__container']}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDateTimePicker
                  label="Date"
                  value={formDate}
                  onAccept={(date: Date | null) => {
                    if (date !== null && date !== formDate) {
                      setFormDate(date);
                    }
                  }}
                />
              </LocalizationProvider>
            </div>
          </div>
        </div>
        {
          formDate && (
            <div className={styles['page__card']}>
              {
                vodData === null ? (
                  <div className={styles['card__body'] + " " + styles['vod__card__body']}>
                <div className={styles['vod__skeleton']}>
                  <div>
                    <Skeleton animation="wave" variant="text" width={128} height={32} />
                    <Skeleton animation="wave" variant="text" width={'75%'} height={24} />
                  </div>
                  <div className={styles['vod__container']}>
                    <Skeleton animation="wave" variant="text" width={128} height={32} />
                    <Skeleton animation="wave" variant="text" width={'75%'} height={24} />
                    <Skeleton animation="wave" variant="text" width={'75%'} height={24} />
                  </div>
                </div>
                <div className={styles['vod__avatar']}>
                  <Skeleton variant="circular" width={128} height={128} />
                </div>
              </div>
                ) : vodData === false ? (
                  <div className={styles['card__body'] + " " + styles['vod__card__body']}>
                    <div className={styles['vod__container']}>
                      <h2>No vod found</h2>
                    </div>
                  </div>
                ) : (
                  <div className={styles['card__body'] + " " + styles['vod__card__body']}>
                    <div className={styles['vod__container']}>
                      <div className={styles['vod__title']}>
                        <h3>{vodData.vodTitle}</h3>
                      </div>
                      <div className={styles['vod__info']}>
                        <div className={styles['vod__thumbnail']}>
                          <div className={styles['vod__time']}>
                            <p>{vodData.vodTime}</p>
                          </div>
                          <img src={vodData.vodThumbnail} alt="vod thumbnail" />
                        </div>
                      </div>
                      <div className={styles['vod__buttons']}>
                        <div className={styles['vod__button']}>
                          <Link href={vodData.vodURL} target="_blank">
                            Watch
                          </Link>
                        </div>
                        <div className={styles['vod__button']}>
                          {/* copy the URL */}
                          <div onClick={() => {
                            navigator.clipboard.writeText(vodData.vodURL);
                          }}>
                            Copy
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          )
        }
      </div>
    </div>
  )
}

function getVod(timestamp: Date, videoData: [{ id: string, title: string, startTime: Date, endTime: Date, thumbnail: string }]) {
  // find video that contains timestamp
  const video = videoData.find((video: any) => video.startTime <= timestamp && video.endTime >= timestamp);
  if (video) {
    const vodTime = Math.floor((timestamp.getTime() - video.startTime.getTime()) / 1000);
    const vodTimeFormatted = `${Math.floor(vodTime / 3600)}h${Math.floor((vodTime % 3600) / 60)}m${vodTime % 60}s`;
    const vodURL = `https://www.twitch.tv/videos/${video.id}?t=${vodTimeFormatted}`;
    const vodThumbnail = video.thumbnail;
    const vodTitle = video.title;
    // convert vodTime from seconds to HH:mm:ss
    const vodTimePretty = Math.floor(vodTime / 3600) + ":" + Math.floor((vodTime % 3600) / 60).toString().padStart(2, '0') + ":" + (vodTime % 60).toString().padStart(2, '0');
    return { vodURL, vodTime: vodTimePretty, vodThumbnail, vodTitle };
  }
  return false;
}