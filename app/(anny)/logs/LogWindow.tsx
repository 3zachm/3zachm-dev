import useSWR from "swr";
import styles from './LogWindow.module.scss';
import { add, format, parseISO } from "date-fns";
import Image from "next/image";
import FormValues from "@/interface/logs/FormValues";
import { ReactNode, useEffect } from "react";
import { Skeleton } from "@mui/material";
import TwitchEmote from "@/interface/twitch/TwitchEmote";

interface LogWindowProps {
  formValues: FormValues;
  setLogCounts: React.Dispatch<React.SetStateAction<{ total: number, limit: number }>>;
  setVodCount: React.Dispatch<React.SetStateAction<number>>;
}

interface LogLine {
  timestamp: string;
  user_id: number;
  user_name: string;
  message: string;
  badges: string;
  is_mod: boolean;
  is_sub: boolean;
  is_turbo: boolean;
  color: string;
}

const fetcher = (url: string) => fetch(url)
  .then((res) => {
    // use error in body to throw error
    if (!res.ok) {
      return res.json().then((body) => {
        throw new Error(body.error);
      }).catch((err) => {
        throw new Error(err);
      });
    }
    return res.json();
  })

const LoadingSkeletons = () => {
  return (
    <div className={styles['log__container'] + " " + styles['log__container--loading']}>
      <h2>Loading...</h2>
      {
        // use height of container to determine how many skeletons to show, use random widths to make it look more natural (take from 100%)
        Array(Math.floor((window.innerHeight - 100) / 20)).fill(0).map((_, i) => (
          <Skeleton key={i} height={20} width={`${Math.floor(Math.random() * 60) + 10}%`} />
        ))
      }
    </div>
  );
}

const ErrorMessage = ({ error }: { error: any }) => {
  return (
    // currently unstyled, ignore className
    <div className={styles['log__container'] + " " + styles['log__container--error']}>
      <h2>Error loading logs</h2>
      <p>{error.message}</p>
    </div>
  );
}

export default function LogWindow({ formValues, setLogCounts, setVodCount }: LogWindowProps) {
  const tempSd = formValues.startDate?.getTime() ?? "";
  const tempEd = formValues.endDate?.getTime() ?? "";
  const apiURL = `/api/logs?p=${formValues.page}&u=${formValues.username}&q=${formValues.search}&sd=${tempSd}&ed=${tempEd}`;
  const apiBadges = `/api/twitch/badges?c=56418014&m=1`;
  const apiVideos = `/api/twitch/videos?c=56418014`;
  const apiEmotes = `/api/twitch/emotes?c=56418014&s=61ad997effa9aba101bcfddf&m=1`;

  const { data: logs, error: logError, isLoading: logIsLoading } = useSWR(apiURL, fetcher, { revalidateOnFocus: false });
  const { data: badges, error: badgesError, isLoading: badgesIsLoading } = useSWR(apiBadges, fetcher, { revalidateOnFocus: false });
  const { data: videos, error: videosError, isLoading: videosIsLoading } = useSWR(apiVideos, fetcher, { revalidateOnFocus: false });
  const { data: emotes, error: emotesError, isLoading: emotesIsLoading } = useSWR(apiEmotes, fetcher, { revalidateOnFocus: false });
  let emoteData: TwitchEmote[] = [];

  useEffect(() => {
    if (!logIsLoading && !logError) {
      setLogCounts({ total: logs.pagination.total, limit: logs.pagination.limit });
    }
  }, [logs, setLogCounts, logIsLoading, logError]);

  useEffect(() => {
    if (!videosIsLoading && !videosError) {
      setVodCount(videos.data?.length ?? 0);
    }
  }, [videos, setVodCount, videosIsLoading, videosError]);


  if (!emotesIsLoading && !emotesError) {
    emoteData = emotes.data;
  }

  if (logIsLoading || videosIsLoading || badgesIsLoading) return (
    <LoadingSkeletons />
  );

  if (logError) return <ErrorMessage error={logError} />;
  if (videosError) return <ErrorMessage error={videosError} />;
  if (badgesError) return <ErrorMessage error={badgesError} />;
  if (emotesError) return <ErrorMessage error={emotesError} />;

  const videoData = videos.data?.map((video: any) => {
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
    <div className={styles['log__container']}>
      {
        logs.data.map((log: LogLine, index: number) => (
          <div key={index}>
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
                  data-chattime={new Date(log.timestamp).toISOString()}
                >
                  <span className={styles['message__pre__date__full']}>{format(new Date(log.timestamp), 'yyyy-MM-dd HH:mm:ss')}</span>
                  <span className={styles['message__pre__date__mobile']}>{format(new Date(log.timestamp), 'HH:mm')}</span>
                </span>
                {/* badges  */}
                <span className={styles['message__pre__badge']}>
                  <ParseBadges badgeList={log.badges} badgeData={badges} />
                </span>
                {/* name */}
                <span className={styles['message__pre__name']} style={{ color: `${(log.color != "#FFFFFF") ? log.color : "#BBBBBB"}` }}>{log.user_name}</span>
                {/* separator */}
                <span aria-hidden="true" className={styles['message__pre__separator']}>:</span>
              </div>
              <div className={styles['message__content']}>
                {/* emotes */}
                <ParseEmotes key={index} message={log.message} emoteData={emoteData} />
              </div>
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
          const badgeURL = badgeData.data.find((badge: any) => badge.set_id === badgeString[0]).versions?.find((version: any) => version.id == badgeString[1])?.image_url_2x;
          return (
            <Image className={styles["badge__image"]} key={badgeString[0] + badgeString[1]} src={badgeURL} alt={badgeString[0]} width={18} height={18} />
          )
        })
      }
    </>
  );
}

function ParseEmotes({ message, emoteData }: { message: string, emoteData: TwitchEmote[] }) {
  if (!message) return <></>;
  if (!emoteData) return <>{message}</>;
  const words = message.split(" ");

  let newMessage: ReactNode[] = [];
  words.forEach((word: string) => {
    const emote = emoteData.find((emote: TwitchEmote) => emote.name === word);
    if (emote) {
      newMessage.push(
        <span>
          <div className={styles['emote__container']}>
            <img
              key={word}
              src={emote.images.url_1x}
              alt={word}
            />
          </div>
        </span>
      );
    } else {
      newMessage.push(<span>{word}</span>);
    }
  });
  return (
    <>
      {newMessage.reduce<ReactNode[]>((acc, curr, index) => {
        return index === 0 ? [curr] : [...acc, " ", curr];
      }, [])}
    </>
  );
}


function messageVod(e: any, videoData: [{ id: string, title: string, startTime: Date, endTime: Date, thumbnail: string }]) {
  e.preventDefault();
  if (e.currentTarget.dataset.vodURL) return e.currentTarget.dataset.vodURL;
  const timestamp = new Date(e.currentTarget.dataset.chattime);
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