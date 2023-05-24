'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './page.module.scss';
import { Skeleton, TextField } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Alias() {
  const [userValue, setUserValue] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<string>("");
  const firstUpdate = useRef(true);
  const { data: session, status } = useSession({ required: true })

  const initialParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // set initial form values to query params
    if (firstUpdate.current) {
      firstUpdate.current = false;
      setCurrentUser(initialParams.get("username") ?? "");
    } else {
      // update query params
      const params = new URLSearchParams();
      if (currentUser) params.set("username", currentUser);
      router.push(`${pathname}?${params}`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const apiAlias = `/api/logs/alias?u=${currentUser}`;

  const { data: nameData, error: nameError, isLoading: nameIsLoading } = useSWR(currentUser ? apiAlias : null, fetcher, { revalidateOnFocus: false });

  return (
    <div className={styles['page__container']}>
      <div className={styles['page__card__container']}>
        <div className={styles['page__card']}>
          <div className={styles['card__header']}>
            <div className={styles['card__header__title']}>
              <h1>alias checker</h1>
            </div>
            <div className={styles['card__header__subtitle']}>
              <p>check previous twitch usernames according to the logs</p>
            </div>
          </div>
          <div className={styles['card__body']}>
            <div className={styles['form__container']}>
              <TextField name="username" label="Username" value={userValue} type="search"
                onChange={(e) => setUserValue(e.target.value)}
                onKeyPress={handleInputEvent}
                onBlur={(e) => { if (e.target.value != currentUser) setCurrentUser(e.target.value) }}
              />
            </div>
          </div>
        </div>
        {
          currentUser && (
            <div className={styles['page__card']}>
              {
                nameIsLoading ? // skeleton
                  <div className={styles['card__body'] + " " + styles['alias__card__body']}>
                    <div className={styles['alias__skeleton']}>
                      <div>
                        <Skeleton animation="wave" variant="text" width={128} height={32} />
                        <Skeleton animation="wave" variant="text" width={'75%'} height={24} />
                      </div>
                      <div className={styles['alias__container']}>
                        <Skeleton animation="wave" variant="text" width={128} height={32} />
                        <Skeleton animation="wave" variant="text" width={'75%'} height={24} />
                        <Skeleton animation="wave" variant="text" width={'75%'} height={24} />
                      </div>
                    </div>
                    <div className={styles['alias__avatar']}>
                      <Skeleton variant="circular" width={128} height={128} />
                    </div>
                  </div>
                  :
                  nameError ?
                    <div>Error loading names or user does not exist in our database</div>
                    : // else success
                    <div className={styles['card__body'] + " " + styles['alias__card__body']}>
                      <div>
                        <div className={styles['alias__container']}>
                          <h3>Current name</h3>
                          <p>{nameData.current}</p>
                        </div>
                        <div className={styles['alias__container']}>
                          <h3>Previous names</h3>
                          <ul className={styles['alias__list']}>
                            {
                              nameData.previous.filter((name: string) => name !== nameData.current).length === 0 ? <li>None</li> :
                                nameData.previous.filter((name: string) => name !== nameData.current).map((name: string) => (
                                  <li key={name}>{name}</li>
                                ))
                            }
                          </ul>
                        </div>
                      </div>
                      <div className={styles['alias__avatar']}>
                        <Image className={styles['user__avatar']} src={nameData.avatar} alt="avatar" width={128} height={128} />
                      </div>
                    </div>
              }
            </div>
          )
        }
      </div>
    </div>
  )
}

const handleInputEvent = (e: any) => {
  // if key is enter, deselect the input box
  if (e.key === "Enter") {
    e.target.blur();
  }
};
