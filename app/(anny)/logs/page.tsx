'use client';
import { useSession } from "next-auth/react";
import styles from './page.module.scss';
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { parseISO } from "date-fns";
import LogWindow from "./LogWindow";
import { Pagination } from "@mui/material";
import FormValues from "@/interface/logs/FormValues";
import SearchForm from "./SearchForm";

export default function Logs() {
  const { data: session, status } = useSession({ required: true })
  const [formValues, setFormValues] = useState<FormValues>({ username: "", search: "", startDate: null, endDate: null, page: 1 });
  const [logCounts, setLogCounts] = useState<{ total: number, limit: number }>({ total: 0, limit: 0 });
  const [vodCount, setVodCount] = useState<number>(0);
  const [mobileSearch, setMobileSearch] = useState<boolean>(false);
  const firstUpdate = useRef(true);

  const initialParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // set initial form values to query params
    if (firstUpdate.current) {
      firstUpdate.current = false;
      setFormValues({
        username: initialParams.get("username") ?? "",
        search: initialParams.get("search") ?? "",
        startDate: initialParams.get("startDate") ? new Date(Number(initialParams.get("startDate"))) : null,
        endDate: initialParams.get("endDate") ? new Date(Number(initialParams.get("endDate"))) : null,
        // do not allow page 0
        page: Number(initialParams.get("page")) > 0 ? Number(initialParams.get("page")) : 1
      });
    } else {
      // update query params
      const params = new URLSearchParams();
      if (formValues.username) params.set("username", formValues.username);
      if (formValues.search) params.set("search", formValues.search);
      // unix seconds
      if (formValues.startDate) params.set("startDate", formValues.startDate?.getTime().toString());
      if (formValues.endDate) params.set("endDate", formValues.endDate?.getTime().toString());
      // if page is different, use, other set to 1
      if (formValues.page) params.set("page", String(formValues.page));
        else params.set("page", "1");

      router.push(`${pathname}?${params}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues]);

  // handle differently later
  if (status === "loading") return <div>Loading...</div>

  return (
    <div className={styles['page__container']}>

      {/* Mobile search button */}
      <div className={styles['panel__mobile__search']}>
        <div className={styles['panel__mobile__search__button']} onClick={() => setMobileSearch(!mobileSearch)}>
          Search
        </div>
      </div>
      {/* Mobile search form modal */}
      <div
        className={styles['panel__mobile__search__modal'] + " " + (mobileSearch ? styles['panel__mobile__search__modal--active'] : "")}
        onClick={() => setMobileSearch(false)}
      >
        <div className={styles['panel__card']} onClick={(e) => e.stopPropagation()}>
          {/* top right close button */}
          <div className={styles['panel__card__close']} onClick={() => setMobileSearch(false)}>
            ✕
          </div>
          <div className={styles['card__header']}>
            <div className={styles['card__header__title']}>
              <h2>search</h2>
            </div>
          </div>
          <div className={styles['card__body'] + " " + styles['card__body']}>
            <div className={styles['form__container']}>
              <SearchForm formValues={formValues} setFormValues={setFormValues} />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={styles['panel__container']}>
        {/* log card */}
        <div className={styles['panel__card'] + " " + styles['panel__card--large']}>
          {/* <div className={styles['card__header']}>
            <div className={styles['card__header__title']}>
              <h1>anny logs</h1>
            </div>
          </div> */}
          <div className={styles['card__body']}>
            <div className={styles['log__container']}>
              <div className={styles['log__window']}>
                <LogWindow formValues={formValues} setLogCounts={setLogCounts} setVodCount={setVodCount} />
              </div>
              <div className={styles['log__pagination']}>
                {
                  logCounts.total > 0 && (
                    <Pagination
                      count={Math.ceil(logCounts.total / logCounts.limit)}
                      page={formValues.page}
                      onChange={(e, page) => setFormValues({ ...formValues, page: page })}
                    />
                  )
                }
              </div>
            </div>
          </div>
        </div>
        {/* form card */}
        <div className={styles['panel__card'] + " " + styles['panel__card--small']}>
          <div className={styles['card__header']}>
            <div className={styles['card__header__title']}>
              <h3>search</h3>
            </div>
          </div>
          <div className={styles['card__body']}>
            <div className={styles['form__container']}>
              <SearchForm formValues={formValues} setFormValues={setFormValues} />
            </div>
          </div>
        </div>
        {/* stat card */}
        <div className={styles['panel__card'] + " " + styles['panel__card--small']}>
          <div className={styles['card__header']}>
            <div className={styles['card__header__title']}>
              <h3>stats</h3>
            </div>
          </div>
          <div className={styles['card__body']}>
            <div className={styles['stat__container']}>
              <div className={styles['stat__item']}>
                <div className={styles['stat__item__value']}>
                  <p>{logCounts.total ? logCounts.total.toLocaleString("en-US") : 0}</p>
                </div>
                <div className={styles['stat__item__title']}>
                  <h3>messages</h3>
                </div>
              </div>
              <div className={styles['stat__item']}>
                <div className={styles['stat__item__value']}>
                  <p>{vodCount?.toLocaleString("en-US")}</p>
                </div>
                <div className={styles['stat__item__title']}>
                  <h3>vods</h3>
                </div>
              </div>
            </div>
            <p className={styles['text--secondary']}>collecting since {new Date(1629936000000).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }).toLowerCase()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}