import useSWR from "swr";
import styles from './LogWindow.module.scss';
import { add, format, parseISO } from "date-fns";
import Image from "next/image";
import FormValues from "@/interface/logs/FormValues";
import { useEffect } from "react";
import { Skeleton } from "@mui/material";

interface LogWindowProps {
  formValues: FormValues;
  setLogCounts: React.Dispatch<React.SetStateAction<{ total: number, limit: number }>>;
  setVodCount: React.Dispatch<React.SetStateAction<number>>;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function LogWindow({ formValues, setLogCounts, setVodCount }: LogWindowProps) {
  const tempSd = formValues.startDate ? formValues.startDate.toISOString() : "";
  const tempEd = formValues.endDate ? formValues.endDate.toISOString() : "";
  const apiURL = `/api/logs?p=${formValues.page}&u=${formValues.username}&q=${formValues.search}&sd=${tempSd}&ed=${tempEd}`;
  const apiBadges = `/api/twitch/badges?c=56418014&m=1`;
  const apiVideos = `/api/twitch/videos?c=56418014`;

  const { data: logs, error: logError, isLoading: logIsLoading } = useSWR(apiURL, fetcher, { revalidateOnFocus: false });
  const { data: badges, error: badgesError, isLoading: badgesIsLoading } = useSWR(apiBadges, fetcher, { revalidateOnFocus: false });
  const { data: videos, error: videosError, isLoading: videosIsLoading } = useSWR(apiVideos, fetcher, { revalidateOnFocus: false });

  useEffect(() => {
    if (!logIsLoading && !logError) {
      setLogCounts({ total: logs.pagination.total, limit: logs.pagination.limit });
    }
  }, [logs, setLogCounts, logIsLoading, logError]);

  useEffect(() => {
    if (!videosIsLoading && !videosError) {
      setVodCount(videos.data.length);
    }
  }, [videos, setVodCount, videosIsLoading, videosError]);

  if (logIsLoading || videosIsLoading) return (
    <div className={styles['log__container'] + " " + styles['log__container--loading']}>
      <h2>Loading...</h2>
      {
        // use height of container to determine how many skeletons to show, use random widths to make it look more natural (take from 100%)
        Array(Math.floor((window.innerHeight - 100) / 20)).fill(0).map((_, i) => (
          <Skeleton key={i} height={20} width={`${Math.floor(Math.random() * 60) + 10}%`} />
        ))
      }
    </div>
  )
  if (logError) return <div>Error loading logs</div>;

  const videoData = videos.data.map((video: any) => {
    const startTime = parseISO(video.created_at);
    const length = video.duration; // formatted like 03h20m00s, may be shorter
    console.log(length);
    const end = add(startTime, { hours: Number(length.substring(0, 2)), minutes: Number(length.substring(3, 5)), seconds: Number(length.substring(6, 8)) });

    return {
      id: video.id,
      title: video.title,
      startTime: startTime,
      endTime: end,
      thumbnail: video.thumbnail_url.replace("%{width}", "320").replace("%{height}", "180")
    }
  });


  return (
    <div className={styles['log__container']}>
      {
        logs.data.map((log: any) => (
          <div key={log.msg_id}>
            <div className={styles['log__message']}>
              <div className={styles['message__pre']}>
                {/* clickable datetime */}
                <span
                  className={styles['message__pre__date']}
                  onMouseOver={(e) => {
                    if (messageVod(e, videoData)) {
                      e.currentTarget.style.cursor = "pointer";
                      // if screen is too small, don't show tooltip
                      if (window.innerWidth < 768) return;
                      // add tooltip with thumbnail and vod time
                      const tooltip = document.createElement("div");
                      tooltip.className = styles['message__pre__date__tooltip'];
                      tooltip.innerHTML = `
                        <img class="${styles['message__pre__date__tooltip__thumbnail']}" src="${e.currentTarget.dataset.thumbnail}" />
                        <div class="${styles['message__pre__date__tooltip__title']}">
                          ${e.currentTarget.dataset.vodTitle}
                        </div>
                        <div class="${styles['message__pre__date__tooltip__time']}">
                          ${e.currentTarget.dataset.vodTime}
                        </div>
                      `;
                      e.currentTarget.appendChild(tooltip);
                    }
                  }}
                  onMouseOut={(e) => {
                    const tooltip = e.currentTarget.getElementsByClassName(styles['message__pre__date__tooltip'])[0];
                    if (tooltip) e.currentTarget.removeChild(tooltip);
                  }}
                  onClick={(e) => { if (e.currentTarget.dataset.vodURL) window.open(e.currentTarget.dataset.vodURL, "_blank") }}
                  data-chattime={format(new Date(log.time), 'yyyy-MM-dd HH:mm:ss')}
                >
                  <span className={styles['message__pre__date__full']}>{format(new Date(log.time), 'yyyy-MM-dd HH:mm:ss')}</span>
                  <span className={styles['message__pre__date__mobile']}>{format(new Date(log.time), 'HH:mm')}</span>
                </span>
                {/* badges  */}
                <span className={styles['message__pre__badge']}>
                  <ParseBadges badgeList={log.badges} badgeData={badges} />
                </span>
                {/* name */}
                <span className={styles['message__pre__name']} style={{ color: `${(log.color != "#FFFFFF") ? log.color : "#BBBBBB"}` }}>{log.user}</span>
                {/* separator */}
                <span aria-hidden="true" className={styles['message__pre__separator']}>:</span>
              </div>
              <div className={styles['message__content']}> {log.message} </div>
            </div>
          </div>
        ))
      }
    </div>
  );
}

function ParseBadges ({ badgeList, badgeData }: { badgeList: string, badgeData: { data: any[] } })  {
  if (!badgeList) return <></>
  // i.e. 'subscriber/6,sub-gifter/10' so split into 2d array of [badge, count]
  const badgeArray = badgeList.split(",").map((badge: string) => badge.split("/"));
  return (
    <>
      {
        badgeArray.map((badgeString: string[]) => {
          const badgeURL = badgeData.data.find((badge: any) => badge.set_id === badgeString[0]).versions.find((version: any) => version.id == badgeString[1]).image_url_2x;
          return (
            <Image className={styles["badge__image"]} key={badgeString[0] + badgeString[1]} src={badgeURL} alt={badgeString[0]} width={18} height={18} />
          )
        })
      }
    </>
  );
}

function messageVod(e: any, videoData: [{ id: string, title: string, startTime: Date, endTime: Date, thumbnail: string }]) {
  e.preventDefault();
  if (e.currentTarget.dataset.vodURL) return e.currentTarget.dataset.vodURL;
  const timestamp = e.currentTarget.dataset.chattime;
  // find video that contains timestamp
  const video = videoData.find((video: any) => video.startTime <= new Date(timestamp) && video.endTime >= new Date(timestamp));
  if (video) {
    const vodTime = Math.floor((new Date(timestamp).getTime() - video.startTime.getTime()) / 1000);
    const vodTimeFormatted = `${Math.floor(vodTime / 3600)}h${Math.floor((vodTime % 3600) / 60)}m${vodTime % 60}s`;
    e.currentTarget.dataset.vodURL = `https://www.twitch.tv/videos/${video.id}?t=${vodTimeFormatted}`;
    e.currentTarget.dataset.vodTime = vodTimeFormatted;
    e.currentTarget.dataset.thumbnail = video.thumbnail;
    e.currentTarget.dataset.vodTitle = video.title;
    return `https://www.twitch.tv/videos/${video.id}?t=${vodTimeFormatted}`;
  }
  return false;
}